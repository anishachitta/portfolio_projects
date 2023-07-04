import { MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import React, { useState, useEffect } from "react";
import "./styles.css";
import departments from "./departments.json";
import Alert from "react-bootstrap/Alert";

const newData = departments.map((departments) => {
  return <option value={departments.name}>{departments.abbreviation}</option>;
});
const Roles = () => {
  const [items, setItems] = useState([]);
  const [roleID, setRoleId] = useState("");
  const [roleDesctiption, setRoleDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [roleIDToEdit, setRoleIDToEdit] = useState(-1);
  const [alert, setAlert] = useState("");

  const handleRoleID = (e) => {
    setRoleId(e.target.value);
  };

  const handleRoleDescription = (e) => {
    setRoleDescription(e.target.value);
  };

  const handleDeparment = (e) => {
    setDepartment(e.target.value);
  };

  const newRow = async () => {
    if (roleIDToEdit === -1) {
      const ROLEID = {
        id: Math.floor(Math.random() * 1000),
        value: roleID,
      };

      const ROLEDESCRIPTION = {
        id: Math.floor(Math.random() * 1000),
        value: roleDesctiption,
      };

      const DEPARTMENT = {
        id: Math.floor(Math.random() * 1000),
        value: department,
      };

      let lastRowRoleID = 0;
      if (items.length > 0) {
        lastRowRoleID = items[items.length - 1][0].id;
      }
      const serialNo = {
        id: lastRowRoleID + 1,
      };

      const newArray = [serialNo, ROLEID, ROLEDESCRIPTION, DEPARTMENT];

      let updatedItems = [...items];
      updatedItems[items.length] = newArray;
      setItems(updatedItems); //saving updateditems to state

      await postData(updatedItems);
    }
  };

  const EditThis = (roleID) => {
    let indexToEdit = -1;
    const newUpdatedItems = [...items];

    indexToEdit = newUpdatedItems.findIndex(
      (item) => item[0].id === roleID //item is a label for each element in newUpdatedItems, not the first element
    );
    if (indexToEdit === -1) {
      console.log("row not found");
    } else {
      setRoleIDToEdit(roleID);
    }
    setRoleId(newUpdatedItems[indexToEdit][1].value);
    setRoleDescription(newUpdatedItems[indexToEdit][2].value);
    setDepartment(newUpdatedItems[indexToEdit][3].value);
  };

  const DeleteThis = async (roleID) => {
    let indexToDelete = -1;
    const newUpdatedItems = [...items];
    indexToDelete = newUpdatedItems.findIndex((item) => item[0].id === roleID);
    if (indexToDelete === -1) {
      <Alert variant="danger" style={{ width: "42rem" }}>
        <Alert.Heading>Row not found</Alert.Heading>
      </Alert>;
    } else {
      newUpdatedItems.splice(indexToDelete, 1); //not sure what the 1 here is in this line of code
      setItems(newUpdatedItems);

      await postData(newUpdatedItems);
    }
  };

  const saveRow = async () => {
    console.log("roleIDToEdit: " + roleIDToEdit);
    if (roleIDToEdit !== -1) {
      //when edit is clicked, it likely will be a positive int, so saveRow functionality will run
      let indexToEdit = -1;
      const newUpdatedItems = [...items]; //creating a copy of items state

      indexToEdit = newUpdatedItems.findIndex(
        (item) => item[0].id === roleIDToEdit //setting indexToEdit to the id that matches contactIDToEdit
      );
      if (indexToEdit === -1) {
        console.log("row not found");
      } else {
        //once indexToEdit variable has been assigned a value, newUpdatedItems will find the cell in its 2d array that matches
        //the row (indexToEdit) and specified object, and assign the updated state value (courtesy of editThis) and put it in the specified cell
        newUpdatedItems[indexToEdit][1].value = roleID;
        newUpdatedItems[indexToEdit][2].value = roleDesctiption;
        newUpdatedItems[indexToEdit][3].value = department;

        setItems(newUpdatedItems);

        await postData(newUpdatedItems);
      }
    }
  };

  const resetForm = () => {
    setRoleId("");
    setRoleDescription("");
    setDepartment("");
    setRoleIDToEdit(-1);
  };

  useEffect(() => {
    //console.log("entered into useEffect");
    async function getData() {
      try {
        const response = await fetch("http://localhost:8000/api/getRoleData");
        const data = await response.json();
        //console.log(data);

        setItems(data.root);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
    //onsole.log(items);
    setRoleIDToEdit(-1); // when page reloads, form is ready for new row
  }, []);

  async function postData(inputitems) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputitems),
    };

    const response = await fetch(
      "http://localhost:8000/api/saveRoleData",
      options
    );

    if (response.ok) {
      setAlert("Successfully Saved! ");

      console.log("saved");
    } else {
      setAlert("Failure: " + response.error);

      console.log("not saved");
    }

    //console.log(response);
  }

  return (
    <div class="mt-4">
      {alert.startsWith("Success") ? (
        <Alert variant="success" onClose={() => setAlert("")} dismissible>
          {alert}
        </Alert>
      ) : alert.startsWith("Failure") ? (
        <Alert variant="danger" onClose={() => setAlert("")} dismissible>
          {alert}
        </Alert>
      ) : (
        ""
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          newRow();
          saveRow();
          console.log({ items });
        }}
      >
        <MDBRow>
          <MDBCol>
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                value={roleID}
                onChange={handleRoleID}
                id="id_number"
                name="id_number"
                placeholder="Role ID"
                label="Role ID"
                pattern="[0-9]+"
                validate
                required
              />
              <label for="id_number">Role ID</label>
            </div>
          </MDBCol>

          <MDBCol>
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="role_description"
                value={roleDesctiption}
                onChange={handleRoleDescription}
                name="role_description"
                placeholder="Role Description"
                label="Role Description"
                pattern="[a-zA-Z\d\-_\s]+"
                validate
                required
              />
              <label for="role_description">Role Description</label>
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow class="pt-4">
          <MDBCol>
            <div class="form-floating">
              <select
                className="form-select"
                class="form-control w-50"
                value={department}
                onChange={handleDeparment}
                placeholder="Departments"
                required
              >
                <option>Select Department</option>
                {newData}
              </select>
              <label>Department</label>
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow class="pt-4">
          <MDBCol align="left">
            <button type="submit" class="btn btn-primary pr-4">
              Save
            </button>
            &nbsp;
            <button
              type="button"
              class="btn btn-primary pr-4"
              onClick={resetForm}
            >
              New
            </button>
          </MDBCol>
        </MDBRow>
      </form>
      &nbsp;
      <div className="table">
        <table width="100%" border={1}>
          <tr align="center">
            <th colSpan={6}> Roles Info</th>
          </tr>
          <tr>
            <td>Edit</td>
            <td>Delete</td>
            <td>Serial No.</td>
            <td>Role ID</td>
            <td>Role Description</td>
            <td>Department</td>
          </tr>
          {items.map((item) => {
            return (
              <tr>
                <td>
                  <button
                    type="button"
                    class="btn btn-info"
                    onClick={() => {
                      EditThis(item[0].id);
                    }}
                  >
                    ✏️
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => {
                      let result = window.confirm("Want to delete?");
                      if (result) {
                        DeleteThis(item[0].id);
                      }
                    }}
                  >
                    x
                  </button>
                </td>
                <td key={item[0].id}>{item[0].id}</td>
                <td key={item[1].id}>{item[1].value}</td>
                <td key={item[2].id}>{item[2].value}</td>
                <td key={item[3].id}>{item[3].value}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Roles;
