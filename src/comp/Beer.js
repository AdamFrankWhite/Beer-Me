import React from 'react'

function Beer(props){
    return (
        <div className="beer">
            <img className="thumb" src={props.src}></img>
            <h3>{props.name}</h3>
            <h4>ABV: {props.abv}%</h4>
            <p className="description">{props.description}</p>
            <span onClick={() => props.addBeer(props.id)} className="buttons">Add to favourites</span>
            <span className="ratings">Rate: 
                <span onClick={() => console.log(1)}>1</span>
                <span onClick={() => console.log(2)}>2</span>
                <span onClick={() => console.log(3)}>3</span>
                <span onClick={() => console.log(4)}>4</span>
                <span onClick={() => console.log(5)}>5</span>
            </span>
        </div>
    )
}

export default Beer