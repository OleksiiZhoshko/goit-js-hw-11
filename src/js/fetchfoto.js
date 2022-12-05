import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/'
const KEY = '?key=31715954-2386a5915a6907852388fbb64'
const param = '&image_type=photo&orientation=horizontal&safesearch=true'


export async function fetchFoto(inputValue, pageNumber = 1) {
    try {
        const response = await axios.get(`${BASE_URL}${KEY}&q=${inputValue}${param}&page=${pageNumber}&per_page=40`)
      return response
    }
    catch (error) {
    console.log(error);
    }
  console.log(response)  
}


