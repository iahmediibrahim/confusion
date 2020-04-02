import React from 'react';
import Menu from './Menu';
import Home from './Home';
import About from './About';
import Dishdetail from './Dishdetail';
import Header from './Header';
import Contact from './Contact';
import Footer from './Footer';
import { Switch, Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment } from '../redux/ActionCreators';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,
    };
};

const mapDispatchToProps = (dispatch) => ({
    addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
});
class Main extends React.Component {
    render() {
        const { dishes, promotions, leaders, comments, addComment } = this.props;
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
                    addComment={addComment}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
