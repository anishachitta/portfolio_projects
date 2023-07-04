import React, { useState, useEffect } from "react";
import states_US from "./states_US";
import "./styles.css";
import { MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";
import Alert from "react-bootstrap/Alert";

const newData = states_US.map((states_US) => {
  return <option value={states_US.name}>{states_US.abbreviation}</option>;
});

const Form = () => {
  const [items, setItems] = useState([]);
  const [EMAIL, setEMAIL] = useState("");
  const [ADDRESS, setADDRESS] = useState("");
  const [ZIPCODE, setZIPCODE] = useState("");
  const [PASSWORD, setPASSWORD] = useState("");
  const [CITY, setCITY] = useState("");
  const [STATE, setSTATE] = useState("");
  const [ROLE, setROLE] = useState("");
  const [rolePopulation, setRolePopulation] = useState([]);
  const [alert, setAlert] = useState("");
  const [contactIDToEdit, setContactIDToEdit] = useState(-1); //represents the switch needed to either create a row, or edit an existing one
  //create state variables for remaining fields
  //create another state variable to identify add or save, store row id when edit is clicked and store -1 when new is clicked

  const handleEmail = (e) => {
    setEMAIL(e.target.value);
  };

  const handleAddress = (e) => {
    setADDRESS(e.target.value);
  };

  const handleZipcode = (e) => {
    setZIPCODE(e.target.value);
  };

  const handlePassword = (e) => {
    setPASSWORD(e.target.value);
  };

  const handleCity = (e) => {
    setCITY(e.target.value);
  };

  const handleState = (e) => {
    setSTATE(e.target.value);
  };
  const handleRole = (e) => {
    setROLE(e.target.value);
  };

  const newRow = async () => {
    if (contactIDToEdit === -1) {
      //if contactIDToedit is -1, it means new row
      const EEEmails = {
        id: Math.floor(Math.random() * 1000),
        value: EMAIL,
      };

      const AAAddress = {
        id: Math.floor(Math.random() * 1000),
        value: ADDRESS,
      };

      const ZZZipcode = {
        id: Math.floor(Math.random() * 1000),
        value: ZIPCODE,
      };

      const PPPassword = {
        id: Math.floor(Math.random() * 1000),
        value: PASSWORD,
      };

      const CCCity = {
        id: Math.floor(Math.random() * 1000),
        value: CITY,
      };

      const SSState = {
        id: Math.floor(Math.random() * 1000),
        value: STATE,
      };

      let lastRowContactID = 0;
      if (items.length > 0) {
        lastRowContactID = items[items.length - 1][0].id;
      }
      const uniqueID = {
        id: lastRowContactID + 1,
      };

      const newArray = [
        uniqueID,
        EEEmails,
        AAAddress,
        ZZZipcode,
        PPPassword,
        CCCity,
        SSState,
      ];

      let updatedItems = [...items];
      updatedItems[items.length] = newArray;
      setItems(updatedItems); //saving updateditems to state
      await postData(updatedItems);
    }
  };

  const EditThis = async (contactID) => {
    //state setter for editable fields, it also changes contactIdToEdit state to a positive int
    let indexToEdit = -1;
    const newUpdatedItems = [...items];

    indexToEdit = newUpdatedItems.findIndex(
      (item) => item[0].id === contactID //item is a label for each element in newUpdatedItems, not the first element
    );
    if (indexToEdit === -1) {
      console.log("row not found");
    } else {
      setContactIDToEdit(contactID); //setting of the contactIdToEdit state to the id of the row passed as a parameter (contactID)
    }
    //console.log("indexToEdit = " + indexToEdit);
    //console.log("contactID = " + contactID);
    //update states based on the specific cells in newUpdatedItems
    setEMAIL(newUpdatedItems[indexToEdit][1].value);
    setADDRESS(newUpdatedItems[indexToEdit][2].value);
    setZIPCODE(newUpdatedItems[indexToEdit][3].value);
    setPASSWORD(newUpdatedItems[indexToEdit][4].value);
    setCITY(newUpdatedItems[indexToEdit][5].value);
    setSTATE(newUpdatedItems[indexToEdit][6].value);
  };

  const DeleteThis = async (contactID) => {
    let indexToDelete = -1;
    const newUpdatedItems = [...items];

    indexToDelete = newUpdatedItems.findIndex(
      (item) => item[0].id === contactID //item is a label for each element in newUpdatedItems, not the first element
    );
    if (indexToDelete === -1) {
      <Alert variant="danger" style={{ width: "42rem" }}>
        <Alert.Heading>Row not found</Alert.Heading>
      </Alert>;
    } else {
      newUpdatedItems.splice(indexToDelete, 1);
      setItems(newUpdatedItems);
      await postData(newUpdatedItems);
    }
  };

  const saveRow = async () => {
    if (contactIDToEdit !== -1) {
      //when edit is clicked, it likely will be a positive int, so saveRow functionality will run
      let indexToEdit = -1;
      const newUpdatedItems = [...items]; //creating a copy of items state

      indexToEdit = newUpdatedItems.findIndex(
        (item) => item[0].id === contactIDToEdit //setting indexToEdit to the id that matches contactIDToEdit
      );
      if (indexToEdit === -1) {
        console.log("row not found");
      } else {
        //once indexToEdit variable has been assigned a value, newUpdatedItems will find the cell in its 2d array that matches
        //the row (indexToEdit) and specified object, and assign the updated state value (courtesy of editThis) and put it in the specified cell
        newUpdatedItems[indexToEdit][1].value = EMAIL;
        newUpdatedItems[indexToEdit][2].value = ADDRESS;
        newUpdatedItems[indexToEdit][3].value = ZIPCODE;
        newUpdatedItems[indexToEdit][4].value = PASSWORD;
        newUpdatedItems[indexToEdit][5].value = CITY;
        newUpdatedItems[indexToEdit][6].value = STATE;

        setItems(newUpdatedItems);
        await postData(newUpdatedItems);
      }
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("http://localhost:8000/api/getUserData");
        const data = await response.json();
        console.log(data);

        setItems(data.root);
      } catch (error) {
        console.error(error);
      }
    }

    async function getRData() {
      try {
        const response = await fetch("http://localhost:8000/api/getRoleData");
        const data = await response.json();
        //console.log(data);

        setRolePopulation(data.root);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
    setContactIDToEdit(-1); // when page reloads, form is ready for new row
    getRData();
  }, []);

  //role population into the select node
  const populateRoles = rolePopulation.map((role) => {
    return <option value={role[1].value}>{role[2].value}</option>;
  });

  async function postData(inputitems) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputitems),
    };

    const response = await fetch(
      "http://localhost:8000/api/saveUserData",
      options
    );

    if (response.ok) {
      setAlert("Successfully Saved! ");

      //console.log("saved");
    } else {
      setAlert("Failure: " + response.error);

      //console.log("not saved");
    }

    console.log(response);
  }

  const resetForm = () => {
    setEMAIL("");
    setADDRESS("");
    setZIPCODE("");
    setPASSWORD("");
    setCITY("");
    setSTATE("");
    setContactIDToEdit(-1);
  };

  return (
    <div className="login" class="mt-4">
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
          e.preventDefault(); //stop submission to server
          newRow();
          saveRow();
          console.log({ items });
        }}
      >
        <MDBRow>
          <MDBCol>
            <div class="form-floating">
              <input
                value={EMAIL}
                type="email"
                class="form-control"
                id="email"
                name="email"
                placeholder="Email"
                onChange={handleEmail}
                label="Email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                validate
                required
              />
              <label for="email">Email</label>
            </div>
          </MDBCol>
          <MDBCol align="left">
            <div class="form-floating">
              <input
                value={PASSWORD}
                onChange={handlePassword}
                type="password"
                class="form-control"
                id="password"
                name="password"
                placeholder="Password"
                pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                required
                title="Please enter a valid password with one letter, one number, and a min length of 8 characters"
              />
              <label for="password">Password</label>
            </div>
          </MDBCol>
          <MDBCol align="left">
            <div class="form-floating">
              <select
                className="form-select"
                class="form-control"
                value={ROLE}
                placeholder="Select Role"
                onChange={handleRole}
                required
              >
                <option>Select Role</option>
                {populateRoles}
              </select>
              <label for="role">Role</label>
            </div>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol class="pt-4 pb-4">
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="address"
                value={ADDRESS}
                onChange={handleAddress}
                name="address"
                placeholder="Address"
                pattern="[\w\d\s,.'-]{5,}"
                required
                title="Please enter a valid password with a minimum of 2 characters, and a combination of letters and numbers"
              />
              <label for="address">Address</label>
            </div>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol>
            <div class="form-floating">
              <input
                type="text"
                value={CITY}
                onChange={handleCity}
                class="form-control"
                id="city"
                name="city"
                placeholder="City"
                pattern="[a-zA-Z\s]{2,}"
                required
              />
              <label for="city">City</label>
            </div>
          </MDBCol>
          <MDBCol align="left">
            <div class="form-floating">
              <select
                className="form-select"
                class="form-control"
                value={STATE}
                placeholder="State"
                onChange={handleState}
                required
              >
                <option>Select State</option>
                {newData}
              </select>
              <label>State</label>
            </div>
          </MDBCol>
          <MDBCol align="left">
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="zip"
                name="zip"
                value={ZIPCODE}
                onChange={handleZipcode}
                placeholder="Zipcode"
                pattern="^\d{5}(?:[-\s]\d{4})?$"
                required
                title="Please enter a valid zip code (5 or 9 digits)"
              />
              <label for="zip">Zipcode</label>
            </div>
          </MDBCol>
        </MDBRow>

        <MDBRow class="pt-4 ">
          <MDBCol align="left">
            <MDBBtn type="submit" class="btn btn-primary">
              Save
            </MDBBtn>
            &nbsp;
            <MDBBtn type="button" class="btn btn-primary" onClick={resetForm}>
              New
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </form>
      &nbsp;
      <div className="table ">
        {items.map((item) => {
          return item.value;
        })}
        <table width="100%" border={1}>
          <tr align="center">
            <th colSpan={6}> User Info</th>
          </tr>
          <tr>
            <td>Edit</td>
            <td>Delete</td>
            <td>ID</td>
            <td>Email</td>
            <td>Address</td>
            <td>Zipcode</td>
          </tr>
          {items.map((item) => {
            return (
              <tr>
                <td>
                  <button
                    type="button"
                    class="btn btn-info"
                    onClick={() => {
                      EditThis(item[0].id); //triggers the edit this function, passes the clicked row's id as a parameter
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

export default Form;
