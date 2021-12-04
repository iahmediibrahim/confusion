import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
const headers = {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json;odata.metadata=full',
    'Content-Type': 'application/json',
};
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment,
});
export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    const newComment = {
        dishId,
        rating,
        author,
        comment,
    };
    newComment.date = new Date().toISOString();
    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers,
        credentials: 'same-origin',
    })
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            (error) => {
                throw error;
            },
        )
        .then((response) => response.json())
        .then((response) => dispatch(addComment(response)))
        .catch((error) => {
            console.log('post comments', error.message);
            alert('Your comment could not be posted\nError: ' + error.message);
        });
};

// Dishes actions
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    return fetch(baseUrl + 'dishes', { headers })
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            (error) => {
                const errmess = new Error(error.message);
                throw errmess;
            },
        )
        .then((response) => response.json())
        .then((dishes) => dispatch(addDishes(dishes)))
        .catch((error) => dispatch(dishesFailed(error.message)));
};
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess,
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes,
});

// Comments actions
export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments', { headers })
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            (error) => {
                const errmess = new Error(error.message);
                throw errmess;
            },
        )
        .then((response) => response.json())
        .then((comments) => dispatch(addComments(comments)))
        .catch((error) => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess,
});
export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments,
});

// Promotions actions

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions', { headers })
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            (error) => {
                const errmess = new Error(error.message);
                throw errmess;
            },
        )
        .then((response) => response.json())
        .then((promos) => dispatch(addPromos(promos)))
        .catch((error) => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => (dispatch) => ({
    type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess,
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos,
});

// Leaders actions
export const fetchLeaders = () => (dispatch) => {
    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders', { headers })
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            (error) => {
                const errmess = new Error(error.message);
                throw errmess;
            },
        )
        .then((response) => response.json())
        .then((leaders) => dispatch(addLeaders(leaders)))
        .catch((error) => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess,
});

export const addLeaders = (Leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: Leaders,
});

// send feedback
export const postFeedback = (feedback) => (dispatch) => {
    const newFeedback = Object.assign({ date: new Date().toISOString() }, feedback);

    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers,
        credentials: 'same-origin',
    })
        .then(
            (response) => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;

                    throw error;
                }
            },
            (error) => {
                var errorMessage = new Error(error.errorMessage);
                throw errorMessage;
            },
        )
        .then((response) => response.json())
        .then((response) => alert(JSON.stringify(response)))
        .catch((error) => {
            console.log('Post feedback: ' + error.message);
            alert('Feedback could not be posted:\n' + error.message);
        });
};
