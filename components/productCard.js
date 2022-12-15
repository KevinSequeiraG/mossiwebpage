import { useEffect, useState } from "react";
import ProductDetailModal from "./productDetailModal";
import { database } from "../lib/firebaseConfig";
import {
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import UpdateProductModal from "./updateProductModal";

const ProductCard = (props) => {
  const [closeModal, setCloseModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [ingredientsForProduct, setIngredientsForProduct] = useState([]);
  const [totalOfProduct, setTotalOfProduct] = useState(0)
  const [ingredientsToProduct, setIngredientsToProduct] = useState(props.data.ingredientsForProduct);
  const [ingredientesWithQuantity, setIngredientesWithQuantity] = useState(props.data.ingredientsForProduct)
  var allIngredients = []

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

  const calcPrice = () => {
    console.log(props.data
    );

    props.data.ingredientsForProduct.map((ingredientUid, i) => {
      console.log(ingredientUid);
      getIngredients(ingredientUid.id);
    });
  }

  const deleteCategory = (id) => {
    let categoryToDelete = doc(database, `mossy/data/product`, id);

    deleteDoc(categoryToDelete)
      .then(() => {
        props.getProductData()
        Toast.fire({
          icon: "success",
          title: `producto eliminado con éxito`,
        })
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: "No se puede eliminar",
        });
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

  useEffect(() => {
    calcPrice()
  }, [])

  // useEffect(() => {
  //   ingredientsForProduct.map(ingrediente => {
  //     ingrediente.ingredientPrice
  //   })
  // }, [ingredientsForProduct])

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
    //setPriceOfProduct(priceOfProds)

    var total = (parseFloat(priceOfProds) + parseFloat(props.data.creationPrice))
    var totalWithIva = total + (total * 0.13)
    setTotalOfProduct(totalWithIva)
    console.log("ZZZZZZZZZZZZZZZZZZZZZZZZZZ", newArray);
    
    console.log("total?", totalOfProduct);

  }, [ingredientsForProduct])

  return (
    <>
      <div className="w-full max-w-[300px] min-w-[300px] lg:!min-w-[389px] lg:!max-w-[389px] bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <img
            className="rounded-[10px] object-cover min-w-full h-56 max-h-[14rem] min-h-[14rem]"
            src={props.data.productImgUrl ? props.data.productImgUrl : "https://cdn.shopify.com/s/files/1/0229/0839/files/Untitled_design__1.png?2393&format=jpg&quality=90"}
            alt="product image"
          />
        </div>

        <div className="px-5 pb-5">
          <h5 className="text-[16px] lg:text-[18px] font-semibold tracking-tight text-gray-900 dark:text-white truncate">
            {props.data.name}
          </h5>
          <h5 className="text-[12px] lg:[14px] font-semibold tracking-tight text-gray-900 dark:text-white my-1">
            {props.data.description}
          </h5>

          <div className="flex justify-between items-center">
            <span className="text-[14px] lg:text-[15px] font-bold text-gray-900 dark:text-white">
              ₡ {totalOfProduct}
            </span>
            <div
              onClick={() => {
                setCloseModal(true);
              }}
              className="text-white font-semibold detailsButtonBG focus:ring-4 focus:outline-none rounded-lg text-[14px] px-5 py-2 text-center cursor-pointer"
            >
              Detalles
            </div>
          </div>
          <div className="mx-auto w-min flex mt-2">
            {props.showMaintenance ? <button onClick={() => { deleteCategory(props.data.id) }} className="bg-red-500 text-white rounded-[50%] border border-white w-[2rem] h-[2rem] mx-2 hover:bg-red-800 flex items-center justify-center">
              <span className="material-icons">
                close
              </span>
            </button> : null}
            {props.showMaintenance ? <button className="bg-yellow-500 text-white rounded-[50%] border border-white w-[2rem] h-[2rem] mx-2 hover:bg-yellow-600 flex items-center justify-center" onClick={() => setShowUpdateModal(true)}>
              <span className="material-icons">
                edit
              </span>
            </button> : null}
          </div>
        </div>
      </div>
      {closeModal ? (
        <div className="w-full h-screen bg-black bg-opacity-50 absolute left-0 top-0 z-[999]">
          <ProductDetailModal data={props.data} closeModal={() => setCloseModal(false)} />
        </div>
      ) : null}
      {showUpdateModal ? <div className="w-full h-screen bg-black bg-opacity-50 absolute left-0 top-0 z-[999]" >
        <UpdateProductModal getProductData={() => props.getProductData()} closeModal={() => { setShowUpdateModal(false); }} productId={props.data.id} data={props.data} />
      </div> : null}
    </>
  );
};

export default ProductCard;