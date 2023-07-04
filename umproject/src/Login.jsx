import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import ReactTabs from "./ReactTabs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [alert, setAlert] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(email);
  };

  const handlePostData = async () => {
    //console.log(email);
    //console.log(pass);
    await postData({
      emailToken: email,
      passwordToken: pass,
    });
  };

  async function postData(inputitems) {
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputitems),
    };

    const response = await fetch(
      "http://localhost:8000/api/loginInfo",
      options
    );
    const data = await response.json();
    if (data.result === "SUCCESS") {
      setSuccess(true);
    } else {
      setSuccess(false);
      setAlert("Failure: Incorrect Login Info");
    }
  }

  if (success === false) {
    return (
      <div className="Login">
        <div className="auth-form-container">
          {alert.startsWith("Failure") ? (
            <Alert variant="danger" onClose={() => setAlert("")} dismissible>
              {alert}
            </Alert>
          ) : (
            ""
          )}
          <form className="login-form" onSubmit={handleSubmit}>
            {/* email tags */}
            <label for="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@email.com"
              id="email"
              name="email"
            />
            {console.log(success)}

            {/* password tags */}
            <label for="password">Password</label>
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              placeholder="*******"
              id="password"
              name="password"
            />
            {/* {console.log(pass)} */}
            <button onClick={handlePostData}>Log in</button>
          </form>
        </div>
      </div>
    );
  } else {
    return <ReactTabs />;
  }
};

export default Login;
