import Head from 'next/head'
import Image from 'next/image'
import { NavBar } from '../components/navbar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="bg-black bgMain w-screem h-screen">
      <NavBar/>
    </div>
  )
}
