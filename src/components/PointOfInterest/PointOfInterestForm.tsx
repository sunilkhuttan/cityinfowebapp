import axios from "axios";
import * as React from "react"
import IEditPointInterestFormState from "../../Interfaces/IEditPointInterestFormState";
import * as poiApi from "../../Services/PointOfInterestApi";
import "./pointOfInterest.css"

class PointOfInterestForm extends React.Component<{addPoiAction: any, cityId: number}, IEditPointInterestFormState> {
    constructor(props: any) {
        super(props);
        this.state = {name: "", description: "", imageUrl: ""};
        this.onNameChange = this.onNameChange.bind(this);
        this.onImageUrlChange = this.onImageUrlChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this)
        this.onPoiFormSubmit = this.onPoiFormSubmit.bind(this)
    };

    public render() {
        return (
        <div className="poi-form">
            <div className="form-group">
                <label>Name:</label>
                <input type="text" className="form-control" id="poi-name" onChange={this.onNameChange} />
            </div>
            <div className="form-group">
                <label>Image Url:</label>
                <input type="text" className="form-control" id="poi-image-url" onChange={this.onImageUrlChange} />
            </div>
            <div className="form-group">
                <label >Description:</label>
                <textarea className="form-control" id="poi-description" onChange={this.onDescriptionChange}  />
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
        const poiForm: IEditPointInterestFormState = {
            name: this.state.name,
            description: this.state.description,
            imageUrl: this.state.imageUrl,
        }

        poiApi.addNewPointOfInterest(poiForm, this.props.cityId)
        .then((response: any) => {
            if (response.status === 201) {
                this.props.addPoiAction(response.data);
                console.log(response);
            }
        })
    }
}

export default PointOfInterestForm
