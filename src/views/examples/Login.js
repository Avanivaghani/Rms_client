// reactstrap components
import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { colors } from "@mui/material";

const Login = () => {
  let navigate = useNavigate();
  let cookies = new Cookies();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (values) => {
    try {
      setIsLoading(true); // Set loading state to true
      const res = await axios.post(
        "https://rms-node-9f9ec5119d40.herokuapp.com/register/login",
        values
      );

      if (res.data.statusCode === 200) {
        navigate("/");
        cookies.set("token", res.data.token, { path: "/" });
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Set loading state to false after API call completes
    }
  };

  let loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required("Required"),
      password: yup
        .string()
        .required("No Password Provided")
        .min(8, "Password is too short")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <>
      <Col lg="5" md="7">
        <Card
          className="bg-secondary shadow border-0"
          onSubmit={loginFormik.handleSubmit}
        >
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in with your credentials</small>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    name="email"
                    onBlur={loginFormik.handleBlur}
                    onChange={loginFormik.handleChange}
                    value={loginFormik.values.email}
                  />
                  {loginFormik.touched.email && loginFormik.errors.email ? (
                    <div style={{ color: "red" }}>
                      {loginFormik.errors.email}
                    </div>
                  ) : null}
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                    onBlur={loginFormik.handleBlur}
                    onChange={loginFormik.handleChange}
                    value={loginFormik.values.password}
                  />
                  {loginFormik.touched.password &&
                  loginFormik.errors.password ? (
                    <div style={{ color: "red" }}>
                      {loginFormik.errors.password}
                    </div>
                  ) : null}
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <br />
              <br />
              <div className="text-center">
                {/* <Button className="my-4" color="primary" type="button">
                  Sign in
                </Button> */}

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  color="primary"
                >
                  {isLoading ? <CircularProgress size={24} /> : "Login"}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        {/* <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row> */}
      </Col>
    </>
  );
};

export default Login;
