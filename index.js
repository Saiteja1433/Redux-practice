const BUY_CAKE = "BUY_CAKE"

// this (buyCake) function is the Action Creator
// Action Creator is a function with returns the Action object
function buyCake() {
    // this is the redux Action object with "type" as the property
    return {
        type: BUY_CAKE,
        info: "This is the first Redux Action"
    }
}

const initialState={
    numberOfCakes : 10
}



// function reducer(state= initialState, action){
//     switch(action.type){
//         case BUY_CAKE: {
                // ...reducer,
//             numberOfCakes :  numberOfCakes-1
//         } 
//     }
// }


const reducer = (state = initialState, action) =>{
    switch(action.type){
        case BUY_CAKE : return {
            ...state,
            numberOfCakes :  numberOfCakes-1
        }
        default : return state
    }
}
