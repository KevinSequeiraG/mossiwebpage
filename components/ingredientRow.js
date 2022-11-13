import React from "react";

export default function IngredientRow(props) {
  return (
    <tr class="bg-blue-200 lg:text-black">
      <td class="p-3 text-center font-medium capitalize">
        {props.data.ingredientName}
      </td>
      <td class="p-3 text-center">{props.data.ingredientMeasure}</td>
      <td class="p-3 text-center">{props.data.ingredientSupplier}</td>
      <td class="p-3 text-center">₡{props.data.ingredientPrice}</td>

      <td class="p-3 text-center">
        <a href="#" class="text-yellow-400 hover:text-gray-100 mx-2">
          <i class="material-icons-outlined text-base">edit</i>
        </a>
        <a href="#" class="text-red-400 hover:text-gray-100 ml-2">
          <i class="material-icons-round text-base">delete_outline</i>
        </a>
      </td>
    </tr>
  );
}
