import React from "react";
import Footer from "../../components/footer";
import { NavBar } from "../../components/navbar";

export default function Ingredients() {
  return (
    <>
      <NavBar />
      <div className={`cardsContainer w-full h-full py-20 bgMain`}>
        <div className="text-left w-10/12 mx-auto mt-8 lg:mt-16">
          <h1 className="text-[22px] lg:text-[30px] font-bold text-white text-center">
            Ingredientes
          </h1>
          <hr />
          <p className="text-white font-medium text-[15px] lg:text-[18px] text-justify mb-9 lg:mb-16 mt-4 leading-6 lg:leading-7">
            DESCRPCIÓN DE LA CATEGORÍA Nunc tellus nibh, interdum ac rhoncus et,
            mattis egestas mauris. Sed et venenatis nisl. Morbi augue velit,
            viverra non dignissim id, commodo nec risus. Nunc tellus nibh,
            interdum ac rhoncus et, mattis egestas mauris. Sed et venenatis
            nisl. Morbi augue velit, viverra non dignissim id, commodo nec
            risus.
          </p>
        </div>
        <div className="w-10/12 h-11/12 top-40 inset-x-0 mx-auto justify-items-center ">
          <div class="flex justify-center min-h-screen min-w-full">
            <div class="w-full">
              <div class="overflow-auto">
                <div class="flex lg:justify-between border-b-2 border-blue-900 pb-1">
                  <h2 class="text-2xl text-white font-bold">
                    Mis ingredientes
                  </h2>
                  <div class="text-center flex-auto">
                    <input
                      type="text"
                      name="name"
                      value={"Buscar..."}
                      placeholder="Buscar..."
                      class="
              w-1/3
              py-2
              border-b-2 border-blue-600
              outline-none
              focus:border-yellow-400 bg-transparent text-white
            "
                    />
                  </div>

                  <div>
                    <a href="#">
                      <button
                        class="
                bg-blue-500
                hover:bg-blue-700
                text-white
                py-1
                px-3
                sm
                rounded-full
              "
                      >
                        + Añadir nuevo
                      </button>
                    </a>
                  </div>
                </div>
                <table class="table text-gray-400 border-separate space-y-6 text-sm w-full">
                  <thead class="bg-blue-500 text-white">
                    <tr>
                      <th class="p-3 text-center">Nombre del ingrediente</th>
                      <th class="p-3 text-center">Tipo medida</th>
                      <th class="p-3 text-center">Proveedor</th>
                      <th class="p-3 text-center">Precio unitario</th>
                      <th class="p-3 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-blue-200 lg:text-black">
                      <td class="p-3 text-center font-medium capitalize">Quesoooooooo</td>
                      <td class="p-3 text-center">Kilo</td>
                      <td class="p-3 text-center">Pulpería super super super</td>
                      <td class="p-3 text-center">₡ 1500</td>

                      <td class="p-3 text-center">
                        <a
                          href="#"
                          class="text-yellow-400 hover:text-gray-100 mx-2"
                        >
                          <i class="material-icons-outlined text-base">edit</i>
                        </a>
                        <a
                          href="#"
                          class="text-red-400 hover:text-gray-100 ml-2"
                        >
                          <i class="material-icons-round text-base">
                            delete_outline
                          </i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
