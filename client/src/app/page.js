"use client";
import { UserConsumer } from "@/store/userContext";
import { useEffect } from "react";

export default function Home() {
  const { userData, setUserData } = UserConsumer();
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  return (
    <>
      HOME <br />
      {userData.loggedIn ? "loggedIn" : "not loggedIn"}
    </>
  );
}
