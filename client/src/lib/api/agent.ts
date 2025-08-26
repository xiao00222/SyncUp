import axios from "axios";
import { Store } from "../stores/store";
const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});
agent.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    return response;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
  finally{
    Store.uiStore.isIdle();
  }
});
agent.interceptors.request.use(config=>
{
  Store.uiStore.isBusy();
  return config;
}
)

export default agent;
