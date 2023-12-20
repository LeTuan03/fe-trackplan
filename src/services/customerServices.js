import axios from "axios";
import ConstantList from "../appConfig";
import { getCurrentUser } from "src/appFunctions";
const API_PATH = ConstantList.API_ENPOINT;
const API_PATH_V1 = ConstantList.API_ENPOINT + ConstantList.PRE_FIX;
const API_PATH_LOP10 = ConstantList.API_ENPOINT + ConstantList.PRE_FIX + "/lop10";
const API_PATH_LOP11 = ConstantList.API_ENPOINT + ConstantList.PRE_FIX + "/lop11";
const API_PATH_LOP12 = ConstantList.API_ENPOINT + ConstantList.PRE_FIX + "/lop12";

// account
export const getAll = async () => {
  return axios.get(API_PATH + "/getAllAccounts");
};
export const getProjectByAccountId = async (searchObject) => {
  let url = API_PATH + "/getProjectsByAccountId/" + searchObject.id;
  return axios.get(url);
};
export const addAccount = async (searchObject) => {
  let url = API_PATH + "/addAccount";
  return axios.post(url, searchObject);
};
export const searchAccount = async (searchObject) => {
  let config = { params: searchObject };
  let url = API_PATH + "/searchAcc";
  return axios.get(url, config);
};
export const getAccountById = async (id) => {
  let url = API_PATH + "/getAccountById/" + id;
  return axios.get(url);
};
export const updateAccountById = async (searchObject) => {
  let url = API_PATH + "/updateAccountById/" + searchObject?.id;
  return axios.post(url, searchObject);
};
export const deleteAccountById = async (searchObject) => {
  let url = API_PATH + "/deleteAccountById/" + searchObject?.id;
  return axios.delete(url, searchObject);
};

// project
export const getAllProject = async () => {
  let url = API_PATH + "/getAllProjects";
  return axios.get(url);
};
export const getProjectById = async (id) => {
  let url = API_PATH + "/getProjectById/" + id;
  return axios.get(url);
};
export const addProject = async (searchObject) => {
  let url = API_PATH + "/addProject";
  return axios.post(url, searchObject);
};
export const editProject = async (searchObject) => {
  let url = API_PATH + "/updateProjectById/" + searchObject?.id;
  return axios.put(url, searchObject);
};
export const deleteProject = async (searchObject) => {
  let url = API_PATH + "/deleteProjectById/" + searchObject?.id;
  return axios.delete(url);
};
export const searchProject = async (searchObject) => {
  let url = API_PATH + "/search";
  return axios.post(url, searchObject);
};

//task

export const deleteTask = async (id) => {
  let url = API_PATH_V1 + "/task/delete/" + id;
  return axios.delete(url);
};
export const updateAdds = async (searchObject) => {
  let url = API_PATH_V1 + "/task/adds";
  return axios.post(url, searchObject);
};
export const updateTask = async (searchObject) => {
  let url = API_PATH_V1 + "/task/edit/" + searchObject.id;
  return axios.put(url, searchObject);
};
export const getById = async (id) => {
  let url = API_PATH_V1 + "/task/getById/" + id;
  return axios.get(url);
};
export const getByMemberId = async () => {
  let url = API_PATH_V1 + "/task/getByUserId/" + getCurrentUser()?.id;
  return axios.get(url);
};

//member

export const getMember = async (role) => {
  let url = API_PATH + "/getMember/" + role;
  return axios.get(url);
};

//diem lop 10

export const addLop10 = async (searchObject) => {
  let url = API_PATH_LOP10 + "/add";
  return axios.post(url, searchObject);
};

export const deleteLop10 = async (id) => {
  let url = API_PATH_LOP10 + "/deleteById/" + id;
  return axios.delete(url);
};
export const updateLop10 = async (searchObject) => {
  let url = API_PATH_LOP10 + "/updateById/" + searchObject.id;
  return axios.put(url, searchObject);
};
export const getByIdLop10 = async (id) => {
  let url = API_PATH_LOP10 + "/getById/" + id;
  return axios.get(url);
};

//diem lop 11

export const addLop11 = async (searchObject) => {
  let url = API_PATH_LOP11 + "/add";
  return axios.post(url, searchObject);
};

export const deleteLop11 = async (id) => {
  let url = API_PATH_LOP11 + "/deleteById/" + id;
  return axios.delete(url);
};
export const updateLop11 = async (searchObject) => {
  let url = API_PATH_LOP11 + "/updateById/" + searchObject.id;
  return axios.put(url, searchObject);
};
export const getByIdLop11 = async (id) => {
  let url = API_PATH_LOP11 + "/getById/" + id;
  return axios.get(url);
};

//diem lop 12

export const addLop12 = async (searchObject) => {
  let url = API_PATH_LOP12 + "/add";
  return axios.post(url, searchObject);
};

export const deleteLop12 = async (id) => {
  let url = API_PATH_LOP12 + "/deleteById/" + id;
  return axios.delete(url);
};
export const updateLop12 = async (searchObject) => {
  let url = API_PATH_LOP12 + "/updateById/" + searchObject.id;
  return axios.put(url, searchObject);
};
export const getByIdLop12 = async (id) => {
  let url = API_PATH_LOP12 + "/getById/" + id;
  return axios.get(url);
};
