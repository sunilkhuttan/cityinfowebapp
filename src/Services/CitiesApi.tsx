import axios from "axios";
import ICity from "../Interfaces/ICity"
const citiesApiUrl: string = "http://localhost:55680/api/cities";

export interface IGetCities {
    getAllCities();
    getSingleCity(id: number, includePointOfInterest: boolean);
}

export default class CitiesApi implements IGetCities  {
    public async getSingleCity(id: number, includePointOfInterest: boolean) {
        const includePoI: string = includePointOfInterest ? "true" : "false";
        let url: string = "";
        url += `${citiesApiUrl}/${id}?/includePointsOfInterest=${includePoI}`
        axios.get(url)
        .then(response => {
            console.log(response);
            return response.data;
        })
        .catch(error => {
            console.log(error);
            return error;
        })
    }
    public async getAllCities() {
        axios.get(citiesApiUrl)
        .then(response => {
            console.log(response);
            return response.data;
        })
        .catch(error => {
            console.log(error);
            return error;
        })
    }
}
