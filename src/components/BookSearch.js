import React, {Component} from 'react'
import * as BooksAPI from '../BooksAPI'
import QueryBox from './QueryBox'
import BookList from './BookList'
import PropTypes from 'prop-types'


class BookSearch extends Component {

    state = {
        query: "",
        books: [],
    }        

    componentDidUpdate () {
        console.log('[BookSearch: Update] ' + this.state.query + ' '+ this.state.query.length) 
        console.log(this.state.books)
    }

    changeQueryHandler = (newQuery) => {

        if (newQuery === "") {
            this.setState( (prevState) => {
                return {query: "",books:[]}
            })
        }
        else {
            BooksAPI.search(newQuery).then(books => {
                if (books.error) {
                    this.setState( (prevState) => {
                        return {query: "",books:[]}
                    })
                }
                else {
                    this.setState( (prevState) => {
                        return {query: newQuery,books:books}
                    })
                }
            })
        }

    }


    getBooksByQuery1() {
        console.log('[BookSearch/getBooksByQuery] ',this.state.query)
        let searchQuery = this.state.query.toLowerCase()
        console.log('searchQuery '+searchQuery)
        // const filteredBooks = this.state.books.filter( b => b.title.toLowerCase().includes(searchQuery) )
        
        console.log(this.state.books)

        const filteredBooks = this.state.books.filter( function(b) {
            let book_title = b.title.toLowerCase()
            const reducer = (acc,cur) => acc + cur.toLowerCase()
            let book_author = b.authors.reduce(reducer).toLowerCase()
            console.log("Authors "+book_author)
            return ( book_title.includes(searchQuery) || book_author.includes(searchQuery)  )
        })
        
        return(filteredBooks)
    }

    getBooksByQuery() {
        if (this.state.query === "") {
            return []
        }

        BooksAPI.search(this.state.query).then(books => {
            this.setState({books})
        })
        return 

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

