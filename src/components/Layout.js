import React, {Component} from 'react';
import Auxy from './Auxy';
import Toolbar from './Toolbar'


class Layout extends Component {


    render () {
        //const childrenWithProps = React.Children.map(this.props.children, child =>
        //    React.cloneElement(child, { showNav: this.showNavHandler }));

        return (
            <Auxy>
                <Toolbar />
                <main> 
                    {this.props.children}
                </main>
            </Auxy>
    
        )
    }

}


export default Layout;

