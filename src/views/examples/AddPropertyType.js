import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Label,
} from "reactstrap";

import {
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useState } from "react";
import AddPropertyTypeHeader from "components/Headers/AddPropertyTypeHeader.js";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const AddPropertyType = () => {
  const [prodropdownOpen, setproDropdownOpen] = React.useState(false);

  const [selectedProperty, setSelectedProperty] = React.useState("");
  // console.log(selectedProperty, "selectedProperty")

  const toggle = () => setproDropdownOpen((prevState) => !prevState);

  // const [open, setOpen] = React.useState(false);

  // const handlePropSelection = (value) => {
  //   setSelectedProp(value);
  //   setproDropdownOpen(true);
  // };

  // const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  // const handleClose = () => {
  //     setOpen(false);
  //   };

  const handleChange = (e) => {
    // setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // const handlePropertySelection = (values) => {
  //   setSelectedProperty(values);
  //   console.log(`Selected Property: ${values}`);
  // };

  const handlePropertySelection = (value) => {
    setSelectedProperty(value);
    localStorage.setItem("property", value);
    console.log(`Selected Property: ${value}`);
  };

  // let [editData, setEditData] = React.useState({});
  // let [id, setId] = React.useState();

  // //   auto form fill up in edit
  // let seletedEditData = async (datas) => {
  //   // setModalShowForPopupForm(true);
  //   setId(datas._id);
  //   setEditData(datas);
  // };

  //let navigate = useNavigate();
  const handleSubmit = async (values) => {
    console.log(values, "values");
    try {
      // values["property_type"] = selectedProperty;
      const res = await axios.post(
        "https://rms-node-9f9ec5119d40.herokuapp.com/newproparty/newproparty",
        values
      );

      if (res.data.statusCode === 200) {
        // navigate("/admin/PropertyType");
        alert("Property added successfully");
        console.log(`Selected Property: ${values.property_type}`);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const propertyFormik = useFormik({
    initialValues: {
      property_type: "",
      propertysub_type: "",
    },
    validationSchema: yup.object({
      property_type: yup.string().required("Required"),
      propertysub_type: yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
      console.log(values, "values");
    },
  });

  return (
    <>
      <AddPropertyTypeHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card
              className="bg-secondary shadow"
              onSubmit={propertyFormik.handleSubmit}
            >
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">New Property Type</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-property"
                          >
                            What is the property type?
                          </label>
                          <br />
                          <br />
                          

                          <TextField
                            fullWidth
                            size="small"
                            select
                            label="Property Type"
                            name="property_type"
                            onBlur={propertyFormik.handleBlur}
                            onChange={propertyFormik.handleChange}
                            value={propertyFormik.values.property_type}
                          >
                             {propertyFormik.touched.property_type &&
                          propertyFormik.errors.property_type ? (
                            <div style={{ color: "red" }}>
                              {propertyFormik.errors.property_type}
                            </div>
                          ) : null}
                            <MenuItem value="Residential">Residential</MenuItem>
                            <MenuItem value="Commercial">Commercial</MenuItem>
                          </TextField>
                     

                      
                        </FormGroup>
                      </Col>
                    </Row>
                    <br />
                  </div>
                  <hr className="my-4" />
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-property"
                          >
                            What is the property sub type?
                          </label>
                          <br />
                          <br />
                          <Input
                            className="form-control-alternative"
                            id="input-protype"
                            placeholder="Townhome"
                            type="text"
                            name="propertysub_type"
                            onBlur={propertyFormik.handleBlur}
                            onChange={propertyFormik.handleChange}
                            value={propertyFormik.values.propertysub_type}
                          />
                          {propertyFormik.touched.propertysub_type &&
                          propertyFormik.errors.propertysub_type ? (
                            <div style={{ color: "red" }}>
                              {propertyFormik.errors.propertysub_type}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                    <br />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ background: "green" }}
                  >
                    Add
                  </button>
                  <button
                    color="primary"
                    href="#pablo"
                    className="btn btn-primary"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    style={{ background: "white", color: "black" }}
                  >
                    Cancel
                  </button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddPropertyType;
