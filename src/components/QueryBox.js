import React from 'react'
import {Link} from 'react-router-dom'

const queryBox = (props) =>  (

    <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>

        <div className="search-books-input-wrapper">
            <input name="queryBox" type="text" placeholder="Search by title or author" 
                onChange={(event) => props.changeQuery(event.target.value)} />
        </div>
    </div>
    
)

export default queryBox