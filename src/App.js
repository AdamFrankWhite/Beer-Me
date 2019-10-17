import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './comp/Header'
import Login from './comp/Login'
import Search from './comp/Search'
import Dashboard from './comp/Dashboard'
import RandomBeer from './comp/RandomBeer'
import MyBeers from './comp/MyBeers'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import axios from 'axios'

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            loggedIn: false,
            username: "",
            password: "",
            searchTerm: "",
            errorMessage: ""
        }
        this.clickLogin = this.clickLogin.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    clickLogin() {
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        console.log(user)
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            }
          };
        axios.post('http://localhost:5000/api/users/login', user, axiosConfig)
            .then(res => console.log(res.data))
            .catch(err => console.log('Login: ', err))
        // if (this.state.username === "adam" && this.state.password === "123") {
        //     this.setState({loggedIn: true, errorMessage: ""})
        // } else {
        //     this.setState({errorMessage: "Incorrect Password"})
        // }
        // this.setState({loggedIn: true})
        
    }


    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    render() {
        return (
            <Router>
                <Header loggedIn={this.state.loggedIn} />
                <br />
                {/* <Login  login={this.clickLogin} handleChange={this.handleChange} username={this.state.username} password={this.state.password} /> */}
                <Route path="/login" render={ routeProps => ( <Login {...routeProps} login={this.clickLogin} handleChange={this.handleChange} username={this.state.username} password={this.state.password} loggedIn={this.state.loggedIn} errorMessage={this.state.errorMessage}  />)}        />
                <Route path="/my-beers" render={ routeProps => ( <MyBeers {...routeProps} searchTerm={this.state.searchTerm} handleChange={this.handleChange}/> ) } />
                <Route path="/search" render={ routeProps => ( <Search {...routeProps} searchTerm={this.state.searchTerm} handleChange={this.handleChange}/> ) } />
                <Route path="/random-beer" render={ routeProps => ( <RandomBeer {...routeProps} searchTerm={this.state.searchTerm} handleChange={this.handleChange}/> ) } />
                {this.state.loggedIn ? <Dashboard /> : null}
            </Router>
            
        );
    }
  
}

export default App;
