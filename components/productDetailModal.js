import { database } from "../lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const ProductDetailModal = (props) => {
  const [ingredientsForProduct, setIngredientsForProduct] = useState([]);
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

  const getIngredientsP = () => {
    props.data.ingredientsForProduct?.map((ingredientUid, i) => {
      console.log(ingredientUid);
      getIngredients(ingredientUid.id);
    });
  }

  useEffect(() => {
    getIngredientsP()
  }, []);

  return (
    <div className="w-5/6 md:w-[40%] h-auto bg-gray-800 border-2 border-gray-300 absolute top-1/2 left-1/2 z-[1000] translate-x-[-50%] translate-y-[-50%] rounded-lg pb-5">
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
      <img
        className="rounded-t-lg object-cover max-h-52 min-h-52 w-full h-full"
        src={props.data.productImgUrl ? props.data.productImgUrl : "https://cdn.shopify.com/s/files/1/0229/0839/files/Untitled_design__1.png?2393&format=jpg&quality=90"}
        alt="product image"
      />
      <div className="p-5">
        <h1 className="text-[16px] lg:text-[20px] font-semibold tracking-tight text-gray-900 dark:text-white text-center border-b w-min mx-auto mb-5">
          {props.data.name}
        </h1>
        <h2 className="text-[14px] lg:[16px] font-semibold tracking-tight text-gray-900 dark:text-white my-1 text-justify mb-5">
          {props.data.description}
        </h2>
        <h2 className="text-[14px] lg:text-[16px] font-semibold tracking-tight text-gray-900 dark:text-white my-2">
          Lista de ingredientes principales:
        </h2>
        <ul className="list-disc ml-8 text-[14px] lg:text-[16px] font-semibold tracking-tight text-gray-900 dark:text-white space-y-2 max-h-32 overflow-y-auto">
          {/* meter el <li></li> en .map*/}
          {ingredientsForProduct?.map((ingredient) => {
            return <div key={ingredient.id} className="flex space-x-1 items-center"><p>*</p><li key={ingredient.id}>{ingredient.ingredientName}</li></div>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetailModal;
