import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'

class Client extends Component {
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

    dele = (i) => {
        this.props.firestore.delete({ collection: 'event', doc: i.id }).then(null)
    }

    join = (i) => {

        const aka = this.props.auth.uid
        const upd = {
            up: i.up + 1, userj: [aka, ...i.userj]
        }
        this.props.firestore.update({ collection: 'event', doc: i.id }, upd)

    }
    notin = (i) => {

        const uid = this.props.auth.uid
        const upd = { down: i.down + 1, userk: [uid, ...i.userk] }
        this.props.firestore.update({ collection: 'event', doc: i.id }, upd)
    }
    leave = (i, pre) => {
        pre = false
        const uid = this.props.auth.uid
        const upd = { up: i.up - 1, userj: i.userj.filter(j => j !== uid) }
        this.props.firestore.update({ collection: 'event', doc: i.id }, upd)
    }
    leaves = (i, kre) => {
        kre = false
        const uid = this.props.auth.uid
        const upd = { down: i.down - 1, userk: i.userk.filter(j => j !== uid) }
        this.props.firestore.update({ collection: 'event', doc: i.id }, upd)
    }
    render() {

        const { aka } = this.props;

        const li = aka;
        var pre = false;
        var kre = false;
        if (li) {

            return (
                <div>
                    <div className="row">
                        <div className="col-md-2">

                        </div>
                        <div className="col-md-10">
                            <div className="card">{li.map(i => (

                                <div key={i.id} className='row'>
                                    {pre = false}
                                    {kre = false}
                                    <div className="col-md-8">


                                        < div className="card my-3 p-3 bg-white rounded shadow-sm" >
                                            <h5>
                                                Event : {i.name}
                                            </h5>
                                            <div className="media text-muted pt-3">
                                                <div className="row">
                                                    <div className="card col-md-6"><b>Organised By:</b>{i.aname}</div>
                                                    <div className=" card col-md-6"><b>Location :</b>{i.location}</div>
                                                    <div className=" card col-md-6"><b>Date :</b>{new Date(i.date).toLocaleDateString("en-US")}</div>
                                                    <div className=" card col-md-6"><b>Time :</b>{new Date(i.date).toLocaleTimeString("en-US")}</div>

                                                    {
                                                        i.userj.map(j => j === this.props.auth.uid ? (pre = true) : null
                                                        )
                                                    }
                                                    {
                                                        i.userk.map(j => j === this.props.auth.uid ? (kre = true) : null
                                                        )
                                                    }
                                                    {kre ? (<div className='card col-md-11'>
                                                        <div className="row">
                                                            <div className="card col-md-8"><button className="btn btn-dark" >You are not Intrested</button></div>
                                                            <div className="card col-md-3"><button className="btn btn-dark" onClick={this.leaves.bind(this, i, kre)} >Edit Option</button></div></div></div>
                                                    ) : null}

                                                    {pre ? (
                                                        <div className='card col-md-11'>
                                                            <div className="row">
                                                                <div className="card col-md-8"><button className="btn btn-dark" >Joined</button></div>
                                                                <div className="card col-md-3"><button className="btn btn-dark" onClick={this.leave.bind(this, i, pre)} >Leave</button></div></div></div>
                                                    ) : null}
                                                    {kre === pre ? (<div className='col-md-12'>  <div className="row"> <div className="card col-md-6">
                                                        <div className="btn btn-muted btn-primary" onClick={this.join.bind(this, i)}>Join</div></div>
                                                        <div className="card col-md-6">
                                                            <button className="btn btn-primary" onClick={this.notin.bind(this, i)}>Not Intrested</button>
                                                        </div></div></div>) : null}

                                                    <div className="card col-md-12">
                                                        <div><p>Posted By: {i.by}</p></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>




                                    </div>
                                    <div className="col-md-4">

                                        < div className="card my-3 p-3 bg-white rounded shadow-sm" >
                                            {i.by === this.props.auth.email ? (<div className="row mx-auto">
                                                <div className="col-md-7"><button className="btn btn-danger" onClick={this.dele.bind(this, i)}>Delete Event</button></div>
                                                <div className="col-md-4"><Link to={`Edit/${i.id}`} className="btn btn-dark" >Edit Event</Link></div>
                                            </div>) : (
                                                    <div className="row mx-auto"> ------</div>
                                                )}


                                            <div className="row "><h4>
                                                <span className='ml-5 mx-auto'>Peoples Choice</span>
                                            </h4></div>
                                            <div className="row">
                                                <div className="card col-md-12 ">
                                                    <div className="card bg-success"> <b>People Joined :</b>{i.up}</div>
                                                    <div className="card bg-success">   <b>Dislikes :</b>{i.down}</div>
                                                </div>
                                            </div>    </div>

                                    </div></div>
                            ))}
                            </div>

                        </div>
                    </div>
                </div >
            )
        }
        else {
            return <h1>loading....</h1>
        }

    }
}
Client.proptype = {
    firestore: PropTypes.object.isRequired
}
/*
export default compose(
    firestoreConnect([{ collection: 'dar' }]), connect((state, props) => ({
        cli: state.firestore.ordered.dar
    }))
)(Client)
*/
const mapStateToProps = state => {
    return {
        aka: state.firestore.ordered.event,
        auth: state.firebase.auth,

    }
}

const mapDispatchToProps = {
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: 'event' }]), firebaseConnect()
)(Client)