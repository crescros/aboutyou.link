import axios from "axios";
import { useSnackbar } from "notistack";
import jwt_decode from "jwt-decode";

function useUser() {
  const { enqueueSnackbar } = useSnackbar();

  function login(user) {
    if (!user.username)
      return enqueueSnackbar("please type in your username", { variant: "error" });
    if (!user.password)
      return enqueueSnackbar("please type in your password", { variant: "error" });

    return axios
      .post("users/login", user)
      .then((response) => {
        console.log(response.data.token);
        setToken(response.data.token);
        localStorage.setItem("user_id", jwt_decode(response.data.token).sub);
        enqueueSnackbar("login successful", { variant: "success" });
      })
      .catch(() => {
        enqueueSnackbar("failed to connect to micron server", { variant: "error" });
      });
  }

  function register(user) {
    if (!user.username) return enqueueSnackbar("please type in your username");
    if (!user.password) return enqueueSnackbar("please type in your password");
    if (!user.email) return enqueueSnackbar("please type in your email");
    console.log(user);
    return axios.post("users/register", user);
  }

  function setToken(token) {
    axios.defaults.headers.common["Authorization"] = token;
  }

  function users() {
    return axios.get("users/get", {
      user: localStorage.getItem("user_id"),
    });
  }

  function links() {
    return axios.get("links/get");
  }

  function createLink(link) {
    return axios.get("links/newentry", link);
  }

  return {
    users,
    links,
    login,
    register,
    createLink,
  };
}

export default useUser;
