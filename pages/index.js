import Head from 'next/head'
import Image from 'next/image'
import { NavBar } from '../components/navbar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="bg-black bgMain w-screem h-screen z-10">
      <NavBar />
      <img src='./Images/Logo.png' className='w-[25rem]  centerLogo'></img>
    </div>
  )
}
