
'use client'

import Products from "@/components/common/products/Products";
import Heading2 from "@/components/common/text/heading/Heading2";
import Container from "@/components/common/container/Container";
import { ProductPaginatedInterface, productsServices } from "../../../../../services/productsServices";
import { useEffect, useState } from "react";

const ProductsRecommended = () => {
  const [data, setData] = useState<any>();

  const fetchData = async () => {
    const resData = await productsServices.getRecommended();

    setData(resData)
  }
  useEffect(() => {
    fetchData();
  }, [])

  if (!data) return null;

  return (
    <Container className="w-full mb-[60px] lg:mb-24 lg:px-9">
      {data && data.rows.length !== 0 && (
        <Products
          products={data.rows}
          className="mt-3 "
          animationVariants={{
            initial: { opacity: 0, scale: 0.7, x: -30 },
            animate: { opacity: 1, scale: 1, x: 0 },
          }}
          reverseDirection={true}
        >
          <div className="flex flex-col w-full px-4 lg:px-0">
            <Heading2> Super ponuda </Heading2>
          </div>
        </Products>
      )}
    </Container>
  );
};

export default ProductsRecommended;
