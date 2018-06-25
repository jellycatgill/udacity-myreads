import React from 'react'
import { Link } from 'react-router-dom'




const toolbar = (props) => {

    return   (
        <header>
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>        
            <nav className="main-nav">
                <div className="open-search">
                    <Link to="/search">Search</Link>
                </div>
            </nav>
        </header>
    )
}

export default toolbar