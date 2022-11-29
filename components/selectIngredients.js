import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../lib/firebaseConfig";
import IngredientRow from "./ingredientRow";
import IngredientSelect from "./ingredientSelect";

export default function SelectIngredientsModal(props) {
  const [ingredientData, setIngredientData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [ingredientsToProduct, setIngredientsToProduct] = useState([]);
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

  const addIngredient = (id) => {
    console.log(id);
    setIngredientsToProduct([...ingredientsToProduct, id]);
  };

  const removeIngredient = (id) => {
    let ingredientsArray = [];
    ingredientsToProduct?.map((ingredient) => {
      if (ingredient == id) {
      } else {
        ingredientsArray.push(id);
      }
    });
    setIngredientsToProduct(ingredientsArray);
    console.log(ingredientsToProduct);
  };

  useEffect(() => {
    getIngredientData();
  }, []);

  useEffect(() => {
    console.log(ingredientData);
  }, [ingredientData]);

  return (
    <>
      <div className="w-10/12 md:w-[35%] h-auto bg-gray-800 border-2 border-gray-300 absolute top-1/2 left-1/2 z-[1000] translate-x-[-50%] translate-y-[-50%] rounded-lg py-5 max-h-96">
        <button
          onClick={() => {
            props.closeModal();
          }}
          className="absolute -right-6 lg:-right-10 -top-6 lg:-top-10 bg-red-500 text-white rounded-[50%] border border-white w-[3rem] lg:w-[4rem] z-[9999] h-[3rem] lg:h-[4rem] mx-2 hover:bg-red-800"
        >
          <span className="material-icons mt-1 !text-[30px] lg:!text-[50px]">
            close
          </span>
        </button>
        <div className="w-10/12 h-11/12 top-40 inset-x-0 mx-auto justify-items-center ">
          <div className="flex justify-center min-w-full">
            <div className="w-full">
              <div className="flex flex-col lg:flex-row justify-start lg:justify-between border-b-2 border-blue-900 pb-1">
                <h2 className="text-[16px] text-white font-bold">
                  Lista de ingredientes
                </h2>
                <div className="text-center flex-auto flex justify-start lg:justify-end items-center text-white">
                  <p className="hidden md:inline">Busca un ingrediente:</p>
                  <p className="inline md:hidden">Buscar:</p>
                  <input
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                    }}
                    type="text"
                    name="name"
                    className="
                      w-1/2 md:w-1/3
              py-1
              border-b-2 border-blue-600
              outline-none
              focus:border-yellow-400 bg-transparent !text-white
            "
                  />
                </div>
              </div>
              {/* table header */}
              <div className="overflow-auto w-full">
                <div className="w-full mt-5 !text-white">
                  <div className="w-full text-center border-b border-[#8B9592] flex items-center justify-center px-2 !text-white flex-nowrap space-x-5">
                    <div className="inline-block text-[16px] !text-white tracking-normal pb-5 leading-5 font-normal w-full ">
                      <p>Nombre</p>
                    </div>
                    <div className="text-[16px] !text-white tracking-normal pb-5 leading-5 font-normal w-full hidden lg:inline-block ">
                      Medida
                    </div>
                    <div className="text-[16px] !text-white tracking-normal pb-5 leading-5 font-normal w-full hidden lg:inline-block ">
                      Proveedor
                    </div>
                    <div className="inline-block text-[16px] !text-white tracking-normal pb-5 leading-5 font-normal w-full ">
                      Precio
                    </div>
                    <div className="inline-block text-[16px] !text-white tracking-normal pb-5 leading-5 font-normal w-full ">
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
                            <div
                              key={data.id}
                              className="w-full flex justify-center text-white text-center overflow-y-auto scrollbarUsers truncate"
                            >
                              <div className="py-3 border-b border-[#E9E9EB] w-full marker:inline-block truncate">
                                <p>
                                  {data.ingredientName} asadad asadad
                                </p>
                              </div>
                              <div className="py-3 border-b border-[#E9E9EB] w-full hidden lg:inline-block truncate">
                                <p >
                                  {data.ingredientMeasure}
                                </p>
                              </div>
                              <div className="py-3 border-b border-[#E9E9EB] w-full hidden lg:inline-block truncate">
                                <p>
                                  {data.ingredientSupplier}
                                </p>
                              </div>
                              <div className="py-3 border-b border-[#E9E9EB] w-full inline-block truncate">
                                <p >
                                  {data.ingredientPrice}
                                </p>
                              </div>
                              <div className="py-3 border-b border-[#E9E9EB] w-full inline-block truncate">
                                <p >
                                  {ingredientsToProduct.includes(data.id) ? (
                                    <button
                                      className="hover:bg-red-800 bg-red-500 p-1 rounded-full h-[31px]"
                                      onClick={() => removeIngredient(data.id)}
                                    >
                                      <span className="material-icons">
                                        remove
                                      </span>
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => addIngredient(data.id)}
                                      className="bg-green-500 p-1 rounded-full max-h h-[31px] hover:bg-green-800"
                                    >
                                      <span className="material-icons">
                                        add
                                      </span>
                                    </button>
                                  )}
                                </p>
                              </div>
                            </div>
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
            className="text-[1rem] px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-700 mr-2"
            type="button"
            onClick={() => {
              props.closeModal();
            }}
            value={"Cancelar"}
          />
          <input
            className="text-[1rem]  px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700"
            type="button"
            onClick={() => {
              //props.buttonFunction(props.data.id);
              props.closeModal();
              props.setIngredientsToProduct(ingredientsToProduct);
            }}
            value={"Aceptar"}
          />
        </div>
      </div>
    </>
  );
}
