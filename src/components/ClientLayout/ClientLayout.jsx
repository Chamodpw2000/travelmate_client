import React from 'react'
import Footer from '../footer/Footer'
import NavbarComponent from '../navbarComponent/NavbarComponent'
import { Outlet } from 'react-router-dom'

const ClientLayout = () => {
    return (
        <div>
           <NavbarComponent />
      <main>
      <Outlet />
      </main>
    <Footer />
        </div>
    )
}

export default ClientLayout