import axios from "axios";
import * as React from "react";
import ICity from "../../Interfaces/ICity";
import IPointOfInterest from "../../Interfaces/IPointOfInterest";
import getAllPointsOfInterest from "../../Services/PointOfInterestApi";
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
    loading: boolean;
}

class PointOfInterest extends React.Component<any, IPointsOfInterest > {
    constructor(props: any) {
        super(props);
        this.state = { pointsOfInterest: [], displayPoiForm: false, poiCityId: 0, errorMessage: "", loading: true };
        this.displayPointOfInterest = this.displayPointOfInterest.bind(this);
        this.addNewPoi = this.addNewPoi.bind(this);
        this.deletePoi = this.deletePoi.bind(this);
      };

      public componentDidMount() {
        const self: any = this;
        const { match, location, history, staticContext, ...componentProps} = this.props;
        const cityId: any = match.params.id;
        const apiUrl = `http://localhost:55680/api/cities/${cityId}/pointsofinterest`;
        axios.get(apiUrl)
        // getAllPointsOfInterest(cityId)
        // this.props.getAllPoiApi(cityId)
        .then(response => {
            const responseData = response.data;
            if (responseData !== undefined) {
                self.setState(
                    {
                        pointsOfInterest : responseData,
                        poiCityId: cityId,
                        loading: false,
                    });
                if (responseData.length < 1) {
                    self.setState({
                        errorMessage: "No points of interest found for this city",
                    });
                }
            }
        })
        .catch(error => {
          console.log(error);
        })
      }

    public render() {

        let pointsOfInterest: any;
        if (this.state.loading) {
            pointsOfInterest = <div className="alert alert-danger empty">Loading cities ...</div>
        } else if (this.state.pointsOfInterest.length > 0) {
            pointsOfInterest = this.state.pointsOfInterest.map((poi: IPointOfInterest, index) => {
                poi.cityId = this.state.poiCityId;
                return <PointOfInterestCard key={index} deletePoi={this.deletePoi} poi={poi}/>
            })
        } else {
            pointsOfInterest = <div className="alert alert-info empty">No points of interest found</div>;
        }

        let form: any;
        if (this.state.displayPoiForm) {
            form =
            <PointOfInterestForm addPoiAction={this.addNewPoi} cityId={this.props.match.params.id} />
        } else {
            form = "";
        }

        let message: string;
        if (this.state.errorMessage.length < 1) {
            message = "Loading ...."
        } else {
            message = this.state.errorMessage;
        }

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
                    {pointsOfInterest}
                </div>
            </div>
        )
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
