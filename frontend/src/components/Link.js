import React from "react";
import { Button } from "@material-ui/core";
import EditLinkForm from "./EditLinkForm";

export default function Link({ link }) {
  return (
    <div>
      <Button color="primary" component={"a"} href={link.link} title={link.description}>
        {link.name}
      </Button>
      <EditLinkForm link={link} />
    </div>
  );
}
