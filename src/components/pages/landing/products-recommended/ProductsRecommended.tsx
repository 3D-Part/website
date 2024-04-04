import Products from "@/components/common/products/Products";
import Heading2 from "@/components/common/text/heading/Heading2";
import Container from "@/components/common/container/Container";
import { productsServices } from "../../../../../services/productsServices";

const ProductsRecommended = async () => {
  const data = await productsServices.getRecommended();

  return (
    <Container className="w-full mb-[60px] lg:mb-24 lg:px-9">
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
          <Heading2> Izdvojili smo za Vas </Heading2>
        </div>
      </Products>
    </Container>
  );
};

export default ProductsRecommended;
