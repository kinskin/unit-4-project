import React from 'react';

class Login extends React.Component{

    constructor(){
        super()

        this.state={
            newEmail: '',
            newPassword: '',
            email:'Enter email',
            password: 'Enter password',
            signInEmail: '',
            signInPassword: ''
        }
    }


    showSignup(){
        let signInDiv = document.getElementById('signin')
        let signUpDiv = document.getElementById('signup')
        signInDiv.style.display = 'none'
        signUpDiv.style.display = ''
    }

    showSignin(){
        let signInDiv = document.getElementById('signin')
        let signUpDiv = document.getElementById('signup')
        this.setState({newEmail: '', newPassword: ''})
        signInDiv.style.display = ''
        signUpDiv.style.display = 'none'
    }

    signUpEmail(event){
        this.setState({newEmail: event.target.value})

    }

    signUpPassword(event){
        this.setState({newPassword: event.target.value})
    }

    addUser(){
        let signInDiv = document.getElementById('signin')
        let signUpDiv = document.getElementById('signup')

        let url = '/new/user'
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({newEmail: this.state.newEmail, newPassword: this.state.newPassword})
        })
        .then(res => res.json())
        .then(res => {
            this.setState({newEmail: '', newPassword: ''})
            signInDiv.style.display = ''
            signUpDiv.style.display = 'none'
            console.log(res)
        })
    }

    signInEmail(event){
        this.setState({signInEmail: event.target.value})
        console.log(event.target.value)
    }

    signInPassword(event){
        this.setState({signInPassword: event.target.value})
        console.log(event.target.value)
    }

    signInCheck(){

        let url = '/user/signin'
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: this.state.signInEmail, password: this.state.signInPassword})
        })
        .then(res => res.json())
        .then(res => {
            if (res.result !== null) {
                this.setState({email: '', password: ''})
                this.props.signInCheck(res.result[0].userid)
            }
        })
    }



    render(){



        return(
            <div>
                <div className='card' style={{display: ''}} id='signin'>
                    <div className='card-header'>
                        <div className='row'>
                            <div className='col-6'>
                                <h6> Sign in page </h6>
                            </div>
                            <div className='col-6'>
                                <button className = 'btn btn-sm btn-outline-primary' onClick={()=>{this.showSignup()}}> Sign up </button>
                            </div>
                        </div>
                    </div>
                    <div className='card-body'>
                        <div className='form-group'>
                            <p> Email Address </p>
                            <input className='form-control' onChange={(event)=>{this.signInEmail(event)}} placeholder={this.state.email}/>
                            <p> Password </p>
                            <input type='password' className='form-control' onChange={(event)=>{this.signInPassword(event)}} placeholder={this.state.password}/>
                            <br/>
                            <br/>
                            <button className='btn btn-sm btn-outline-success' onClick={()=>{this.signInCheck()}}> Sign in </button>
                        </div>
                    </div>
                </div>
                <div className='card' style={{display:'none'}} id='signup'>
                    <div className='card-header'>
                        <div className='row'>
                            <div className='col-6'>
                                <h6> Sign up page </h6>
                            </div>
                            <div className='col-6'>
                                <button className = 'btn btn-sm btn-outline-primary' onClick={()=>{this.showSignin()}}> Sign in </button>
                            </div>
                        </div>
                    </div>
                    <div className='card-body'>
                        <div className='form-group'>
                            <p> Email Address </p>
                            <input className='form-control' onChange={(event)=>{this.signUpEmail(event)}} value={this.state.newEmail} placeholder={this.state.email}/>
                            <p> Password </p>
                            <input type='password' className='form-control' onChange={(event)=>{this.signUpPassword(event)}} value={this.state.newPassword} placeholder={this.state.password}/>
                            <br/>
                            <br/>
                            <button className='btn btn-sm btn-outline-success' onClick={()=>{this.addUser()}}> Sign up </button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Login;