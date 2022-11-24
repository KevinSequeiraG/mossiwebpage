import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { database } from "../lib/firebaseConfig";
import Swal from "sweetalert2";
import ImageUplaod from "./imageUpload";
import SelectIngredientsModal from "./selectIngredients";


const NewProductModal = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [categoryName, setCategoryName] = useState();
  const [price, setPrice] = useState();
  const [productImage, setProductImage] = useState(null);
  const [productImageUrl, setProductImageUrl] = useState();
  const [categories, setCategories] = useState()
  const [ingredientsToProduct, setIngredientsToProduct] = useState([])

  const [showSelectIngredientsModal, setShowSelectIngredientsModal] =
    useState(false);
  const onSubmit = (data) => {
    createProduct(data);
  };

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

  const createProduct = (data) => {
    const productRef = collection(database, `mossy/data/product`);
    addDoc(productRef, {
      categoryName: data.categoryName,
      description: data.description,
      name: data.name,
      price: data.price,
      productImgUrl: `${productImageUrl != undefined ? productImageUrl : ""}`,
      ingredientsForProduct: ingredientsToProduct
    })
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "Prodcuto creado con éxito", //`${t("toastCreateSuccess")}`
        });
      })
      .then(props.closeModal(), props.getProductData())
      .catch((err) => {
        console.error(err);
        Toast.fire({
          icon: "error",
          title: `${t("toastCreateFail")}`,
        });
      });
  };

  useEffect(() => {
    getCategoriesData()
  }, [])


  return (
    <>
      <div className="w-[40%] h-auto bg-gray-800 border-2 border-gray-300 absolute top-1/2 left-1/2 z-[1000] translate-x-[-50%] translate-y-[-50%] rounded-lg py-5">
        <button
          onClick={() => {
            props.closeModal();
          }}
          className="absolute -right-10 -top-10 bg-red-500 text-white rounded-[50%] border border-white w-[4rem] z-[9999] h-[4rem] mx-2 hover:bg-red-800"
        >
          <span className="material-icons mt-1 !text-[50px]">close</span>
        </button>
        <div>
          <p className="text-center text-[1.5rem] text-white">
            Acá agregas un nuevo producto
          </p>
          <div className="w-3/6 mx-auto h-96">
            <ImageUplaod
              containerClassName={
                "flex justify-center items-center w-full h-96 bg-[#F3F4F5] rounded-[10px] dark:hover:bg-bray-800 hover:bg-gray-200 "
              }
              setImageValue={setProductImage}
              setImageUrl={setProductImageUrl}
              imageUrl={productImageUrl}
            />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-4/5 mx-auto mt-8"
          >
            <div className="flex justify-between my-2">
              <label className="text-white" for="categories">Categoría del producto</label>

              <select name="categories" id="categories" className="rounded w-[181px]" {...register("categoryName", { required: true, maxLength: 80 })}>
                {categories?.map(categorie => {
                  return (
                    <option
                      onClick={() => setCategoryName(categorie.categoryName)}
                      
                      key={categorie.id}
                      value={categorie.categoryName}>
                      {categorie.categoryName}</option>)
                })}
              </select>
            </div>
            <div className="flex justify-between my-2">
              <label className="text-white">Nombre del producto</label>
              <input
                className="rounded"
                type="text"
                placeholder="Nombre"
                {...register("name", { required: true, maxLength: 80 })}
              />
            </div>
            <div className="flex justify-between my-2">
              <label className="text-white">Precio del producto</label>
              <input
                className="rounded"
                type="number"
                placeholder="Precio"
                min="1"
                step="any"
                {...register("price", { required: true, maxLength: 80 })}
              />
            </div>
            <div className="flex justify-between my-2">
              <label className="text-white">Descripción del producto</label>
              <input
                className="rounded"
                type="textarea"
                placeholder="Descripción"
                {...register("description", {
                  required: true,
                  maxLength: 100,
                })}
              />
            </div>
            <div className="flex justify-between my-2">
              <label className="text-white">Asociar ingredientes</label>
              <input
                onClick={() => {
                  setShowSelectIngredientsModal(true);
                }}
                className="text-[1rem] px-2 py-1 bg-green-500 text-white rounded-xl hover:bg-green-700 "
                type="button"
                value={"+ Añadir ingredientes"}
              />
            </div>
            <input
              className="text-[1rem] mt-2 lg:mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 mr-2"
              type="submit"
              value={"Guardar producto"}
            />
          </form>
        </div>
      </div>
      {showSelectIngredientsModal ? <SelectIngredientsModal closeModal={setShowSelectIngredientsModal} setIngredientsToProduct={setIngredientsToProduct} /> : null}
    </>
  );
};

export default NewProductModal;
