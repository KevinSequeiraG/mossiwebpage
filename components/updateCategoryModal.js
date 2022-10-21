import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    doc,
    updateDoc
} from "firebase/firestore";
import { database } from "../lib/firebaseConfig";
import Swal from "sweetalert2";

const UpdateCategoryModal = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [categoryName, setCategoryName] = useState(props.categoryName);
    const [categoryDescription, setCategoryDescription] = useState(props.categoryDescription);
    const [categoryImage, setCategoryImage] = useState();

    const onSubmit = data => { updateCategory(data) }

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
        let categoryToEdit = doc(
            database,
            `mossy/data/category`,
            props.categoryId
        );
        updateDoc(categoryToEdit, {
            categoryName: data.categoryName,
            categoryDescription: data.categoryDescription,
        })
            .then(() => {
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
        <div className="w-[40%] h-auto bg-gray-800 border-2 border-gray-300 absolute top-1/2 left-1/2 z-[1000] translate-x-[-50%] translate-y-[-50%] rounded-lg py-5">
            <button onClick={() => { props.closeModal() }} className="absolute -right-10 -top-10 bg-red-500 text-white rounded-[50%] border border-white w-[4rem] z-[9999] h-[4rem] mx-2 hover:bg-red-800">
                <span className="material-icons !text-[50px]">
                    close
                </span>
            </button>
            <div>
                <p className="text-center text-[1.5rem] text-white">Acá actualizas la categoría</p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-4/5 mx-auto mt-8">
                    <div className='flex justify-between my-2'>
                        <label className='text-white'>Nombre de categoría</label>
                        <input value={categoryName} className='rounded' type="text" placeholder="Nombre" {...register("categoryName", { required: true, maxLength: 80 })} />
                    </div>
                    <div className='flex justify-between my-2'>
                        <label className='text-white'>Descripción de categoría</label>
                        <input defaultValue={categoryDescription} className='rounded' type="textarea" placeholder="Descripción" {...register("categoryDescription", { required: true, maxLength: 100 })} />
                    </div>
                    {/* <input value={props.categoryId} className='hidden' type="textarea" placeholder="id" {...register("id", { required: true, maxLength: 100 })} /> */}
                    <input className="text-[1rem] mt-2 lg:mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 mr-2" type="submit" value={"Actualizar categoría"} />
                </form>
            </div>
        </div>
    )
}

export default UpdateCategoryModal;