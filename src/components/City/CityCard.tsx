import axios from "axios";
import * as React from "react"
import { Link, NavLink, Redirect, withRouter} from "react-router-dom"
import ICity from "../../Interfaces/ICity"
import "./city.css";

class CityCard extends React.Component<ICity> {
    constructor(props: ICity) {
        super(props);
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
                        <li  className="btn btn-sm btn-outline-secondary link-btn">
                            <Link to={url}>
                                View Points Of Interest
                            </Link>
                        </li>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )}
}

export default CityCard
