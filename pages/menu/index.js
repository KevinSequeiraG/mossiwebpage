import Footer from "../../components/footer";
import { NavBar } from "../../components/navbar";
import 'material-icons/iconfont/material-icons.css';
import CategoryCard from "../../components/categoryCard";
import NewCategoryModal from "../../components/newCategoryModal";
import { useState, useEffect } from "react";

import { database } from "../../lib/firebaseConfig";
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

const Menu = () => {
    const [showNewCatModal, setShowNewCatModal] = useState(false);
    const [showMaintenance, setShowMaintence] = useState(false);
    const [categoryId, setCategoryId] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [categoryData, setCategoryData] = useState([]);

    const closeModal = () => {
        setShowNewCatModal(false);
    }

    const createCategory = () => {
        const categoryRef = collection(database, `mossy/data/category`);
        addDoc(categoryRef, {
            categoryId: categoryId,
            name: categoryName,
            description: categoryDescription,
        })
            .then(() => {
                Toast.fire({
                    icon: "success",
                    title: "Categoria creada con éxito", //`${t("toastCreateSuccess")}`
                });
            })
            .catch((err) => {
                console.error(err);
                Toast.fire({
                    icon: "error",
                    title: `${t("toastCreateFail")}`,
                });
            });
    };

    const updateCategory = () => {
        let categoryToEdit = doc(
            database,
            `mossy/data/eventAccess`,
            id
        );
        updateDoc(categoryToEdit, {
            name: categoryName,
            description: categoryDescription,
        })
            .then(() => {
                Toast.fire({
                    icon: "success",
                    title: `Categoria actualizada`,
                });
            })
            .catch((err) => {
                console.log(err);
                Toast.fire({
                    icon: "success",
                    title: err,
                });
            });
    };

    const deleteCategory = (id) => {
        let categoryToDelete = doc(database, `mossy/data/category`, id);
        deleteDoc(categoryToDelete)
            .then(() => {
                Toast.fire({
                    icon: "success",
                    title: `Categoria removida con éxito`,
                });
            })
            .catch((err) => {
                //alert("Esta campaña no se puede eliminar");
                Toast.fire({
                    icon: "error",
                    title: "No se puede eliminar", //`${t("toastDeleteFail")}`
                });
            });
    };

    const getCategoryData = async () => {
        const categoryRef = collection(database, `mossy/data/category`);
        await getDocs(categoryRef).then((response) => {
            setCategoryData(
                response.docs.map((data) => {
                    return { ...data.data(), id: data.id };
                })
            );
        });
    };

    useEffect(() => {
        return () => {
            getCategoryData()
        }
    }, [])

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
        <div className="relative h-screen overflow-hidden">
            <NavBar />
            <div className={`cardsContainer w-full ${showNewCatModal ? 'h-screen' : 'h-full'} py-20 bgMain`}>
                <div className="text-right w-11/12 mr-auto">
                    {showMaintenance ? <button className="text-[1rem] mt-2 lg:mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 mb-10 mr-2" onClick={() => { setShowNewCatModal(true) }}>Crear nueva categoría</button> : null}
                    <button className="text-[1rem] mt-2 lg:mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 mb-10" onClick={() => { setShowMaintence(!showMaintenance) }}>{showMaintenance?'Finalizar':'Mantenimiento'}</button>
                </div>
                <div className="w-11/12 h-11/12 top-40 inset-x-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto justify-items-center gap-y-24">
                    {categoryData.map((data) => {
                        // eslint-disable-next-line react/jsx-key
                        return (<CategoryCard data={data} showMaintenance={showMaintenance}/>);
                    })}
                </div>
                <Footer />
            </div>
            {showNewCatModal ? <div className="w-full h-screen bg-black bg-opacity-50 absolute top-0 z-[999] fixed">
                {/* <button className="absolute right-[30rem] top-[10rem] bg-red-500 text-white rounded-[50%] border border-white w-[4rem] z-[9999] h-[4rem] mx-2 hover:bg-red-800">
                    <span className="material-icons !text-[50px]">
                        close
                    </span>
                </button> */}
                <NewCategoryModal closeModal={closeModal} />
            </div> : null}
        </div>
    )
}

export default Menu;