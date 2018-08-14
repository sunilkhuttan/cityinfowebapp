import * as React from "react"
import "./App.css"
import City from "./components/City/City"
import ICity from "./components/Interfaces/ICity"
import logo from "./logo.svg"

class App extends React.Component {
  public render() {
    const cityDetails: ICity = {
      country: "Australia",
      description: "Melbouse in one of the Australia's Biggest City",
      id: 1,
      imageUrl: "https://static.domain.com.au/domainblog/uploads/2017/09/14001811/2_gwx9yq.jpg",
      name: "Melbourne",
    }
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p> */}
        <div>
          <City {...cityDetails} />
        </div>
      </div>
    )
  }
}

export default App
