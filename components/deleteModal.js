import React from "react";

export default function DeleteModal(props) {
  return (
    <>
      <div className="w-[40%] h-auto bg-gray-800 border-2 border-gray-300 absolute top-1/2 left-1/2 z-[1000] translate-x-[-50%] translate-y-[-50%] rounded-lg py-5">
        <button
          onClick={() => {
            props.closeModal();
          }}
          className="absolute -right-10 -top-10 bg-red-500 text-white rounded-[50%] border border-white w-[4rem] z-[9999] h-[4rem] mx-2 hover:bg-red-800"
        >
          <span className="material-icons mt-1 !text-[50px]">close</span>
        </button>
        <div>
          <p className="text-center text-[1.5rem] text-white px-3">
            Estás a punto de eliminar {props.whatToDelete}
          </p>
        </div>
        <div className="flex justify-center">
          <input
            className="text-[1rem] mt-2 lg:mt-8 px-4 py-2 bg-gray-500 text-white rounded-xl hover:bg-green-700 mr-2"
            type="button"
            onClick={() => {
              props.closeModal();
            }}
            value={"Cancelar"}
          />
          <input
            className="text-[1rem] mt-2 lg:mt-8 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-green-700"
            type="button"
            onClick={() => {
              props.deleteFunction(props.data.id);
              props.closeModal();
            }}
            value={"Eliminar"}
          />
        </div>
      </div>
    </>
  );
}
