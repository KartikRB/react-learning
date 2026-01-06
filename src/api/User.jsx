import api from "./Axios";

export const fetchUser = () => {
  return api.get("/user");
};
