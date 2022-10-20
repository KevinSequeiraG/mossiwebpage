import { useState } from "react";
import ProductDetailModal from "./productDetailModal";

const ProductCard = (props) => {
  const [closeModal, setCloseModal] = useState(false);
  return (
    <>
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <img
            className="rounded-[10px] object-cover"
            src="https://content-cocina.lecturas.com/medio/2022/07/26/mejores-panes-del-mundo_a91edf92_1200x630.jpg"
            alt="product image"
          />
        </div>

        <div className="px-5 pb-5">
          <h5 className="text-[16px] lg:text-[18px] font-semibold tracking-tight text-gray-900 dark:text-white">
            {props.data.name}
          </h5>
          <h5 className="text-[12px] lg:[14px] font-semibold tracking-tight text-gray-900 dark:text-white my-1">
          {props.data.description}
          </h5>

          <div className="flex justify-between items-center">
            <span className="text-[14px] lg:text-[15px] font-bold text-gray-900 dark:text-white">
            ₡ {props.data.price}
            </span>
            <div
              onClick={() => {
                setCloseModal(true);
              }}
              className="text-white font-semibold detailsButtonBG focus:ring-4 focus:outline-none rounded-lg text-[14px] px-5 py-2 text-center cursor-pointer"
            >
              Detalles
            </div>
          </div>
        </div>
      </div>
      {closeModal ? (
        <div className="w-full h-screen bg-black bg-opacity-50 absolute top-0 z-[999] fixed">
          <ProductDetailModal data={props.data} closeModal={() => setCloseModal()} />
        </div>
      ) : null}
    </>
  );
};

export default ProductCard;