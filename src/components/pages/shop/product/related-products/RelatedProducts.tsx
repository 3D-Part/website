import Container from "@/components/common/container/Container";
import Products from "@/components/common/products/Products";
import Heading2 from "@/components/common/text/heading/Heading2";
import React from "react";
import { productsServices } from "../../../../../../services/productsServices";
import { isErrorObject } from "@/shared/interfaces/errorInterface";
import { notFound } from "next/navigation";

const RelatedProducts: React.FC<{
  categoryId: string;
  productId: string;
}> = async ({ categoryId, productId }) => {
  const data = await productsServices.getAllProducts({
    categoryId: categoryId,
  });

  if (isErrorObject(data)) {
    if (data.key === "NOT_FOUND_ERROR") {
      notFound();
    } else {
      // Handle other error cases if needed
    }
  }

  console.log(data.rows);
  const relatedData = data.rows.filter((x) => {
    if (x.id !== productId) {
      return x;
    }
  });

  return (
    <>
      {relatedData.length ? (
        <Container className="w-full mb-[60px]">
          <Products
            products={relatedData}
            className="mt-3 "
            animationVariants={{
              initial: { opacity: 0, scale: 0.7, x: -30 },
              animate: { opacity: 1, scale: 1, x: 0 },
            }}
          >
            <div className="flex flex-col w-full px-4 lg:px-0">
              <Heading2>Povezani proizvodi </Heading2>
            </div>
          </Products>
        </Container>
      ) : (
        <></>
      )}
    </>
  );
};

export default RelatedProducts;
