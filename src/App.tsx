import axios from "axios";
import * as React from "react"
import "./App.css"
import City from "./Components/City/City"
import Navigation from "./Components/Navigation/Navigation"
import ICity from "./Interfaces/ICity"
import logo from "./logo.svg"

interface ICities {
  cities: ICity[]
}

class App extends React.Component<{}, ICities> {

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
    const cityDetails: ICity = {
      country: "Australia",
      description: "Melbouse in one of the Australia's Biggest City",
      id: 1,
      imageUrl: "https://static.domain.com.au/domainblog/uploads/2017/09/14001811/2_gwx9yq.jpg",
      name: "Melbourne",
    }

    let citiesComponent: any;
    if (this.state.cities.length > 0) {
      citiesComponent = this.state.cities.map((city: ICity, index) =>  {
        return <div className="col-md-4">
          <City key={index} {...city}/>
          </div>;
      });
    }

    return <div className="container">
      <Navigation />
      <div className="row cities">
        {citiesComponent}
      </div>
    </div>;
  }
}

export default App
