import axios from "axios";
import * as React from "react"
import IPointInterestForm from "../../Interfaces/IPointInterestForm"
import IPointOfInterest from "../../Interfaces/IPointOfInterest";
import * as poiApi from "../../Services/PointOfInterestApi";
import "./pointOfInterest.css";

interface IEditPoiForm {
    poiToEdit: IPointInterestForm,
    cityId: number,
    poiID: number,
    updatePoi: any,
}

class EditPointOfInterest extends React.Component<IEditPoiForm, IPointInterestForm> {
    constructor(props: IEditPoiForm) {
        super(props);
        this.state = {
            name: this.props.poiToEdit.name,
            description: this.props.poiToEdit.description,
            imageUrl: this.props.poiToEdit.imageUrl,
        };
        this.onNameChange = this.onNameChange.bind(this);
        this.onImageUrlChange = this.onImageUrlChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this)
        this.onPoiFormSubmit = this.onPoiFormSubmit.bind(this)
    };

    public render() {
        return (
        <div className="poi-form">
            <div className="form-group">
                <label>Point of interest name:</label>
                <input type="text" className="form-control" id="poi-name"
                    value={this.state.name} onChange={this.onNameChange} />
            </div>
            <div className="form-group">
                <label>Point of interest Image Url:</label>
                <input type="text" className="form-control" id="poi-image-url"
                    value={this.state.imageUrl} onChange={this.onImageUrlChange} />
            </div>
            <div className="form-group">
                <label >Point of interest description:</label>
                <textarea className="form-control" id="poi-description"
                    value={this.state.description} onChange={this.onDescriptionChange}  />
            </div>
            <div className="save-btn-div">
                 <button onClick={this.onPoiFormSubmit}>Save</button>
            </div>
        </div>
    )}

    private onNameChange(e) {
        this.setState({
            name: e.target.value,
        });
    }

    private onImageUrlChange(e) {
        this.setState({
            imageUrl: e.target.value,
        })
    }

    private onDescriptionChange(e) {
        this.setState({
            description:  e.target.value,
        })
    }

    private onPoiFormSubmit(e): any {
        const formData: IPointInterestForm = {
            name: this.state.name,
            description: this.state.description,
            imageUrl: this.state.imageUrl,
        }
        const addPoiUrl = `http://localhost:55680/api/cities/
         ${this.props.cityId}/pointsofinterest/${this.props.poiID}`;
        console.log("form submitted")
        poiApi.editPointOfInterest(formData, this.props.cityId, this.props.poiID)
        .then((response: any) => {
            if (response.status === 204) {
                const updatedPoi: IPointInterestForm = {
                    name: this.state.name,
                    description: this.state.description,
                    imageUrl: this.state.imageUrl,
                };
                this.props.updatePoi(updatedPoi);
            }
        })
    }
}

export default EditPointOfInterest
