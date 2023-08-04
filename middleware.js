//Middleware provied the a third party extension point between dispatcing the action and 
//the moment it reaches the Reducer
//To know the working of the code(other than middleware) see the index.js



const redux = require("redux")
const createStore = redux.legacy_createStore;


//REDUX-LOGGER is the library is used to log all the information in the console of our Application
//We need to install and require the REDUX-LOGGER  into our application
const reduxLogger = require('redux-logger')
// we need to use createLogger() function to create the logger to the application
const logger = reduxLogger.createLogger();

//To use the middleware, redux provides the applyMiddleware function by which we can use the middleware in our applications
const applyMiddleware = redux.applyMiddleware;


const BUY_CAKE = "BUY_CAKE"
function buyCake() {
    return {
        type: BUY_CAKE,
        info: "This is the first Redux Action"
    }
}



const initialState = {
    numberOfCakes: 10
}




const reducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numberOfCakes: state.numberOfCakes - 1
            }
        default: return state
    }
}




//Then we pass the applyMiddleware the 2nd argument for the createStore function
//And the applyMiddleware function accpetes the MIDDLERWARE function as is parameter
//In below code we can see we are passing applyMiddlewarer as the parameter to the createStore function
//And logger(redux-logger) middleware is passed as the argument for the applyMiddleware 
const store = createStore(reducer, applyMiddleware(logger))


store.dispatch(buyCake())


//Below output will be displayed when we run the code using "node middleware.js"
//---------------OUTPUT----------
//    action BUY_CAKE @ 10:16:35.827
//    prev state { numberOfCakes: 10 }
//    action     { type: 'BUY_CAKE', info: 'This is the first Redux Action' }
//    next state { numberOfCakes: 9 }


