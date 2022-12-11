import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import React, { useLayoutEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { database } from "../lib/firebaseConfig";

export default function NewIngredientModal(props) {
  const [ingredientName, setIngredientName] = useState();
  const [ingredientMeasure, setIngredientMeasure] = useState();
  const [ingredientSupplier, setIngredientSupplier] = useState();
  const [ingredientPrice, setIngredientPrice] = useState();

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
  const updateIngredient = (data) => {
    let ingredientToEdit = doc(
      database,
      `mossy/data/ingredient`,
      props.data.id
    );
    updateDoc(ingredientToEdit, {
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
          title: "Ingrediente actualizado con éxito", //`${t("toastCreateSuccess")}`
        });
      })
      .then(() => {})
      .catch((err) => {
        console.error(err);
        Toast.fire({
          icon: "error",
          title: `Error al actualizar el ingrediente, consulta a soporte.`,
        });
      });
  };
  const onSubmit = (data) => {
    if (props.isEdit) {
      updateIngredient(data);
    } else {
      createIngredient(data);
    }
  };
  useLayoutEffect(() => {
    console.log("object");
    if (props.isEdit) {
      console.log("object");
      setIngredientName(props.data.ingredientName);
      setIngredientMeasure(props.data.ingredientMeasure);
      setIngredientSupplier(props.data.ingredientSupplier);
      setIngredientPrice(props.data.ingredientPrice);
    }
  }, []);
  return (
    <div className="w-5/6 md:w-[40%] h-auto bg-gray-800 border-2 border-gray-300 absolute top-1/2 left-1/2 z-[1000] translate-x-[-50%] translate-y-[-50%] rounded-lg py-5">
      <button
        onClick={() => {
          props.closeModal();
        }}
        className="absolute -right-6 lg:-right-10 -top-6 lg:-top-10 bg-red-500 text-white rounded-[50%] border border-white w-[3rem] lg:w-[4rem] z-[9999] h-[3rem] lg:h-[4rem] mx-2 hover:bg-red-800"
      >
        <span className="material-icons mt-1 !text-[30px] lg:!text-[50px]">close</span>
      </button>
      <div>
        <p className="text-center text-[18px] lg:text-[1.5rem] text-white px-2">
          Acá {props.isEdit ? "actualizas" : "creas"} un ingrediente
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-4/5 mx-auto mt-8"
        >
          <div className="flex flex-col lg:flex-row justify-between my-2">
            <label className="text-white">Nombre</label>
            <input
              value={ingredientName}
              className="rounded px-2"
              type="text"
              placeholder="Nombre"
              {...register("ingredientName", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="flex flex-col lg:flex-row justify-between my-2">
            <label className="text-white">Tipo de medida</label>
            <input
              value={ingredientMeasure}
              className="rounded px-2"
              type="text"
              placeholder="Medida"
              {...register("ingredientMeasure", {
                required: true,
                maxLength: 80,
              })}
            />
          </div>
          <div className="flex flex-col lg:flex-row justify-between my-2">
            <label className="text-white">Proveedor</label>
            <input
              value={ingredientSupplier}
              className="rounded px-2"
              type="text"
              placeholder="Proveedor"
              {...register("ingredientSupplier", {
                required: true,
                maxLength: 80,
              })}
            />
          </div>
          <div className="flex flex-col lg:flex-row justify-between my-2">
            <label className="text-white">Precio</label>
            <input
              value={ingredientPrice}
              className="rounded px-2"
              type="number"
              placeholder="0"
              {...register("ingredientPrice", {
                required: true,
                maxLength: 100,
              })}
            />
          </div>
          <input
            className="text-[1rem] mt-4 lg:mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700"
            type="submit"
            value={
              props.isEdit ? "Actualizar ingrediente" : "Guardar ingrediente"
            }
          />
        </form>
      </div>
    </div>
  );
}
