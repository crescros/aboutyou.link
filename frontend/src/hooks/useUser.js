import axios from "axios";
import { useSnackbar } from "notistack";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

function useUser() {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  function login(user) {
    if (!user.username)
      return enqueueSnackbar("please type in your username", { variant: "error" });
    if (!user.password)
      return enqueueSnackbar("please type in your password", { variant: "error" });

    return axios
      .post("users/login", user)
      .then((response) => {
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("user_id", jwt_decode(response.data.token).sub);
          history.push("/me")
        } else {
          enqueueSnackbar("failed to connect to micron server", { variant: "error" });
        }
      })
      .catch(() => {
        enqueueSnackbar("failed to connect to micron server", { variant: "error" });
      });
  }

  function logout() {
    localStorage.clear();
    history.push("/");
    location.reload();
  }

  function register(user) {
    if (!user.username) return enqueueSnackbar("please type in your username");
    if (!user.password === user["confirm-password"]) return enqueueSnackbar("passwords do not match");
    if (!user.password) return enqueueSnackbar("please type in your password");
    if (!user.email) return enqueueSnackbar("please type in your email");

    return axios
      .post("users/register", user)
      .then((res) => {
        if (res.data.success) {
          enqueueSnackbar("new user created", { variant: "success" });
          history.push("/login")
        } else {
          enqueueSnackbar("failed to connect to micron server", { variant: "error" });
        }
      })
      .catch(() => {
        enqueueSnackbar("failed to connect to micron server", { variant: "error" });
      });;
  }

  function setToken(token) {
    axios.defaults.headers.common["Authorization"] = token;
    localStorage.setItem("token", token);
  }

  function users() {
    return axios.get("users/get?user=" + localStorage.getItem("user_id"), {
      user: localStorage.getItem("user_id"),
    });
  }

  function links() {
    return axios.get("links/get");
  }

  function createLink(link) {
    return axios.post("links/newentry", link);
  }

  return {
    users,
    links,
    login,
    register,
    createLink,
    logout,
    setToken,
  };
}

export default useUser;
