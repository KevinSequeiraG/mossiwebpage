import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../lib/firebaseConfig";
import Swal from "sweetalert2";
import ImageUplaod from "./imageUpload";

const NewCategoryModal = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState();
  const [eventImage, setEventImage] = useState(null);
  const [eventImageUrl, setEventImageUrl] = useState("");

  const onSubmit = (data) => {
    createCategory(data);
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

  const createCategory = (data) => {
    const categoryRef = collection(database, `mossy/data/category`);
    addDoc(categoryRef, {
      categoryName: data.categoryName,
      categoryDescription: data.categoryDescription,
      categoryImage: `${
        data.categoryImage != undefined ? data.categoryImage : ""
      }`,
    })
      .then(() => {
        Toast.fire({
          icon: "success",
          title: "Categoria creada con éxito", //`${t("toastCreateSuccess")}`
        });
      })
      .then(props.closeModal(), props.getCategoryData())
      .catch((err) => {
        console.error(err);
        Toast.fire({
          icon: "error",
          title: `${t("toastCreateFail")}`,
        });
      });
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
          Acá agregas una nueva categoría
        </p>
        <div className="w-3/6 mx-auto h-96">
            <ImageUplaod
              containerClassName={
                "flex justify-center items-center w-full h-96 bg-[#F3F4F5] rounded-[10px] dark:hover:bg-bray-800 hover:bg-gray-200 "
              }
              setImageValue={setEventImage}
              setImageUrl={setEventImageUrl}
              imageUrl={eventImageUrl}
            />
          </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-4/5 mx-auto mt-8"
        >
          <div className="flex justify-between my-2">
            <label className="text-white">Nombre de categoría</label>
            <input
              className="rounded"
              type="text"
              placeholder="Nombre"
              {...register("categoryName", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="flex justify-between my-2">
            <label className="text-white">Descripción de categoría</label>
            <input
              className="rounded"
              type="textarea"
              placeholder="Descripción"
              {...register("categoryDescription", {
                required: true,
                maxLength: 100,
              })}
            />
          </div>
          <input
            className="text-[1rem] mt-2 lg:mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 mr-2"
            type="submit"
            value={"Guardar categoría"}
          />
        </form>
      </div>
    </div>
  );
};

export default NewCategoryModal;
