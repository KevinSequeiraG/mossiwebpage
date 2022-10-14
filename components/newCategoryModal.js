import React from 'react';
import { useForm } from 'react-hook-form';

const NewCategoryModal = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);

    return (
        <div className="w-[40%] h-auto bg-gray-800 border-2 border-gray-300 absolute top-1/2 left-1/2 z-[1000] translate-x-[-50%] translate-y-[-50%] rounded-lg py-5">
            <button onClick={()=>{props.closeModal()}} className="absolute -right-10 -top-10 bg-red-500 text-white rounded-[50%] border border-white w-[4rem] z-[9999] h-[4rem] mx-2 hover:bg-red-800">
                <span className="material-icons !text-[50px]">
                    close
                </span>
            </button>
            <div>
                <p className="text-center text-[1.5rem] text-white">Acá agregas una nueva categoría</p>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-4/5 mx-auto mt-8">
                    <div className='flex justify-between my-2'>
                        <label className='text-white'>Nombre de categoría</label>
                        <input className='rounded' type="text" placeholder="Nombre" {...register("Nombre", { required: true, maxLength: 80 })} />
                    </div>
                    <div className='flex justify-between my-2'>
                        <label className='text-white'>Descripción de categoría</label>
                        <input className='rounded' type="text" placeholder="Descripción" {...register("Descripción", { required: true, maxLength: 100 })} />
                    </div>
                    <div className='flex justify-between my-2'>
                        <label className='text-white'>Descripción de categoría</label>
                        
                    </div>
                    <input className="text-[1rem] mt-2 lg:mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 mr-2" type="submit" value={"Guardar categoría"}/>
                </form>
            </div>
        </div>
    )
}

export default NewCategoryModal;