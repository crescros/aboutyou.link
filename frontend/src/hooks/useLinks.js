import axios from "axios";
import { useSnackbar } from "notistack";

function useLink() {
  const { enqueueSnackbar } = useSnackbar();

  function createLink(link) {
    if (!link.name) return enqueueSnackbar("please type in a link Name");

    return axios.post("links/newentry", link);
  }

  return {
    createLink,
  };
}

export default useLink;
