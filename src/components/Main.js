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
import {
    fetchDishes,
    fetchComments,
    fetchPromos,
    fetchLeaders,
    postComment,
    postFeedback,
} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,
    };
};

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => dispatch(fetchDishes()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchComments: () => dispatch(fetchComments()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    postFeedback: (feedback) => dispatch(postFeedback(feedback)),
    resetFeedbackForm: () => dispatch(actions.reset('feedback')),
});

class Main extends React.Component {
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {
        const { dishes, promotions, leaders, comments, postComment, resetFeedbackForm, postFeedback } = this.props;
        const HomePage = () => {
            return (
                <Home
                    dish={dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={dishes.isLoading}
                    dishesErrMess={dishes.errMess}
                    promotion={promotions.promotions.filter((promo) => promo.featured)[0]}
                    promosLoading={promotions.isLoading}
                    promosErrMess={promotions.errMess}
                    leader={leaders.leaders.filter((leader) => leader.featured)[0]}
                    leadersLoading={leaders.isLoading}
                    leadersErrMess={leaders.errMess}
                />
            );
        };

        const DishWithId = ({ match }) => {
            return (
                <Dishdetail
                    dish={dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={dishes.isLoading}
                    errMess={dishes.errMess}
                    comments={comments.comments.filter(
                        (comment) => comment.dishId === parseInt(match.params.dishId, 10),
                    )}
                    commentsErrMess={comments.errMess}
                    postComment={postComment}
                />
            );
        };
        return (
            <div>
                <Header />
                <div className="container">
                    <TransitionGroup>
                        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                            <Switch>
                                <Route path="/confusion/home" component={HomePage} />
                                <Route
                                    exact
                                    path="/confusion/aboutus"
                                    component={() => <About leaders={leaders.leaders} />}
                                />
                                <Route exact path="/confusion/menu" component={() => <Menu dishes={dishes} />} />
                                <Route exact path="/confusion/menu/:dishId" component={DishWithId} />
                                <Route
                                    exact
                                    path="/confusion/contactus"
                                    component={() => (
                                        <Contact postFeedback={postFeedback} resetFeedbackForm={resetFeedbackForm} />
                                    )}
                                />
                                <Redirect exact to="/confusion/home" />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
