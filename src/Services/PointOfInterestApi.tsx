import axios from "axios";
import ICityForm from "../Interfaces/ICityForm";
import IPointInterestForm from "../Interfaces/IPointInterestForm";
import generateErrorMessage from "./GenerateErrorMessage";
let apiUrl = `http://localhost:55680/api/cities`;

export function addNewPointOfInterest(newPoi: IPointInterestForm, cityId: number) {
    apiUrl = `http://localhost:55680/api/cities/${cityId}/pointsofinterest`;
    return axios.post(apiUrl, {
        name: newPoi.name,
        description: newPoi.description,
        imageUrl: newPoi.imageUrl,
    })
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

export function editPointOfInterest(formData: IPointInterestForm, cityId: number, poiId: number ) {
    apiUrl = `http://localhost:55680/api/cities/${cityId}/pointsofinterest/${poiId}`
    return axios.put(apiUrl, {
        name: formData.name,
        description: formData.description,
        imageUrl: formData.imageUrl,
     }, {
       headers: {
           "Content-Type": "application/json",
       },
   })
   .then((response: any) => {
       return response;
   })
   .catch((error: any) => {
    const errorMessage = generateErrorMessage(error);
    alert(errorMessage)
    console.log(errorMessage);
    return error.response;
   });
}

export function deletePointOfInterest(cityId: number, poiId: number) {
    apiUrl = `http://localhost:55680/api/cities/${cityId}/pointsofinterest/${poiId}`
    return axios.delete(apiUrl)
    .then((response: any) => {
      return response;
  })
  .catch((error: any) => {
    const errorMessage = generateErrorMessage(error);
    alert(errorMessage)
    console.log(errorMessage);
    return error.response;
  });
}

export function getAllPointsOfInterest(cityId: number) {
    apiUrl += `/${cityId}/pointsofinterest`;
    return axios.get(apiUrl)
    .then(response => {
        console.log(response);
        return response.data;
    })
    .catch(error => {
        const errorMessage = generateErrorMessage(error);
        alert(errorMessage)
        console.log(errorMessage);
        return error.response;
    })
}

export default getAllPointsOfInterest;
