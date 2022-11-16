import React from "react";

export default function IngredientSelect(props) {
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
        <p className="truncate">+</p>
      </div>
    </div>
  );
}
