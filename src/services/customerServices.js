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
export const addAccount = async (searchObject) => {
  let url = API_PATH + "/addAccount"
  return axios.post(url, searchObject)
}
export const searchAccount = async (searchObject) => {
  let config = { params: searchObject };
  let url = API_PATH + "/searchAcc"
  return axios.get(url, config)
}


// project 
export const getProjectById = async (id) => {
  let url = API_PATH + "/getProjectById/" + id
  return axios.get(url)
}
export const addProject = async (searchObject) => {
  let url = API_PATH + "/addProject"
  return axios.post(url, searchObject)
}
export const editProject = async (searchObject) => {
  let url = API_PATH + "/updateProjectById/" + searchObject?.id
  return axios.put(url, searchObject)
}
export const deleteProject = async (searchObject) => {
  let url = API_PATH + "/deleteProjectById/" + searchObject?.id
  return axios.delete(url)
}
export const searchProject = async (searchObject) => {
  let url = API_PATH + "/search"
  return axios.post(url, searchObject)
}
