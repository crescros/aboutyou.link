import React from "react";
import { Button } from "@material-ui/core";

import EditLinkForm from "./EditLinkForm";

export default function Link({ link, editable }) {
  return (
    <div>
      <Button color="primary" component={"a"} href={link.link} title={link.description}>
        {link.name}
      </Button>
      {editable && <EditLinkForm link={link} />}
    </div>
  );
}
