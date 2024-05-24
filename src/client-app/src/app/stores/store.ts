import { createContext, useContext } from "react";
import { StudentStore } from "./studentStore";
import ModalStore from "./modalStore";

interface Store{
	studentStore:StudentStore;
	modalStore:ModalStore;
}

export const store:Store = {
	studentStore : new StudentStore(),
	modalStore: new ModalStore(),
}

export const StoreContext = createContext(store)

export function useStore(){
	return useContext(StoreContext)
}