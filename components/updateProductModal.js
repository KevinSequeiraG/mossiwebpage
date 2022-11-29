import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { database } from "../lib/firebaseConfig";
import Swal from "sweetalert2";
import ImageUplaod from "./imageUpload";

const UpdateProductModal = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [name, setName] = useState(props.data.name);
  const [description, setDescription] = useState(props.data.description);
  const [categoryId, setCategoryId] = useState(props.data.categoryId);
  const [categoryName, setCategoryName] = useState();
  const [price, setPrice] = useState(props.data.price);
  const [categories, setCategories] = useState();
  const [productImage, setProductImage] = useState(props.data.productImgUrl);
  const [productImageUrl, setProductImageUrl] = useState(
    props.data.productImgUrl
  );
  const getCategoriesData = async () => {
    const categoriesRef = collection(database, `mossy/data/category`);
    await getDocs(categoriesRef).then((response) => {
      setCategories(
        response.docs.map((data) => {
          return { ...data.data(), id: data.id };
        })
      );
    });
  };
  useEffect(() => {
    console.log(props.data);
    getCategoriesData();
  }, []);

  const onSubmit = (data) => {
    product(data);
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const product = (data) => {
    let productToEdit = doc(database, `mossy/data/product`, props.productId);
    updateDoc(productToEdit, {
      categoryId: data.categoryName,
      description: data.description,
      name: data.name,
      price: data.price,
      productImgUrl: `${productImageUrl != undefined ? productImageUrl : ""}`,
    })
      .then(() => {
        props.closeModal();
        Toast.fire({
          icon: "success",
          title: `Categoria actualizada`,
        });
        props.getProductData();
      })
      .catch((err) => {
        console.log(err);
        Toast.fire({
          icon: "success",
          title: err,
        });
      });
  };

  return (
    <div className="w-5/6 md:w-[40%] h-auto bg-gray-800 border-2 border-gray-300 absolute top-1/2 left-1/2 z-[1000] translate-x-[-50%] translate-y-[-50%] rounded-lg py-5">
      <button
        onClick={() => {
          props.closeModal();
        }}
        className="absolute -right-6 lg:-right-10 -top-6 lg:-top-10 bg-red-500 text-white rounded-[50%] border border-white w-[3rem] lg:w-[4rem] z-[9999] h-[3rem] lg:h-[4rem] mx-2 hover:bg-red-800"
      >
        <span className="material-icons mt-1 !text-[30px] lg:!text-[50px]">
          close
        </span>
      </button>
      <div>
        <p className="text-center text-[18px] lg:text-[1.5rem] text-white">
          Acá actualizás un producto
        </p>
        <div className="w-5/6 lg:w-3/6 mx-auto h-20 lg:h-96">
          <ImageUplaod
            containerClassName={
              "flex justify-center items-center w-full h-20 lg:h-96 bg-[#F3F4F5] rounded-[10px] dark:hover:bg-bray-800 hover:bg-gray-200 "
            }
            imageUrl={productImageUrl}
            setImageValue={setProductImage}
            setImageUrl={setProductImageUrl}
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-4/5 mx-auto mt-8"
        >
          <div className="flex flex-col lg:flex-row justify-between my-2">
            <label className="text-white">Categoría de producto</label>
            <select
              // defaultChecked={categoryId}
              name="categories"
              id="categories"
              className="rounded w-full lg:w-[196px] px-2"
              {...register("categoryName", { required: true, maxLength: 80 })}
            >
              {categories?.map((categorie) => {
                return (
                  <option
                    onClick={() => setCategoryName(categorie.id)}
                    key={categorie.id}
                    value={categorie.id}
                  >
                    {categorie.categoryName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col lg:flex-row justify-between my-2">
            <label className="text-white">Nombre de producto</label>
            <input
              defaultValue={name}
              className="rounded px-2"
              type="text"
              placeholder="Nombre"
              {...register("name", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="flex flex-col lg:flex-row justify-between my-2">
            <label className="text-white">Precio de producto</label>
            <input
              defaultValue={price}
              className="rounded px-2"
              type="number"
              placeholder="Precio"
              min="1"
              step="any"
              {...register("price", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="flex flex-col lg:flex-row justify-between my-2">
            <label className="text-white">Descripción de producto</label>
            <input
              defaultValue={description}
              className="rounded px-2"
              type="textarea"
              placeholder="Descripción"
              {...register("description", { required: true, maxLength: 100 })}
            />
          </div>
          {/* <input value={props.productId} className='hidden' type="textarea" placeholder="id" {...register("id", { required: true, maxLength: 100 })} /> */}
          <input
            className="text-[1rem] mt-4 lg:mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700"
            type="submit"
            value={"Actualizar producto"}
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
