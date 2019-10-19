import React from 'react'

class Beer extends React.Component {
    constructor() {
        super()
        this.state = {
            clickText: "Add to favourites"
        }
        this.clickedText = this.clickedText.bind(this)
    }

    clickedText() {
        this.setState({clickText: "Saved"})
    }
    render() {
        return (
            <div className="beer">
                <img className="thumb" src={this.props.src}></img>
                <h3>{this.props.beerData.beerName || this.props.beerData.name}</h3>
                <h4>ABV: {this.props.beerData.beerType || this.props.beerData.abv}%</h4>
                <p className="description">{this.props.beerData.beerDescription || this.props.beerData.description}</p>
                <span onClick={() => {
                    this.props.addBeer(this.props.beerData)
                    this.clickedText()}} 
                    className="buttons">{this.state.clickText}</span>
                
                <span className="ratings">Rate: 
                    <span onClick={() => console.log(1)}>1</span>
                    <span onClick={() => console.log(2)}>2</span>
                    <span onClick={() => console.log(3)}>3</span>
                    <span onClick={() => console.log(4)}>4</span>
                    <span onClick={() => console.log(5)}>5</span>
                </span>
                
                {this.props.myBeers && 
                    <span onClick={() => this.props.deleteBeer(this.props.id)} className="delete-beer"> Delete </span>
                }
            </div>
        )
        }
}

export default Beer