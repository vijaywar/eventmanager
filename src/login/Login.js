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