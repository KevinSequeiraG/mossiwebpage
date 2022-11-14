import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { database } from "../lib/firebaseConfig";
import DeleteModal from "./deleteModal";
import NewIngredientModal from "./newIngredientModal";

export default function IngredientRow(props) {
  const [openNewIngredientModal, setOpenNewIngredientModal] = useState(false);
  const [openDeleteModal, setDeleteModal] = useState(false);
  const deleteIngredient = (id) => {
    let ingredientToDelete = doc(database, `mossy/data/ingredient`, id);
    //const q = query(categoryToDelete, where("categoryName", "==", props.data.categoryName))
    deleteDoc(ingredientToDelete)
      .then(() => {
        props.getIngredientData();
        Toast.fire({
          icon: "success",
          title: `Ingrediente removido con éxito`,
        });
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
  return (
    <>
      <tr class="bg-blue-200 lg:text-black">
        <td class="p-3 text-center font-medium">{props.data.ingredientName}</td>
        <td class="p-3 text-center">{props.data.ingredientMeasure}</td>
        <td class="p-3 text-center">{props.data.ingredientSupplier}</td>
        <td class="p-3 text-center">₡{props.data.ingredientPrice}</td>

        <td class="p-3 text-center">
          <a href="#" class="text-yellow-400 hover:text-gray-100 mx-2">
            <i
              onClick={() => setOpenNewIngredientModal(true)}
              class="material-icons-outlined text-base"
            >
              edit
            </i>
          </a>
          <a href="#" class="text-red-400 hover:text-gray-100 ml-2">
            <i
              onClick={() => setDeleteModal(true)}
              class="material-icons-round text-base"
            >
              delete_outline
            </i>
          </a>
        </td>
      </tr>
      {openNewIngredientModal ? (
        <NewIngredientModal
          closeModal={() => setOpenNewIngredientModal(false)}
          getIngredientData={() => props.getIngredientData()}
          data={props.data}
          isEdit={true}
        />
      ) : null}
      {openDeleteModal ? (
        <DeleteModal
          closeModal={() => setDeleteModal(false)}
          getIngredientData={() => props.getIngredientData()}
          data={props.data}
          deleteFunction={deleteIngredient}
          whatToDelete={"el ingrediente: " + props.data.ingredientName}
        />
      ) : null}
    </>
  );
}
