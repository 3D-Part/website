"use client";
import Container from "@/components/common/container/Container";
import Spinner from "@/components/common/spinner/Spinner";
import ProductGrid from "@/components/pages/shop/common/product-grid/ProductGrid";
import { useAppDispatch } from "@/redux/hooks";

import { ProductInterface } from "@/shared/interfaces/productsInterface";
import { favoritesService } from "@/shared/services/favoritesService";
import { useSession } from "next-auth/react";
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

        setData(data.rows);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, session]);

  if (isLoading || !session || !session.user) {
    return (
      <div className="flex items-center justify-center w-screen h-[calc(100vh-150px)] overflow-hidden">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full bg-neutral-900 ">
      <Container className="min-h-screen py-6 !max-w-auto bg-neutral-900 w-full px-9">
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
