import { createContext } from "react";
import CounterStore from "./CounterStore";
import { UiStore } from "./UiStore";
import { ActivityStore } from "./ActivityStore";

interface Store {
  counterStore: CounterStore;
  uiStore: UiStore;
  activityStore: ActivityStore;
}
export const Store: Store = {
  counterStore: new CounterStore(),
  uiStore: new UiStore(),
  activityStore : new ActivityStore(),
};
export const StoreContext = createContext(Store);
