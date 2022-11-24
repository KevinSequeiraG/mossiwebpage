import { database } from "../lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const ProductDetailModal = (props) => {
  const [ingredientsForProduct, setIngredientsForProduct] = useState([])

  const getIngredients = async (uid) => {
    console.log(uid);
    let ingredientsRef = doc(database, `mossy/data/ingredient`, uid);
    await getDoc(ingredientsRef).then(async (ingredient) => {
      var ingredient = {...ingredient.data(), id: ingredient.id};
      console.log(ingredient);
      setIngredientsForProduct([...ingredientsForProduct, ingredient]);
    });
  }

  useEffect(() => {
    console.log(props.data.ingredientsForProduct);
    props.data.ingredientsForProduct.map(ingredientUid => {
      getIngredients(ingredientUid)
    })

    console.log(ingredientsForProduct);
  }, [])


  return (
    <div className="w-[40%] h-auto bg-gray-800 border-2 border-gray-300 absolute top-1/2 left-1/2 z-[1000] translate-x-[-50%] translate-y-[-50%] rounded-lg py-5">
      <button
        onClick={() => {
          props.closeModal();
        }}
        className="absolute -right-10 -top-10 bg-red-500 text-white rounded-[50%] border border-white w-[4rem] z-[9999] h-[4rem] mx-2 hover:bg-red-800 items-center flex justify-center"
      >
        <span className="material-icons !text-[50px]">close</span>
      </button>
      <img
        className="rounded-t-[10px] object-cover absolute top-0 max-h-24 w-full"
        src="https://content-cocina.lecturas.com/medio/2022/07/26/mejores-panes-del-mundo_a91edf92_1200x630.jpg"
        alt="product image"
      />
      <div className="p-5">
        <h1 className="text-[16px] lg:text-[20px] font-semibold tracking-tight text-gray-900 dark:text-white text-center border-b w-min truncate mx-auto mb-5 mt-20">
          {props.data.name}
        </h1>
        <h2 className="text-[14px] lg:[16px] font-semibold tracking-tight text-gray-900 dark:text-white my-1 text-justify mb-5">
          {props.data.description}
        </h2>
        <h2 className="text-[14px] lg:text-[16px] font-semibold tracking-tight text-gray-900 dark:text-white my-2">
          Lista de ingredientes principales:
        </h2>
        <ul class="list-disc ml-10 text-[14px] lg:text-[16px] font-semibold tracking-tight text-gray-900 dark:text-white space-y-2">
          {/* meter el <li></li> en .map*/}
          {ingredientsForProduct?.map(ingredient => {
            return (<li key={ingredient.id}>{ingredient.ingredientName}</li>)
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProductDetailModal;
