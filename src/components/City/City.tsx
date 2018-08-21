import axios from "axios";
import * as React from "react"
import ICity from "../../Interfaces/ICity"
import CityCard from "./CityCard"
import CityForm from "./CityForm";

interface ICities {
    cities: ICity[],
    displayCityForm: boolean
}

class City extends React.Component<{}, ICities> {
    constructor(props: {}) {
        super(props);
        this.state = {cities: [], displayCityForm: false};
        this.addNewCity = this.addNewCity.bind(this);
      };

      public async componentDidMount() {
        const self: any = this;
        axios.get("http://localhost:55680/api/cities")
        .then(response => {
            console.log(response);
            const responseData = response.data;
            self.setState(
                {
                  cities : responseData,
          })
        })
        .catch(error => {
          console.log(error);
        })
      }

    public render() {

        let form: any;
        if (this.state.displayCityForm) {
            form =  <div>
            <CityForm addCityAction={this.addNewCity} />
        </div>
        } else {
            form = "";
        }

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <button className="city-btn btn btn-primary btn-lg"
                        onClick={this.displayCityForm} >Add new city</button>
                        {form}
                    </div>
                </div>
                <div className="row">
                    {
                        this.state.cities.map((city: ICity, index) => {
                            return <CityCard key={index} {...city} />
                        })
                    }
                </div>
            </div>
        )
    }

    private addNewCity: any = (city: ICity) => {
        this.setState({cities: this.state.cities.concat(city)})
        this.displayCityForm();
    }

    private displayCityForm: any = (e: any) => {
        this.setState({ displayCityForm : !this.state.displayCityForm })
    }
}

export default City
