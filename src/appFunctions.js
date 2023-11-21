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