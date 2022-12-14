import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
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
  const [categories, setCategories] = useState();
  const [ingredientsToProduct, setIngredientsToProduct] = useState([]);
  const [ingredientsForProduct, setIngredientsForProduct] = useState([]);
  const [totalOfProduct, setTotalOfProduct] = useState(0)
  var allIngredients = []

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
      categoryId: data.categoryName,
      description: data.description,
      name: data.name,
      totalPrice: totalOfProduct,
      creationPrice: data.creationPrice,
      price: data.price,
      productImgUrl: `${productImageUrl != undefined ? productImageUrl : ""}`,
      ingredientsForProduct: ingredientsToProduct,
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

  const getPrice = () => {
    var total = 0
    ingredientsForProduct.map(ingredientInfo => {
      ingredientsToProduct.map(ingredient => {
        if (ingredientInfo.id == ingredient.id) {
          total += (ingredientInfo.ingredientPrice * ingredient.quantity)
        }
      })
    })
    document.getElementById("priceOfProduct").value = total
    var priceOfCreation = parseFloat(document.getElementById("priceOfCreation").value)
    var ingredientsAndCreation = total + priceOfCreation

    var totalWithIva = (ingredientsAndCreation+(ingredientsAndCreation * 0.13))
    setTotalOfProduct(totalWithIva)
  }

  const getIngredients = async (uid) => {
    console.log(uid);
    let ingredientsRef = doc(database, `mossy/data/ingredient`, uid);

    await getDoc(ingredientsRef).then(async (ingredient) => {
      var ingredient = { ...ingredient.data(), id: ingredient.id };
      //console.log(ingredient);
      if (!allIngredients.includes(ingredient)) {
        allIngredients.push(ingredient)
      }
    });
    console.log(allIngredients);
    setIngredientsForProduct(allIngredients);
  };

  const updateTotalOfProductFromCreation = function (e) {
    //result.innerHTML = e.target.value;
    console.log(e.target.value);

    var precioDeProducto = document.getElementById('priceOfProduct').value
    var precioDeCreacion = e.target.value

    if (precioDeProducto == 0) {
      setTotalOfProduct((parseFloat(precioDeCreacion) + (parseFloat(precioDeCreacion) * 0.13)))
    } else {
      var total = (parseFloat(precioDeCreacion) + parseFloat(precioDeProducto))
      setTotalOfProduct(total + (total * 0.13))
    }
  }

  const updateTotalOfProductFromPrice = function (e) {
    var precioDeCreacion = document.getElementById('priceOfCreation').value
    var precioDeProducto = e.target.value

    if (precioDeCreacion == 0) {
      setTotalOfProduct(precioDeProducto)
    } else {
      var total = (parseFloat(precioDeProducto) + parseFloat(precioDeCreacion))
      setTotalOfProduct(total)
    }
  }

  useEffect(() => {
    getCategoriesData();

    var priceOfCreationInput = document.getElementById('priceOfCreation');
    priceOfCreationInput.addEventListener('input', updateTotalOfProductFromCreation);
    priceOfCreationInput.addEventListener('propertychange', updateTotalOfProductFromCreation);

    var priceOfProductInput = document.getElementById('priceOfProduct');
    priceOfProductInput.addEventListener('input', updateTotalOfProductFromPrice);
    priceOfProductInput.addEventListener('propertychange', updateTotalOfProductFromPrice);
  }, []);

  useEffect(() => {
    ingredientsToProduct.map((ingredientUid, i) => {
      console.log(ingredientUid);
      getIngredients(ingredientUid.id);
    });
  }, [ingredientsToProduct])

  useEffect(() => {
    getPrice()
  }, [allIngredients])



  return (
    <>
      <div className="w-5/6 md:w-[60%] h-auto bg-gray-800 border-2 border-gray-300 absolute top-1/2 left-1/2 z-[1000] translate-x-[-50%] translate-y-[-50%] rounded-lg py-5">
      <button
        onClick={() => {
          props.closeModal();
        }}
        className="absolute -right-5 -top-5 lg:-right-10 lg:-top-10 bg-red-500 text-white rounded-[50%] border border-white w-[2rem] lg:w-[4rem] z-[9999] h-[2rem] lg:h-[4rem] mx-2 hover:bg-red-800"
      >
        <span className="material-icons !text-[15px] mt-1 lg:!text-[50px]">
          close
        </span>
      </button>
        <div className="max-h-96 flex-col overflow-y-auto overflow-x-hidden scrollbar">
          <p className="text-center text-[18px] lg:text-[1.5rem] text-white">
            Acá agregas un nuevo producto
          </p>
          <div className="w-5/6 lg:w-3/6 mx-auto h-20 lg:h-96">
            <ImageUplaod
              containerClassName={
                "flex justify-center items-center w-full h-20 lg:h-96 bg-[#F3F4F5] rounded-[10px] dark:hover:bg-bray-800 hover:bg-gray-200 "
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
            <div className="flex flex-col lg:flex-row justify-between my-2">
              <label className="text-white" htmlFor="categories">
                Categoría del producto
              </label>

              <select
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
              <label className="text-white">Nombre del producto</label>
              <input
                className="rounded px-2"
                type="text"
                placeholder="Nombre"
                {...register("name", { required: true, maxLength: 80 })}
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-between my-2">
              <label className="text-white">Costo por fabricación</label>
              <input
                id="priceOfCreation"
                className="rounded px-2"
                type="number"
                placeholder="0"
                min="1"
                step="any"
                {...register("creationPrice", { required: true, maxLength: 80 })}
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-between my-2">
              <label className="text-white">Precio del producto (auto)</label>
              <input
                id="priceOfProduct"
                className="rounded px-2"
                type="number"
                placeholder="0"
                min="1"
                step="any"
                {...register("price", { required: true, maxLength: 80 })}
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-between my-2">
              <label className="text-white">Precio final del producto (auto)</label>
              <input
                id="totalPriceOfProduct"
                className="rounded px-2"
                type="number"
                placeholder="0"
                min="1"
                step="any"
                value={totalOfProduct}
                {...register("totalPrice", { required: true, maxLength: 80 })}
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-between my-2">
              <label className="text-white">Descripción del producto</label>
              <input
                className="rounded px-2"
                type="textarea"
                placeholder="Descripción"
                {...register("description", {
                  required: true,
                  maxLength: 100,
                })}
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-between my-2">
              <label className="text-white">Asociar ingredientes</label>
              <input
                onClick={() => {
                  document.getElementById("priceOfProduct").value = 0;
                  setShowSelectIngredientsModal(true);
                }}
                className="text-[1rem] px-2 py-1 bg-green-600 text-white rounded-xl hover:bg-green-700 hover:cursor-pointer"
                type="button"
                value={"+ Asociar ingredientes"}
              />
            </div>
            <input
              className="text-[1rem] mt-8 lg:mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700"
              type="submit"
              value={"Guardar producto"}
            />
          </form>
        </div>
      </div>
      {showSelectIngredientsModal ? (
        <SelectIngredientsModal
          closeModal={setShowSelectIngredientsModal}
          setIngredientsToProduct={setIngredientsToProduct}
        />
      ) : null}
    </>
  );
};

export default NewProductModal;
