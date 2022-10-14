const ProductCard = () => {
  return (
    <div class="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5">
        <img
          class="rounded-[10px] object-cover"
          src="https://content-cocina.lecturas.com/medio/2022/07/26/mejores-panes-del-mundo_a91edf92_1200x630.jpg"
          alt="product image"
        />
      </div>

      <div class="px-5 pb-5">
        <h5 class="text-[16px] lg:text-[18px] font-semibold tracking-tight text-gray-900 dark:text-white">
          NOMBRE DEL PRODUCTO
        </h5>
        <h5 class="text-[12px] lg:[14px] font-semibold tracking-tight text-gray-900 dark:text-white my-1">
          DESCRIPCION DEL PRODUCTO
        </h5>

        <div class="flex justify-between items-center">
          <span class="text-[14px] lg:text-[15px] font-bold text-gray-900 dark:text-white">
            ₡599
          </span>
          <a
            href="#"
            class="text-white font-semibold detailsButtonBG focus:ring-4 focus:outline-none rounded-lg text-[14px] px-5 py-2 text-center"
          >
            Detalles
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
