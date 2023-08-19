"use client";
import React, { useEffect, useState } from "react";
import Filters from "./filters/Filters";
import Heading2 from "@/components/common/text/heading/Heading2";
import ProductGrid from "./product-grid/ProductGrid";
import {
  ProductPaginatedInterface,
  productsServices,
} from "../../../../../../services/productsServices";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const CategoryProducts: React.FC<{ categoryId: string }> = ({ categoryId }) => {
  //TODO: Redux this
  const [initialFetch, setInitialFetch] = useState(true);
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [field, setField] = useState<"name" | "price" | null>(null);
  const [order, setOrder] = useState<"ASC" | "DESC" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ProductPaginatedInterface>({
    count: 0,
    rows: [],
  });

  const params = useParams();
  const {} = useRouter();
  const searchParams = useSearchParams();

  let manufacturerId = searchParams.get("manufacturerId");

  useEffect(() => {
    const fetch = async () => {
      const x = await productsServices.getAllProducts({
        categoryId,
        price: { gt: priceMin, lt: priceMax },
        field,
        order,
        manufacturerId,
      });
      setIsLoading(false);
      setData(x);
      return x;
    };
    setIsLoading(true);

    const delayDebounceFn = setTimeout(
      () => {
        fetch();
        setInitialFetch(false);
      },
      initialFetch ? 0 : 500
    );

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceMin, priceMax, params.slug, manufacturerId]);

  useEffect(() => {
    if (initialFetch) return;
    const fetch = async () => {
      const x = await productsServices.getAllProducts({
        slug: params.slug + "",
        price: { gt: priceMin, lt: priceMax },
        field,
        order,
        manufacturerId,
      });
      setIsLoading(false);
      setData(x);
      return x;
    };
    setIsLoading(true);

    fetch();
    setInitialFetch(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, field]);

  return (
    <>
      <Filters
        priceMin={priceMin}
        priceMax={priceMax}
        setPriceMax={(x) => {
          setPriceMax(x);
        }}
        setPriceMin={(x) => {
          setPriceMin(x);
        }}
        field={field}
        order={order}
        setField={setField}
        setOrder={setOrder}
        isLoading={isLoading}
      />

      <Heading2 className="my-8">
        Proizvodi <span className="text-primary-500">({data.count})</span>
      </Heading2>

      {isLoading ? (
        <div className="flex items-center justify-center ">
          <span className="loader"></span>
        </div>
      ) : (
        <ProductGrid productList={data.rows} />
      )}
    </>
  );
};

export default CategoryProducts;
