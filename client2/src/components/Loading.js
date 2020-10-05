import React from 'react'
import Icon from '@mdi/react'
import { mdiLoading } from '@mdi/js'

export default Disconnected = () => {
    return (
        <div className="loading">
            <Icon path={mdiLoading}
                title="Loading"
                size={3}
                horizontal
                vertical
                rotate={90}
                color="white"
                spin/>
            <h1>Loading</h1>
        </div>
    )
}