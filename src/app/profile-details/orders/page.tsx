"use client";
import Container from "@/components/common/container/Container";
import Spinner from "@/components/common/spinner/Spinner";
import Heading2 from "@/components/common/text/heading/Heading2";
import { OrderType, ordersService } from "@/shared/services/orders";
import { FC, useEffect, useState } from "react";

const Coupons: FC = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await ordersService.fetchOrders();
        setOrders(res.rows);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetch();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-[calc(100vh-150px)] overflow-hidden">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full">
      <Container className="flex !max-w-auto flex-col items-center min-h-screen gap-8 py-6 bg-neutral-900 px-9 lg:items-start ">
        <Heading2 className="">
          {orders.map((order) => {
            return <div>{order.price}</div>;
          })}
        </Heading2>
      </Container>
    </div>
  );
};

export default Coupons;
