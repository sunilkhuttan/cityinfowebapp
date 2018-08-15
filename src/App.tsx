import axios from "axios";
import * as React from "react"
import "./App.css"
import City from "./components/City/City"
import ICity from "./components/Interfaces/ICity"
import logo from "./logo.svg"

interface ICities {
  cities: ICity[]
}

class App extends React.Component<{}, ICities> {

  constructor(props: {}) {
    super(props);
    this.state = {cities: []}

  };

  public componentDidMount(): void {
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
    const cityDetails: ICity = {
      country: "Australia",
      description: "Melbouse in one of the Australia's Biggest City",
      id: 1,
      imageUrl: "https://static.domain.com.au/domainblog/uploads/2017/09/14001811/2_gwx9yq.jpg",
      name: "Melbourne",
    }

    let citiesComponent: any;
    if (this.state !== null) {
      citiesComponent = this.state.cities.map((city: ICity, index) =>  {
        return <City key={index} {...city}></City>;
      });
    }

    return <div>{citiesComponent}</div>;
  }
}

export default App
