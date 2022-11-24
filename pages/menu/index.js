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
import UpdateCategoryModal from "../../components/updateCategoryModal";
import { useUserAuth } from "../../lib/userAuthContext";

const Menu = () => {
    const [showNewCatModal, setShowNewCatModal] = useState(false);
    const [showMaintenance, setShowMaintence] = useState(false);
    const [categoryId, setCategoryId] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [categoryData, setCategoryData] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const {loggedUser} = useUserAuth()

    const closeNewCatModal = () => {
        setShowNewCatModal(false);
    }

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
    useEffect(() => {
        console.log("length", categoryData.length);
      console.log("categorias: ",categoryData);
    }, [categoryData])
    

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
        <div className={`relative ${showNewCatModal || showUpdateModal? 'h-screen overflow-hidden' : 'h-full'}`}>
            <NavBar />
            <div className={`cardsContainer w-full h-full ${loggedUser.name?'pt-20':'pt-32'} pb-[10rem] bgMain`}>
                <div className="text-right w-11/12 mr-auto">
                    {showMaintenance ? <button className="text-[1rem] mt-2 lg:mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 mb-10 mr-2" onClick={() => { setShowNewCatModal(true) }}>Crear nueva categoría</button> : null}
                    {loggedUser.name?<button className="text-[1rem] mt-2 lg:mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 mb-10" onClick={() => { setShowMaintence(!showMaintenance) }}>{showMaintenance ? 'Finalizar' : 'Mantenimiento'}</button>:null}
                </div>
                <div className="w-11/12 h-11/12 top-40 inset-x-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto justify-items-center gap-y-24">
                    {categoryData.map((data) => {
                        // eslint-disable-next-line react/jsx-key
                        return (<CategoryCard getCategoryData={getCategoryData} data={data} showMaintenance={showMaintenance}/>);
                    })}
                </div>
                <Footer />
            </div>
            {showNewCatModal ? <div className="w-full h-screen bg-black bg-opacity-50 absolute top-0 z-[999] fixed">
                <NewCategoryModal closeModal={closeNewCatModal} getCategoryData={getCategoryData} />
            </div> : null}            
        </div>
    )
}

export default Menu;