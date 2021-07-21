import axios from "axios";
import { useSnackbar } from "notistack";

function useServer() {
  const { enqueueSnackbar } = useSnackbar();

  function createServer(server) {
    if (!server.name) return enqueueSnackbar("please type in a server Name");

    return axios.post("servers/create", server);
  }

  return {
    createServer,
  };
}

export default useServer;
