import axios from "axios"
const url = "https://www.omdbapi.com/"
const getDataApiCall = async(params: object) => {
  const result = await axios.get(url , {params : params})
  return result
}
export {
    getDataApiCall
}