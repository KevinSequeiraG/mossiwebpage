import { addDoc, collection } from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { database } from "../lib/firebaseConfig";

export default function NewIngredientModal(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
  const createIngredient = (data) => {
    const ingredientRef = collection(database, `mossy/data/ingredient`);
    addDoc(ingredientRef, {
      ingredientName: data.ingredientName,
      ingredientMeasure: data.ingredientMeasure,
      ingredientSupplier: data.ingredientSupplier,
      ingredientPrice: data.ingredientPrice,
    })
      .then(() => {
        props.closeModal();
        props.getIngredientData();
        Toast.fire({
          icon: "success",
          title: "Ingrediente añadido con éxito", //`${t("toastCreateSuccess")}`
        });
      })
      .then(() => {})
      .catch((err) => {
        console.error(err);
        Toast.fire({
          icon: "error",
          title: `Error al crear el ingrediente, consulta a soporte.`,
        });
      });
  };
  const onSubmit = (data) => {
    createIngredient(data);
  };
  return (
    <div className="w-[40%] h-auto bg-gray-800 border-2 border-gray-300 absolute top-1/2 left-1/2 z-[1000] translate-x-[-50%] translate-y-[-50%] rounded-lg py-5">
      <button
        onClick={() => {
          props.closeModal();
        }}
        className="absolute -right-10 -top-10 bg-red-500 text-white rounded-[50%] border border-white w-[4rem] z-[9999] h-[4rem] mx-2 hover:bg-red-800"
      >
        <span className="material-icons mt-1 !text-[50px]">close</span>
      </button>
      <div>
        <p className="text-center text-[1.5rem] text-white">
          Acá agregas un nuevo ingrediente
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-4/5 mx-auto mt-8"
        >
          <div className="flex justify-between my-2">
            <label className="text-white">Nombre</label>
            <input
              className="rounded"
              type="text"
              placeholder="Nombre"
              {...register("ingredientName", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="flex justify-between my-2">
            <label className="text-white">Tipo de medida</label>
            <input
              className="rounded"
              type="text"
              placeholder="Medida"
              {...register("ingredientMeasure", {
                required: true,
                maxLength: 80,
              })}
            />
          </div>
          <div className="flex justify-between my-2">
            <label className="text-white">Proveedor</label>
            <input
              className="rounded"
              type="text"
              placeholder="Proveedor"
              {...register("ingredientSupplier", {
                required: true,
                maxLength: 80,
              })}
            />
          </div>
          <div className="flex justify-between my-2">
            <label className="text-white">Precio</label>
            <input
              className="rounded"
              type="number"
              placeholder="Precio"
              {...register("ingredientPrice", {
                required: true,
                maxLength: 100,
              })}
            />
          </div>
          <input
            className="text-[1rem] mt-2 lg:mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 mr-2"
            type="submit"
            value={"Guardar ingrediente"}
          />
        </form>
      </div>
    </div>
  );
}
