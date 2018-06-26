import React, {Component} from 'react'
import * as BooksAPI from '../BooksAPI'
import QueryBox from './QueryBox'
import BookList from './BookList'
import PropTypes from 'prop-types'


class BookSearch extends Component {

    state = {
        query: "",
        books: [],
        books_all: [],
    }        

    findBookInList = id => {
        return this.state.books_all.findIndex(book => book.id === id)
    }

    componentDidUpdate () {
        console.log('[BookSearch: Update] ' + this.state.query + ' '+ this.state.query.length) 
        console.log(this.state.books)
    }

    componentDidMount () {
        console.log('[BookSearch: Mounted] ' + this.state.query + ' '+ this.state.query.length) 
        BooksAPI.getAll().then(books_all => {
            this.setState({books_all})
        })
    }

    changeQueryHandler = (newQuery='') => {

        if (newQuery === "") {
            this.setState( (prevState) => {
                return {query: "",books:[]}
            })
        }
        else {
            BooksAPI.search(newQuery).then(books => {
                if (books.error || books.length === 0) {
                    this.setState( (prevState) => {
                        return {query: "",books:[]}
                    })
                }
                else {

                    books = books.map(book => {
                        const idx = this.findBookInList(book.id);
                        return idx !== -1
                          ? this.state.books_all[idx]
                          : Object.assign(book, { shelf: "none" });
                      });

                    

                    this.setState( (prevState) => {
                        return {query: newQuery,books:books}
                    })
                }
            })
        }

    }



    changeShelfHandler = (book,newShelf) => {
        console.log(book.id + ' '+newShelf)
        BooksAPI.update(book,newShelf).then( () => {
            book.shelf = newShelf;
            const books = this.state.books.filter(b => b.id !== book.id).concat([book])
            this.setState({books})
        })
    }


    render () {
        return (
            <div>
                <QueryBox changeQuery={this.changeQueryHandler} />
                <BookList heading="" books={this.state.books} changeShelf={this.changeShelfHandler} />
            </div>
        )
    }
}

export default BookSearch

BookSearch.propTypes = {
    query: PropTypes.string
}

