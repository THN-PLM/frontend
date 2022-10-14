import create from "zustand";
import { persist } from "zustand/middleware";

const commonStore = create((set) => ({
  isLogged: !!localStorage.getItem("token"),
  //  isLogged:true,
  setIsLogged: (bool) => {
    set(() => ({ isLogged: bool }));
  },
  setUserToken: (token) => {
    set(() => ({ isLogged: true }));
    localStorage.setItem("token", token.accessToken);
  },
}));
export default commonStore;
export const userStore = create(
  persist((set) => ({
    userData: "",
    setUserData: (data) => {
      set(() => ({ userData: data }));
    },
  }))
);
