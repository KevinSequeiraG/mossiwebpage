import Footer from "../../components/footer";
import { NavBar } from "../../components/navbar";
import 'material-icons/iconfont/material-icons.css';
import CategoryCard from "../../components/categoryCard";
import NewCategoryModal from "../../components/newCategoryModal";
import { useState } from "react";

const Menu = () => {
    const [showNewCatModal, setShowNewCatModal] = useState(false)
    const closeModal = () => {
        setShowNewCatModal(false)
    }

    return (
        <div className="relative  overflow-hidden">
            <NavBar />

            <div className={`cardsContainer w-full ${showNewCatModal ? 'h-screen' : 'h-full'} py-20 bgMain`}>
                <div className="text-right w-11/12 mr-auto">
                    <button className="text-[1rem] mt-2 lg:mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 mb-10 mr-2" onClick={() => { setShowNewCatModal(true) }}>Crear nueva categoría</button>
                    <button className="text-[1rem] mt-2 lg:mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 mb-10">Mantenimiento</button>
                </div>
                <div className="w-11/12 h-11/12 top-40 inset-x-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto justify-items-center gap-y-24">
                    <CategoryCard />
                    <CategoryCard />
                    <CategoryCard />
                    <CategoryCard />
                    <CategoryCard />
                    <CategoryCard />
                    <CategoryCard />
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