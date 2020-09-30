import React, { Component } from 'react'
import Textk from './Textk'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
class Edit extends Component {

    state = {
        id: '',
        name: '',
        location: '',
        date: '',
        aname: ''
    }

    componentDidMount() {


    }

    onsubmit = (e) => {
        e.preventDefault();
        const { id, name, location, date, aname } = this.state;
        const news = {
            name,
            location,
            date: new Date(date).getTime(),
            aname
        }
        const { firestore } = this.props;
        firestore.update({ collection: 'event', doc: id }, news).then(() => this.props.history.push('/'))

        // const vi=await axios.post('https://jsonplaceholder.typicode.com/users',news)
        // dispatch({type:'ADD',payload:vi.data})
        // console.log('hi this is out of loop')
        this.setState({ name: '', location: '', date: '', aname: '', id: '' })
        this.props.history.push('./')
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {
        const { id } = this.props.match.params;

        const { aname, name, location, date } = this.state;
        const { aka } = this.props
        if (aka) {

            return (
                <div>
                    {
                        aka.map(i => (<div key={i.id}>{i.id === id && name === '' ? (this.setState({
                            id: id,
                            name: i.name,
                            location: i.location,
                            date: i.date,
                            aname: i.aname
                        })) : null}</div>))
                    }

                    < div className='card mb-4' >

                        <div className='card-header'>Edit Event</div>
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
                                    value={new Date(date).toLocaleDateString}
                                    type='datetime-local'
                                    onChange={this.onChange}

                                />


                                <input type='submit' value='Edit Event'
                                    className='btn btn-success btn-block ' />

                            </form>
                        </div>
                    </div ></div>
            )

        }
        else {
            return <h1>loading....</h1>
        }




    }

}

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
)(Edit)