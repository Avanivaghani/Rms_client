import React from 'react';
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

import { useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import AddStaffMemberHeader from 'components/Headers/AddStaffMemberHeader';
  
const AddStaffMember = () => {

    const [prodropdownOpen, setproDropdownOpen] = React.useState(false);
    
    const [selectedProp, setSelectedProp] = useState("Select");
    

    const toggle = () => setproDropdownOpen(prevState => !prevState);

    const [open, setOpen] = React.useState(false);

    // const handlePropSelection = (value) => {
    //   setSelectedProp(value);
    //   setproDropdownOpen(true); 
    // };
    const handleChange = (e) => {
      // setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (values) => {
      console.log(values, "values");
      try {
        // values["property_type"] = selectedProperty;
        const res = await axios.post(
          "http://64.225.8.160:4000/addstaffmember/addstaffmember",
          values
        );
  
        if (res.data.statusCode === 200) {
          // navigate("/admin/PropertyType");
          alert("StaffMember added successfully");
          console.log(`Staffmember: ${values.staffmember_name}`);
        } else {
          alert(res.data.message);
        }
      } catch (error) {
        console.log("Error", error);
      }
    };

    const StaffMemberFormik = useFormik({
      initialValues: {
        staffmember_name: "",
        staffmember_designation : "",
      },
      validationSchema: yup.object({
        staffmember_name: yup.string().required("Required"),
        staffmember_designation: yup.string().required("Required"),
      }),
      onSubmit: (values) => {
        handleSubmit(values);
        console.log(values, "values");
      },
    });

    // const handleClickOpen = () => {
    //     setOpen(true);
    //   };

    // const handleClose = () => {
    //     setOpen(false);
    //   };

   

    return (
      <>
        <AddStaffMemberHeader/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
          <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow"
                    onSubmit={StaffMemberFormik.handleSubmit}>
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">New Staff Member</h3>
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
                                        htmlFor="input-member"
                                        >
                                        What is the name of new staff member?
                                        </label><br/><br/>
                                        <Input
                                        className="form-control-alternative"
                                        id="input-staffmember-name"
                                        placeholder="John William"
                                        type="text"
                                        name='staffmember_name'
                                        //name="nput-staffmember-name"
                                        onBlur={StaffMemberFormik.handleBlur}
                                        onChange={(e) => {
                                          // Update the state or Formik values with the new input value
                                          StaffMemberFormik.handleChange(e);
                                        }}
                                        value={StaffMemberFormik.values.staffmember_name}
                                        />
                                        {StaffMemberFormik.touched.staffmember_name &&
                                          StaffMemberFormik.errors.staffmember_name ? (
                                            <div style={{ color: "red" }}>
                                              {StaffMemberFormik.errors.staffmember_name}
                                            </div>
                                          ) : null}
                                    </FormGroup>
                                </Col>
                        </Row>
                        <br/>
                        </div>
                        <hr className="my-4" />
                        <div className="pl-lg-4">
                        <Row>
                            <Col lg="6">
                                    <FormGroup>
                                        <label
                                        className="form-control-label"
                                        htmlFor="input-desg"
                                        >
                                        What is the designation?
                                        </label><br/><br/>
                                        <Input
                                        className="form-control-alternative"
                                        id="input-staffmember-desg"
                                        placeholder="Manager"
                                        type="text"
                                        name='staffmember_designation'
                                        onBlur={StaffMemberFormik.handleBlur}
                                        onChange={StaffMemberFormik.handleChange}
                                        value={StaffMemberFormik.values.staffmember_designation}
                                        />
                                        {StaffMemberFormik.touched.staffmember_designation &&
                                          StaffMemberFormik.errors.staffmember_designation ? (
                                            <div style={{ color: "red" }}>
                                              {StaffMemberFormik.errors.staffmember_designation}
                                            </div>
                                          ) : null}
                                    </FormGroup>
                                </Col>
                        </Row>
                        <br/>
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
                    </Form><br/>
                    
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  
  export default AddStaffMember;
  