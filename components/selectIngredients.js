import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../lib/firebaseConfig";
import IngredientRow from "./ingredientRow";
import IngredientSelect from "./ingredientSelect";

export default function SelectIngredientsModal(props) {
  const [ingredientData, setIngredientData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const getIngredientData = async () => {
    const ingredientRef = collection(database, `mossy/data/ingredient`);
    await getDocs(ingredientRef).then((response) => {
      setIngredientData(
        response.docs.map((data) => {
          return { ...data.data(), id: data.id };
        })
      );
    });
  };
  useEffect(() => {
    getIngredientData();
  }, []);
  return (
    <>
      <div className="w-[50%] h-auto bg-gray-800 border-2 border-gray-300 absolute top-1/2 left-1/2 z-[1000] translate-x-[-50%] translate-y-[-50%] rounded-lg py-5 max-h-96">
        <button
          onClick={() => {
            props.closeModal();
          }}
          className="absolute -right-10 -top-10 bg-red-500 text-white rounded-[50%] border border-white w-[4rem] z-[9999] h-[4rem] mx-2 hover:bg-red-800"
        >
          <span className="material-icons mt-1 !text-[50px]">close</span>
        </button>
        <div className="w-10/12 h-11/12 top-40 inset-x-0 mx-auto justify-items-center ">
          <div class="flex justify-center min-w-full">
            <div class="w-full">
              <div class="overflow-auto">
                <div class="flex lg:justify-between border-b-2 border-blue-900 pb-1">
                  <h2 class="text-2xl text-white font-bold">
                    Lista de ingredientes
                  </h2>
                  <div class="text-center flex-auto flex justify-end items-center text-white space-x-3">
                    <p>Busca un ingrediente:</p>
                    <input
                      onChange={(e) => {
                        setSearchInput(e.target.value);
                      }}
                      type="text"
                      name="name"
                      class="
              w-1/3
              py-2
              border-b-2 border-blue-600
              outline-none
              focus:border-yellow-400 bg-transparent !text-white
            "
                    />
                  </div>
                </div>
                {/* table header */}
                <div className="w-full mt-3 !text-white">
                  <div className="w-full text-center border-b border-[#8B9592] flex items-center justify-center pr-2 !text-white">
                    <div className="inline-block text-[16px] !text-white tracking-normal pb-5 leading-5 font-normal w-full ">
                      <div className="flex justify-center items-center space-x-1">
                        <p>Nombre</p>
                      </div>
                    </div>
                    <div className="inline-block text-[16px] !text-white tracking-normal pb-5 leading-5 font-normal w-full ">
                      Medida
                    </div>
                    <div className="inline-block text-[16px] !text-white tracking-normal pb-5 leading-5 font-normal w-full ">
                      Proveedor
                    </div>
                    <div className="inline-block text-[16px] !text-white tracking-normal  pb-5 leading-5 font-normal w-full ">
                      Precio
                    </div>
                    <div className="inline-block text-[16px] !text-white tracking-normal pb-5 leading-5 font-normal w-full">
                      Añadir
                    </div>
                  </div>
                </div>
                <div className="text-center font-semibold text-[16px] tracking-normal leading-5 overflow-y-scroll scrollbarUsers w-full h-44">
                  <>
                    {ingredientData.map((data, i) => {
                      {
                        if (
                          data.ingredientName
                            .toString()
                            .toLowerCase()
                            .includes(searchInput.toString().toLowerCase()) ||
                          data.ingredientSupplier
                            .toString()
                            .toLowerCase()
                            .includes(searchInput.toString().toLowerCase())
                        ) {
                          return (
                            <>
                              <IngredientSelect data={data} />
                            </>
                          );
                        }
                      }
                    })}
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <input
            className="text-[1rem] mt-2 lg:mt-8 px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-700 mr-2"
            type="button"
            onClick={() => {
              props.closeModal();
            }}
            value={"Cancelar"}
          />
          <input
            className="text-[1rem] mt-2 lg:mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700"
            type="button"
            onClick={() => {
              //props.buttonFunction(props.data.id);
              props.closeModal();
            }}
            value={"Aceptar"}
          />
        </div>
      </div>
    </>
  );
}