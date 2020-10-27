import React, { useState } from "react";
import service from "../../../service/service";
import {
  Button,
  Feather,
  GoogleBtn,
  Spinner,
  TextField,
} from "../../../components";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showPassword);
  const handleMouseDownConfirmPassword = () =>
    setShowConfirmPassword(!showPassword);
  const [showPassword, setShowPassword] = useState(false);

  const [msg, setMsg] = useState("");
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const signup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMsg("Password does not match");
      return;
    }
    service
      .post("/accounts/register", {
        name,
        email,
        password,
      })
      .then((res) => console.log(res))
      .catch((err) => {
        setMsg(err.response.data.message);
      });
  };
  return (
    <div className="container-fluid">
      <div className="min-vh-100 flex-column align-items-center justify-content-center">
        <div className="sigin-copyright text-center">
          {/* <img src={''} className='img img-responsive' alt='Responsive image' /> */}
        </div>
        <div className="signinbox bg-white">
          <div className="signin-header text-center">
            <h2 className="widget-title mb-3">Sign Up</h2>
          </div>
          <div className="form-group">
            <span style={{ color: "#de1414cf", fontSize: "15px" }}>{msg}</span>
          </div>
          <GoogleBtn />
          <form onSubmit={signup}>
            <div className="form-group">
              <label>Name</label>
              <TextField
                placeholder=""
                type="text"
                onChange={(e) => {
                  setname(e.target.value);
                }}
                required
              />
            </div>
            <div className="form-group">
              <label>EMAIL</label>
              <TextField
                placeholder=""
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              />
            </div>
            <div className="form-group">
              <label>PASSWORD</label>
              <TextField
                label="Some label"
                variant="outlined"
                type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <div
                      className="toggle-password"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {!showPassword ? (
                        <Feather name="Eye" />
                      ) : (
                        <Feather name="EyeOff" />
                      )}
                    </div>
                  ),
                }}
                required
              />
            </div>
            <div className="form-group">
              <label>CONFIRM PASSWORD</label>
              <TextField
                label="Some label"
                variant="outlined"
                type={showConfirmPassword ? "text" : "password"} // <-- This is where the magic happens
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <div
                      className="toggle-password"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                    >
                      {!showConfirmPassword ? (
                        <Feather name="Eye" />
                      ) : (
                        <Feather name="EyeOff" />
                      )}
                    </div>
                  ),
                }}
                required
              />
            </div>
            <div className="form-group">
              <Button
                customClass="btn--block btn--primary"
                style={{ maxWidth: "200px", margin: "auto" }}
                htmlType="submit"
                type="primary"
              >
                <strong>Sign up</strong>
              </Button>
            </div>
          </form>
        </div>
      </div>
      {loading && <Spinner />}
    </div>
  );
};

export default Register;
