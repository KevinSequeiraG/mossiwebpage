import Link from 'next/link';
import SocialMedia from './SocialMedia'
import Logo from "../public/Images/LogoTemp.png"

export const NavBar = () => {
    const openMenu = () => {
        const menuContainer = document.getElementById('navbar-default');
        const navContainer = document.getElementById('navegator');
        if (menuContainer.classList.contains('hidden')) {
            menuContainer.classList.remove("hidden")

            navContainer.classList.remove('bg-opacity-50')
        } else {
            menuContainer.classList.add("hidden")
            navContainer.classList.add('bg-opacity-50')
        }

    }

    return (
        <>
            <nav id='navegator' className="bg-white lg:bg-transparent bg-opacity-50 border-gray-200 px-2 sm:px-4 py-2.5 rounded z-50 fixed w-full">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <a href="" className="flex items-center">
                        <img src='../Images/LogoTemp.png' className='w-[3rem] h-[3rem] lg:w-[5rem] lg:h-[5rem]' />
                        {/* <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Mossi Food Service</span> */}
                    </a>
                    <button onClick={() => { openMenu(); }} data-collapse-toggle="navbar-default" type="button" className="mr-6 inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none" aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-8 h-8" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto relative" id="navbar-default">
                        <ul className="flex flex-col items-center px-4 pb-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 text-right">
                            <Link href={'/login'}>
                                <li className='w-full lg:w-auto py-2 pr-4 pl-3'>
                                    <a href="#" className="block rounded md:hover:bg-transparent md:border-0 md:p-0 text-gray-700 text-[1rem] hover:text-white" aria-current="page">Ingresar</a>
                                </li>
                            </Link>
                            <Link href={'/'}>
                                <li className='w-full lg:w-auto py-2 pr-4 pl-3'>
                                    <a href="#" className="block rounded md:hover:bg-transparent md:border-0 md:p-0 text-gray-700 text-[1rem] hover:text-white" aria-current="page">Home</a>
                                </li>
                            </Link>
                            <Link href={'/menu'}>
                                <li className='w-full lg:w-auto py-2 pr-4 pl-3'>
                                    <a href="#" className="block rounded md:hover:bg-transparent md:border-0 md:p-0 text-gray-700 text-[1rem] hover:text-white">Menú</a>
                                </li>
                            </Link>
                            <li className='w-full lg:w-auto py-2 pr-4 pl-3'>
                                <a href="#" className="block rounded md:hover:bg-transparent md:border-0 md:p-0 text-gray-700 text-[1rem] hover:text-white">Nosotros</a>
                            </li>
                            <li className='w-full lg:w-auto py-2 pr-4 pl-3'>
                                <a href="#" className="block rounded md:hover:bg-transparent md:border-0 md:p-0 text-gray-700 text-[1rem] hover:text-white">Contactanos</a>
                            </li>
                            <li className='w-full lg:w-auto py-2 pr-4 pl-3'>
                                <SocialMedia />
                            </li>
                            {/* <li>
                            <a className="text-white" href="mailto:kevinsteven.07.sg@gmail.com">Contactanos</a>
                        </li> */}
                        </ul>


                    </div>
                </div>
            </nav>
        </>
    )
}