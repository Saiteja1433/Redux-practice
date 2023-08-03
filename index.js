//We create a store
//declare the inital state and reducer
// define the actions and action creater
//subscribe to the store
// dispatch the actions to update the store

const redux = require("redux")
//we add the redux library into the application using require
//redux library provides the method called "createStore" which can be accessed using the redux.createStore
//but createStore method is deprecated in the new version of the redux so,
//we use the legacy_createStore method from the redux library which is similar to the createStore method.
// we create a central store using the redux.legacy_createStore (redux.createStore is the original but redux.createStore is deprecated)
//so we use the redux.leagcy_createStore to create a redux store


//creates a REDUX STORE that hold the state tree of the application
// the only way to change the state of the store is to call the dispatch function on it
const createStore = redux.legacy_createStore;



//Redux provides the method called the combineReducers() which is used to combine the multiple reducers into one reducer function
const combineReducers = redux.combineReducers

const BUY_CAKE = "BUY_CAKE"

// this (buyCake) function is the Action Creator
// Action Creator is a function with returns the Action object
function buyCake() {
    // this is the REDUX ACTION object with "type" as the property
    
    return {
        type: BUY_CAKE,
        info: "This is the first Redux Action"
    }
}

function buyIceCream() {
    // this is the REDUX ACTION object with "type" as the property
    
    return {
        type: "BUY_ICECREAM",
        info: "This is the first Redux Action"
    }
}

//this is the initial state of the application which is represented using the javaScript object
// const initialState = {
//     numberOfCakes: 10,
//     numberOfIceCream : 10
// }


// splited the the above initial state object into two initial state objects
//by this we can handle each state seperatly with out confusion


const initialCakeState ={
    numberOfCakes: 10
}

const initialIceCreamState ={
    numberOfIceCream: 10
}


// // function reducer(state= initialState, action){
// //     switch(action.type){
// //         case BUY_CAKE: {
// // ...reducer,
// //             numberOfCakes :  numberOfCakes-1
// //         } 
// //     }
// // }


// // this is the Reducer fucntion, it accepts the 2 parameters by default they are initial state (or state before performing the action)
// // and "Action" is the another parameter
// const reducer = (state = initialState, action) => {
//     console.log(2, action)
//     switch (action.type) {
//         case BUY_CAKE: 
//             return {
//                 ...state,
//                 numberOfCakes: state.numberOfCakes- 1
//             }
        
//         case "BUY_ICECREAM": 
//             return {
//                 ...state,
//                 numberOfIceCream: state.numberOfIceCream- 1
//             }
//         break;
//         default: return state
//     }
// }

//converted the above large reducer into the 2 small and individual reducers which can help
// us in the clear code and look more modular and easy update track the changes easily
const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case BUY_CAKE: 
            return {
                ...state,
                numberOfCakes: state.numberOfCakes- 1
            }
        default: return state
    }
}


const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case "BUY_ICECREAM": 
            return {
                ...state,
                numberOfIceCream: state.numberOfIceCream- 1
            }
        default: return state
    }
}


// combineReducer function accepts the object as its parameter, 
//where this object contains the key:value pair of the all the reducers
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream : iceCreamReducer
})
// now we pass this rootReducer as the reducer function of the REDUXSTORE



//createStore (redux.legacy_createStore) is the method, it accpets the reducer function as its parameter
//reducer function has the initial state of the store and it can perform the different transicitons on the store
// based up no the action it receives
// In the below line of code we initilize our redux store holding the application state
const store = createStore(rootReducer)



//store.getState() getState() is the method by which we can get the present state of the store
console.log("state :", store.getState());



//store.subscribe(), subscribe() method is used to subscribe to the store for the changes on the store
//subscribe is the listener which get called automatically when we update the state of the store
// store.subscribe(() => { console.log("updated state :" ,store.getState())})
store.subscribe(() =>  console.log("updated state :" ,store.getState()))


//store provides a method called the dispatch()  to update the state of the store
//we have to pass the action object to the dispatch method
// store.dispatch({type:"BUY_CAKE"}) <-- we can also use this
store.dispatch(buyCake())

store.dispatch(buyIceCream())
store.dispatch(buyIceCream())
store.dispatch(buyIceCream())


