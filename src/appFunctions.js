import { ROLE_OBJECT, STATUS_OBJECT, statusMap, LIST_PLAN_STATUS, LIST_PERCENT_COMPLETE } from "./appConst";

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
      return statusMap.refunded
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
      return statusMap.refunded
      break;
  }
}

export const convertTxt = (txt, length) => {
  if (txt.length < length) {
    return txt;
  }
  let newTxt = txt.slice(0, length)
  return <p style={{ wordBreak: "break-all" }}>{newTxt + "..."}</p>
}

export const getSelectedStatusValue = (code) => {
  switch (code) {
    case LIST_PLAN_STATUS[0].code:
      return LIST_PLAN_STATUS[0];
    case LIST_PLAN_STATUS[1].code:
      return LIST_PLAN_STATUS[1];
    case LIST_PLAN_STATUS[2].code:
      return LIST_PLAN_STATUS[2];
    case LIST_PLAN_STATUS[3].code:
      return LIST_PLAN_STATUS[3];
    case LIST_PLAN_STATUS[4].code:
      return LIST_PLAN_STATUS[4];
    case LIST_PLAN_STATUS[5].code:
      return LIST_PLAN_STATUS[5];
    default:
      return;
  }
};

export const getSelectedPercentValue = (label) => {
  switch (label) {
    case LIST_PERCENT_COMPLETE[0].label:
      return LIST_PERCENT_COMPLETE[0];
    case LIST_PERCENT_COMPLETE[1].label:
      return LIST_PERCENT_COMPLETE[1];
    case LIST_PERCENT_COMPLETE[2].label:
      return LIST_PERCENT_COMPLETE[2];
    case LIST_PERCENT_COMPLETE[3].label:
      return LIST_PERCENT_COMPLETE[3];
    case LIST_PERCENT_COMPLETE[4].label:
      return LIST_PERCENT_COMPLETE[4];
    case LIST_PERCENT_COMPLETE[5].label:
      return LIST_PERCENT_COMPLETE[5];
    case LIST_PERCENT_COMPLETE[6].label:
      return LIST_PERCENT_COMPLETE[6];
    case LIST_PERCENT_COMPLETE[7].label:
      return LIST_PERCENT_COMPLETE[7];
    case LIST_PERCENT_COMPLETE[8].label:
      return LIST_PERCENT_COMPLETE[8];
    case LIST_PERCENT_COMPLETE[9].label:
      return LIST_PERCENT_COMPLETE[9];
    default:
      return;
  }
};
