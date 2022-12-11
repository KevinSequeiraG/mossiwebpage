import { NavBar } from "../../components/navbar"

const Nosotros = () => {
    return (
        <div className="bg-black bgMain w-screem h-screen z-10">
            <NavBar />
            <img src='./Images/Logo.png' className='w-[25rem] centerLogo'></img>
            <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] border border-white p-10 rounded-xl bg-black bg-opacity-50 w-11/12 lg:w-7/12 h-min overflow-y-auto">
                <h1 className="text-center text-[18px] lg:text-[2rem] font-bold mb-4 lg:mb-8 text-white italic underline">Un poco acerca de nosotros</h1>
                <div className="text-white text-[16px] lg:text-[1.4rem] text-justify ">
                    
                    Mossi Food Service es un emprendimiento que hace realidad tus sueños, brindamos un excelente servicio, con productos artesanales y de alta calidad. <br/>
                    Puedes encontrarnos en redes sociales, publicamos nuestros nuevos productos enfocados en distintas temáticas como cumpleaños, navidad o cualquier otra ocasión especial que vayas a celebrar ¡No te lo pierdas!<br/>
                </div>
            </div>
        </div>
    )
}

export default Nosotros;