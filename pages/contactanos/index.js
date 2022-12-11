import { NavBar } from "../../components/navbar"
import SocialMedia from "../../components/SocialMedia";

const Contactanos = () => {
    return (
        <div className="bg-black bgMain w-screem h-screen z-10">
            <NavBar />
            <img src='./Images/Logo.png' className='w-[25rem] centerLogo'></img>
            <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] border border-white p-10 rounded-xl bg-black bg-opacity-50 w-8/12 lg:w-5/12 h-96 lg:h-auto overflow-y-auto">
                <h1 className="text-center text-[18px] lg:text-[2rem] font-bold mb-4 lg:mb-8 text-white italic underline">Como te puedes comunicar para hacer tú pedido</h1>
                <p className="text-white  text-[16px] lg:text-[1.4rem] text-justify ">
                    Recuerda que puedes comunicarte por medio de cualquiera de nuestras redes sociales, como Instagram o Facebook, además de esto te puedes comunicar de manera directa por medio de WhatsApp.

                    Acá te dejamos los links directos.
                    <div className="mt-10 text-center">
                        <SocialMedia />
                    </div>
                </p>
            </div>
        </div>
    )
}

export default Contactanos;