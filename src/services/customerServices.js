import axios from "axios";
import ConstantList from "../appConfig";
const API_PATH = ConstantList.API_ENPOINT;

// account 
export const getAll = async () => {
  return axios.get(API_PATH + "/getAllAccounts")
}
export const getProjectByAccountId = async (searchObject) => {
  let url = API_PATH + "/getProjectsByAccountId/" + searchObject.id
  return axios.get(url)
}


// project 
export const getProjectById = async (id) => {
  let url = API_PATH + "/getProjectById/" + id
  return axios.get(url)
}