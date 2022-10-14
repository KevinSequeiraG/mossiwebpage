import { useState } from "react";

const ProductDetailModal = (props) => {
  return (
    <div className="w-[40%] h-auto bg-gray-800 border-2 border-gray-300 absolute top-1/2 left-1/2 z-[1000] translate-x-[-50%] translate-y-[-50%] rounded-lg py-5">
      <button
        onClick={() => {
          props.closeModal();
        }}
        className="absolute -right-10 -top-10 bg-red-500 text-white rounded-[50%] border border-white w-[4rem] z-[9999] h-[4rem] mx-2 hover:bg-red-800 items-center flex justify-center"
      >
        <span className="material-icons !text-[50px]">close</span>
      </button>
      <img
        className="rounded-t-[10px] object-cover absolute top-0 max-h-24 w-full"
        src="https://content-cocina.lecturas.com/medio/2022/07/26/mejores-panes-del-mundo_a91edf92_1200x630.jpg"
        alt="product image"
      />
      <div className="p-5">
        <h1 className="text-[16px] lg:text-[20px] font-semibold tracking-tight text-gray-900 dark:text-white text-center border-b w-min truncate mx-auto mb-5 mt-20">
          NOMBRE DEL PRODUCTO
        </h1>
        <h2 className="text-[14px] lg:[16px] font-semibold tracking-tight text-gray-900 dark:text-white my-1 text-justify mb-5">
          DESCRIPCION DEL PRODUCTO DESCRIPCION DEL PRODUCTO DESCRIPCION DEL
          PRODUCTO DESCRIPCION DEL PRODUCTO DESCRIPCION DEL PRODUCTO
        </h2>
        <h2 className="text-[14px] lg:text-[16px] font-semibold tracking-tight text-gray-900 dark:text-white my-2">
          Lista de ingredientes principales:
        </h2>
        <ul class="list-disc ml-10 text-[14px] lg:text-[16px] font-semibold tracking-tight text-gray-900 dark:text-white space-y-2">
          {/* meter el <li></li> en .map*/}
          <li>Ingrediente 1</li>
          <li>Ingrediente 2</li>
          <li>Ingrediente 3</li>
          <li>Ingrediente 4</li>
          <li>Ingrediente 5</li>
          <li>Ingrediente 6</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetailModal;
