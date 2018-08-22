import axios from "axios";
import * as React from "react"
import IPointInterestForm from "../../Interfaces/IPointInterestForm"
import IPointOfInterest from "../../Interfaces/IPointOfInterest"
import * as poiApi from "../../Services/PointOfInterestApi";
import EditPointOfInterest from "./EditPointOfInterest";
import "./pointOfInterest.css"

interface IPoiCard {
    deletePoi: any,
    poi: IPointOfInterest
}

interface IPoiCardState {
    displayEditForm: boolean,
    poi: IPointInterestForm
}

class PointOfInterestCard extends React.Component<IPoiCard, IPoiCardState> {
    constructor(props: IPoiCard) {
        super(props);
        this.state = (
            {
                displayEditForm: false,
                poi: {
                    name: this.props.poi.name,
                    description: this.props.poi.description,
                    imageUrl: this.props.poi.imageUrl},
                }
            );
        this.onPoiDelete = this.onPoiDelete.bind(this)
        this.onPoiEdit = this.onPoiEdit.bind(this)
        this.updatePoi = this.updatePoi.bind(this);
    };

    public render() {
        let form: any;
        if (this.state.displayEditForm) {
            form = <EditPointOfInterest
            poiToEdit={this.state.poi}
            cityId={this.props.poi.cityId}
            poiID={this.props.poi.id}
            updatePoi={this.updatePoi} />
        } else {
            form = "";
        }

        return (
        <div className="card poi-card ">
            <div className="row no-gutters">
                <div className="col-auto poi-image">
                    <img className="card-img-top" src={this.state.poi.imageUrl}/>
                </div>
                    <div className="col">
                        <div className="card-block px-2">
                            <p className="card-text">
                                <strong>{this.state.poi.name}</strong><br></br>
                                {this.state.poi.description}
                            </p>
                            <div className="btn-group poi-buttons">
                                 <button type="btn"
                                    className="btn btn-sm btn-outline-secondary edit-btn"
                                    onClick={this.onPoiEdit}>
                                        Edit
                                 </button>
                                 <button type="btn btn-danger"
                                    className="btn btn-sm btn-outline-secondary delete-btn"
                                    onClick={this.onPoiDelete}>
                                        Delete
                                 </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {form}
                </div>
            </div>
    )}

    private onPoiDelete(e) {
        poiApi.deletePointOfInterest(this.props.poi.cityId, this.props.poi.id)
          .then((response: any) => {
              if (response.status === 204) {
                this.props.deletePoi(this.props.poi.id);
              }
        })
    }

    private onPoiEdit() {
        this.setState({displayEditForm: !this.state.displayEditForm})
    }

    private updatePoi(updatedPoi: IPointOfInterest ) {
        this.setState({displayEditForm: !this.state.displayEditForm});
        this.setState({poi: updatedPoi })
    }
}

export default PointOfInterestCard
