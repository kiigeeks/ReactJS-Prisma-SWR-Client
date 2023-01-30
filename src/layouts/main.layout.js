import React from 'react'
import Navbar from '../components/navbar'

const MainLayouts = ({ children }) => {
    return (
        <React.Fragment>
            <Navbar />
            {children}
        </React.Fragment>
    )
}

export default MainLayouts