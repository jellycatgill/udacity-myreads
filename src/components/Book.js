import React from 'react'
import ShelfChanger from './ShelfChanger'





const book = (props) =>  (

    <div className="book">
        <div className="book-top">
            <div className="book-cover"><img alt={props.book.title} src={props.book.imageLinks.thumbnail} /> </div>
            <ShelfChanger currentShelf={props.book.shelf} changeShelf={props.changeShelf} book={props.book} />
        </div>
        <li className="book-title">{props.book.title}</li>
        <li className="book-authors">{props.book.authors}</li>
    </div>
);

export default book