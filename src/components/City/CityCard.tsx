import axios from "axios";
import * as React from "react"
import { Link, NavLink, Redirect, withRouter} from "react-router-dom"
import ICity from "../../Interfaces/ICity"
import "./city.css";

class CityCard extends React.Component<ICity> {
    constructor(props: ICity) {
        super(props);
        this.showPointsOfInterest = this.showPointsOfInterest.bind(this);
      };

    public render() {
    const url: string = `/pointsofinterest/${this.props.id}/${this.props.name}`;
    return (
        <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
                <img className="card-img-top" src={this.props.imageUrl}/>
                <div className="card-body">
                    <p className="card-text">
                        {this.props.name}, {this.props.country} <br></br>
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                        {/* <button type="button" className="btn btn-sm btn-outline-secondary"
                        onClick={this.showPointsOfInterest}>
                            View Points Of Interest
                        </button> */}
                        <li  className="btn btn-sm btn-outline-secondary link-btn">
                            <NavLink activeClassName="active" to={url} exact>
                                View Points Of Interest
                            </NavLink>
                        </li>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}

    public showPointsOfInterest(e) {
        const url: string = `/pointsofinterest/${this.props.id}/${this.props.name}`;
        return <Redirect to={url} push={true} />
    }

}

export default CityCard
