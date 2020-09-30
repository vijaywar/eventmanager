import React from 'react';
import Bar from './layout/Bar'
import './App.css';
import AddEvent from './data/AddEvent'
import Dashboard from './layout/Dashboard'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import store from './store'
import { Provider } from 'react-redux';
import firebase from 'firebase/app'
import Login from './login/Login'
import Register from './login/Register'
import Edit from './data/Edit'
import { UserIsAuthenticated } from './auth'
import Notfound from './Notfound'
function App() {
  const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }
  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
  }

  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>


        <div className="div">
          <Router>
            <Bar />

            <Switch>
              <Route exact path='/Edit/:id' component={UserIsAuthenticated(Edit)} />
              <Route exact path='/' component={Dashboard} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/data/AddEvent' component={UserIsAuthenticated(AddEvent)} />
              <Route exact path='/Register' component={Register} />
              <Route component={Notfound} />
            </Switch>
          </Router>
        </div>
      </ReactReduxFirebaseProvider>
    </Provider>
  );

}
export default App;
