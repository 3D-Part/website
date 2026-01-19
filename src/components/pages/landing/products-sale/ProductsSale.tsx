"use client";

import Products from "@/components/common/products/Products";
import Heading2 from "@/components/common/text/heading/Heading2";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
import SaleCountdown from "./sale-countdown/SaleCountdown";
import Container from "@/components/common/container/Container";
import { useEffect, useState } from "react";
import { saleService } from "@/shared/services/saleService";
import Link from "next/link";
import Button from "@/components/common/button/Button";
import { useRouter } from "next/navigation";

const ProductsSale = () => {
  const [sales, setSales] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const data: any = await saleService.fetchActiveSale();
        const normalized = [];

        if (data?.rows) {
          for (const s of data.rows) {
            const prods = (s.productOnSale || []).map((p: any) => ({ salePrice: p.discountedPrice, ...p.product }));
            if (prods.length) normalized.push({ id: s.id, name: s.name, endsAt: s.endsAt, products: prods });
          }
        } else if (data?.id) {
          const res = await saleService.fetchActiveSaleProducts({ saleId: data.id });
          const prods = (res?.rows || []).map((p: any) => ({ salePrice: p.discountedPrice, ...p.product }));
          if (prods.length) normalized.push({ id: data.id, name: data.name, endsAt: data.endsAt, products: prods });
        }

        setSales(normalized);
      } catch { }
      setLoading(false);
    })();
  }, []);

  if (loading || !sales.length) return null;

  return (
    <>
      {sales.map((sale) => (
        <Container key={sale.id} className="w-full mb-[60px] lg:mb-24 lg:px-9">
          <Products
            products={sale.products.slice(0, 15)}
            className="mt-3 w-full"
            firstChildClass="w-full"
            animationVariants={{ initial: { opacity: 0, scale: 0.7, x: -30 }, animate: { opacity: 1, scale: 1, x: 0 } }}
            extraSlide={
              sale.products.length > 15 ? (
                <div className="ml-4 lg:ml-0">
                  <Link href={`/shop/all?sale=${sale.id}`} prefetch>
                    <div className="cursor-pointer bg-neutral-800 p-[10px] rounded-xl w-[160px] h-[320px] sm:w-[220px] sm:h-[418px]">
                      <div className="w-full h-full rounded-xl bg-primary-600 hover:bg-primary-500 transition-colors flex items-center justify-center text-center px-4">
                        <div className="flex flex-col items-center gap-2">
                          <Heading2 className="text-white text-lg sm:text-2xl">Pogledaj sve</Heading2>
                          <Paragraph size="S" weight="Regular" className="text-white/90">
                            {sale.products.length} proizvoda
                          </Paragraph>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ) : undefined
            }
          >
            <div className="flex flex-col w-full px-4 lg:px-0">
              <div className="flex items-center justify-between w-full">
                <Heading2 className="hover:text-white/70 transition-colors text-xl sm:text-2xl">
                  Proizvodi na akciji {sale.name && `- ${sale.name}`} <span className="text-primary-500">({sale.products.length})</span>
                </Heading2>
                {
                  // <Link href={`/shop/all?sale=${sale.id}`} prefetch>
                  <Button text="Pogledaj sve" size="M" type="secondary" onClick={() => { navigate.push(`/shop/all?sale=${sale.id}`) }} />
                  // </Link>
                }
              </div>
              <div className="flex items-center gap-2 mt-2 h-7">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g clipPath="url(#clip0_17_15547)">
                    <path
                      d="M6 16H0.666667C0.489856 16 0.320286 15.9297 0.195262 15.8047C0.0702379 15.6797 0 15.5101 0 15.3333C0 15.1565 0.0702379 14.9869 0.195262 14.8619C0.320286 14.7369 0.489856 14.6666 0.666667 14.6666H6C6.17681 14.6666 6.34638 14.7369 6.4714 14.8619C6.59643 14.9869 6.66667 15.1565 6.66667 15.3333C6.66667 15.5101 6.59643 15.6797 6.4714 15.8047C6.34638 15.9297 6.17681 16 6 16Z"
                      fill="#2463EB"
                    />
                    <path
                      d="M4.66667 13.3333H0.666667C0.489856 13.3333 0.320286 13.2631 0.195262 13.1381C0.0702379 13.013 0 12.8435 0 12.6667C0 12.4899 0.0702379 12.3203 0.195262 12.1953C0.320286 12.0702 0.489856 12 0.666667 12H4.66667C4.84348 12 5.01305 12.0702 5.13807 12.1953C5.2631 12.3203 5.33333 12.4899 5.33333 12.6667C5.33333 12.8435 5.2631 13.013 5.13807 13.1381C5.01305 13.2631 4.84348 13.3333 4.66667 13.3333Z"
                      fill="#2463EB"
                    />
                    <path
                      d="M3.33333 10.6667H0.666667C0.489856 10.6667 0.320286 10.5965 0.195262 10.4714C0.0702379 10.3464 0 10.1769 0 10C0 9.82323 0.0702379 9.65366 0.195262 9.52864C0.320286 9.40361 0.489856 9.33337 0.666667 9.33337H3.33333C3.51014 9.33337 3.67971 9.40361 3.80474 9.52864C3.92976 9.65366 4 9.82323 4 10C4 10.1769 3.92976 10.3464 3.80474 10.4714C3.67971 10.5965 3.51014 10.6667 3.33333 10.6667Z"
                      fill="#2463EB"
                    />
                    <path
                      d="M8.66698 15.97C8.49017 15.9778 8.31748 15.9151 8.18689 15.7957C8.0563 15.6762 7.97852 15.5098 7.97065 15.333C7.96278 15.1561 8.02547 14.9834 8.14493 14.8529C8.26439 14.7223 8.43084 14.6445 8.60765 14.6366C9.86929 14.5212 11.0719 14.0486 12.0747 13.2743C13.0774 12.5 13.8388 11.456 14.2696 10.2646C14.7004 9.07322 14.7828 7.78372 14.5071 6.54716C14.2315 5.3106 13.6092 4.17819 12.7132 3.28256C11.8171 2.38692 10.6844 1.76515 9.44773 1.49007C8.21104 1.21498 6.92158 1.29798 5.73036 1.72933C4.53915 2.16068 3.4955 2.92253 2.72166 3.92564C1.94783 4.92875 1.47584 6.1316 1.36098 7.39329C1.34507 7.56939 1.25985 7.73196 1.12407 7.84523C0.988297 7.9585 0.813084 8.0132 0.636981 7.99729C0.460877 7.98137 0.298307 7.89616 0.185035 7.76038C0.0717633 7.6246 0.0170676 7.44939 0.0329806 7.27329C0.218907 5.22216 1.18872 3.32175 2.74053 1.96766C4.29235 0.613575 6.30661 -0.0898693 8.36402 0.00376244C10.4214 0.0973942 12.3635 0.980888 13.7859 2.47033C15.2083 3.95978 16.0015 5.94042 16.0003 7.99995C16.0105 9.99885 15.2679 11.9283 13.9202 13.4046C12.5726 14.8809 10.7185 15.7958 8.72698 15.9673C8.70698 15.9693 8.68631 15.97 8.66698 15.97Z"
                      fill="#2463EB"
                    />
                    <path
                      d="M7.99967 4C7.82286 4 7.65329 4.07024 7.52827 4.19526C7.40325 4.32029 7.33301 4.48986 7.33301 4.66667V8C7.33305 8.1768 7.40331 8.34634 7.52834 8.47133L9.52834 10.4713C9.65408 10.5928 9.82248 10.66 9.99728 10.6584C10.1721 10.6569 10.3393 10.5868 10.4629 10.4632C10.5865 10.3396 10.6566 10.1724 10.6581 9.9976C10.6596 9.8228 10.5924 9.6544 10.471 9.52867L8.66634 7.724V4.66667C8.66634 4.48986 8.5961 4.32029 8.47108 4.19526C8.34605 4.07024 8.17649 4 7.99967 4Z"
                      fill="#2463EB"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_17_15547">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <Paragraph size="M" weight="Regular">
                  Završava za:
                </Paragraph>
                <SaleCountdown date={sale.endsAt} />
              </div>
            </div>
          </Products>
        </Container>
      ))}
    </>
  );
};

export default ProductsSale;
