import React from 'react'
import Beer from './Beer'
import axios from 'axios'
class MyBeers extends React.Component {
    constructor() {
        super()
        this.state = {
            beerData: [],
            favouriteBeers: []
        }
        this.addBeer = this.addBeer.bind(this)
    }

    addBeer(id) {
        console.log(`Beer ${id} added`)
    }
    componentDidMount() {
        const favouriteBeers = axios.get("http://localhost:3000/my-beers").then(response => response.json()).then(data => {
            this.setState({favouriteBeers: data})
            console.log(data)})
       
    }
    render() {
        const beers = this.state.favouriteBeers.map(beer => <Beer src={beer.image_url} id={beer.id} name={beer.name} abv={beer.abv} description={beer.description} addBeer={this.addBeer}/>)
        return (
            <div className="App">
                
                <div className="beer-container">
                    <h1>My Favourite Beers</h1>
                    {beers}
                </div>
                
            </div>
        )
    }
    
}

export default MyBeers
