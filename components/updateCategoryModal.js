import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../lib/firebaseConfig";
import Swal from "sweetalert2";
import ImageUplaod from "./imageUpload";

const UpdateCategoryModal = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [categoryName, setCategoryName] = useState(props.categoryName);
  const [categoryDescription, setCategoryDescription] = useState(
    props.categoryDescription
  );
  useEffect(() => {
    console.log(props);
  }, []);

  const [categoryImage, setCategoryImage] = useState(props.categoryImage);
  const [eventImage, setEventImage] = useState(props.categoryImage);
  const [eventImageUrl, setEventImageUrl] = useState(props.categoryImage);

  const onSubmit = (data) => {
    updateCategory(data);
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

  const updateCategory = (data) => {
    let categoryToEdit = doc(database, `mossy/data/category`, props.categoryId);
    updateDoc(categoryToEdit, {
      categoryName: data.categoryName,
      categoryDescription: data.categoryDescription,
      categoryImage: eventImageUrl,
    })
      .then(() => {
        props.closeModal();
        Toast.fire({
          icon: "success",
          title: `Categoria actualizada`,
        });
      })
      .catch((err) => {
        console.log(err);
        Toast.fire({
          icon: "success",
          title: err,
        });
      });
  };

  return (
    <div className="w-5/6 md:w-[40%] h-auto bg-gray-800 border-2 border-gray-300 absolute top-1/2 left-1/2 z-[1000] translate-x-[-50%] translate-y-[-50%] rounded-lg py-5">
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
      <div>
        <p className="text-center text-[18px] lg:text-[1.5rem] text-white">
          Acá actualizás la categoría
        </p>
        <div className="w-5/6 lg:w-3/6 mx-auto h-20 lg:h-96">
          <ImageUplaod
            containerClassName={
              "flex justify-center items-center w-full h-20 lg:h-96 bg-[#F3F4F5] rounded-[10px] dark:hover:bg-bray-800 hover:bg-gray-200 "
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
          <div className="flex flex-col lg:flex-row justify-between my-2">
            <label className="text-white">Nombre de categoría</label>
            <input
              defaultValue={categoryName}
              className="rounded px-2"
              type="text"
              placeholder="Nombre"
              {...register("categoryName", { required: true, maxLength: 80 })}
            />
          </div>
          <div className="flex flex-col lg:flex-row justify-between my-2">
            <label className="text-white">Descripción de categoría</label>
            <input
              defaultValue={categoryDescription}
              className="rounded px-2"
              type="textarea"
              placeholder="Descripción"
              {...register("categoryDescription", {
                required: true,
                maxLength: 100,
              })}
            />
          </div>
          {/* <input value={props.categoryId} className='hidden' type="textarea" placeholder="id" {...register("id", { required: true, maxLength: 100 })} /> */}
          <input
            className="text-[1rem] mt-8 lg:mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700"
            type="submit"
            value={"Actualizar categoría"}
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateCategoryModal;
