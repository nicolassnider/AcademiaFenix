import { createContext, useContext } from "react";

import { StudentStore } from "./studentStore";
import CommentStore from "./commentStore";
import { CommonStore } from './commonStore';
import ModalStore from "./modalStore";
import ProfileStore from "./profileStore";
import { UserStore } from "./userStore";

interface Store {
    studentStore: StudentStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
    commentStore: CommentStore
}

export const store: Store = {
    studentStore: new StudentStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore(),
    commentStore: new CommentStore()
}

export const StoreContext = createContext(store)

export function useStore(){
    return useContext(StoreContext);
}