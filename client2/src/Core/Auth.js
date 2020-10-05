class Auth {
    set (user, token = null) {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }

    isAuthenticated () {
        return localStorage.getItem('user') ? true : false
    }

    getUser () {
        return JSON.parse(localStorage.getItem('user'))
    }

    getToken () {
        return localStorage.getItem('token')
    }

    logout () {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        window.location.href = '/'
    }
}

export default new Auth()