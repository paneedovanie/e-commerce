import React from 'react'
import Icon from '@mdi/react'
import { mdiLanDisconnect } from '@mdi/js'

export default Disconnected = () => {
    return (
        <div className="disconnected">
            <Icon path={mdiLanDisconnect}
                title="Disconnected"
                size={3}
                color="white"/>
            <h1>You are disconnected from the internet</h1>
        </div>
    )
}