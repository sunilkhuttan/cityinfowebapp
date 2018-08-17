import axios from "axios";
import * as React from "react"
import ICity from "../../Interfaces/ICity"
import CityCard from "./CityCard"

interface ICities {
    cities: ICity[]
}

class City extends React.Component<{}, ICities> {
    constructor(props: {}) {
        super(props);
        this.state = {cities: []}
      };

      public async componentDidMount() {
        const self: any = this;
        // const allCities: CitiesApi = new CitiesApi();
        // const responseData = await allCities.getAllCities();
        // self.setState(
        //   {
        //       cities : responseData,
        //   })
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
        return (
            <div className="row">
                {
                    this.state.cities.map((city: ICity, index) => {
                        return <CityCard key={index} {...city} />
                    })
                }
            </div>
        )
    }

}

export default City
