import Footer from "../../components/footer";
import { NavBar } from "../../components/navbar";

const Menu = () => {
    return (
        <>
            <NavBar />

            <div className="cardsContainer w-full h-full py-20 bgMain ">
                <div className="text-right w-11/12 mr-auto">
                    <button className="text-[1rem] mt-2 lg:mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700 mb-10">Mantenimiento</button>
                </div>
                <div className="w-11/12 h-11/12 top-40 inset-x-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto justify-items-center gap-y-24">
                    <div className="card flex flex-col">
                        <div className="z-[2] bg-[#191c29] cardSize">
                            <img src="./Images/Panaderia.png" className="rounded-lg"></img>
                            <h1 className="text-gray-200 mt-2 px-4">Panaderia</h1>
                            <p className="text-gray-200 text-[1rem] mt-4 px-4">Encuentra en esta seccion nuestros deliciosos </p>
                            <button className="text-[.7rem] lg:text-[1rem] mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700">Ver productos</button>
                        </div>
                    </div>
                    <div className="card flex flex-col">
                        <div className="z-[2] bg-[#191c29] cardSize">
                            <img src="./Images/Panaderia.png" className="rounded-lg"></img>
                            <h1 className="text-gray-200 mt-2 px-4">Panaderia</h1>
                            <p className="text-gray-200 text-[1rem] mt-4 px-4">Encuentra en esta seccion nuestros deliciosos </p>
                            <button className="text-[.7rem] lg:text-[1rem] mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700">Ver productos</button>
                        </div>
                    </div>
                    <div className="card flex flex-col">
                        <div className="z-[2] bg-[#191c29] cardSize">
                            <img src="./Images/Panaderia.png" className="rounded-lg"></img>
                            <h1 className="text-gray-200 mt-2 px-4">Panaderia</h1>
                            <p className="text-gray-200 text-[1rem] mt-4 px-4">Encuentra en esta seccion nuestros deliciosos </p>
                            <button className="text-[.7rem] lg:text-[1rem] mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700">Ver productos</button>
                        </div>
                    </div>
                    <div className="card flex flex-col">
                        <div className="z-[2] bg-[#191c29] cardSize">
                            <img src="./Images/Panaderia.png" className="rounded-lg"></img>
                            <h1 className="text-gray-200 mt-2 px-4">Panaderia</h1>
                            <p className="text-gray-200 text-[1rem] mt-4 px-4">Encuentra en esta seccion nuestros deliciosos </p>
                            <button className="text-[.7rem] lg:text-[1rem] mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700">Ver productos</button>
                        </div>
                    </div>
                    <div className="card flex flex-col">
                        <div className="z-[2] bg-[#191c29] cardSize">
                            <img src="./Images/Panaderia.png" className="rounded-lg"></img>
                            <h1 className="text-gray-200 mt-2 px-4">Panaderia</h1>
                            <p className="text-gray-200 text-[1rem] mt-4 px-4">Encuentra en esta seccion nuestros deliciosos </p>
                            <button className="text-[.7rem] lg:text-[1rem] mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700">Ver productos</button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default Menu;