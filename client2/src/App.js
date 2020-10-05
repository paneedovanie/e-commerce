import React, { Component } from 'react'
import { Switch } from "react-router-dom";

import Icon from '@mdi/react'
import { mdiLanDisconnect } from '@mdi/js'

import Login from './modules/Auth/Login'
import UserLayout from './components/layouts/UserLayout'
import ProtectedRoute from './components/ProtectedRoute'
import UnprotectedRoute from './components/UnprotectedRoute'

class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            online: true
        }
    }

    render () {
        const { online } = this.state

        return (online ? 
            <Switch>
                <UnprotectedRoute exact path="/" component={Login} />
                <ProtectedRoute path="/user" component={UserLayout} />
            </Switch>
        :
            <div className="loading_container">
                <div className="loading">
                    <Icon path={mdiLanDisconnect}
                        title="Disconnected"
                        size={5}
                    />
                    <h1>You are disconnected from the internet</h1>
                </div>
            </div>
        )
    }

    componentDidMount = () => {
        window.addEventListener("online", () => {
            this.setState({online: true})
        });
        window.addEventListener("offline", () => {
            this.setState({online: false})
        });
    }
}

export default App; 