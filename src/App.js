import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

import logo from './logo.svg';
import './App.css';
import Menu from './components/Menu';
import { DISHES } from './shared/dishes';
class App extends React.Component {
    state = {
        dishes: DISHES,
    };
    render() {
        return (
            <div>
                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
                    </div>
                </Navbar>
                <Menu dishes={this.state.dishes} />
            </div>
        );
    }
}

export default App;
