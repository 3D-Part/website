"use client";

import Products from "@/components/common/products/Products";
import Heading2 from "@/components/common/text/heading/Heading2";
import Paragraph from "@/components/common/text/paragraph/Paragraph";
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
                  {/*Proizvodi na akciji */}{sale.name} {/*&& `- ${sale.name}`*/} <span className="text-primary-500">({sale.products.length})</span>
                </Heading2>
                {
                  // <Link href={`/shop/all?sale=${sale.id}`} prefetch>
                  <Button text="Pogledaj sve" size="M" type="secondary" onClick={() => { navigate.push(`/shop/all?sale=${sale.id}`) }} />
                  // </Link>
                }
              </div>
            </div>
          </Products>
        </Container>
      ))}
    </>
  );
};

export default ProductsSale;
