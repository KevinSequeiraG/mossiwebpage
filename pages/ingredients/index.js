import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Footer from "../../components/footer";
import IngredientRow from "../../components/ingredientRow";
import { NavBar } from "../../components/navbar";
import NewIngredientModal from "../../components/newIngredientModal";
import { database } from "../../lib/firebaseConfig";

export default function Ingredients() {
  const [ingredientData, setIngredientData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [openNewIngredientModal, setOpenNewIngredientModal] = useState(false);
  const getIngredientData = async () => {
    const ingredientRef = collection(database, `mossy/data/ingredient`);
    const q = query(ingredientRef, orderBy("ingredientName"))
    await getDocs(q).then((response) => {
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
      <NavBar />
      <div className={`cardsContainer w-full h-full py-20 bgMain relative`}>
        <div className="text-left w-10/12 mx-auto mt-8 lg:mt-16">
          <h1 className="text-[22px] lg:text-[30px] font-bold text-white text-center">
            Ingredientes
          </h1>
          <hr />
          <p className="text-white font-medium text-[15px] lg:text-[18px] text-justify mb-9 lg:mb-16 mt-4 leading-6 lg:leading-7">
            Crea, edita y varifica la lista de ingredientes de tu
            emprendimiento.
          </p>
        </div>
        <div className="w-10/12 h-11/12 top-40 inset-x-0 mx-auto justify-items-center ">
          <div className="flex justify-center min-h-screen min-w-full">
            <div className="w-full">
              <div className="flex border-b-2 border-blue-900 pb-1 flex-wrap items-center justify-start space-y-3 space-x-0 sm:space-x-3">
                <h2 className="text-2xl text-white font-bold">
                  Mis ingredientes
                </h2>
                <div className="text-center flex-auto flex justify-start md:justify-center items-center text-white">
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

                <div>
                  <button
                    onClick={() => setOpenNewIngredientModal(true)}
                    className="
                bg-blue-500
                hover:bg-blue-700
                text-white
                py-1
                px-3        
                rounded-full
                mb-3
              "
                  >
                    + Añadir nuevo
                  </button>
                </div>
              </div>
              <div className="overflow-auto">
                <table className="table text-gray-400 border-separate space-y-6 text-sm w-full">
                  <thead className="bg-blue-500 text-white">
                    <tr>
                      <th className="p-3 text-center truncate">
                        Nombre del ingrediente
                      </th>
                      <th className="p-3 text-center truncate">
                        Tipo de medida
                      </th>
                      <th className="p-3 text-center truncate">Proveedor</th>
                      <th className="p-3 text-center truncate">
                        Precio unitario
                      </th>
                      <th className="p-3 text-center truncate">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredientData.map((data, i) => {
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
                          <IngredientRow
                            key={i}
                            data={data}
                            getIngredientData={getIngredientData}
                          />
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
      {openNewIngredientModal ? (
        <div className="w-full h-screen bg-black bg-opacity-50 top-0 z-[999] fixed">
          <NewIngredientModal
            closeModal={() => setOpenNewIngredientModal(false)}
            getIngredientData={() => getIngredientData()}
          />
        </div>
      ) : null}
    </>
  );
}
