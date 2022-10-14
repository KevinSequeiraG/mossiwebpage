import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "../../components/footer";
import { NavBar } from "../../components/navbar";
import ProductCard from "../../components/productCard";

export default function ProductList() {
  const router = useRouter();
  const [categoryData, setCategoryData] = useState(router.query);
  useEffect(() => {
    console.log(categoryData)
    if (Object.entries(categoryData).length != 0) {
      localStorage.setItem("categoryDataMemory", JSON.stringify(categoryData));
    } else {
      setCategoryData(JSON.parse(localStorage.getItem("categoryDataMemory")));
    }
  }, []);
  return (
    <>
      <NavBar />

      <div className={`cardsContainer w-full h-full py-20 bgMain`}>
        <div className="text-left w-10/12 mx-auto mt-8 lg:mt-16">
          <h1 className="text-[22px] lg:text-[30px] font-bold text-white text-center">
            {categoryData.categoryName}
          </h1>
          <hr />
          <p className="text-white font-medium text-[15px] lg:text-[18px] text-justify mb-9 lg:mb-16 mt-4 leading-6 lg:leading-7">
            {categoryData.categoryDescription}
          </p>
        </div>
        <div className="w-10/12 h-11/12 top-40 inset-x-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mx-auto justify-items-center gap-y-12">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>

        <Footer />
      </div>
    </>
  );
}
