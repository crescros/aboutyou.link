import React, { useState, useEffect } from "react";
import { useUser } from "../hooks";
import { useParams } from "react-router";

export default function OtherUser() {
  const { getUser } = useUser();
  const { username } = useParams();

  const [errorMessage, setErrorMessage] = useState();
  const [userData, setUserData] = useState();

  useEffect(() => {
    console.log(username);
    getUser(username).then((res) => {
      console.log(username);
      console.log(res);

      if (!res.data.success && res.data.msg) {
        setErrorMessage(res.data.msg);
      }

      if (res.data.success) {
        setUserData(res.data.user);
      }
    });
  }, []);

  return (
    <div>
      {errorMessage && <h1>{errorMessage}</h1>}

      {userData && JSON.stringify(userData)}
    </div>
  );
}
