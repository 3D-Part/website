"use client";
import Button from "@/components/common/button/Button";
import Container from "@/components/common/container/Container";
import Input from "@/components/common/input/Input";
import Spinner from "@/components/common/spinner/Spinner";
import Heading2 from "@/components/common/text/heading/Heading2";
import Heading4 from "@/components/common/text/heading/Heading4";
import { notify } from "@/components/common/toast/Toastify";
import ProductGrid from "@/components/pages/shop/category/category-products/product-grid/ProductGrid";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { isUserVerifiedSelector } from "@/redux/slices/ui/uiSelectors";
import {
  changeFavoriteProducts,
  changeIsGlobalLoading,
  changeIsUserVerified,
} from "@/redux/slices/ui/uiSlice";
import JWT from "@/shared/helper/jwtToken";
import { ProductInterface } from "@/shared/interfaces/productsInterface";
import AuthAPI from "@/shared/services/auth";
import { favoritesService } from "@/shared/services/favoritesService";
import { userService } from "@/shared/services/userService";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

const FavoritesPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ProductInterface[]>([]);

  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoading(true);
      try {
        const data = await favoritesService.fetchFavorites();

        if (!data) {
          return;
        }

        setData([
          ...data.rows.map((x) => {
            return { ...x, images: [] };
          }),
        ]);
      } catch (error: any) {
        console.error("Error ", error);
      }
      setIsLoading(false);
    };

    if (session && session.user) {
      fetchFavorites();
    }

    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [dispatch, session]);

  if (isLoading || !session || !session.user) {
    return (
      <div className="flex items-center justify-center w-screen h-[calc(100vh-150px)] overflow-hidden">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full">
      <Container className="min-h-screen py-6 !max-w-auto bg-neutral-900 px-9">
        <div className="flex flex-col items-center ">
          <h1 className="mb-8 text-4xl font-semibold text-center">
            Omiljeni proizvodi
          </h1>
          <ProductGrid productList={data} />
        </div>
      </Container>
    </div>
  );
};

export default FavoritesPage;
