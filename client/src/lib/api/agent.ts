import axios from "axios";
import { Store } from "../stores/store";
import { toast } from "react-toastify";
import { router } from "../../App/Router/routes";
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
agent.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    Store.uiStore.isIdle();
    return response;
  },
  async (error) => {
    await sleep(1000);
    Store.uiStore.isIdle();
    const { status, data } = error.response;
    switch (status) {
      case 400:
        //  if (data.errors) → Checks if the backend returned validation errors.

        // for (const key in data.errors) → Loops through each field name (Title, Description, etc.).

        // modalStateErrors.push(data.errors[key]) → Collects the array of errors for each field.

        // Example: ["The Title field is required."]

        // .flat() → Turns [["The Title field is required."], ["The Description..."]] into one flat array:
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("Unauthorized error");
        break;
      case 404:
        router.navigate("/not-found");
        break;
     case 500:
  router.navigate('/server-error', { state: { error: data } });
  break;
      default:
        break;
    }
    Promise.reject(error);
  }
);
agent.interceptors.request.use((config) => {
  Store.uiStore.isBusy();
  return config;
});

export default agent;
