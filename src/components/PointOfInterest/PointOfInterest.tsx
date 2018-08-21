import axios from "axios";
import * as React from "react";
import ICity from "../../Interfaces/ICity";
import IPointOfInterest from "../../Interfaces/IPointOfInterest";
import "./pointOfInterest.css";
import PointOfInterestCard from "./PointOfInterestCard";
import PointOfInterestForm from "./PointOfInterestForm";

interface ICityId {
    id?: number
}

interface IPointsOfInterest {
    pointsOfInterest: IPointOfInterest[];
    displayPoiForm: boolean;
    poiCityId: number;
    errorMessage: string;
}

class PointOfInterest extends React.Component<any, IPointsOfInterest > {
    constructor(props: any) {
        super(props);
        this.state = { pointsOfInterest: [], displayPoiForm: false, poiCityId: 0, errorMessage: "" };
        this.displayPointOfInterest = this.displayPointOfInterest.bind(this);
        this.addNewPoi = this.addNewPoi.bind(this);
        this.deletePoi = this.deletePoi.bind(this);
      };

      public async componentDidMount() {
        const self: any = this;
        const { match, location, history, staticContext, ...componentProps} = this.props;
        const cityId: any = match.params.id;
        let url: string = `http://localhost:55680/api/cities/${cityId}/pointsofinterest`;
        if (cityId === undefined) {
            url = `http://localhost:55680/api/cities/1/pointsofinterest`;
        } else {
            this.setState({poiCityId: cityId})
        }
        axios.get(url)
        .then(response => {
            const responseData = response.data;
            if (responseData.length > 0) {
                self.setState(
                    {
                        pointsOfInterest : responseData,
                    })
            } else {
                self.setState({
                    errorMessage: "No Point of interest found",
                })
            }
        })
        .catch(error => {
          console.log(error);
        })
      }

    public render() {

        let form: any;
        if (this.state.displayPoiForm) {
            form =
            <PointOfInterestForm addPoiAction={this.addNewPoi} cityId={this.props.match.params.id} />
        } else {
            form = "";
        }

        if (this.state.pointsOfInterest.length < 1) {
            return (
            <div className="all-poi">
                <div>
                    <div>
                        Points of Interest for : <strong>{this.props.match.params.cityName} </strong>
                    </div>
                        <button className="btn btn-primary btn-lg"
                        onClick={this.displayPointOfInterest}
                        data-toggle="collapse"
                        data-target="#poi-form" >
                        Add New Point Of Interest</button>
                </div>
                <div id="poi-form" className="collapse">
                    {form}
                </div>
                <div className="empty-poi">
                    {this.state.errorMessage}
                </div>
            </div>)
        } else {
         return (
            <div>
                <div>
                    <div>Points of Interest for : <strong>{this.props.match.params.cityName} </strong></div>
                    <button className="btn btn-primary btn-lg"
                        onClick={this.displayPointOfInterest}
                        data-toggle="collapse"
                        data-target="#poi-form" >
                        Add New Point Of Interest</button>
                </div>
                <div id="poi-form" className="collapse">
                    {form}
                </div>

                <div  className="row">
                    {this.state.pointsOfInterest.map((poi: IPointOfInterest, index) => {
                        poi.cityId = this.state.poiCityId;
                        return <PointOfInterestCard key={index} deletePoi={this.deletePoi} poi={poi}/>
                    })}
                </div>
            </div>
            )}
        }

    private displayPointOfInterest = () => {
        this.setState({ displayPoiForm : !this.state.displayPoiForm })
    }

    private addNewPoi = (poi: IPointOfInterest) => {
        this.setState({pointsOfInterest: this.state.pointsOfInterest.concat(poi)});
        this.displayPointOfInterest();
    }

    private deletePoi = (id: number) => {
        const poiArray = this.state.pointsOfInterest.filter(poi => poi.id !== id)
        this.setState({pointsOfInterest: poiArray})
    }
}

export default PointOfInterest
