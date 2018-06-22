import React from 'react'
import Book from './Book'


const bookList = (props) => {

    let heading = ""
    if (props.heading !== "") {
        heading = <h1 className="bookshelf-title">{props.heading} </h1>
    }

    return (

        <div className="bookshelf">
            {heading}
            <div className="books-grid">
                {props.books.map( book => (
                        <Book key={book.id} book={book} changeShelf={props.changeShelf} />
                    )
                )}
            </div>

        </div>
    )

}

export default bookList