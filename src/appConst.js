export const STATUS = {
  SUCCESS: 200,
  NOCONTENT: 204,
  ERROR: 400,
  UNAUTHORIZED: 401,
  BAD_GATEWAY: 502
}
export const STATUS_OBJECT = {
  NEW: { code: 1, name: "New" },
  INPROGRESS: { code: 2, name: "Inprogress" },
  END: { code: 3, name: "End" }
}
export const ROLE = [
  { code: 1, indexOrder: "1", name: "ADMIN" },
  { code: 3, indexOrder: "3", name: "MEMBER" },
]
export const ROLE_OBJECT = {
  ADMIN: { code: 1, indexOrder: "1", name: "ADMIN" },
  SUPPER_ADMIN: { code: 2, indexOrder: "2", name: "SUPPER ADMIN" },
  MEMBER: { code: 3, indexOrder: "3", name: "MEMBER" },
}
export const LIST_STATUS = [
  {
    code: 1, label: "New"
  },
  {
    code: 2, label: "Inprogress"
  },
  {
    code: 3, label: "End"
  }
]
export const LIST_STATUS_PROJECT = ["New", "Inprogress", "End"]

export const COLOR = {
  PRIMARY: "#6366f1",
  PRIMARY_FIRST: "#4B49AC",
  PRIMARY_SECOND: "#98BDFF",
  SUPPORT_FIRST: "#7DA0FA",
  SUPPORT_SECOND: "#7978E9",
  SUPPORT_THIRD: "#F3797E",
}

export const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

export const LIST_PERCENT_COMPLETE = [
  {
    code: 1, label: "0%"
  },
  {
    code: 2, label: "10%"
  },
  {
    code: 3, label: "20%"
  },
  {
    code: 4, label: "30%"
  },
  {
    code: 5, label: "40%"
  },
  {
    code: 6, label: "50%"
  },
  {
    code: 7, label: "60%"
  },
  {
    code: 8, label: "80%"
  },
  {
    code: 9, label: "90%"
  },
  {
    code: 10, label: "100%"
  }
]