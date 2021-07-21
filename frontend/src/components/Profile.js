import React from "react";
import { useUser } from "../hooks";

export default function Profile() {
  const { users, links } = useUser();

  console.log(users());
  console.log(links());

  return <div>lol hi</div>;
}
