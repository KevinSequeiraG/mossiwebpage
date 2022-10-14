const CategoryCard = (props) => {
    return (
        <div className="card flex flex-col">
            <div className="z-[2] bg-[#191c29] cardSize">
                <img src={props.data.categoryImgUrl==""?"./Images/Panaderia.png":null} className="rounded-lg"></img>
                <h1 className="text-gray-200 mt-2 px-4">{props.data.name}</h1>
                <p className="text-gray-200 text-[1rem] mt-4 px-4">{props.data.description} </p>
                <button className="text-[.7rem] lg:text-[1rem] mt-8 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-700">Ver productos</button>
                <div className="mt-6" >
                    <button className="bg-red-500 text-white rounded-[50%] border border-white w-[2rem] h-[2rem] mx-2 hover:bg-red-800">
                        <span className="material-icons">
                            close
                        </span>
                    </button>
                    <button className="bg-yellow-500 text-white rounded-[50%] border border-white w-[2rem] h-[2rem] mx-2 hover:bg-yellow-600">
                        <span className="material-icons">
                            edit
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategoryCard;