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
          history.push("/app");
          location.reload();
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
    history.push("/app");
    location.reload();
  }

  function register(user) {
    if (!user.username) return enqueueSnackbar("please type in your username");
    if (!user.password === user["confirm-password"])
      return enqueueSnackbar("passwords do not match");
    if (!user.password) return enqueueSnackbar("please type in your password");
    if (!user.email) return enqueueSnackbar("please type in your email");

    return axios
      .post("users/register", user)
      .then((res) => {
        if (res.data.success) {
          enqueueSnackbar("new user created", { variant: "success" });
          history.push("/app/login");
        } else {
          enqueueSnackbar("failed to connect to micron server", { variant: "error" });
        }
      })
      .catch(() => {
        enqueueSnackbar("failed to connect to micron server", { variant: "error" });
      });
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

  function deleteLink(linkId) {
    return axios.delete("links/" + linkId);
  }
  function updateUser(user) {
    return axios.patch("users/edit", user);
  }
  function updateLink(linkId, link) {
    return axios.patch("links/edit/" + linkId, link);
  }
  function getUser(userName) {
    return axios.get(userName);
  }

  return {
    users,
    links,
    login,
    register,
    createLink,
    logout,
    setToken,
    deleteLink,
    updateUser,
    updateLink,
    getUser,
  };
}

export default useUser;
