import axios from "axios";
import ConstantList from "../appConfig";
const API_PATH = ConstantList.API_ENPOINT;

export const getAll = async () => {
  return axios.get(API_PATH + "/getAllAccounts")
}