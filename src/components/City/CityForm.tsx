import axios from "axios";
import * as React from "react"
import ICityFormState from "../../Interfaces/ICityFormState";
import IEditPointInterestFormState from "../../Interfaces/IEditPointInterestFormState"
import * as cityApi from "../../Services/CitiesApi";
import "./city.css"

class CityForm extends React.Component<{addCityAction: (ICity) => void}, ICityFormState> {
    constructor(props: any) {
        super(props);
        this.state = {name: "", description: "", imageUrl: "", country: ""};
        this.onNameChange = this.onNameChange.bind(this);
        this.onImageUrlChange = this.onImageUrlChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onCityFormSubmit = this.onCityFormSubmit.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
    };

    public render() {
        return (
        <div className="city-form">
            <div className="form-group">
                <label>City name:</label>
                <input type="text" className="form-control" id="city-name" onChange={this.onNameChange} />
            </div>
            <div className="form-group">
                <label>City Image Url:</label>
                <input type="text" className="form-control" id="city-image-url" onChange={this.onImageUrlChange} />
            </div>
            <div className="form-group">
                <label >Country:</label>
                <input className="form-control" id="city-country" onChange={this.onCountryChange}  />
            </div>
            <div className="form-group">
                <label >City description:</label>
                <textarea className="form-control" id="city-description" onChange={this.onDescriptionChange}  />
            </div>
            <div className="save-btn-div">
                 <button onClick={this.onCityFormSubmit}>Save</button>
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

    private onCityFormSubmit(): any {
        console.log("form submitted")
        const newCity: ICityFormState = {
            name: this.state.name,
            description: this.state.description,
            imageUrl: this.state.imageUrl,
            country: this.state.country,
        }
        cityApi.addNewCity(newCity)
        .then((response: any) => {
            this.props.addCityAction(response.data);
        })
    }
}

export default CityForm
