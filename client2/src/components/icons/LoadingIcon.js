import React from 'react'
import Icon from '@mdi/react'
import { mdiLoading } from '@mdi/js'

const LoadingIcon = (props) => {
    return (
        <Icon path={mdiLoading}
            title="Loading"
            size={props.size}
            horizontal
            vertical
            rotate={90}
            color="white"
            spin
        />
    )
}

export default LoadingIcon