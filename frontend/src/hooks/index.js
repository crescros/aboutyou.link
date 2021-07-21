import axios from "axios";
import useUser from "./useUser";
import useServer from "./useServer";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export { useUser, useServer };
