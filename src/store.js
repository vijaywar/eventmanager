
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore' // <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, combineReducers, compose } from 'redux'
import {
    reactReduxFirebase,
    firebaseReducer
} from 'react-redux-firebase'

import { reduxFirestore, firestoreReducer } from 'redux-firestore' // <- needed if using firestore

const fbConfig = {
    apiKey: "AIzaSyBLA1ik3eJI9B6vU930LVdq67PCQDP3M_g",
    authDomain: "controlpanelsue.firebaseapp.com",
    databaseURL: "https://controlpanelsue.firebaseio.com",
    projectId: "controlpanelsue",
    storageBucket: "controlpanelsue.appspot.com",
    messagingSenderId: "473801534894",
    appId: "1:473801534894:web:d5529d6b65c22af6d12c3f",
    measurementId: "G-QM7MRNG500"
}


// Initialize firebase instance
firebase.initializeApp(fbConfig)
// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer // <- needed if using firestore
})

// Create store with reducers and initial state reactReduxFirebase(firebase),
const initialState = {}



const store = createStore(rootReducer, initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;