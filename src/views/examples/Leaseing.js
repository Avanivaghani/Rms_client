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
  Collapse,
} from "reactstrap";

import { useState } from "react";
// import RentalHeader from "components/Headers/RentalHeader.js";
import TenantsHeader from "components/Headers/TenantsHeader";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { FormControlLabel, Switch } from "@mui/material";
import LeaseHeader from "components/Headers/LeaseHeader.js";
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Leaseing.css"
// import CloseIcon from "@material-ui/icons/Close";

const Leaseing = () => {
  const [alignment, setAlignment] = React.useState("web");
  const [propdropdownOpen, setPropDropdownOpen] = React.useState(false);
  const [leasedropdownOpen, setLeaseDropdownOpen] = React.useState(false);
  const [rentdropdownOpen, setrentDropdownOpen] = React.useState(false);
  const [rentincdropdownOpen, setrentincDropdownOpen] = React.useState(false);
  const [rentdropdownOpen1, setrentDropdownOpen1] = React.useState(false);
  const [rentdropdownOpen2, setrentDropdownOpen2] = React.useState(false);
  const [rentdropdownOpen3, setrentDropdownOpen3] = React.useState(false);

  const [openTenantsDialog, setOpenTenantsDialog] = useState(false);
  const [openOneTimeChargeDialog, setOpenOneTimeChargeDialog] = useState(false);
  const [openRecurringDialog, setOpenRecurringDialog] = useState(false);
  const [openSplitRentDialog, setOpenSplitRentDialog] = useState(false);

  const [selectedProp, setSelectedProp] = useState("Select Property");
  const [selectedLease, setSelectedLease] = useState("Select Lease");
  const [selectedRent, setSelectedRent] = useState("Monthly");
  const [selectedRent1, setSelectedRent1] = useState("Application Fee Income");
  const [selectedRent2, setSelectedRent2] = useState("Application Fee Income");
  const [selectedRent3, setSelectedRent3] = useState("Application Fee Income");
  const [selectedRentInc, setSelectedRentInc] = useState("Rent Income");

  const [collapseper, setCollapseper] = useState(false);
  const [collapsecont, setCollapsecont] = useState(false);

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const toggle1 = () => setPropDropdownOpen((prevState) => !prevState);
  const toggle2 = () => setLeaseDropdownOpen((prevState) => !prevState);
  const toggle3 = () => setrentDropdownOpen((prevState) => !prevState);
  const toggle4 = () => setrentincDropdownOpen((prevState) => !prevState);
  const toggle5 = () => setrentDropdownOpen1((prevState) => !prevState);
  const toggle6 = () => setrentDropdownOpen2((prevState) => !prevState);
  const toggle7 = () => setrentDropdownOpen3((prevState) => !prevState);

  const handlePropSelection = (value) => {
    setSelectedProp(value);
    setPropDropdownOpen(true);
  };

  const handleLeaseSelection = (value) => {
    setSelectedLease(value);
    setLeaseDropdownOpen(true);
  };

  const handleRentSelection = (value) => {
    setSelectedRent(value);
    setrentDropdownOpen(true);
  };

  const handleRentSelection1 = (value) => {
    setSelectedRent1(value);
    setrentDropdownOpen1(true);
  };

  const handleRentSelection2 = (value) => {
    setSelectedRent2(value);
    setrentDropdownOpen2(true);
  };

  const handleRentSelection3 = (value) => {
    setSelectedRent3(value);
    setrentDropdownOpen3(true);
  };

  const handleRentIncSelection = (value) => {
    setSelectedRentInc(value);
    setrentincDropdownOpen(true);
  };

  const handleClickOpenTenants = () => {
    setOpenTenantsDialog(true);
  };

  const handleClickOpenOneTimeCharge = () => {
    setOpenOneTimeChargeDialog(true);
  };

  const handleClickOpenRecurring = () => {
    setOpenRecurringDialog(true);
  };

  const handleClickOpenSplitRent = () => {
    setOpenSplitRentDialog(true);
  };

  const handleClose = () => {
    setOpenTenantsDialog(false);
    setOpenOneTimeChargeDialog(false);
    setOpenRecurringDialog(false);
    setOpenSplitRentDialog(false);
  };

  const toggleper = () => {
    setCollapseper(!collapseper);
  };

  const togglecont = () => {
    setCollapsecont(!collapsecont);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowForm(true);
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const handlePropertyTypeSelect = (propertyType) => {
    setSelectedPropertyType(propertyType);
    localStorage.setItem("propertyType", propertyType);
  };

  const [selectedLeaseType, setselectedLeaseType] = useState("");
  const handleLeaseTypeSelect = (leasetype) => {
    setselectedLeaseType(leasetype);
    localStorage.setItem("leasetype", leasetype);
  };
  // ==================================================================

  let navigate = useNavigate();
  const handleSubmit = async (values) => {
    console.log(values, "values");
    try {
      // values["property_type"] = localStorage.getItem("propertyType");
      const res = await axios.post(
        "http://64.225.8.160:4000/tenant/tenant",
        values
      );

      if (res.data.statusCode === 200) {
        navigate("/admin/TenantsTable");
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let leaseFormik = useFormik({
    initialValues: {
      property_type: "",
      lease_type: "",
      tenant_firstName: "",
      tenant_lastName: "",
      tenant_phoneNumber: "",
      tenant_email: "",
    },
    validationSchema: yup.object({
      property_type: yup.string().required("Required"),
      lease_type: yup.string().required("Required"),
      tenant_firstName: yup.string().required("Required"),
      tenant_lastName: yup.string().required("Required"),
      tenant_phoneNumber: yup.string().required("Required"),
      tenant_email: yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
      console.log(values, "values");
    },
  });

  return (
    <>
      <LeaseHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">New Lease</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">Signature</h6>

                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-property"
                          >
                            Signature Status
                          </label>
                          <br />
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <ToggleButtonGroup
                              color="primary"
                              value={alignment}
                              exclusive
                              onChange={handleChange}
                              aria-label="Platform"
                              style={{ width: "100%" }}
                            >
                              <ToggleButton
                                value="Signed"
                                style={{
                                  width: "100rem",
                                  textTransform: "capitalize",
                                }}
                              >
                                Signed
                              </ToggleButton>
                              <ToggleButton
                                value="Unsigned"
                                style={{
                                  width: "100rem",
                                  textTransform: "capitalize",
                                }}
                              >
                                Unsigned
                              </ToggleButton>
                            </ToggleButtonGroup>
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />

                  <h6 className="heading-small text-muted mb-4">
                    Lease Details
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-account"
                          >
                            Property *
                          </label>
                          <br />
                          <Dropdown isOpen={propdropdownOpen} toggle={toggle1}>
                            <DropdownToggle caret style={{ width: "150px" }}>
                              {selectedPropertyType
                                ? selectedPropertyType
                                : "Select"}
                            </DropdownToggle>
                            <DropdownMenu
                              style={{ width: "200px" }}
                              name="property_type"
                              onBlur={leaseFormik.handleBlur}
                              onChange={leaseFormik.handleChange}
                              value={leaseFormik.values.property_type}
                            >
                              {leaseFormik.touched.property_type &&
                              leaseFormik.errors.property_type ? (
                                <div style={{ color: "red" }}>
                                  {leaseFormik.errors.property_type}
                                </div>
                              ) : null}
                              <DropdownItem
                                onClick={() =>
                                  handlePropertyTypeSelect("107 Broad Street")
                                }
                              >
                                107 Broad Street
                              </DropdownItem>
                              <DropdownItem
                                onClick={() =>
                                  handlePropertyTypeSelect("11 Archer Circle")
                                }
                              >
                                11 Archer Circle
                              </DropdownItem>
                              <DropdownItem
                                onClick={() =>
                                  handlePropertyTypeSelect("12 Alcott Drive")
                                }
                              >
                                12 Alcott Drive
                              </DropdownItem>
                              <DropdownItem
                                onClick={() =>
                                  handlePropertyTypeSelect(
                                    "1207 Fint Hill Road"
                                  )
                                }
                              >
                                1207 Fint Hill Road
                              </DropdownItem>
                            
                            </DropdownMenu>
                          </Dropdown>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-property"
                          >
                            Lease Type
                          </label>
                          <br />

                          <Dropdown isOpen={leasedropdownOpen} toggle={toggle2}>
                            <DropdownToggle caret style={{ width: "150px" }}>
                              {selectedLeaseType ? selectedLeaseType : "Select"}
                            </DropdownToggle>
                            <DropdownMenu
                              style={{ width: "200px" }}
                              name="lease_type"
                              onBlur={leaseFormik.handleBlur}
                              onChange={leaseFormik.handleChange}
                              value={leaseFormik.values.lease_type}
                            >
                              {leaseFormik.touched.lease_type &&
                              leaseFormik.errors.lease_type ? (
                                <div style={{ color: "red" }}>
                                  {leaseFormik.errors.lease_type}
                                </div>
                              ) : null}
                              <DropdownItem
                                onClick={() => handleLeaseTypeSelect("Fixed")}
                              >
                                Fixed
                              </DropdownItem>
                              <DropdownItem
                                onClick={() =>
                                  handleLeaseTypeSelect("Fixed wirollover")
                                }
                              >
                                Fixed wirollover
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => handleLeaseTypeSelect("At-will")}
                              >
                                At-will
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </FormGroup>
                      </Col>
                      &nbsp; &nbsp; &nbsp; &nbsp;
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-unitadd"
                          >
                            Start Date *
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-unitadd"
                            placeholder="3000"
                            type="date"
                          />
                        </FormGroup>
                      </Col>
                      &nbsp; &nbsp; &nbsp;
                      <Col lg="3">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-unitadd"
                          >
                            End Date *
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-unitadd"
                            placeholder="3000"
                            type="date"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <hr className="my-4" />

                  <h6 className="heading-small text-muted mb-4">
                    Tenants and Cosigner
                  </h6>
                  <div className="pl-lg-4"></div>

                  <Row>
                    <Col lg="12">
                      <FormGroup>
                        <span
                          onClick={setOpenTenantsDialog}
                          style={{
                            cursor: "pointer",
                            fontSize: "14px",
                            fontFamily: "monospace",
                            color: "blue",
                          }}
                        >
                          <b style={{ fontSize: "20px" }}>+</b> Add Tenant or
                          Consigner
                        </span>
                       
                        <Dialog open={openTenantsDialog} onClose={handleClose}>
                          <DialogTitle style={{ background: "#F0F8FF" }}>
                            Add tenant or cosigner
                          </DialogTitle>
                       
                       

                          <DialogContent
                            style={{ width: "100%", maxWidth: "500px" }}
                          >

                            <div
                              style={{
                                // display: "flex",
                                alignItems: "center",
                                margin: "30px 0",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <ToggleButtonGroup
                                  color="primary"
                                  value={alignment}
                                  exclusive
                                  onChange={handleChange}
                                  aria-label="Platform"
                                  style={{ width: "100%" }}
                                >
                                  <ToggleButton
                                    value="Tenant"
                                    onClick={() => {
                                      setSelectedOption("Tenant");
                                      setShowForm(true);
                                    }}
                                    style={{
                                      width: "15rem",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    Tenant
                                  </ToggleButton>
                                  <ToggleButton
                                    value="Cosigner"
                                    onClick={() => {
                                      setSelectedOption("Cosigner");
                                      setShowForm(true);
                                    }}
                                    style={{
                                      width: "15rem",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    Cosigner
                                  </ToggleButton>
                                </ToggleButtonGroup>
                              </div>
                              <br />
                              <br />
                              {showForm && (
                                <div>
                                  {selectedOption === "Tenant" && (
                                    <div className="tenant">
                                      <div>
                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Checkbox
                                            onClick={handleChange}
                                            style={{ marginRight: "10px" }}
                                          />
                                          <label className="form-control-label">
                                            Choose an existing rental owner
                                          </label>
                                        </div>
                                        <br />

                                        <span
                                          style={{
                                            marginBottom: "1rem",
                                            display: "flex",
                                            background: "grey",
                                            cursor: "pointer",
                                          }}
                                        >
                                          &nbsp;Contact information
                                        </span>
                                      </div>
                                      <Form onSubmit={leaseFormik.handleSubmit}>

                                      <div
                                        className="formInput"
                                        style={{ margin: "10px 10px" }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                          }}
                                        >
                                          <div
                                            style={{
                                              flex: 1,
                                              marginRight: "10px",
                                            }}
                                          >
                                            <label
                                              className="form-control-label"
                                              htmlFor="input-firstname"
                                              // style={{
                                              //   fontFamily: "monospace",
                                              //   fontSize: "14px",
                                              // }}
                                            >
                                              First Name *
                                            </label>
                                            <br />
                                            <Input
                                              id="standard-multiline-static"
                                              className="form-control-alternative"
                                              variant="standard"
                                              type="text"
                                              placeholder="First Name"
                                              style={{
                                                marginRight: "10px",
                                                flex: 1,
                                              }} // Adjust flex property
                                              name="tenant_firstName"
                                              onBlur={leaseFormik.handleBlur}
                                              onChange={
                                                leaseFormik.handleChange
                                              }
                                              value={
                                                leaseFormik.values
                                                  .tenant_firstName
                                              }
                                            />
                                            {leaseFormik.touched
                                              .tenant_firstName &&
                                            leaseFormik.errors
                                              .tenant_firstName ? (
                                              <div style={{ color: "red" }}>
                                                {
                                                  leaseFormik.errors
                                                    .tenant_firstName
                                                }
                                              </div>
                                            ) : null}
                                          </div>

                                          <div
                                            style={{
                                              flex: 1,
                                              marginRight: "10px",
                                            }}
                                          >
                                            <label
                                              className="form-control-label"
                                              htmlFor="input-firstname"
                                              // style={{
                                              //   fontFamily: "monospace",
                                              //   fontSize: "14px",
                                              // }}
                                            >
                                              Last Name *
                                            </label>
                                            <br />
                                            <Input
                                              id="standard-multiline-static"
                                              className="form-control-alternative"
                                              variant="standard"
                                              type="text"
                                              placeholder="Last Name"
                                              style={{
                                                marginRight: "10px",
                                                flex: 1,
                                              }} // Adjust flex property
                                              name="tenant_lastName"
                                              onBlur={leaseFormik.handleBlur}
                                              onChange={
                                                leaseFormik.handleChange
                                              }
                                              value={
                                                leaseFormik.values
                                                  .tenant_lastName
                                              }
                                            />
                                            {leaseFormik.touched
                                              .tenant_lastName &&
                                            leaseFormik.errors
                                              .tenant_lastName ? (
                                              <div style={{ color: "red" }}>
                                                {
                                                  leaseFormik.errors
                                                    .tenant_lastName
                                                }
                                              </div>
                                            ) : null}
                                          </div>
                                        </div>
                                        <br />

                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                          }}
                                        >
                                          <div
                                            style={{
                                              flex: 1,
                                              marginRight: "10px",
                                            }}
                                          >
                                            <label
                                              className="form-control-label"
                                              htmlFor="input-firstname"
                                              // style={{
                                              //   fontFamily: "monospace",
                                              //   fontSize: "14px",
                                              // }}
                                            >
                                              Phone Number*
                                            </label>
                                            <br />
                                            <Input
                                              id="standard-multiline-static"
                                              className="form-control-alternative"
                                              variant="standard"
                                              type="number"
                                              placeholder="phoneNumber"
                                              style={{
                                                marginRight: "10px",
                                                flex: 1,
                                              }} // Adjust flex property
                                              name="tenant_phoneNumber"
                                              onBlur={leaseFormik.handleBlur}
                                              onChange={
                                                leaseFormik.handleChange
                                              }
                                              value={
                                                leaseFormik.values
                                                  .tenant_phoneNumber
                                              }
                                            />
                                            {leaseFormik.touched
                                              .tenant_phoneNumber &&
                                            leaseFormik.errors
                                              .tenant_phoneNumber ? (
                                              <div style={{ color: "red" }}>
                                                {
                                                  leaseFormik.errors
                                                    .tenant_phoneNumber
                                                }
                                              </div>
                                            ) : null}
                                          </div>

                                          <span
                                            onClick={setOpenTenantsDialog}
                                            style={{
                                              cursor: "pointer",
                                              fontSize: "14px",
                                              fontFamily: "monospace",
                                              color: "blue",
                                            }}
                                          >
                                            <b style={{ fontSize: "20px" }}>
                                              +
                                            </b>{" "}
                                            Add alternative Phone
                                          </span>
                                        </div>
                                        <br />
                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                          }}
                                        >
                                          <div
                                            style={{
                                              flex: 1,
                                              marginRight: "10px",
                                            }}
                                          >
                                            <label
                                              className="form-control-label"
                                              htmlFor="input-Email"
                                              // style={{
                                              //   fontFamily: "monospace",
                                              //   fontSize: "14px",
                                              // }}
                                            >
                                              Email*
                                            </label>
                                            <br />
                                            <Input
                                              id="standard-multiline-static"
                                              className="form-control-alternative"
                                              variant="standard"
                                              type="text"
                                              placeholder="Email"
                                              style={{
                                                marginRight: "10px",
                                                flex: 1,
                                              }} // Adjust flex property
                                              name="tenant_email"
                                              onBlur={leaseFormik.handleBlur}
                                              onChange={
                                                leaseFormik.handleChange
                                              }
                                              value={
                                                leaseFormik.values.tenant_email
                                              }
                                            />
                                            {leaseFormik.touched.tenant_email &&
                                            leaseFormik.errors.tenant_email ? (
                                              <div style={{ color: "red" }}>
                                                {
                                                  leaseFormik.errors
                                                    .tenant_email
                                                }
                                              </div>
                                            ) : null}
                                          </div>

                                          <span
                                            onClick={setOpenTenantsDialog}
                                            style={{
                                              cursor: "pointer",
                                              fontSize: "14px",
                                              fontFamily: "monospace",
                                              color: "blue",
                                              marginLeft: "10px", // Add this to create space between the input and the link
                                            }}
                                          >
                                            <b style={{ fontSize: "20px" }}>
                                              +
                                            </b>{" "}
                                            Add alternative Email
                                          </span>
                                        </div>
                                        <hr />
                                        <div>
                                          <label
                                            className="form-control-label"
                                            htmlFor="input-email"
                                          >
                                            Address*
                                          </label>
                                        </div>

                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Checkbox
                                            //onClick={handleChange}
                                            style={{ marginRight: "10px" }}
                                          />
                                          <label
                                            className="form-control-label"
                                            htmlFor="input-unitadd"
                                          >
                                            {" "}
                                            Same as Unit Address
                                          </label>
                                        </div>
                                        <div>
                                          <span
                                            onClick={setOpenTenantsDialog}
                                            style={{
                                              cursor: "pointer",
                                              fontSize: "14px",
                                              fontFamily: "monospace",
                                              color: "blue",
                                              marginLeft: "10px", // Add this to create space between the input and the link
                                            }}
                                          >
                                            <b style={{ fontSize: "20px" }}>
                                              +
                                            </b>{" "}
                                            Add alternative Address
                                          </span>
                                        </div>
                                        <br />
                                        <div>
                                          <span
                                            onClick={toggleper}
                                            style={{
                                              marginBottom: "1rem",
                                              display: "flex",
                                              background: "grey",
                                              cursor: "pointer",
                                            }}
                                          >
                                            <b>+ </b>&nbsp; Personal information
                                          </span>
                                          <Collapse isOpen={collapseper}>
                                            <Card>
                                              <CardBody>
                                                <Row>
                                                  <Col lg="5">
                                                    <FormGroup>
                                                      <label
                                                        className="form-control-label"
                                                        htmlFor="input-unitadd"
                                                      >
                                                        Date of Birth
                                                      </label>
                                                      <Input
                                                        className="form-control-alternative"
                                                        id="input-unitadd"
                                                        placeholder="3000"
                                                        type="date"
                                                      />
                                                    </FormGroup>
                                                  </Col>
                                                  <Col lg="7">
                                                    <FormGroup>
                                                      <label
                                                        className="form-control-label"
                                                        htmlFor="input-unitadd"
                                                      >
                                                        TextPayer ID
                                                      </label>
                                                      <Input
                                                        className="form-control-alternative"
                                                        id="input-unitadd"
                                                        type="text"
                                                      />
                                                    </FormGroup>
                                                  </Col>
                                                </Row>
                                                <Row>
                                                  <Col lg="7">
                                                    <FormGroup>
                                                      <label
                                                        className="form-control-label"
                                                        htmlFor="input-unitadd"
                                                      >
                                                        Comments
                                                      </label>
                                                      <Input
                                                        className="form-control-alternative"
                                                        id="input-address"
                                                        type="textarea"
                                                        style={{
                                                          height: "90px",
                                                          width: "100%",
                                                          maxWidth: "25rem",
                                                        }}
                                                      />
                                                    </FormGroup>
                                                  </Col>
                                                </Row>
                                              </CardBody>
                                            </Card>
                                          </Collapse>
                                        </div>
                                        <div>
                                          <span
                                            onClick={togglecont}
                                            style={{
                                              marginBottom: "1rem",
                                              display: "flex",
                                              background: "grey",
                                              cursor: "pointer",
                                            }}
                                          >
                                            <b>+ </b>&nbsp; Emergency Contact
                                          </span>
                                          <Collapse isOpen={collapsecont}>
                                            <Card>
                                              <CardBody>
                                                <Row>
                                                  <Col lg="6">
                                                    <FormGroup>
                                                      <label
                                                        className="form-control-label"
                                                        htmlFor="input-unitadd"
                                                      >
                                                        Contact Name
                                                      </label>
                                                      <Input
                                                        className="form-control-alternative"
                                                        id="input-unitadd"
                                                        type="text"
                                                      />
                                                    </FormGroup>
                                                  </Col>
                                                  <Col lg="6">
                                                    <FormGroup>
                                                      <label
                                                        className="form-control-label"
                                                        htmlFor="input-unitadd"
                                                      >
                                                        Relationship to Tenant
                                                      </label>
                                                      <Input
                                                        className="form-control-alternative"
                                                        id="input-unitadd"
                                                        type="text"
                                                      />
                                                    </FormGroup>
                                                  </Col>
                                                </Row>
                                                <Row>
                                                  <Col lg="6">
                                                    <FormGroup>
                                                      <label
                                                        className="form-control-label"
                                                        htmlFor="input-unitadd"
                                                      >
                                                        E-Mail
                                                      </label>
                                                      <Input
                                                        className="form-control-alternative"
                                                        id="input-unitadd"
                                                        type="text"
                                                      />
                                                    </FormGroup>
                                                  </Col>
                                                  <Col lg="6">
                                                    <FormGroup>
                                                      <label
                                                        className="form-control-label"
                                                        htmlFor="input-unitadd"
                                                      >
                                                        Phone Number
                                                      </label>
                                                      <Input
                                                        className="form-control-alternative"
                                                        id="input-unitadd"
                                                        type="number"
                                                      />
                                                    </FormGroup>
                                                  </Col>
                                                </Row>
                                              </CardBody>
                                            </Card>
                                          </Collapse>
                                        </div>
                                      </div>
                                      <button
                              type="submit"
                              className="btn btn-primary"
                              style={{ background: "green" }}
                            >
                              Add Tenant
                            </button>
                                      </Form>

                          
                            <Button onClick={handleClose}>Cancel</Button>
                                    </div>
                                  
                                  )}


                                  {selectedOption === "Cosigner" && (
                                    <div className="cosigner">
                                      <div>
                                        <span
                                          style={{
                                            marginBottom: "1rem",
                                            display: "flex",
                                            background: "grey",
                                            cursor: "pointer",
                                          }}
                                        >
                                          &nbsp;Contact information
                                        </span>
                                      </div>

                                      <div
                                        className="formInput"
                                        style={{ margin: "10px 10px" }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                          }}
                                        >
                                          <div
                                            style={{
                                              flex: 1,
                                              marginRight: "10px",
                                            }}
                                          >
                                            <label
                                              className="form-control-label"
                                              htmlFor="input-firstname"
                                            >
                                              First Name
                                            </label>
                                            <Input
                                              className="form-control-alternative"
                                              id="input-firstname"
                                              placeholder="First Name"
                                              type="text"
                                              name="rental_adress"
                                            />
                                          </div>
                                          <div style={{ flex: 1 }}>
                                            <label
                                              className="form-control-label"
                                              htmlFor="input-lastname"
                                            >
                                              Last Name
                                            </label>
                                            <Input
                                              className="form-control-alternative"
                                              id="input-lastname"
                                              placeholder="Last Name"
                                              type="text"
                                              name="rental_adress"
                                            />
                                          </div>
                                        </div>
                                        <br />

                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                          }}
                                        >
                                          <div
                                            style={{
                                              flex: 1,
                                              marginRight: "10px",
                                            }}
                                          >
                                            <label
                                              className="form-control-label"
                                              htmlFor="input-lastname"
                                            >
                                              Phone Number
                                            </label>
                                            <br />
                                            <Input
                                              className="form-control-alternative"
                                              id="input-PhoneNumber"
                                              placeholder="Phone Number"
                                              type="number"
                                              name="rental_adress"
                                              InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <PhoneIcon />
                                                  </InputAdornment>
                                                ),
                                              }}
                                            />
                                          </div>
                                          <span
                                            onClick={setOpenTenantsDialog}
                                            style={{
                                              cursor: "pointer",
                                              fontSize: "14px",
                                              fontFamily: "monospace",
                                              color: "blue",
                                            }}
                                          >
                                            <b style={{ fontSize: "20px" }}>
                                              +
                                            </b>{" "}
                                            Add alternative Phone
                                          </span>
                                        </div>
                                        <br />
                                        <div
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                          }}
                                        >
                                          <div
                                            style={{
                                              flex: 1,
                                              marginRight: "10px",
                                            }}
                                          >
                                            <label
                                              className="form-control-label"
                                              htmlFor="input-email"
                                            >
                                              Email
                                            </label>
                                            <br />
                                            <Input
                                              className="form-control-alternative"
                                              id="input-email"
                                              placeholder="Email"
                                              type="text"
                                              name="rental_adress"
                                              InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <EmailIcon />
                                                  </InputAdornment>
                                                ),
                                              }}
                                            />
                                          </div>
                                          <span
                                            onClick={setOpenTenantsDialog}
                                            style={{
                                              cursor: "pointer",
                                              fontSize: "14px",
                                              fontFamily: "monospace",
                                              color: "blue",
                                              marginLeft: "10px", // Add this to create space between the input and the link
                                            }}
                                          >
                                            <b style={{ fontSize: "20px" }}>
                                              +
                                            </b>{" "}
                                            Add alternative Email
                                          </span>
                                        </div>
                                        <hr />
                                        <div>
                                          <label
                                            className="form-control-label"
                                            htmlFor="input-email"
                                          >
                                            Address
                                          </label>
                                        </div>

                                        <div
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                          }}
                                        >
                                          <FormGroup>
                                            <label
                                              className="form-control-label"
                                              htmlFor="input-unitadd"
                                            >
                                              {" "}
                                              Street Address
                                            </label>

                                            <Input
                                              className="form-control-alternative"
                                              id="input-address"
                                              placeholder="Address"
                                              type="textarea"
                                              style={{
                                                width: "100%",
                                                maxWidth: "25rem",
                                              }}
                                            />
                                          </FormGroup>
                                        </div>
                                        <div>
                                          <Row>
                                            <Col lg="4">
                                              <FormGroup>
                                                <label
                                                  className="form-control-label"
                                                  htmlFor="input-city"
                                                >
                                                  City
                                                </label>
                                                <Input
                                                  className="form-control-alternative"
                                                  id="input-city"
                                                  placeholder="New York"
                                                  type="text"
                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                              <FormGroup>
                                                <label
                                                  className="form-control-label"
                                                  htmlFor="input-country"
                                                >
                                                  Country
                                                </label>
                                                <Input
                                                  className="form-control-alternative"
                                                  id="input-country"
                                                  placeholder="United States"
                                                  type="text"
                                                />
                                              </FormGroup>
                                            </Col>
                                            <Col lg="4">
                                              <FormGroup>
                                                <label
                                                  className="form-control-label"
                                                  htmlFor="input-country"
                                                >
                                                  Postal code
                                                </label>
                                                <Input
                                                  className="form-control-alternative"
                                                  id="input-postal-code"
                                                  placeholder="Postal code"
                                                  type="number"
                                                />
                                              </FormGroup>
                                            </Col>
                                          </Row>
                                        </div>

                                        <div>
                                          <span
                                            onClick={setOpenTenantsDialog}
                                            style={{
                                              cursor: "pointer",
                                              fontSize: "14px",
                                              fontFamily: "monospace",
                                              color: "blue",
                                              marginLeft: "10px",
                                            }}
                                          >
                                            <b style={{ fontSize: "20px" }}>
                                              +
                                            </b>{" "}
                                            Add alternative Address
                                          </span>
                                        </div>
                                        <br />
                                      </div>
                                      <button
                              type="submit"
                              className="btn btn-primary"
                              style={{ background: "green" }}
                            >
                              Add Cosigner
                            </button>
                            <button
                              
                              className="btn btn-primary"
                              style={{ background: "green" }}
                            >
                              Cancel
                            </button>
                                    </div>
                                  )}
                            
                                </div>
                              )}
                            </div>
                            
                          </DialogContent>
                          {/* <DialogActions>
                            <button
                              type="submit"
                              className="btn btn-primary"
                              style={{ background: "green" }}
                            >
                              Add Tenant
                            </button>
                          
                            <Button onClick={handleClose}>Cancel</Button>
                          </DialogActions>
                          */}
                       
                        </Dialog>
                  
                      </FormGroup>
                    </Col>
                  </Row>









