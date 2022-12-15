import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { database } from "../lib/firebaseConfig";
import Swal from "sweetalert2";
import ImageUplaod from "./imageUpload";
import SelectIngredientsModal from "./selectIngredients";

const UpdateProductModal = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  var allIngredients = []
  const [ingredientsForProduct, setIngredientsForProduct] = useState([]);
  const [name, setName] = useState(props.data.name);
  const [description, setDescription] = useState(props.data.description);
  const [categoryId, setCategoryId] = useState(props.data.categoryId);
  const [categoryName, setCategoryName] = useState();
  const [priceOfCreation, setPriceOfCreation] = useState(props.data.creationPrice);
  const [priceOfProduct, setPriceOfProduct] = useState(props.data.price);
  const [totalPriceOfProduct, setTotalPriceOfProduct] = useState(props.data.totalPrice);
  const [categories, setCategories] = useState();
  const [productImage, setProductImage] = useState(props.data.productImgUrl);
  //const [totalOfProduct, setTotalOfProduct] = useState(0)
  const [ingredientsToProduct, setIngredientsToProduct] = useState(props.data.ingredientsForProduct);
  const [productImageUrl, setProductImageUrl] = useState(
    props.data.productImgUrl
  );
  const [showSelectIngredientsModal, setShowSelectIngredientsModal] = useState(false);

  const [ingredientesWithQuantity, setIngredientesWithQuantity] = useState(props.data.ingredientsForProduct)

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

  const getIngredientsP = () => {
    props.data.ingredientsForProduct?.map((ingredientUid, i) => {
      console.log(ingredientUid);
      getIngredients(ingredientUid.id);
    });
  }

  useEffect(() => {
    console.log(props.data);
    getCategoriesData();
    getIngredientsP()

    var priceOfCreationInput = document.getElementById('priceOfCreation');
    priceOfCreationInput.addEventListener('input', updateTotalOfProductFromCreation);
    priceOfCreationInput.addEventListener('propertychange', updateTotalOfProductFromCreation);

    // var priceOfProductInput = document.getElementById('priceOfProduct');
    // priceOfProductInput.addEventListener('input', updateTotalOfProductFromPrice);
    // priceOfProductInput.addEventListener('propertychange', updateTotalOfProductFromPrice);
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
      creationPrice: priceOfCreation,
      totalPrice: totalPriceOfProduct,
      price: priceOfProduct,
      ingredientsForProduct: ingredientsToProduct,
      productImgUrl: `${productImageUrl != undefined ? productImageUrl : ""}`,
    })
      .then(() => {
        props.closeModal();
        Toast.fire({
          icon: "success",
          title: `Producto actualizado`,
        });
        props.getProductData();
        window.location.reload(true);
      })
      .catch((err) => {
        console.log(err);
        Toast.fire({
          icon: "success",
          title: err,
        });
      });
  };

  const updateTotalOfProductFromCreation = function (e) {
    //result.innerHTML = e.target.value;
    console.log(e.target.value);

    var precioDeProducto = document.getElementById('priceOfProduct').value
    var precioDeCreacion = e.target.value

    if (precioDeProducto == 0) {
      setTotalPriceOfProduct((parseFloat(precioDeCreacion) + (parseFloat(precioDeCreacion) * 0.13)))
    } else {
      var total = (parseFloat(precioDeCreacion) + parseFloat(precioDeProducto))
      setTotalPriceOfProduct(total + (total * 0.13))
    }
  }

  // const updateTotalOfProductFromPrice = function (e) {
  //   console.log(e.target.value);
  //   var precioDeCreacion = document.getElementById('priceOfCreation').value
  //   var precioDeProducto = e.target.value

  //   if (precioDeCreacion == 0) {
  //     setTotalPriceOfProduct(precioDeProducto)
  //   } else {
  //     var total = (parseFloat(precioDeProducto) + parseFloat(precioDeCreacion))
  //     setTotalPriceOfProduct(total)
  //   }
  // }

  useEffect(() => {
    var newArray = []
    var priceOfProds = 0
    ingredientsToProduct.map(ingredient => {
      ingredientsForProduct.map(ingredient2 => {
        if (ingredient.id == ingredient2.id) {
          var ingrendientData = { ...ingredient2, quantity: ingredient.quantity }
          newArray.push(ingrendientData)
        }
      })
    })
    newArray.map(ingredient => {
      priceOfProds += (parseFloat(ingredient.ingredientPrice) * ingredient.quantity)
    })

    setIngredientesWithQuantity(newArray)
    setPriceOfProduct(priceOfProds)

    var total = (parseFloat(priceOfProds) + parseFloat(priceOfCreation))
    var totalWithIva = total + (total*0.13)
    setTotalPriceOfProduct(totalWithIva)
    console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZ", newArray);

  }, [ingredientsForProduct])

  const handleSetIngredientsToProduct = (lista) => {
    console.log("lista", lista);
    setIngredientsToProduct(lista)

    lista.map((ingredientUid, i) => {
      console.log(ingredientUid);
      getIngredients(ingredientUid.id);
    });
  }


  // useEffect(() => {
  //   console.log("ingre", ingredientsToProduct);
  //   //console.log(object);

  //   ingredientsToProduct.map((ingredientUid, i) => {
  //     console.log(ingredientUid);
  //     getIngredients(ingredientUid.id);
  //   });

  // }, [ingredientsToProduct])


  return (
    <>
      <div className="w-5/6 md:w-[40%] h-auto bg-gray-800 border-2 border-gray-300 absolute top-1/2 left-1/2 z-[1000] translate-x-[-50%] translate-y-[-50%] rounded-lg py-5">
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
                      selected={categorie.id==props.data.categoryId?true:false}
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
              <label className="text-white">Costo por fabricación</label>
              <input
                defaultValue={priceOfCreation}
                id="priceOfCreation"
                className="rounded px-2"
                type="number"
                placeholder="0"
                //min="1"
                step="any"
                {...register("creationPrice", { required: false, maxLength: 80 })}
              />
            </div>
            <div className="flex flex-col lg:flex-row justify-between my-2">
              <label className="text-white">Precio del producto (auto)</label>
              <input
                defaultValue={priceOfProduct}
                value={priceOfProduct}
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
                defaultValue={totalPriceOfProduct}
                value={totalPriceOfProduct}
                id="totalPriceOfProduct"
                className="rounded px-2"
                type="number"
                placeholder="0"
                min="1"
                step="any"
                {...register("totalPrice", { required: true, maxLength: 80 })}
              />
            </div>
            {/* <div className="flex flex-col lg:flex-row justify-between my-2">
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
          </div> */}
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
            <div className=" lg:flex-row justify-between my-2 text-white">
              <div className="">
                <label className="text-white">Lista de ingredientes</label>
                <br />
                <button
                  className="hover:bg-yellow-500 bg-yellow-600 px-2 py-1 border border-white rounded-lg my-2 text-[14px]"
                  onClick={() => { event.preventDefault(); setShowSelectIngredientsModal(true) }}
                >
                  Editar lista de ingredientes
                </button>
              </div>
              <div className="flex flex-row">
                <div className="mr-3">
                  <h1>Nombre</h1>
                  {ingredientesWithQuantity.map(product => {
                    return (<h1 key={product.id}>{product.ingredientName}</h1>)
                  })}
                </div>
                <div className="ml-3">
                  <h1>Cantidad</h1>
                  {ingredientesWithQuantity.map(product => {
                    return (<h1 key={product.id}>{product.quantity}</h1>)
                  })}
                </div>
              </div>
              {/* <input
              defaultValue={description}
              className="rounded px-2"
              type="textarea"
              placeholder="Descripción"
              {...register("description", { required: true, maxLength: 100 })}
            /> */}
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
      {showSelectIngredientsModal ? (
        <SelectIngredientsModal
          closeModal={setShowSelectIngredientsModal}
          setIngredientsToProduct={handleSetIngredientsToProduct}
        />
      ) : null}
    </>
  );
};

export default UpdateProductModal;
