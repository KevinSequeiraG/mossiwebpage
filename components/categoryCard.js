import { useState } from "react";
import { database } from "../lib/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  orderBy,
} from "firebase/firestore";
import Swal from "sweetalert2";
import Link from "next/link";
import UpdateCategoryModal from "./updateCategoryModal";
import { useRouter } from "next/router";

const CategoryCard = (props) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const getCategoryData = () => props.getCategoryData();
  const router = useRouter();

  const closeUpdateCatModal = () => {
    setShowUpdateModal(false);
  };

  const deleteCategory = (id) => {
    console.log(id);
    let categoryToDelete = doc(database, `mossy/data/category`, id);
    //const q = query(categoryToDelete, where("categoryName", "==", props.data.categoryName))
    deleteDoc(categoryToDelete)
      .then(() => {
        getCategoryData();
        Toast.fire({
          icon: "success",
          title: `Categoria removida con éxito`,
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: "No se puede eliminar",
        });
      });
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  return (
    <>
      <div className="card flex flex-col w-11/12 lg:w-full !min-h-full">
        <div className="z-[2] bg-[#191c29] w-full !min-h-full">
          <img
            src={
              props.data.categoryImage != ""
                ? props.data.categoryImage
                : "./Images/Panaderia.png"
            }
            className="rounded-t-lg h-64 lg:h-96 min-w-full w-full object-cover"
          ></img>
          <h1 className="text-gray-200 mt-2 px-4">{props.data.categoryName}</h1>
          <p className="text-gray-200 text-[1rem] mt-4 px-4">
            {props.data.categoryDescription}
          </p>
          <Link
            href={"/productList/[index]"}
            as={`productList/${props.data.id}`}
          >
            <button className="text-[.7rem] lg:text-[1rem] mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700">
              Ver productos
            </button>
          </Link>
          <div className="my-6">
            {props.showMaintenance ? (
              <button
                onClick={() => {
                  deleteCategory(props.data.id);
                }}
                className="bg-red-500 text-white rounded-[50%] border border-white w-[2rem] h-[2rem] mx-2 hover:bg-red-800"
              >
                <span className="material-icons">delete</span>
              </button>
            ) : null}
            {props.showMaintenance ? (
              <button
                className="bg-yellow-500 text-white rounded-[50%] border border-white w-[2rem] h-[2rem] mx-2 hover:bg-yellow-600"
                onClick={() => setShowUpdateModal(true)}
              >
                <span className="material-icons">edit</span>
              </button>
            ) : null}
          </div>
        </div>
      </div>
      {showUpdateModal ? (
        <div className="w-full h-screen bg-black bg-opacity-50 left-0 top-0 fixed z-[9999]">
          <UpdateCategoryModal
            getCategoryData={() => getCategoryData}
            closeModal={closeUpdateCatModal}
            categoryName={props.data.categoryName}
            categoryDescription={props.data.categoryDescription}
            categoryImage={props.data.categoryImage}
            categoryId={props.data.id}
          />
        </div>
      ) : null}
    </>
  );
};

export default CategoryCard;
