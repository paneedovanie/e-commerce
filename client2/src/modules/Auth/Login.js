import React, { Component } from 'react'

import axios from 'axios'
import api from './routes/api'
import Auth from '../../Core/Auth'
import LoadingIcon from '../../components/icons/LoadingIcon'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sending: false,
            errors: null,
            username: "",
            password: ""
        }
    }

    render = () => {
        const { username, password, errors, sending } = this.state
        return (
            <div className="login_container">
                <form className="login" onSubmit={this.onSubmit} disabled={sending}>
                    <h1>Login</h1>
                    {errors && (
                        <div>
                        { errors.map((item, i) => {
                            return <div className="login_error" key={i}>{item}</div>
                        }) }
                        </div>
                    )}
                    <div className="login_field">
                        <input 
                            placeholder="Username"
                            type="text" 
                            name="username" 
                            onChange={this.onChange} 
                            value={username} 
                        />
                    </div>
                    <div className="login_field">
                        <input 
                            placeholder="Password"
                            type="password" 
                            name="password" 
                            onChange={this.onChange} 
                            value={password} 
                        />
                    </div>
                    <div className="login_field">
                        <button type="submit" className="button">
                            {sending ? <LoadingIcon size={0.8} /> : 'Submit' }
                        </button>
                    </div>
                </form>
            </div>
        )
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault()

        this.setState({errors: null, sending: true})
        axios.post(api.login(), 
            {
                username: this.state.username,
                password: this.state.password
            })
            .then(response => {
                Auth.set(response.data.user, response.data.token)
                window.location.href = '/user'
            })
            .catch(error => {
                this.setState({errors: error.response.data.errors, sending: false})
            })
    }
}

export default Login