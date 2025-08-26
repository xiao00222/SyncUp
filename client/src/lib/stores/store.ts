import { createContext } from "react";
import CounterStore from "./CounterStore";
import { UiStore } from "./UiStore";

interface Store{
    counterStore:CounterStore
    uiStore:UiStore
}
export const Store:Store=
{
    counterStore:new CounterStore(),
    uiStore: new UiStore()
}
export const StoreContext= createContext(Store);