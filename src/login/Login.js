import React, { Component } from 'react'

import { firebaseConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

import { connect } from 'react-redux'
class Login extends Component {

    state = {
        email: '',
        password: ''
    }
    signup(res) {
        const googleresponse = {
            Name: res.profileObj.name,
            email: res.profileObj.email,
            token: res.googleId,
            Image: res.profileObj.imageUrl,
            ProviderId: 'Google',
            googleId: res.profileObj.googleId

        };

        const { firebase } = this.props;
        const { email, googleId } = googleresponse;
        console.log(googleId);
        var pre = false;
        // aka.map(i => (i.email === email ? (pre = false) : null))
        var password = googleId.toString();
        firebase.login({ email, password }).catch(err => (
            pre = true));
        if (pre) {
            firebase.createUser({ email, password }).then(this.props.history.push('./'))
        }


    };
    onchange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onsubmit = e => {
        e.preventDefault();
        const { email, password } = this.state;
        const { firebase } = this.props;
        firebase.login({ email, password }).catch(err => alert('Invalid LOgin Creditionals'));
    }

    render() {
        const responseGoogle = (response) => {
            if (response) {
                var res = response.profileObj;
                console.log(res);
                this.signup(response);
            }

        }
        const { email, password } = this.state;

        return (

            <div >
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center pb-4 pt-3">
                                <span className="text-dark">
                                    Login
                              </span>
                            </h1>
                            <GoogleLogin
                                clientId="473801534894-odpiok16a0m9ch62a85mn6g1m4u1r073.apps.googleusercontent.com"

                                buttonText="Login with Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}

                                isSignedIn={true}
                            />,
                {document.getElementById('googleButton')}
                            <form onSubmit={this.onsubmit}>
                                <label htmlFor="email" className="form-group">
                                    Email
                               </label>
                                <input type="password" name='email' onChange={this.onchange} value={email} required className="form-control" />
                                <label htmlFor="password" className="form-group">
                                    Password </label>
                                <input type="text" name='password' onChange={this.onchange} value={password} required className="form-control" />
                                <button type='submit' style={{ float: 'right' }} className="btn btn-success">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>


            </div >
        )
    }
}
const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,

    }
}
Login.propTypes = {
    firebase: PropTypes.object.isRequired
}
export default firebaseConnect()(Login)