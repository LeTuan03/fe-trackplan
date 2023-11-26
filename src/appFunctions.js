import { ROLE_OBJECT, STATUS_OBJECT, statusMap } from "./appConst";

export const getHighestRole = () => {
  return JSON.parse(sessionStorage.getItem("currentUser"))
}
export const getCurrentUser = () => {
  const res = JSON.parse(sessionStorage.getItem("currentUser"));
  return {
    id: res?.id,
    username: res?.username,
    role: res?.role
  }
}
export const renderStatus = (status) => {
  switch (status) {
    case STATUS_OBJECT.NEW.name:
      return statusMap.delivered
      break;
    case STATUS_OBJECT.INPROGRESS.name:
      return statusMap.pending
      break;
    case STATUS_OBJECT.END.name:
      return statusMap.refunded
      break;
    default:
      break;
  }
}
export const renderRole = (status) => {
  switch (status) {
    case ROLE_OBJECT.ADMIN.indexOrder:
      return statusMap.delivered
      break;
    case ROLE_OBJECT.SUPPER_ADMIN.indexOrder:
      return statusMap.refunded
      break;
    default:
      break;
  }
}