{/* /================================================================================================================================================= */}



                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Rent (Optional)
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-property"
                          >
                            Rent cycle
                          </label>
                          <FormGroup>
                            <Dropdown
                              isOpen={rentdropdownOpen}
                              toggle={toggle3}
                            >
                              <DropdownToggle caret style={{ width: "100%" }}>
                                {selectedRent} &nbsp;&nbsp;
                              </DropdownToggle>
                              <DropdownMenu style={{ width: "100%" }}>
                                <DropdownItem
                                  onClick={() => handleRentSelection("Daily")}
                                >
                                  Daily
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => handleRentSelection("Weekly")}
                                >
                                  Weekly
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    handleRentSelection("Every two weeks")
                                  }
                                >
                                  Every two weeks
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => handleRentSelection("Monthly")}
                                >
                                  Monthly
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    handleRentSelection("Every two months")
                                  }
                                >
                                  Every two months
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() =>
                                    handleRentSelection("Quarterly")
                                  }
                                >
                                  Quarterly
                                </DropdownItem>
                                <DropdownItem
                                  onClick={() => handleRentSelection("Yearly")}
                                >
                                  Yearly
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </FormGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}

                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="7">
                        <FormGroup>
                          <Row>
                            <Col lg="4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-address"
                                >
                                  Amount
                                </label>
                                <br />
                                <FormGroup>
                                  <Input
                                    className="form-control-alternative"
                                    id="input-reserve"
                                    placeholder="$0.00"
                                    type="number"
                                  />
                                </FormGroup>
                              </FormGroup>
                            </Col>
                            <Col lg="5">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-property"
                                >
                                  Account
                                </label>
                                <br />
                                <FormGroup>
                                  <Dropdown
                                    isOpen={rentincdropdownOpen}
                                    toggle={toggle4}
                                  >
                                    <DropdownToggle
                                      caret
                                      style={{ width: "100%" }}
                                    >
                                      {selectedRentInc} &nbsp;&nbsp;
                                    </DropdownToggle>
                                    <DropdownMenu style={{ width: "100%" }}>
                                      <DropdownItem
                                        header
                                        style={{ color: "blue" }}
                                      >
                                        Income Account
                                      </DropdownItem>
                                      <DropdownItem
                                        onClick={() =>
                                          handleRentIncSelection(
                                            "Application Fee Income"
                                          )
                                        }
                                      >
                                        Application Fee Income
                                      </DropdownItem>
                                      <DropdownItem
                                        onClick={() =>
                                          handleRentIncSelection(
                                            "Association Fee Income"
                                          )
                                        }
                                      >
                                        Association Fee Income
                                      </DropdownItem>
                                      <DropdownItem
                                        onClick={() =>
                                          handleRentIncSelection(
                                            "Cleaning and Maint Income"
                                          )
                                        }
                                      >
                                        Clearing and maint Income
                                      </DropdownItem>
                                      <DropdownItem
                                        onClick={() =>
                                          handleRentIncSelection(
                                            "Convenience Fee"
                                          )
                                        }
                                      >
                                        Convenience Fee
                                      </DropdownItem>
                                      <DropdownItem
                                        onClick={() =>
                                          handleRentIncSelection("Court Fees")
                                        }
                                      >
                                        Court Fees
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </Dropdown>
                                </FormGroup>
                              </FormGroup>
                            </Col>

                            <Col lg="4">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-unitadd"
                                >
                                  Next Due Date
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-unitadd"
                                  placeholder="3000"
                                  type="date"
                                />
                              </FormGroup>
                            </Col>

                            <Col lg="5">
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-unitadd"
                                >
                                  Memo
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-unitadd"
                                  placeholder="if left blank , will show Rent "
                                  type="text"
                                />
                              </FormGroup>
                            </Col>

                          </Row>
                        </FormGroup>
                      </Col>
                    </Row>{" "}
                    <Row>
                      <Col md="5">
                        <FormGroup>
                          <span
                            onClick={handleClickOpenSplitRent}
                            style={{
                              cursor: "pointer",
                              fontSize: "14px",
                              fontFamily: "monospace",
                              color: "blue",
                            }}
                          >
                            <b style={{ fontSize: "20px" }}>+</b> split rent
                            charge
                          </span>
                          <Dialog
                            open={openSplitRentDialog}
                            onClose={handleClose}
                          >
                            <DialogTitle style={{ background: "#F0F8FF" }}>
                              Add split rent charge content
                            </DialogTitle>
                            <hr />
                            <DialogContent
                              style={{ width: "100%", maxWidth: "500px" }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  margin: "30px 0",
                                }}
                              >
                                <Checkbox
                                  //onClick={handleChange}
                                  style={{ marginRight: "10px" }}
                                />
                                <span>
                                  Choose existing Tenants or Applicant
                                </span>
                              </div>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose}>Cancel</Button>
                              <Button onClick={handleClose}>Add</Button>
                            </DialogActions>
                          </Dialog>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>

                  <hr className="my-4" />
                  {/* Description */}
                  {/* <h6 className="heading-small text-muted mb-4">Unit</h6> */}
                  <div className="pl-lg-2">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-address"
                      >
                        Security Deposite (Optional)
                      </label>
                      <br />
                      <br />
                      <Row>
                        <Col lg="2">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-unitadd"
                            >
                              Next Due Date
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-unitadd"
                              placeholder="3000"
                              type="date"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="2">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Amount
                            </label>
                            <br />
                            <FormGroup>
                              <Input
                                className="form-control-alternative"
                                id="input-reserve"
                                placeholder="$0.00"
                                type="number"
                              />
                            </FormGroup>
                          </FormGroup>
                        </Col>

                        <Col lg="7">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-unitadd"
                            >
                              {/* Memo */}
                            </label>
                
                              <span>

                              Don't forget to record the panyment once you have connected the deposite 
                              </span>
                              
                        
                          </FormGroup>
                        </Col>
                      </Row>
                    </FormGroup>
                  </div>
                </Form>
                <hr />
                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-address"
                      >
                        Charges (optional)
                      </label>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="2">
                    <FormGroup>
                      <span
                        onClick={handleClickOpenRecurring}
                        style={{
                          cursor: "pointer",
                          fontSize: "14px",
                          fontFamily: "monospace",
                          color: "blue",
                        }}
                      >
                        <b style={{ fontSize: "20px" }}>+</b> Add Recurring
                      </span>
                      <Dialog open={openRecurringDialog} onClose={handleClose}>
                        <DialogTitle style={{ background: "#F0F8FF" }}>
                          Add Recurring content
                        </DialogTitle>
                        <hr />
                        <div style={{padding:"5%"}}>
                          <p style={{ fontWeight: "bold" }}>Recurring</p>
                          <div className="grid-container">
                            <div>
                              <label
                                className="form-control-label"
                                htmlFor="input-unitadd"
                              >
                                Account*
                              </label>
                              <FormGroup>
                                <Dropdown
                                  isOpen={rentdropdownOpen1}
                                  toggle={toggle5}
                                >
                                  <DropdownToggle caret>
                                    {selectedRent2} &nbsp;&nbsp;
                                  </DropdownToggle>
                                  <DropdownMenu style={{ width: "100%" }}>
                                    <DropdownItem
                                      onClick={() => handleRentSelection1("Application Fee Income")}
                                    >
                                      Application Fee Income
                                    </DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>
                              </FormGroup>
                            </div>
                            <div>
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-unitadd"
                                >
                                  Next Due Date*
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-unitadd"
                                  placeholder="3000"
                                  type="date"
                                />
                              </FormGroup>
                            </div>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Amount*
                              </label>
                              <br />
                              <FormGroup>
                                <Input
                                  className="form-control-alternative"
                                  id="input-reserve"
                                  placeholder="$0.00"
                                  type="number"
                                />
                              </FormGroup>
                            </FormGroup>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-unitadd"
                              >
                                Memo*
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-unitadd"
                                type="text"
                              />
                            </FormGroup>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-unitadd"
                              >
                                Frequent*
                              </label>
                              <FormGroup>
                                <Dropdown
                                  isOpen={rentdropdownOpen2}
                                  toggle={toggle6}
                                >
                                  <DropdownToggle caret style={{ width: "140%" }}>
                                    {selectedRent} &nbsp;&nbsp;
                                  </DropdownToggle>
                                  <DropdownMenu style={{ width: "100%" }}>
                                    <DropdownItem
                                      onClick={() => handleRentSelection2("Daily")}
                                    >
                                      Daily
                                    </DropdownItem>
                                    <DropdownItem
                                      onClick={() => handleRentSelection2("Weekly")}
                                    >
                                      Weekly
                                    </DropdownItem>
                                    <DropdownItem
                                      onClick={() =>
                                        handleRentSelection2("Every two weeks")
                                      }
                                    >
                                      Every two weeks
                                    </DropdownItem>
                                    <DropdownItem
                                      onClick={() => handleRentSelection2("Monthly")}
                                    >
                                      Monthly
                                    </DropdownItem>
                                    <DropdownItem
                                      onClick={() =>
                                        handleRentSelection2("Every two months")
                                      }
                                    >
                                      Every two months
                                    </DropdownItem>
                                    <DropdownItem
                                      onClick={() =>
                                        handleRentSelection2("Quarterly")
                                      }
                                    >
                                      Quarterly
                                    </DropdownItem>
                                    <DropdownItem
                                      onClick={() => handleRentSelection2("Yearly")}
                                    >
                                      Yearly
                                    </DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>
                              </FormGroup>
                            </FormGroup>
                          </div>
                        </div>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button onClick={handleClose}>Add</Button>
                        </DialogActions>
                      </Dialog>
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <span
                        onClick={handleClickOpenOneTimeCharge}
                        style={{
                          cursor: "pointer",
                          fontSize: "14px",
                          fontFamily: "monospace",
                          color: "blue",
                        }}
                      >
                        <b style={{ fontSize: "20px" }}>+</b> Add one Time
                        charge
                      </span>
                      <Dialog
                        open={openOneTimeChargeDialog}
                        onClose={handleClose}
                        
                      >
                        <DialogTitle style={{ background: "#F0F8FF" }}>
                          Add one Time charge content
                        </DialogTitle>
                        <hr />
                        <div style={{padding:"5%"}}>
                          <p style={{ fontWeight: "bold" }}>One-time</p>
                          <div className="grid-container">
                            <div>
                              <label
                                className="form-control-label"
                                htmlFor="input-unitadd"
                              >
                                Account*
                              </label>
                              <FormGroup>
                                <Dropdown
                                  isOpen={rentdropdownOpen3}
                                  toggle={toggle7}
                                >
                                  <DropdownToggle caret>
                                    {selectedRent2} &nbsp;&nbsp;
                                  </DropdownToggle>
                                  <DropdownMenu style={{ width: "100%" }}>
                                    <DropdownItem
                                      onClick={() => handleRentSelection3("Application Fee Income")}
                                    >
                                      Application Fee Income
                                    </DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>
                              </FormGroup>
                            </div>
                            <div>
                              <FormGroup>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-unitadd"
                                >
                                  Next Due Date*
                                </label>
                                <Input
                                  className="form-control-alternative"
                                  id="input-unitadd"
                                  placeholder="3000"
                                  type="date"
                                />
                              </FormGroup>
                            </div>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Amount*
                              </label>
                              <br />
                              <FormGroup>
                                <Input
                                  className="form-control-alternative"
                                  id="input-reserve"
                                  placeholder="$0.00"
                                  type="number"
                                />
                              </FormGroup>
                            </FormGroup>
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-unitadd"
                              >
                                Memo*
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-unitadd"
                                type="text"
                              />
                            </FormGroup>
                          </div>
                        </div>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button onClick={handleClose}>Add</Button>
                        </DialogActions>
                      </Dialog>
                    </FormGroup>
                  </Col>
                  <Col lg="4"></Col>
                </Row>
                <hr />
                <Row>
                  <Col lg="4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-address"
                      >
                        Upload Files (Maximum of 10)
                      </label>
                    </FormGroup>
                  </Col>
                </Row>
                <div class="file-upload-wrapper">
                  <input
                    type="file"
                    id="input-file-max-fs"
                    class="file-upload"
                    data-max-file-size="2M"
                  />
                </div>
                <hr />
                <Row>
                  <Col lg="3">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-address"
                      >
                        Residents center Welcome Email
                      </label>

                      <label
                        className="heading-small text-muted mb-4"
                        htmlFor="input-address"
                      >
                        we send a welcome Email to anyone without Resident
                        Center access
                      </label>
                    </FormGroup>
                  </Col>

                  <FormGroup>
                    <FormControlLabel
                      control={<Switch color="primary" />}
                      // label="End"
                      labelPlacement="end"
                    />
                  </FormGroup>
                </Row>
                {/* <Button
                  color="primary"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  size="sm"
                  style={{ background: "green" }}
                >
                  Save

                </Button> */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ background: "green" }}
                >
                  Save
                </button>
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  size="sm"
                  style={{ background: "white", color: "black" }}
                >
                  Cancel
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Leaseing;
