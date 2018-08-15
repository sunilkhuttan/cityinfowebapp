import ICity from "../Interfaces/ICity";
import IPointOfInterest from "./IPointOfInterest"

interface ICityApi {
    getSingleCity: ICity;
    getAllCities: ICity[];
}

export default ICityApi
