import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class Stat extends Component {
    render() {
        return (
            <Link to='/data/AddEvent' className="btn btn-success" >
                Add Event
            </Link>
        )
    }
}
export default Stat;