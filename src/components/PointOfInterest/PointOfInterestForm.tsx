import axios from "axios";
import * as React from "react"
import IPointInterestForm from "../../Interfaces/IPointInterestForm"
import "./pointOfInterest.css"

class PointOfInterestForm extends React.Component<{addPoiAction: any, cityId: string}, IPointInterestForm> {
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
                <label>Point of interest name:</label>
                <input type="text" className="form-control" id="poi-name" onChange={this.onNameChange} />
            </div>
            <div className="form-group">
                <label>Point of interest Image Url:</label>
                <input type="text" className="form-control" id="poi-image-url" onChange={this.onImageUrlChange} />
            </div>
            <div className="form-group">
                <label >Point of interest description:</label>
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
        const poiForm = new FormData();
        poiForm.set("name", this.state.name);
        poiForm.set("description", this.state.description);
        poiForm.set("imageUrl", this.state.imageUrl);

        const addPoiUrl = `http://localhost:55680/api/cities/${this.props.cityId}/pointsofinterest`;
        console.log("form submitted")
        axios.post(addPoiUrl, {
            name: this.state.name,
            description: this.state.description,
            imageUrl: this.state.imageUrl,
          }, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response: any) => {
            this.props.addPoiAction(response.data);
            console.log(response);
        })
        .catch((error: any) => {
            console.log(error);
        });

        e.preventDefault();
    }
}

export default PointOfInterestForm
