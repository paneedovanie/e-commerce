import React from 'react'
import Icon from '@mdi/react'
import { mdiMenu } from '@mdi/js'

const Header = ({toggleMenu}) => (
    <div className="header">
        <button
            onClick={toggleMenu}
        >
            <Icon path={mdiMenu}
                title="Menu"
                size={1.5}
            />
        </button>
        <h1>App name</h1>
    </div>
)

export default Header