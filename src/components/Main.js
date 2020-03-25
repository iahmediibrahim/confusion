import React from 'react';

import Menu from './Menu';
import Home from './Home';
import Dishdetail from './Dishdetail';
import Header from './Header';
import Footer from './Footer';
import { DISHES } from '../shared/dishes';
import { Switch, Redirect, Route } from 'react-router-dom';
class Main extends React.Component {
    state = {
        dishes: DISHES,
        selectedDish: null,
    };
    onDishSelect(dishId) {
        this.setState({ selectedDish: dishId });
    }
    render() {
        const { dishes, selectedDish } = this.state;

        return (
            <div>
                <Header />
                <div className="container">
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route
                            exact
                            path="/menu"
                            component={() => (
                                <Menu
                                    dishes={dishes}
                                    onClick={(dishId) => this.onDishSelect(dishId)}
                                    onDishSelect={this.onDishSelect}
                                />
                            )}
                        />
                        <Redirect to="/home" />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Main;
// <Menu

// />
// <Dishdetail dish={dishes.find((dish) => dish.id === selectedDish)} />
