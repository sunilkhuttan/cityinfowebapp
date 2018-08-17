import axios from "axios";
import * as React from "react"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import "./App.css"
import City from "./Components/City/City"
import Home from "./Components/Home/Home"
import NavBar from "./Components/NavBar/NavBar"
import PointOfInterestCard from "./Components/PointOfInterest/PointOfInterest"
import PointOfInterest from "./Components/PointOfInterest/PointOfInterest"

class App extends React.Component {

  // constructor(props: {}) {
  //   super(props);
  //   this.state = {cities: []}

  // };

  public render() {
    return <div>
        <Router>
          <div className="container">
            <NavBar />
            <div className="row cities">
              <Switch>
                <Route path="/" component={City} exact/>
                <Route path="/pointsofinterest/:id" component={PointOfInterest}/>
                <Route path="/pointsofinterest" component={PointOfInterest}/>
              </Switch>
            </div>
          </div>
        </Router>
      </div>;
  }
}

export default App
