import React from 'react'
import Beer from './Beer'
class Search extends React.Component {
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
        const beerData = fetch("https://api.punkapi.com/v2/beers?per_page=80").then(response => response.json()).then(data => {
            this.setState({beerData: data})
            console.log(data)})
       
    }
    render() {
        const beers = this.state.beerData.map(beer => <Beer src={beer.image_url} id={beer.id} name={beer.name} abv={beer.abv} description={beer.description} addBeer={this.addBeer}/>)
        return (
            <div className="App">
                <label for="searchTerm">Search: 
                    <input type="text" value={this.props.searchTerm} onChange={this.props.handleChange} name="searchTerm"></input>
                </label>
                <p>Log: {this.props.searchTerm}</p>
                <div className="beer-container">
                    {beers}
                </div>
                
            </div>
        )
    }
    
}

export default Search
