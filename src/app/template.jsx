import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import { AppProvider } from '@/context/AppContext';
import React from 'react'

const Template = ({ children }) => {
    return (
        <AppProvider>
            <Navbar/>
            {children}
            <Footer/>
        </AppProvider>
    )
}

export default Template;