"use client";
import Heading2 from "@/components/common/text/heading/Heading2";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { AnimatePresence, motion } from "framer-motion";
import CartProducts from "./CartProducts";
import {
  CartProductsType,
  changeCartModalVisible,
  changePointsInCart,
  changePromoCodeInCart,
} from "@/redux/slices/cart/cartSlice";
import {
  cartLengthSelector,
  cartProductsSelector,
  discountSelector,
  pointsSelector,
  promoCodeSelectorAmount,
} from "@/redux/slices/cart/cartSelectors";
import Button from "@/components/common/button/Button";
import { changeIsGlobalLoading } from "@/redux/slices/ui/uiSlice";
import { couponsService } from "@/shared/services/couponsService";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MdClear } from "react-icons/md";
import { notify } from "@/components/common/toast/Toastify";
import { userService, UserType } from "@/shared/services/userService";
import { useSession } from "next-auth/react";
import FreeDeliveryProgress from "@/components/common/free-delivery-progress/FreeDeliveryBar";
import useSettingsApi from "@/redux/api/useSettingsApi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Heading3 from "@/components/common/text/heading/Heading3";
import Heading4 from "@/components/common/text/heading/Heading4";
import { addProductWithAmount } from "@/redux/slices/cart/cartSlice";
import Heading6 from "@/components/common/text/heading/Heading6";
import { CartIcon } from "@/components/common/product/Product";

// const freeShippingBoundary = 100;

const calculateShippingPrice = (weight: number): number => {
  if (weight === 0) {
    return 0;
  }
  weight = weight / 1000;

  switch (true) {
    case weight <= 10:
      return 10;
    case weight <= 20:
      return 12;
    case weight <= 30:
      return 15;
    case weight <= 40:
      return 23;
    case weight <= 50:
      return 33;
    default:
      const weightLeft = weight - 50;
      const price: number = 33 + (weightLeft / 5) * 2;
      return Math.round(price * 1e2) / 1e2;
  }
};

const calculatePriceAndPost = (cart: CartProductsType[], freeShippingBoundary: number) => {
  let price = 0,
    post = 0,
    weight = 0;

  cart.forEach((x) => {
    price =
      price +
      x.amount *
      Number(
        x.productData.salePrice
          ? x.productData.salePrice
          : x.productData.price
      );
    weight += parseFloat(x.productData.weight) * x.amount;
  });

  post = calculateShippingPrice(weight);

  if (price >= freeShippingBoundary) {
    post = 0;
  }

  return { price, post };
};

