import ICity from "./ICity";

interface ICitiesState {
    cities: ICity[],
    displayCityForm: boolean,
    countries: [],
    loading: boolean,
}

export default ICitiesState;
