import { database } from "../../lib/firebaseConfig";
import React, { useEffect, useState } from "react";
import CategoryCard from "../../components/categoryCard";
import Footer from "../../components/footer";
import { NavBar } from "../../components/navbar";
import ProductCard from "../../components/productCard";
import { collection, getDocs, query, where, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import "material-icons/iconfont/material-icons.css";
import { useUserAuth } from "../../lib/userAuthContext";
import NewProductModal from "../../components/newProductModal";

export default function ProductList() {
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const router = useRouter();
  const [categoryName, setCategoryName] = useState(router.asPath.split("/")[2]);
  const { loggedUser } = useUserAuth();
  const [showMaintenance, setShowMaintence] = useState(false);
  const [showNewProductModal, setShowNewProductModal] = useState(false);

  const getCategoryData = async () => {
    const categoryRef = collection(database, `mossy/data/category`);
    const q = query(categoryRef, where("categoryName", "==", categoryName));
    await getDocs(q).then((response) => {
      setCategoryData(
        response.docs.map((data) => {
          return { ...data.data(), id: data.id };
        })
      );
    });
  };

  const getProductData = async () => {
    const productRef = collection(database, `mossy/data/product`);
    const q = query(productRef, where("categoryName", "==", categoryName));
    await getDocs(q).then((response) => {
      setProductData(
        response.docs.map((data) => {
          return { ...data.data(), id: data.id };
        })
      );
    });
  };

  useEffect(() => {
    getCategoryData();
    getProductData();
  }, []);

  return (
    <>
      <NavBar />
      <div
        className={`cardsContainer w-full h-full pt-20 pb-36 relative bgMain min-h-screen`}
      >
        <div className="text-left w-10/12 mx-auto mt-8 lg:mt-16">
          <div className="relative">
            <h1 className="text-[22px] lg:text-[30px] font-bold text-white text-center">
              {categoryData[0]?.categoryName}
            </h1>
            {showMaintenance ? (
              <button
                className="text-[1rem] absolute right-28 top-0 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 mb-10 mr-2"
                onClick={() => {
                  setShowNewProductModal(true);
                }}
              >
                Crear nuevo producto
              </button>
            ) : null}
            {loggedUser.name ? (
              <button
                className="text-[1rem] absolute right-0 top-0 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 mb-10"
                onClick={() => {
                  setShowMaintence(!showMaintenance);
                }}
              >
                {showMaintenance ? "Finalizar" : "Mantenimiento"}
              </button>
            ) : null}
          </div>
          <hr />
          <p className="text-white font-medium text-[15px] lg:text-[18px] text-justify mb-9 lg:mb-16 mt-4 leading-6 lg:leading-7">
            {categoryData[0]?.categoryDescription}
          </p>
        </div>
        <div className="w-10/12 h-11/12 top-40 inset-x-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 mx-auto justify-items-center gap-y-12">
          {productData.map((data, i) => {
            return (
              <div key={i}>
                <ProductCard
                  getProductData={() => getProductData()}
                  showMaintenance={showMaintenance}
                  data={data}
                /></div>
            );
          })}
        </div>
        <div className="absolute w-full bottom-[75px]">
          <Footer />
        </div>
        {showNewProductModal ? (
          <div className="w-full h-screen bg-black bg-opacity-50 absolute top-0 z-[999] fixed">
            <NewProductModal
              closeModal={() => setShowNewProductModal(false)}
              getProductData={() => getProductData()}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
