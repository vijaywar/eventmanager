import React, { Component } from 'react'
import Textk from './Textk'
import { firestoreConnect } from 'react-redux-firebase'
import { firebaseConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
//import uuid from 'react-uuid'id: uuid(),
class Add extends Component {
    state =
        {
            aname: '',
            by: '',
            name: '',
            location: '',
            up: '',
            down: '',
            date: '',

        }

    onsubmit = (e) => {
        e.preventDefault();
        const { aname, name, location, date } = this.state;
        var kk = ''
        if (aname === '') { kk = this.props.auth.email }
        else { kk = aname }
        const news = {
            aname: kk,
            name,
            location,
            date: new Date(date).getTime(),
            by: this.props.auth.email,
            up: 1,
            down: 0,
            userj: [],
            userk: []
        }
        const { firestore } = this.props;
        firestore.add({ collection: 'event' }, news).then(() => this.props.history.push('/'))

        // const vi=await axios.post('https://jsonplaceholder.typicode.com/users',news)
        // dispatch({type:'ADD',payload:vi.data})
        // console.log('hi this is out of loop')
        this.setState({ name: '', location: '', date: '' })
        this.props.history.push('./')
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        const { aname, name, location, date } = this.state;

        return (

            <div className='card mb-4'>
                <div className='card-header'>Add Event</div>
                <div className='card-body'>

                    <form onSubmit={this.onsubmit.bind(this)}>
                        <Textk label='Event Name'
                            name='name'
                            placeholder='Enter Event name....'
                            value={name}
                            onChange={this.onChange}
                        />
                        <Textk label='Organised By'
                            name='aname'
                            placeholder={this.props.auth.email}
                            value={aname}
                            onChange={this.onChange}
                        />

                        <Textk label='location'
                            name='location'
                            placeholder='Enter location....'
                            value={location}

                            onChange={this.onChange}

                        />
                        <Textk label='date'
                            name='date'
                            placeholder='Enter Event Date'
                            value={date}
                            type='datetime-local'
                            onChange={this.onChange}

                        />


                        <input type='submit' value='Publish Post'
                            className='btn btn-success btn-block ' />

                    </form>
                </div>
            </div>
        )



    }

}
const mapStateToProps = state => {
    return {

        auth: state.firebase.auth
    }
}

const mapDispatchToProps = {
}
export default
    compose(connect(mapStateToProps, mapDispatchToProps), firestoreConnect(), firebaseConnect())
        (Add)