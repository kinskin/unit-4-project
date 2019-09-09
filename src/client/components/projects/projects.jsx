import React from 'react';
import Login from '../login/login'

import styles from './style.scss'

class Projects extends React.Component{

    constructor(){
        super()
        this.state={
            switchItemIndex: '',
            switchWithIndex: '',
            display:'none',
            value: '',
            newMember:''

        }
    }

    signInCheck(userId){
        this.props.signInCheck(userId)
    }

    render(){


        return(
            <div className='text-center d-flex flex-column justify-content-around' >
                <div className='card-header'>
                    <h4>Trello on Clicks</h4>
                </div>
                <div className='card-body'>
                    <div className='col-4 offset-4 mb-3'>
                        <Login signInCheck={(userId)=>{this.signInCheck(userId)}}/>
                    </div>
                </div>

            </div>
        )
    }
}

export default Projects;