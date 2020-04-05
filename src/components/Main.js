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
import { addComment, fetchDishes } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

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
    fetchDishes: () => dispatch(fetchDishes()),
    resetFeedbackForm: () => {
        dispatch(actions.reset('feedback'));
    },
});
class Main extends React.Component {
    componentDidMount() {
        this.props.fetchDishes();
    }
    render() {
        const { dishes, promotions, leaders, comments, addComment, resetFeedbackForm } = this.props;
        const HomePage = () => {
            return (
                <Home
                    dish={dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={dishes.isLoading}
                    dishesErrMess={dishes.errMess}
                    promotion={promotions.filter((promo) => promo.featured)[0]}
                    leader={leaders.filter((leader) => leader.featured)[0]}
                />
            );
        };

        const DishWithId = ({ match }) => {
            return (
                <Dishdetail
                    dish={dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={dishes.isLoading}
                    errMess={dishes.errMess}
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
                        <Route
                            exact
                            path="/contactus"
                            component={() => <Contact resetFeedbackForm={resetFeedbackForm} />}
                        />
                        <Redirect to="/home" />
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
