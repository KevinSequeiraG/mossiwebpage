import { database } from "../../lib/firebaseConfig";
import React, { useEffect, useState } from "react";
import CategoryCard from "../../components/categoryCard";
import Footer from "../../components/footer";
import { NavBar } from "../../components/navbar";
import ProductCard from "../../components/productCard";
import { collection, getDocs } from "firebase/firestore";

export default function ProductList() {
  const [productData, setProductData] = useState([]);

  const getProductData = async () => {
    const productRef = collection(database, `mossy/data/product`);
    await getDocs(productRef).then((response) => {
      setProductData(
        response.docs.map((data) => {
          return { ...data.data(), id: data.id };
        })
      );
    });
  };

  useEffect(() => {
    return () => {
      getProductData();
    };
  }, []);
  
  return (
    <>
      <NavBar />

      <div className={`cardsContainer w-full h-full py-20 bgMain`}>
        <div className="text-left w-10/12 mx-auto mt-8 lg:mt-16">
          <h1 className="text-[22px] lg:text-[30px] font-bold text-white text-center">
            NOMBRE DE LA CATEGORÍA
          </h1>
          <hr />
          <p className="text-white font-medium text-[15px] lg:text-[18px] text-justify mb-9 lg:mb-16 mt-4 leading-6 lg:leading-7">
            DESCRPCIÓN DE LA CATEGORÍA Nunc tellus nibh, interdum ac rhoncus et,
            mattis egestas mauris. Sed et venenatis nisl. Morbi augue velit,
            viverra non dignissim id, commodo nec risus. Nunc tellus nibh,
            interdum ac rhoncus et, mattis egestas mauris. Sed et venenatis
            nisl. Morbi augue velit, viverra non dignissim id, commodo nec
            risus.
          </p>
        </div>
        <div className="w-10/12 h-11/12 top-40 inset-x-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mx-auto justify-items-center gap-y-12">
          {productData.map((data) => {
            return <ProductCard data={data} />;
          })}
        </div>

        <Footer />
      </div>
    </>
  );
}
