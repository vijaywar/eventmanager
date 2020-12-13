import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'
import { GoogleLogout } from 'react-google-login';

class Bar extends Component {
    state = {
        isAuthenticated: false
    }
    static getDerivedStateFromProps(props, state) {
        const { auth } = props;
        if (auth.uid) {
            return { isAuthenticated: true }
        } else {
            return { isAuthenticated: false }
        }
    }
    logout = (e) => {
        e.preventDefault();
        this.props.firebase.logout();

    }
    render() {
        const { isAuthenticated } = this.state;
        const { auth } = this.props;
        return (

            <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link to='/' className='navbar-brand' >Panel</Link>
                    <div id="navbarMain">
                        <ul className="navbar-nav mr-auto">
                            {console.log({ isAuthenticated })}
                            {isAuthenticated ? (<li className="navbar-item">
                                <Link to='/' className='nav-link'>Dashboard</Link>
                            </li>) : null}
                        </ul>

                    </div><div>
                        {isAuthenticated ? (<ul className='navbar-nav ml-0'>
                            <li className='nav-item'><a href='#!' className='nav-link'>
                                {auth.email}
                            </a>
                            </li>
                            <li className='nav-item'><a href='#!' onClick={this.logout} className='nav-link'>
                                Logout</a></li>
                        </ul>) : (


                                <ul className="navbar-nav ml-auto">
                                    <li className='navbar-item'><Link to='/Register'><a href='#!' className='nav-link'>
                                        Sign UP</a></Link></li>
                                </ul>


                            )}



                    </div>
                </div>

            </nav >
        )
    }
}
Bar.propTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,

    }
}

const mapDispatchToProps = {
}/*
export default compose(connect((state, props) => ({ auth: state.firebase.auth })),
 firebaseConenct()
)(Bar)
*/
//export default firebaseConnect()(Bar)
//export default compose(connect((mapStateToProps, mapDispatchToProps)), firebaseConnect())(Bar)
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firebaseConnect(),
)(Bar)



