const express = require("express");
const app = express();
const cors = require("cors"); //port to port security
const fs = require("fs"); // to read and write files
const bp = require("body-parser"); //to access json from req.body

// This is a sample API endpoint that returns a JSON object
// app.get('/api/hello', (req, res) => {
//   res.json({ message: 'Hello, World!' });
// });

app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get("/api/getUserData", (req, res) => {
  res.json(getUserData()); //specifying what the type is of the data being sent to front end
});

app.post("/api/saveUserData", (req, res) => {
  saveUserData({ root: req.body }); //saves items in to the json file

  res.json({
    success: "true",
  });
});

//tab 2 role data

app.get("/api/getRoleData", (req, res) => {
  res.json(getRoleData());
});

app.post("/api/saveRoleData", (req, res) => {
  saveRoleData({ root: req.body });

  res.json({
    success: "true",
  });
});

//tab 3 permissions data
app.get("/api/getPermissionsData", (req, res) => {
  res.json(getPermissionsData());
});

app.post("/api/savePermissionsData", (req, res) => {
  savePermissionsData({ root: req.body });

  res.json({
    success: "true",
  });
});

//tab 3 checkbox data
app.get("/api/getCheckboxData", (req, res) => {
  res.json(getCheckboxData());
});

app.post("/api/saveCheckboxData", (req, res) => {
  saveCheckboxData({ root: req.body });
  console.log(req.body);

  res.json({
    success: "true",
  });
});

app.post("/api/loginInfo", (req, res) => {
  //console.log(req.body);
  res.status(200).json(checkLoginInfo({ root: req.body }));
});

// Start the server on port 8000
app.listen(8000, () => {
  console.log("API listening on port 8000");
});

//util functions

const getUserData = () => {
  const jsonData = fs.readFileSync("./tableData.json");
  return JSON.parse(jsonData);
};

const saveUserData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync("./tableData.json", stringifyData); //writing data to the file, updating the database
};

const getRoleData = () => {
  const jsonData = fs.readFileSync("./roleData.json"); // create roleData.json
  return JSON.parse(jsonData);
};

const saveRoleData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync("./roleData.json", stringifyData);
};

const getPermissionsData = () => {
  const jsonData = fs.readFileSync("./permissions.json"); // create permissions.json
  return JSON.parse(jsonData);
};

const savePermissionsData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync("./permissions.json", stringifyData);
};

const getCheckboxData = () => {
  const jsonData = fs.readFileSync("./checkboxItems.json"); // create checkboxItems.json
  return JSON.parse(jsonData);
};

const saveCheckboxData = (data) => {
  const stringifyData = JSON.stringify(data);
  console.log("1234");
  fs.writeFileSync("./checkboxItems.json", stringifyData);
};

const checkLoginInfo = (dataWithRoot) => {
  try {
    let data = dataWithRoot.root;
    const jsonData = fs.readFileSync("./loginInformation.json"); //jsonData is a string
    let bothTrue = false;

    const loginInfoObj = JSON.parse(jsonData); //converting back to json to be compared to data
    loginInfoObj.root.forEach((element) => {
      //console.log(element);
      if (
        data.emailToken === element.email &&
        data.passwordToken === element.password
      ) {
        bothTrue = true;
      }
    });

    let objSuccess = new Object();
    objSuccess["result"] = "SUCCESS";
    let objFailure = new Object();
    objFailure["result"] = "FAILURE";

    if (bothTrue === true) {
      console.log("success");
      return objSuccess;
    } else {
      console.log("failure");
      return objFailure;
    }
  } catch (error) {
    console.log(error);
    //return JSON.parse(objFailure);
  }
};
