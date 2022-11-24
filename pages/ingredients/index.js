import { addDoc, collection, getDocs } from "firebase/firestore";
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
          <div class="flex justify-center min-h-screen min-w-full">
            <div class="w-full">
              <div class="overflow-auto">
                <div class="flex lg:justify-between border-b-2 border-blue-900 pb-1">
                  <h2 class="text-2xl text-white font-bold">
                    Mis ingredientes
                  </h2>
                  <div class="text-center flex-auto flex justify-center items-center text-white space-x-3">
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

                  <div>
                    <a href="#">
                      <button
                        onClick={() => setOpenNewIngredientModal(true)}
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
                      <th class="p-3 text-center">Tipo de medida</th>
                      <th class="p-3 text-center">Proveedor</th>
                      <th class="p-3 text-center">Precio unitario</th>
                      <th class="p-3 text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredientData.map((data) => {
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
                          <div key={data.id}>
                          <IngredientRow
                            data={data}
                            getIngredientData={getIngredientData}
                          /></div>
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
        <NewIngredientModal
          closeModal={() => setOpenNewIngredientModal(false)}
          getIngredientData={() => getIngredientData()}
        />
      ) : null}
    </>
  );
}
