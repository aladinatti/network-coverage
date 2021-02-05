export interface ValidateInputsResponse {
    validCode: number;
    errorMessage: string;
    errorDescription: string;
}

export function validateInputs(address: string): ValidateInputsResponse {
    console.log('address');
    console.log(address);
    let response: ValidateInputsResponse = {
        validCode: 200,
        errorMessage: "",
        errorDescription: ""
    };
    try {
        if (address == undefined || address == "") {
            response.validCode = 400;
            response.errorMessage = "Bad Request";
            response.errorDescription = `Address should be defined - Returning : ${response.errorMessage}`;
            return response;
        }

    } catch (error) {
        response.validCode = 500;
        response.errorMessage = "Internal Server Error";
        response.errorDescription = `Error while validating Address - (${error}) - Returning : ${response.errorMessage}`;
    }
    return response;
}
