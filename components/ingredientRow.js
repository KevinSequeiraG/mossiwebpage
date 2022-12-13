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
      <tr className="bg-blue-200 text-black">
        <td className="p-3 text-center font-medium">
          {props.data.ingredientName}
        </td>
        <td className="p-3 text-center">{props.data.ingredientMeasure}</td>
        <td className="p-3 text-center">{props.data.ingredientSupplier}</td>
        <td className="p-3 text-center">₡{props.data.ingredientPrice}</td>

        <td className="p-3 text-center space-x-3">
          <a href="#" className="text-yellow-400 hover:text-gray-100">
            <i
              onClick={() => setOpenNewIngredientModal(true)}
              className="material-icons-outlined text-gray-500 !text-[20px]"
            >
              edit
            </i>
          </a>
          <a href="#" className="text-red-400 hover:text-gray-100">
            <i
              onClick={() => setDeleteModal(true)}
              className="material-icons-round text-red-600 !text-[20px]"
            >
              delete_outline
            </i>
          </a>
        </td>
      </tr>

      {openNewIngredientModal ? (
        <div className="w-screen h-screen bg-black bg-opacity-50 left-0 top-0 z-[999] fixed">
          <NewIngredientModal
            closeModal={() => setOpenNewIngredientModal(false)}
            getIngredientData={() => props.getIngredientData()}
            data={props.data}
            isEdit={true}
          />
        </div>
      ) : null}
      {openDeleteModal ? (
        <div className="w-screen h-screen bg-black bg-opacity-50 left-0 top-0 z-[999] fixed">
          <DeleteModal
            closeModal={() => setDeleteModal(false)}
            getIngredientData={() => props.getIngredientData()}
            data={props.data}
            deleteFunction={deleteIngredient}
            whatToDelete={"el ingrediente: " + props.data.ingredientName}
          />
        </div>
      ) : null}
    </>
  );
}
