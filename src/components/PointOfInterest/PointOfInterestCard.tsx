import * as React from "react"
import IPointOfInterest from "../../Interfaces/IPointOfInterest"
import "./pointOfInterest.css"

class PointOfInterestCard extends React.Component<IPointOfInterest> {
    constructor(props: IPointOfInterest) {
        super(props);
    };

    public render() {
    return (
        <div className="card poi-card">
            <div className="row no-gutters">
                <div className="col-auto poi-image">
                    <img className="card-img-top" src={this.props.imageUrl}/>
                </div>
                    <div className="col">
                        <div className="card-block px-2">
                            <p className="card-text">
                                {this.props.name}<br></br>
                                {this.props.description}
                            </p>
                            <div className="btn-group" >
                                <button type="button"
                                 className="btn btn-sm btn-outline-secondary">View</button>
                            </div>
                        </div>
                    </div>
                </div>

                    {/* <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>

                        </div>
                    </div> */}
                    {/* </div>
                </div> */}
            </div>
    )}
}

export default PointOfInterestCard
