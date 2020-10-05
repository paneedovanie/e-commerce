import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Auth from '../Core/Auth'

const UnprotectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route 
            {...rest}
            render={props => {
                if(!Auth.isAuthenticated()) {
                    return <Component {...props} />
                }
                else {
                    return <Redirect to={
                        {
                            pathname: "/user",
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }}    
        />
    )
}

export default UnprotectedRoute