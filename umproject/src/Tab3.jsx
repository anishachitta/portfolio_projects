import { MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import "./styles.css";
import departments from "./departments.json";
import Alert from "react-bootstrap/Alert";
import { row, col } from "react-bootstrap";

//Note to developer:
/**
 Currently, in the handleCheckboxInfo function, you are updating the checked state by always setting the checkbox's ID 
 as the key and its checked state as the value using updatedItems.set(e.target.id, e.target.checked). This approach 
 adds the checkbox to the checked map if it is checked but doesn't remove it if it is unchecked. As a result, 
 the checkboxes can only be checked but not unchecked.
 */

const Permissions = () => {
  const [rolesTable, setRolesTable] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [checked, setChecked] = useState(new Map());

  const handleCheckboxInfo = (e) => {
    console.log("reached the handleCheckboxInfo method");

    const checkboxId = e.target.id;
    const isChecked = e.target.checked;

    let updatedItems = new Map(checked);
    if (isChecked) {
      updatedItems.set(checkboxId, true);
    } else {
      updatedItems.delete(checkboxId);
    }
    setChecked(updatedItems);
  };

  const handleSave = async (e) => {
    await postData();
  };

  //get all the roles
  useEffect(() => {
    console.log("entered into useEffect");

    async function getRData() {
      try {
        const response = await fetch("http://localhost:8000/api/getRoleData");
        const data = await response.json();
        console.log("---data from getRoleData");
        console.log(data);
        console.log("+++data root");
        console.log(data.root);
        setRolesTable(data.root);
      } catch (error) {
        console.error(error);
      }
    }

    //get all the permissions
    async function getPData() {
      try {
        const response = await fetch(
          "http://localhost:8000/api/getPermissionsData"
        );
        const data = await response.json();
        console.log("///");
        console.log(data.root);

        setPermissions(data.root);
      } catch (error) {
        console.error(error);
      }
    }

    async function getCData() {
      try {
        const response = await fetch(
          "http://localhost:8000/api/getCheckboxData"
        );
        const data = await response.json();
        const checkboxMap = new Map(Object.entries(data.root));
        setChecked(checkboxMap);

        // //map through checked state
        // checked.map((mapItem) => {
        //   if (mapItem.id === )
        // }
      } catch (error) {
        console.error(error);
      }
    }

    getRData();
    getPData();
    getCData();
  }, []);

  async function postData() {
    let JSON_Object = Object.fromEntries(checked);
    //console.log("postData");
    console.log(JSON.stringify(JSON_Object));

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JSON_Object),
    };

    const response = await fetch(
      "http://localhost:8000/api/saveCheckboxData",
      options
    );

    //console.log(response);
  }

  console.log("***rolesTable");
  console.log(rolesTable);
  console.log("====permissionsTable");
  console.log(permissions);
  console.log("####checked");
  console.log(checked);
  return (
    <div className="table">
      <table class="table table-lg">
        <thead>
          <tr>
            <th>*</th>
            {rolesTable.map((role) => {
              return <th class="fw-bold">{role[2].value}</th>;
            })}
          </tr>
        </thead>

        <tbody>
          {permissions.map((permission) => {
            return (
              <tr align="center" class="p-3 border bg-light">
                <td>{permission.name}</td>
                {rolesTable.map((role) => {
                  return (
                    <td>
                      <input
                        type="checkbox"
                        id={permission.id + "_" + role[0].id} //key
                        checked={Array.from(checked).some(
                          (check) =>
                            permission.id + "_" + role[0].id == check[0]
                        )}
                        onChange={handleCheckboxInfo}
                      ></input>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default Permissions;
