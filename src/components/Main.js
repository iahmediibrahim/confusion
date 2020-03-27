import React from 'react';

import Menu from './Menu';
import Home from './Home';
import About from './About';
import Dishdetail from './Dishdetail';
import Header from './Header';
import Contact from './Contact';
import Footer from './Footer';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { Switch, Redirect, Route } from 'react-router-dom';

class Main extends React.Component {
    state = {
        dishes: DISHES,
        comments: COMMENTS,
        promotions: PROMOTIONS,
        leaders: LEADERS,
    };

    render() {
        const { dishes, promotions, leaders, comments } = this.state;
        const HomePage = () => {
            return (
                <Home
                    dish={dishes.filter((dish) => dish.featured)[0]}
                    promotion={promotions.filter((promo) => promo.featured)[0]}
                    leader={leaders.filter((leader) => leader.featured)[0]}
                />
            );
        };

        const DishWithId = ({ match }) => {
            return (
                <Dishdetail
                    dish={dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments={comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                />
            );
        };
        return (
            <div>
                <Header />
                <div className="container">
                    <Switch>
                        <Route path="/home" component={HomePage} />
                        <Route exact path="/aboutus" component={() => <About leaders={leaders} />} />
                        <Route exact path="/menu" component={() => <Menu dishes={dishes} />} />
                        <Route path="/menu/:dishId" component={DishWithId} />
                        <Route exact path="/contactus" component={Contact} />
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
