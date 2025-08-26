import { useContext } from "react";
import { StoreContext } from "../stores/store";

const useStore=()=>
{
    return useContext(StoreContext);
}

export default useStore;