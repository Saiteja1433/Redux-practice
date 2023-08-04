const redux = require('redux')
const createStore = redux.legacy_createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')


//By using the THUNKMIDDLEWARE we can return a function as the ACTION INSTEAD THE ACTION OBJECT
// this function can have aysnc operatoin such as the API calls to thirdparty end-points

//intial state
const initialState= {
    loading: false,
    users: [],
    error: ''
}


//Actions
const FETCH_REQUEST = 'FETCH_USER_REQUEST';
const FETCH_REQUEST_SUCCESS = 'FETCH_REQUEST_SUCCESS';
const FETCH_REQUEST_FAILURE = 'FETCH_REQUEST_FAILURE';


//Action creators

const fetchUserRequest=  () =>{
        return {
            type: FETCH_REQUEST
        }
}


const fetchUserSuccess=  (userData) =>{
        return {
            type: FETCH_REQUEST_SUCCESS,
            payload: userData
        }
} 

const fetchUserFailure=  (error) =>{
        return {
            type: FETCH_REQUEST_FAILURE,
            payload: error
        }
}


const reducer = (state = initialState, action)=>{
    switch(action.type){
        case FETCH_REQUEST:
            return{
                ...state,
                loading: true
            }
        case FETCH_REQUEST_SUCCESS:
            return {
                loading:false,
                userData: action.payload,
                error:''
            }
        case FETCH_REQUEST_FAILURE:
            return {
                loading:false,
                userData:[],
                error: action.payload
            }    
    }
}

const fetchUsers=()=>{
    // now we can return the function rather than the object as the action
    // this return function accepts the dispatch as it default argument
    return (dispatch) =>{
        dispatch(fetchUserRequest());
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then((response) =>{
                let users = response.data.map(user=> user.id);
                dispatch(fetchUserSuccess(users))
            })
        .catch( error =>{
            dispatch(fetchUserFailure(error.message))
        })

    }
}


const store = createStore(reducer, applyMiddleware(thunkMiddleware))



store.dispatch(fetchUsers())

store.subscribe(()=> console.log("Updated state:", store.getState()));
