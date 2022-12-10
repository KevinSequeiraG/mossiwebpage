import { NavBar } from "../../components/navbar"

const Nosotros = () => {
    return (
        <div className="bg-black bgMain w-screem h-screen z-10">
            <NavBar />
            <img src='./Images/Logo.png' className='w-[25rem] centerLogo'></img>
            <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] border border-white p-10 rounded-xl bg-black bg-opacity-50">
                <h1 className="text-center text-[2rem] font-bold mb-8 text-white italic underline">Un poco acerca de nosotros</h1>
                <p className="text-white  text-[1.4rem] text-center ">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean elit tortor, auctor quis tellus convallis, posuere euismod nisi. Aenean ut mauris auctor nulla vehicula molestie. Quisque elit nisl, lobortis eu pharetra in, efficitur quis sem. Vivamus hendrerit diam orci, at vulputate sapien sodales at. Fusce eu nisi ac mi porttitor porta. Morbi sed nunc vel leo feugiat dapibus. Phasellus dictum, libero ut rhoncus posuere, enim ex convallis dui, quis consectetur erat orci eu mauris. Nullam urna dolor, aliquam sed iaculis vel, vehicula facilisis nunc.

                    Curabitur id turpis odio. Donec sit amet quam eleifend, iaculis mi a, mattis odio. Nunc efficitur massa mattis porta varius. Aliquam fermentum lacinia justo et porttitor. Suspendisse finibus luctus nisi, a mollis elit tristique a. Fusce lectus quam, feugiat congue dolor vel, consequat ultrices magna. Nulla eget blandit neque, id scelerisque sapien. Fusce in fringilla magna, at tristique dui. Proin tincidunt varius magna non pretium. Donec maximus, nisi vitae vestibulum vulputate, augue purus porttitor dui, et lobortis libero metus eget arcu. Aenean gravida ultricies orci, sit amet volutpat ante. Nullam pretium tortor metus, eu lacinia est mattis vitae. Suspendisse in eleifend turpis. Cras sollicitudin sit amet leo ut gravida. Mauris vel nisi vel sem tincidunt sollicitudin vel sit amet justo. Praesent scelerisque efficitur tempus.
                </p>
            </div>
        </div>
    )
}

export default Nosotros;