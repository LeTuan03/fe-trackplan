import axios from "axios";
import ConstantList from "../appConfig";
import { getCurrentUser } from "src/appFunctions";
const API_PATH = ConstantList.API_ENPOINT;
const API_PATH_V1 = ConstantList.API_ENPOINT + ConstantList.PRE_FIX

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
export const getAccountById = async (id) => {
  let url = API_PATH + "/getAccountById/" + id
  return axios.get(url)
}
export const updateAccountById = async (searchObject) => {
  let url = API_PATH + "/updateAccountById/" + searchObject?.id
  return axios.post(url, searchObject)
}


// project 
export const getAllProject = async () => {
  let url = API_PATH + "/getAllProjects"
  return axios.get(url)
}
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


//task

export const deleteTask = async (id) => {
  let url = API_PATH_V1 + "/task/delete/" + id
  return axios.delete(url)
}
export const updateAdds = async (searchObject) => {
  let url = API_PATH_V1 + "/task/adds"
  return axios.post(url, searchObject)
}
export const updateTask = async (searchObject) => {
  let url = API_PATH_V1 + "/task/edit/" + searchObject.id
  return axios.put(url, searchObject)
}
export const getById = async (id) => {
  let url = API_PATH_V1 + "/task/getById/" + id;
  return axios.get(url)
}
export const getByMemberId = async () => {
  let url = API_PATH_V1 + "/task/getByUserId/" + getCurrentUser()?.id
  return axios.get(url)
}

//member

export const getMember = async (role) => {
  let url = API_PATH + "/getMember/" + role;
  return axios.get(url)
}