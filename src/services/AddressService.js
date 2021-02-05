const requestPromise = require("request-promise-native");


const getAddress = async addressData => {
    const endpoint = `https://api-adresse.data.gouv.fr/search/?q=${addressData.address}`;
    var options = {
      method: "GET",
      uri: endpoint
    };
    const addressResponse = await requestPromise(options)
      .then(response => {
        return response;
      })
      .catch(function(error) {
        console.error(
          'Error to get Address'
        );
      });
    return addressResponse;
  };

  module.exports = {
    getAddress
  };
  
  