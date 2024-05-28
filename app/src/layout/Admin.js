import React from 'react'
import Aside from '../components/Admin/Aside/Aside'
import Header from '../components/Admin/Header/Header'

const AdminLayout = ({ children }) => {
    return (
        <>
            <Header />
            <Aside />
            {children}
        </>

    )
}

export default AdminLayout
