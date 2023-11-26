export const STATUS = {
  SUCCESS: 200,
  NOCONTENT: 204,
  ERROR: 400
}
export const STATUS_OBJECT = {
  NEW: { code: 1, name: "New" },
  INPROGRESS: { code: 2, name: "Inprogress" },
  END: { code: 3, name: "End" }
}
export const ROLE_OBJECT = {
  ADMIN: { code: 1, indexOrder: "1", name: "ADMIN" },
  SUPPER_ADMIN: { code: 2, indexOrder: "2", name: "SUPPER ADMIN" },
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
  PRIMARY: "#6366f1"
}

export const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};