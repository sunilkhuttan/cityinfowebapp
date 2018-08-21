import axios from "axios";
import * as React from "react"
import ICityForm from "../../Interfaces/ICityForm";
import IPointInterestForm from "../../Interfaces/IPointInterestForm"
import "./city.css"

class CityForm extends React.Component<{addCityAction: any}, ICityForm> {
    constructor(props: any) {
        super(props);
        this.state = {name: "", description: "", imageUrl: "", country: ""};
        this.onNameChange = this.onNameChange.bind(this);
        this.onImageUrlChange = this.onImageUrlChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onPoiFormSubmit = this.onPoiFormSubmit.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
    };

    public render() {
        return (
        <div className="city-form">
            <div className="form-group">
                <label>City name:</label>
                <input type="text" className="form-control" id="poi-name" onChange={this.onNameChange} />
            </div>
            <div className="form-group">
                <label>City Image Url:</label>
                <input type="text" className="form-control" id="poi-image-url" onChange={this.onImageUrlChange} />
            </div>
            <div className="form-group">
                <label >Country:</label>
                <input className="form-control" id="poi-country" onChange={this.onCountryChange}  />
            </div>
            <div className="form-group">
                <label >City description:</label>
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

    private onCountryChange(e) {
        this.setState({
            country:  e.target.value,
        })
    }

    private onPoiFormSubmit(e): any {
        const addPoiUrl = `http://localhost:55680/api/cities/city`;
        console.log("form submitted")
        axios.post(addPoiUrl, {
            name: this.state.name,
            description: this.state.description,
            imageUrl: this.state.imageUrl,
            country: this.state.country,
          }, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response: any) => {
            this.props.addCityAction(response.data);
            console.log(response);
        })
        .catch((error: any) => {
            console.log(error);
        });

        e.preventDefault();
    }
}

export default CityForm
