import React, { Component }from 'react'
import { Route } from 'react-router-dom'

import Sidebar from './partials/Sidebar'
import Header from './partials/Header'
import Home from '../../modules/Dashboard/Home'

class UserLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showMenu: true
        }
    }

    render = () => (
        <div className="user_layout">
            <Sidebar showMenu={this.state.showMenu} toggleMenu={this.toggleMenu}/>
            <Header toggleMenu={this.toggleMenu}/>
            <div className="container">
                <Route exact path='/user/' render={() => (<Home />)} />
            </div>
        </div>
    )

    toggleMenu = () => {
        const showMenu = !this.state.showMenu
        this.setState({showMenu})
    }
}

export default UserLayout