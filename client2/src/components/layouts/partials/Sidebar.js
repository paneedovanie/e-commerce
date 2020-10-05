import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '@mdi/react'
import { mdiHome, mdiFormatQuoteOpen } from '@mdi/js'
import Auth from '../../../Core/Auth'

const Sidebar = ({showMenu, toggleMenu}) => {
    const body = document.querySelector('body')
    const toggleIfMobile = body.clientWidth < 600 ? toggleMenu : () => {}
    const user = Auth.getUser()

    return (
        <div className={'sidebar_container' + (showMenu ? '': ' hide')} onClick={toggleIfMobile}>
            <div className={'sidebar' + (showMenu ? '': ' hide')} >
                <div className="title_sidebar">
                    <h4>{user.firstName + " " + user.lastName}</h4>
                    <button onClick={Auth.logout.bind(this)}>Logout</button>
                </div>
                <ul>
                    <li onClick={toggleIfMobile}>
                        <Icon path={mdiHome}
                            title="Home"
                            size={1}
                        />
                        <Link to="/user/" >Home</Link>
                    </li>
                    <li onClick={toggleIfMobile}>
                        <Icon path={mdiFormatQuoteOpen}
                            title="Quotes"
                            size={1}
                        />
                        <Link to="/user/quotes" >Quotes</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar