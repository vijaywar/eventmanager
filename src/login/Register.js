import React, { Component } from 'react'
import { firebaseConnect } from 'react-redux-firebase'

class Register extends Component {
    state = {
        email: '',
        password: '',
        copassword: ''
    }
    onchange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onsubmit = (e) => {
        e.preventDefault();
        var k = false
        const { email, password, copassword } = this.state;
        var ak = password.length
        console.log(password.length)
        var lk = 6
        console.log(ak >= lk)
        //{ ak === lk ? (null) : null }

        {
            password === copassword && ak >= lk ? (this.props.firebase.createUser({ email, password }).then(this.props.history.push('./'))
            ) : (alert("Password and Confirm Password varies or Less than 6 digits"))
        }


    }
    render() {
        const { email, password, copassword } = this.state;
        return (

            <div >
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="text-center pb-4 pt-3">
                                <span className="text-dark">
                                    Register
                          </span>
                            </h1>
                            <form onSubmit={this.onsubmit}>
                                <label htmlFor="email" className="form-group">
                                    Email
                           </label>
                                <input type="text" name='email' onChange={this.onchange} value={email} required className="form-control" />
                                <label htmlFor="password" className="form-group">
                                    Password </label>
                                <input type="text" name='password' onChange={this.onchange} value={password} required className="form-control" />
                                <label htmlFor="password" className="form-group">
                                    Confirm Password </label>
                                <input type="text" name='copassword' onChange={this.onchange} value={copassword} required className="form-control" />

                                <button type='submit' style={{ float: 'right' }} className="btn btn-success">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}
export default firebaseConnect()(Register)