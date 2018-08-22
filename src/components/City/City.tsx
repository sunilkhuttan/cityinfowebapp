import axios from "axios";
import * as React from "react"
import ICity from "../../Interfaces/ICity"
import getAllCities from "../../Services/CitiesApi"
import CityCard from "./CityCard"
import CityForm from "./CityForm";

interface ICities {
    cities: ICity[],
    displayCityForm: boolean,
    countries: [],
    loading: boolean,
}

class City extends React.Component<{}, ICities> {
    constructor(props: {}) {
        super(props);
        this.state = {cities: [], displayCityForm: false, countries: [], loading: true};
        this.addNewCity = this.addNewCity.bind(this);
      };

      public componentDidMount() {
        const self: any = this;
        getAllCities()
        .then(response => {
            const responseData = response.data;
            if (responseData !== undefined) {
                self.setState(
                    {
                      cities : responseData,
                      loading: false,
                })
            }
        })
        .catch(error => {
          console.log(error);
        })
      }

    public render() {

        let form: any;
        if (this.state.displayCityForm) {
            form = <CityForm addCityAction={this.addNewCity} />
        } else {
            form = "";
        }

        let cities: any;
        if (this.state.loading) {
            return <div>Loading cities ...</div>
        } else if (this.state.cities.length > 0) {
            cities = this.state.cities.map((city: ICity, index) => {
                return <CityCard key={index} {...city} />
            })
        } else {
            cities = <div>No cities found</div>;
        }

        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <button className="city-btn btn btn-primary btn-lg"
                            onClick={this.displayCityForm}
                            data-toggle="collapse"
                            data-target="#city-form">
                                Add new city
                            </button>
                    </div>
                    <div className="col-md-6">
                    </div>
                </div>
                <div id="city-form" className="row collapse">
                    {form}
                </div>
                <div className="row">
                    {
                        cities
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
