import axios from "axios";
import { useSnackbar } from "notistack";

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

    return axios.post("users/register", user);
  }

  function setToken(token) {
    axios.defaults.headers.common["Authorization"] = token;
  }

  return {
    login,
    register,
  };
}

export default useUser;
