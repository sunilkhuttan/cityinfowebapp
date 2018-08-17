import axios from "axios";
import * as React from "react"
import ICity from "../../Interfaces/ICity"
import IPointOfInterest from "../../Interfaces/IPointOfInterest"
import PointOfInterestCard from "./PointOfInterestCard"

interface ICityId {
    id?: number
}

interface IPointsOfInterest {
    pointsOfInterest: IPointOfInterest[]
}

class PointOfInterest extends React.Component<any, IPointsOfInterest > {
    constructor(props: any) {
        super(props);
        this.state = {pointsOfInterest: []}
      };

      public async componentDidMount() {
        const self: any = this;
        const { match, location, history, staticContext, ...componentProps} = this.props;
        const cityId: any = match.params.id;
        let url: string = `http://localhost:55680/api/cities/${cityId}/pointsofinterest`;
        if (cityId === undefined) {
            url = `http://localhost:55680/api/cities/1/pointsofinterest`;
        }
        axios.get(url)
        .then(response => {
            console.log(response);
            const responseData = response.data;
            self.setState(
                {
                    pointsOfInterest : responseData,
                })
        })
        .catch(error => {
          console.log(error);
        })
      }

    public render() {
    return (
        <div className="row">
            {this.state.pointsOfInterest.map((poi: IPointOfInterest, index) => {
                return <PointOfInterestCard key={index} {...poi}/>
            })}
        </div>
    )}
}

export default PointOfInterest
