import React from "react";
import Container from "../components/ui/container";
import { getBillboard } from "@/actions/get-billboard";
import Billboard from "../components/Billboard";
import ProductList from "../components/ProductList";
import getProducts from "@/actions/get-products";

export const revalidate = 0;

const HomePage = async () => {
  const billboard = await getBillboard("2a9e6d3e-4295-4bd7-a5e7-f9fa2fdfacf2");
  const products = await getProducts({ isFeatured: true });

  return (
    <Container>
      <div className=" space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className=" flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
