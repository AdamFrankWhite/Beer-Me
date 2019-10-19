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
            errorMessage: "",
            beerData: [],
            searchBeerData: [],
            favouriteBeers: []
        }
        this.addBeer = this.addBeer.bind(this)
        this.deleteBeer = this.deleteBeer.bind(this)
        this.clickLogin = this.clickLogin.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.updateBeers = this.updateBeers.bind(this)
    }


    addBeer(beerData) {
        const postData = {
            beerName: beerData.name,
            beerType: beerData.abv.toString(),
            beerDescription: beerData.description,
            brewery: "Punk IPA",
            stars: "1",
            date: new Date(),
            img: beerData.image_url
        }
        
        console.log(postData)
        axios.post("http://localhost:5000/my-beers/add", postData).then(res => {
            // console.log("hello")
            console.log(res.data)
            const newFavouriteBeers = [...this.state.favouriteBeers]
            newFavouriteBeers.push(postData)
            this.setState({favouriteBeers: newFavouriteBeers})
            console.log(this.state.favouriteBeers)
        })
    }

    deleteBeer(id) {
        axios.get('http://localhost:5000/my-beers/').then(res => {
            this.setState({
                favouriteBeers: res.data
            })
        })
        axios.delete(`http://localhost:5000/my-beers/${id}`).then(res => {
            // console.log("hello")
            console.log("Beer deleted")
        })

        axios.get('http://localhost:5000/my-beers/').then(res => {
            this.setState({
                favouriteBeers: res.data
            })
        })

        //need to update state before and after delete to ensure real-time update
    }
    componentDidMount() {
        !this.state.beerData && axios.get('http://localhost:5000/my-beers/').then(res => {
            console.log(res.data)
            this.setState({favouriteBeers: res.data})})
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

    updateBeers() {
        // TO DO
            // this.setState({
            //     searchBeerData: ??
            // })
    }
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
        this.updateBeers() // with search term rgument
    }
    render() {
        return (
            <Router>
                <Header loggedIn={this.state.loggedIn} />
                <br />
                {/* <Login  login={this.clickLogin} handleChange={this.handleChange} username={this.state.username} password={this.state.password} /> */}
                <Route path="/login" render={ routeProps => ( <Login {...routeProps} login={this.clickLogin} handleChange={this.handleChange} username={this.state.username} password={this.state.password} loggedIn={this.state.loggedIn} errorMessage={this.state.errorMessage}  />)}        />
                <Route path="/my-beers" render={ routeProps => ( <MyBeers {...routeProps} addBeer={this.addBeer} deleteBeer={this.deleteBeer} favouriteBeers={this.state.favouriteBeers} searchTerm={this.state.searchTerm} handleChange={this.handleChange}/> ) } />
                <Route path="/search" render={ routeProps => ( <Search {...routeProps} beerData={this.state.beerData} addBeer={this.addBeer} searchTerm={this.state.searchTerm} handleChange={this.handleChange}/> ) } />
                <Route path="/random-beer" render={ routeProps => ( <RandomBeer {...routeProps} searchTerm={this.state.searchTerm} handleChange={this.handleChange}/> ) } />
                {this.state.loggedIn ? <Dashboard /> : null}
            </Router>
            
        );
    }
  
}

export default App;
