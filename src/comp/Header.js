import React from 'react'
import { Link } from 'react-router-dom'

class Header extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <header>
                <nav className="navbar navbar-dark bg-primary">
                    <a className="navbar-brand" href="#">BeerMe</a>
                    {this.props.loggedIn ? <Link to="/search" className="link">Search</Link> : null }
                    <Link to="/my-beers" className="link">My Beers</Link>
                    <Link to="/search" className="link">Search</Link>
                    <Link to="/random-beer" className="link">Random Beer</Link>
                    <Link to="/login" className="link">{this.props.loggedIn ? <span>Logout</span> : <span>Login</span>}</Link>
                </nav>
            </header>
        )
    }
    
}

export default Header