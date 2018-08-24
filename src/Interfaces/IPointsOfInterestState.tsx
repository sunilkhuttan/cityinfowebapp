import IPointOfInterest from "./IPointOfInterest";

interface IPointsOfInterestState {
    pointsOfInterest: IPointOfInterest[];
    displayPoiForm: boolean;
    poiCityId: number;
    errorMessage: string;
    loading: boolean;
}

export default IPointsOfInterestState;
