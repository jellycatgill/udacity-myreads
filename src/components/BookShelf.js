import React, {Component} from 'react'
import BookList from './BookList'
import * as BooksAPI from '../BooksAPI'


class BookShelf extends Component {
    state = {
        books: [],
        shelfList: {
            'wantToRead': 'Want to Read',
            'currentlyReading': 'Currently Reading',
            'read': 'Read',
        },
    }

    fetchBooks () {
        BooksAPI.getAll().then(books => {
            this.setState({books})
        })
    }

    
    changeShelfHandler = (book,newShelf) => {
        console.log(book.id + ' '+newShelf)
        BooksAPI.update(book,newShelf).then( () => {
            book.shelf = newShelf;
            const books = this.state.books.filter(b => b.id !== book.id).concat([book])
            this.setState({books})
        })
    }

    getShelfBooks(shelfName) {
        return this.state.books.filter( b => b.shelf === shelfName)
    }

    componentDidMount () {
        this.fetchBooks()
    }


    render() {

        let shelf_jsx = Object.keys(this.state.shelfList)
        .map( igKey => {
             return [...Array(this.state.shelfList[igKey])]
                 .map( (_,i) => {
                     return <BookList key={igKey+i} type={igKey} heading={this.state.shelfList[igKey]} books={this.getShelfBooks(igKey)} changeShelf={this.changeShelfHandler} />
                 } )
        } )
        .reduce( (arr,el) => {
             return arr.concat(el)
        },[])

        return (
            <div className="list-books-content">
            {shelf_jsx}
            </div>
            
        )
    }
}

export default BookShelf