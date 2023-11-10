"use client";

import axios from "axios";
const { createContext, useContext, useState, useEffect } = require("react");
import { useRouter } from "next/navigation";

const userContext = createContext({
  isCustomer: undefined,
  loggedIn: false,
  _id: "",
  email: "",
  firstName: "",
  lastName: "",
  mobileNo: "",
  country: {},
  state: {},
  city: {},
  receiveEmail: undefined,
  items: [],
  createdAt: "",
  updatedAt: "",
});

export function UserProvider({ children }) {
  const router = useRouter();
  const [userData, setUserData] = useState({
    isCustomer: undefined,
    loggedIn: false,
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    mobileNo: "",
    country: {},
    state: {},
    city: {},
    receiveEmail: undefined,
    items: [],
    createdAt: "",
    updatedAt: "",
  });
  const fetchUser = async () => {
    const isCustomer = localStorage.getItem("isCustomer");
    const loggedIn = localStorage.getItem("loggedIn");
    const _id = localStorage.getItem("_id");

    try {
      if (loggedIn === "true") {
        // if(cookie?.authToken) {

        // }
        let { data } = await axios.get(
          `/api/user/get?_id=${_id}&isCustomer=${isCustomer}`,
          { withCredentials: true }
        );
        setUserData({
          ...data.data,
          loggedIn: Boolean(loggedIn),
          isCustomer: Boolean(isCustomer),
        });
      } else {
        console.log("not logged in");
        setUserData((prev) => prev);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchUser();
  }, [userContext]);

  return (
    <userContext.Provider value={{ userData, setUserData }}>
      {children}
    </userContext.Provider>
  );
}

export const UserConsumer = () => useContext(userContext);
