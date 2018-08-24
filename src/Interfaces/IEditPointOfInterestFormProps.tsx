import IEditPointInterestFormState from "./IEditPointInterestFormState";

interface IEditPointOfInterestFormProps {
    poiToEdit: IEditPointInterestFormState,
    cityId: number,
    poiID: number,
    updatePoi: (IPointOfInterest) => void,
}

export default IEditPointOfInterestFormProps;
