import axios from "axios";
import ICityFormState from "../Interfaces/ICityFormState";
let apiUrl = `http://localhost:55680/api/cities`;
import generateErrorMessage from "./GenerateErrorMessage";

export function getSingleCity(cityId: number, includePoI: string) {
    apiUrl += `${apiUrl}/${cityId}?/includePointsOfInterest=${includePoI}`
    axios.get(apiUrl)
    .then(response => {
        console.log(response);
        return response;
    })
    .catch(error => {
        const errorMessage = generateErrorMessage(error);
        alert(errorMessage)
        console.log(errorMessage);
        return error.response;
    })
}

export function addNewCity(newCity: ICityFormState) {
    apiUrl += "/city"
    return axios.post(apiUrl, newCity)
    .then(response => {
        console.log(response);
        return response;
    })
    .catch(error => {
        const errorMessage = generateErrorMessage(error);
        alert(errorMessage)
        console.log(errorMessage);
        return error.response;
    })
}

export default function getAllCities() {
    return axios.get(apiUrl)
    .then(response => {
        console.log(response);
        return response;
    })
    .catch(error => {
        const errorMessage = generateErrorMessage(error);
        alert(errorMessage)
        console.log(errorMessage);
        return error.response;
    })
}
