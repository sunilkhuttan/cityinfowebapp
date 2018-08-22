function generateErrorMessage(error: any) {
    let errorMessage = ``;
    switch (error.response.status) {
            case 400:
            if (error.response.data.hasOwnProperty("Name")) {
                errorMessage += error.response.data.Name.map((desc, index) => {
                    return desc + ". ";
                })
            }
            if (error.response.data.hasOwnProperty("Description")) {
                errorMessage += error.response.data.Description.map((desc, index) => {
                    return desc + ". ";
                })
            }
            if (error.response.data.hasOwnProperty("ImageUrl")) {
                errorMessage += error.response.data.ImageUrl.map((desc, index) => {
                    return desc + ". ";
                })
            }
            if (error.response.data.hasOwnProperty("Country")) {
                errorMessage += error.response.data.Country.map((desc, index) => {
                    return desc + ". ";
                })
            }
            break;
            default:
            errorMessage += `Something went wrong while getting points of interest ${error.response}`;
        }

    return errorMessage;
}

export default generateErrorMessage;
