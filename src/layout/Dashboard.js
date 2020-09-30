import React, { Component } from 'react'
import Data from '../data/Data'
import Stat from '../data/Stat'
import AddEvent from '../data/AddEvent'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'
import Login from '../login/Login'
class Dashboard extends Component {
    state = {

        isAuthenticated: false
    };
    static getDerivedStateFromProps(props, state) {
        const { auth } = props;
        if (auth.uid) {
            return { isAuthenticated: true }
        } else {
            return { isAuthenticated: false }
        }
    }
    render() {
        return (
            <div>
                <div>
                    {this.state.isAuthenticated ? (
                        <div className="row">

                            <div className="col-md-8">
                                <Data />
                            </div>
                            <div className="col-md-3">

                            </div>
                            <div className="col-md-1">
                                <Stat />

                            </div>
                        </div>
                    ) : <Login />}

                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { auth: state.firebase.auth }
}

const mapDispatchToProps = {
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firebaseConnect()
)(Dashboard);