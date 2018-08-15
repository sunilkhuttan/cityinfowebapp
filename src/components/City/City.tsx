import axios from "axios";
import * as React from "react"
import ICity from "../Interfaces/ICity"

class City extends React.Component<ICity, ICity> {
    constructor(props: ICity) {
        super(props)
        this.state = {
            country: this.props.country,
            id: this.props.id,
            imageUrl: this.props.imageUrl,
            name: this.props.name,
            description: this.props.description,
            pointsOfInterest: this.props.pointsOfInterest,
        }
      }

    public render() {
    return (
        <div className="city-details">
            Name: {this.state.name}<br />
            Country: {this.state.country}
        </div>
    )
    }

}

export default City
