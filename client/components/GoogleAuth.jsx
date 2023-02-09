import React from "react";
import GoogleLogin from "react-google-login";

const LoginPage = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <GoogleLogin
        clientId="YOUR_CLIENT_ID"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default LoginPage;
