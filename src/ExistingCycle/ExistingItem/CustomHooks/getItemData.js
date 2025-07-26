import axios from "axios";
import { API_URL } from "../../../Components/apiConfig";

// Hardcoded mock data for static app
const mockItemData = {
  data: {
    cost: [{
      description: "Sample Product Description",
      SupplierName: "Sample Supplier Co.",
      Cost: "25.50"
    }],
    description: [{
      Description: "Sample Product Description",
      price: "35.99",
      PriceC: "32.99",
      PriceA: "30.99"
    }]
  }
};

export const fetchDataItem = async (Id) => {
  try {
    // API call commented out for static app
    // let response = await axios.get(`${API_URL}/all-data/${Id}`);
    // console.log('SEARCH RESPONSE===>', response)
    // return response;

    // Return mock data instead
    console.log('MOCK SEARCH RESPONSE===>', mockItemData)
    return mockItemData;
  } catch (e) {
    console.log('ERRRRRRRRRRRRRRRRRROR ', e)
  }
};
/*
The function fetchDataItem takes one parameter, Id, which is used to construct the URL for the GET request. The endpoint that the function is calling is `${API_URL}/all-data/ with the Id appended to the end.

The function uses axios.get to make the GET request to the constructed URL. Once the response is received, the function returns the entire response object.

This function can be used in a React component to fetch data from the specified endpoint. By importing and using this function, the component can make an HTTP GET request to the endpoint and use the data received from the response to update its state and/or render content.
*/
