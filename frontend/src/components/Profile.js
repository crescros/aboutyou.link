import React, { useState, useEffect } from "react";
import { useUser } from "../hooks";
import { Button, CircularProgress, TextField } from "@material-ui/core";

export default function Profile() {
  const { users, logout, createLink } = useUser();
  const [userData, setUserData] = useState();
  const [newLinkData, setNewLinkData ] = useState({});

  
  function handleChangeFormField(e) {
    const tempUserData = newLinkData;
    newLinkData[e.target.name] = e.target.value;
    setNewLinkData(tempUserData);
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    createLink(newLinkData).then(() => {   
      getLinks()
    });
  }

  function getLinks(){
    users().then((res) => {
      setUserData(res.data.user);
    });
  }

  useEffect(() => {
    getLinks()
  }, []);

  return (
    <div>
      <div>AboutYou</div>

      {
        userData ?
          <div>
            <div>
              bio: {userData.bio}
            </div>
            <div>
              email: {userData.email}
            </div>
            <div> joined {(new Date(userData.createdAt)).toLocaleDateString()}
            </div>

            <br />
            <br />
            <br />

            <div>
              links:
            </div>
            {
              userData.links.map((link) => (
                <div key={link._id}><a href={link.link}>{link.name}</a>
                </div>
              ))
            }


            <br />
            <br />
            <br />
            <br />

            <div>Add New Link</div>

            <div>
              
            <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Link Name"
                name="name"
                onChange={handleChangeFormField}
              />
              </div>

            <div>
              
            <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Link Description"
                name="description"
                onChange={handleChangeFormField}
              />
              </div>

            <div>
              
            <TextField
                variant="outlined"
                required
                fullWidth
                id="link"
                label="Link Url"
                name="link"
                onChange={handleChangeFormField}
              />
              </div>
            <div>
              <Button onClick={handleSubmitForm}>submit</Button>
            </div>
            <br />
            <br />
            <br />
          </div> :
          <CircularProgress />
      }



      <div>
        <Button onClick={logout}>logout</Button>
      </div>
    </div>
  );
}
