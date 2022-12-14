import React, { useEffect, useState } from "react";

export default function IngredientSelect(props) {

  const addIngredient = (id) => {
    console.log(id);
    var ingredientsArray = props.ingredientsToProduct;
    ingredientsArray.push(id)
    props.setIngredientsToProduct(ingredientsArray)
  }

  const removeIngredient = (id) => {
    let ingredientsArray = []
    props.ingredientsToProduct?.map(ingredient => {
      if (ingredient == id) {

      } else {
        ingredientsArray.push(id)
      }
    })
    props.setIngredientsToProduct(ingredientsArray)
    console.log(ingredientsToProduct);
  }

  useEffect(() => {
    console.log(props.ingredientsToProduct);
  }, [])


  return (
    <div className="w-full flex justify-center text-white text-center overflow-y-auto scrollbarUsers">
      <div className="py-3 border-b border-[#E9E9EB] w-full marker:inline-block truncate">
        <p className="truncate">{props.data.ingredientName}</p>
      </div>
      <div className="py-3 border-b border-[#E9E9EB] w-full inline-block truncate">
        <p className="truncate">{props.data.ingredientMeasure}</p>
      </div>
      <div className="py-3 border-b border-[#E9E9EB] w-full inline-block truncate">
        <p className="truncate">{props.data.ingredientSupplier}</p>
      </div>
      <div className="py-3 border-b border-[#E9E9EB] w-full inline-block truncate">
        <p className="truncate">{props.data.ingredientPrice}</p>
      </div>
      <div className="py-3 border-b border-[#E9E9EB] w-full inline-block truncate">
        <p className="truncate">{props.ingredientsToProduct.includes(props.data.id) ? <button className="hover:bg-red-800 bg-red-500 p-1 rounded-full h-[31px]" onClick={() => removeIngredient(props.data.id)}><span className="material-icons">remove</span></button> : <button onClick={() => addIngredient(props.data.id)} className="bg-green-500 p-1 rounded-full max-h h-[31px] hover:bg-green-800"><span className="material-icons">add</span></button>}</p>
      </div>
    </div>
  );
}
