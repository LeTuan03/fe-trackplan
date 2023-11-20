import axios from "axios";
import ConstantList from "../appConfig";
const API_PATH = ConstantList.API_ENPOINT;

export const authenticationServices = async (searchObject) => {
  return axios.post(API_PATH + "/login", searchObject)
}