const Cart = () => {
  const [userData, setUserData] = useState<UserType>();
  const points = useAppSelector(pointsSelector);
  const cartLength = useAppSelector(cartLengthSelector);
  const cart = useAppSelector(cartProductsSelector);
  const promoCode = useAppSelector(promoCodeSelectorAmount);
  const discount = useAppSelector(discountSelector);
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const router = useRouter();

  const { settings } = useSettingsApi();
  const [recommended, setRecommended] = useState<any[] | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const { price, post } = calculatePriceAndPost(cart, settings.settings.delivery.freeDeliveryLimit);
  const { status } = useSession();

  const fetchCouponsAndAddDiscount = async (code: string) => {
    if (!code) {
      return;
    }
    try {
      dispatch(changeIsGlobalLoading(true));
      const res = await couponsService.fetchCoupons();
      let found = false;
      res.rows.forEach((row) => {
        if (row.code === code && !row.userPromotionCode[0].isRedeemed) {
          dispatch(changePromoCodeInCart(row));
          found = true;
        } else {
          //
        }
      });
      if (!found) {
        notify("Kod nije validan", { type: "error", toastId: 25252 });
      }
    } catch (error) {
      console.error(error);
    }
    dispatch(changeIsGlobalLoading(false));
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await userService.getUserProfile();

        if (!data) {
          return;
        }


        setUserData(data);

      } catch (error: any) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (status === 'authenticated') {

      fetchUserProfile();
    }
  }, [status]);

  // fetch shopping cart recommended products
  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await fetch(
          "https://api.3dpartshop.com/shop/products/shopping-cart-recommended",
          { method: "GET", headers: { accept: "application/json" } }
        );
        if (!res.ok) return;
        const data = await res.json();
        setRecommended(data.rows || []);
      } catch (err) {
        console.error("Failed to load recommended products", err);
      }
    };

    fetchRecommended();
  }, []);

  const minusPoints = () => {
    if (points <= 0) return;

    dispatch(changePointsInCart(points - 1));
  };

  const plusPoints = () => {
    if (!userData) return;
    if (!userData.availablePoints) return;
    if (points >= userData!.availablePoints) return;


    if ((price -
      (promoCode
        ? price * (Number(promoCode.discountPercentage) / 100)
        : 0) +
      post) * ((100 - discount) / 100) - (points + 1 * 10) <= 0) return;

    dispatch(changePointsInCart(points + 1));
  };



  return (
    <motion.div className="flex flex-col w-full h-full px-4 py-2 overflow-y-auto cursor-default lg:px-8 lg:py-4 bg-neutral-800">
      {/* <Heading4>Korpa</Heading4> */}
      <div className="lg:mt-2 mt-1 bg-neutral-600 w-min px-2 py-1 rounded-[77px]">
        <Paragraph
          size="XS"
          weight="Regular"
          className="whitespace-nowrap"
        >{`${cartLength} ${cartLength === 1 ? "Proizvod" : "Proizvoda"
          } u korpi`}</Paragraph>
      </div>

      {/* <div className="overflow-y-auto px-2"> */}
      {/* CART ITEMS */}
      <div className="flex-1 my-2 overflow-x-hidden overflow-y-auto  lg:my-4">
        <AnimatePresence>
          {cart.map((product) => {
            return <CartProducts product={product} key={product.idProduct} />;
          })}
          {recommended && recommended.length > 0 && (
            <div className="mt-3">
              <Heading6>Preporučujemo</Heading6>
              <div className="mt-2 overflow-x-auto horizontal-thin-scroll">
                <div className="flex gap-3 w-max py-2">
                  {recommended.map((p) => (
                    <div
                      key={p.id}
                      className="w-[110px] bg-neutral-900 rounded-lg flex-shrink-0 cursor-pointer"
                      onClick={() => {
                        router.push(`/shop/product/${p.id}`);
                        dispatch(changeCartModalVisible(false));
                      }}
                    >
                      <div className="product-card-image-wrapper">
                        {p.images && p.images[0] ? (
                          <img src={`https://bucket3dpart.s3.eu-central-1.amazonaws.com/${p.images[0].imageId}`} alt={p.name} className="w-full" />
                        ) : (
                          <div className="w-full h-full bg-neutral-700" />
                        )}
                        <div className="product-card-gradient">
                          <div className="product-card-footer">
                            <div className="product-card-name truncate w-[100px]">{p.name}</div>
                            <div className="product-card-price">{p.price} KM</div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-center items-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(
                              addProductWithAmount({
                                amount: 1,
                                productId: p.id,
                                productData: {
                                  image: p.images && p.images[0] ? `https://bucket3dpart.s3.eu-central-1.amazonaws.com/${p.images[0].imageId}` : "/assets/img/no-image.svg",
                                  weight: p.weight || "0",
                                  price: p.price,
                                  quantity: p.quantity || 1,
                                  name: p.name,
                                  salePrice: p.salePrice || null,
                                },
                                shouldNotify: true,
                              })
                            );
                          }}
                          className="mb-2 mx-2 w-full px-4 text-xs bg-primary-500 hover:bg-primary-600 text-white rounded-md py-2 flex justify-center items-center transition-colors gap-2"
                        >
                          <div className="items-center hidden xsm:flex">
                            +<CartIcon color={"#ffffff"} />
                          </div>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* --------------- */}
      <div className="h-[1px] bg-neutral-500"></div>

      {/* Recommended products (horizontal scroll) */}

      {/* PROMO CODE */}
      {pathname === "/shop/checkout" && <div className="flex items-center gap-5 mt-3 mb-1">
        <div className="relative flex w-full">
          <input
            type="text"
            placeholder={"Promo kod"}
            className={`w-full h-10 px-4 py-3 rounded-lg border border-primary-500 disabled:cursor-not-allowed bg-transparent disabled:text-neutral-400 ${promoCode ? "!border-success-500" : ""
              }`}
            required
            defaultValue={promoCode?.code}
            ref={inputRef}
          />
          {promoCode && (
            <MdClear
              className=" text-neutral-200 min-w-[20px] min-h-[20px] cursor-pointer absolute top-[10px] right-4"
              onClick={() => {
                dispatch(changePromoCodeInCart(null));
              }}
            />
          )}

        </div>
        <Button
          onClick={() => {
            fetchCouponsAndAddDiscount(inputRef.current?.value || "");
          }}
          size="M"
          type="secondary"
          className="w-[100px] h-10"
        >
          Uracunaj
        </Button>
      </div>}

      {/* FREE DELIVERY */}
      {pathname !== "/shop/checkout" && <FreeDeliveryProgress currentAmount={price} freeDeliveryThreshold={settings.settings.delivery.freeDeliveryLimit} />}

      {/* PRICE DATA */}
      {status === 'authenticated' && <div className="flex items-center justify-between mt-2">
        <Paragraph size="M" weight="Regular" className="text-neutral-200">
          Poeni {`(Dostupno: ${userData?.availablePoints || 0})`}
        </Paragraph>
        <div className="flex gap-2 justify-center items-center">
          <button disabled={userData?.availablePoints === 0 || points === 0} onClick={minusPoints} className=" cursor-pointer py-2 px-4 md:py-2 md:px-4 transition-all bg-[rgba(59,130,246,0.2)] text-white border border-primary-500 active:border-primary-400 active:bg-primary-500 xl:hover:border-primary-400 xl:hover:bg-[rgba(59,130,246,0.5)] disabled:border-primary-400 disabled:bg-[rgba(100,100,100,0.3)] disabled:text-primary-400  rounded-lg flex justify-center items-center">-</button>
          <div className="px-4 md:px-6 text-[18px] font-bold">{points}</div>
          <button disabled={Number(points) === Number(userData?.availablePoints)} onClick={plusPoints} className=" cursor-pointer py-2 px-4 md:py-2 md:px-4 transition-all bg-[rgba(59,130,246,0.2)] text-white border border-primary-500 active:border-primary-400 active:bg-primary-500 xl:hover:border-primary-400 xl:hover:bg-[rgba(59,130,246,0.5)]  disabled:border-primary-400 disabled:bg-[rgba(100,100,100,0.3)] disabled:text-primary-400  rounded-lg flex justify-center items-center">+</button>

        </div>
      </div>}

      <div className="flex items-center justify-between mt-2">
        <Paragraph size="M" weight="Regular" className="text-neutral-200">
          Zbir{" "}
        </Paragraph>
        <div className="flex gap-2">
          <p
            className={`text-white text-[18px] font-exo2 font-semibold ${promoCode ? "line-through !text-neutral-300 !font-light" : ""
              }`}
          >{`${price.toFixed(2)} KM 
          `}</p>
          {promoCode && (
            <p className=" text-[18px] font-exo2 font-semibold text-success-500">{`${(
              price -
              price * (Number(promoCode.discountPercentage) / 100)
            ).toFixed(2)} KM`}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-2 mt-1">
        <Paragraph size="M" weight="Regular" className="text-neutral-200">
          Dostava{" "}
        </Paragraph>
        <p className={`text-white text-[18px] font-exo2 font-semibold ${price >= settings.settings.delivery.freeDeliveryLimit ? 'line-through' : ''}`}>{`${settings.settings.delivery.cost.toFixed(
          2
        )} KM`}</p>
      </div>

      {status === 'authenticated' && userData?.discount ? <div className="flex items-center justify-between my-3">
        <Paragraph size="M" weight="Regular" className="text-neutral-200">
          Popust{" "}
        </Paragraph>
        <p className="text-white text-[18px] font-exo2 font-semibold">{discount}%</p>
      </div> : null}
      {/* </div> */}


      <div className="h-[1px] bg-neutral-500"></div>

      <div className="flex items-center justify-between my-2">
        <p className="text-white text-[20px] font-semibold">UKUPNO </p>
        <p className="text-success-500 text-[28px] font-exo2 font-semibold">{`${(
          (price -
            (promoCode
              ? price * (Number(promoCode.discountPercentage) / 100)
              : 0) +
            post) * ((100 - discount) / 100) - (points)
        ).toFixed(2)} KM`}</p>
      </div>

      <div className="flex items-center gap-3   bg-neutral-800">
        <Button
          onClick={() => {
            dispatch(changeCartModalVisible(false));
          }}
          type="secondary"
          size="M"
          className="w-1/2 !p-2.5"
        >
          <Paragraph size="S" weight="Bold">
            Nastavi kupovinu
          </Paragraph>
        </Button>
        <Link
          href={"/shop/checkout"}
          onClick={() => {
            router.push("/shop/checkout");
            dispatch(changeCartModalVisible(false));
          }}
          className="w-1/2 "
          prefetch
        >
          <Button
            onClick={() => {
              router.push("/shop/checkout");
              dispatch(changeCartModalVisible(false));
            }}
            type="primary"
            size="M"
            className="w-full !p-2.5"
          >
            <Paragraph size="S" weight="Bold">
              Kupi
            </Paragraph>
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Cart;
