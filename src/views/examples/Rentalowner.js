// import { useState } from 'react';
// import ReactDOM from 'react-dom/client';
// //import './form.css';


// function MyForm() {
//   const [name, setName] = useState("");

  

//   return (
//     <>
//       <h1> Add Rental Owner</h1>
//       <form className='form'>
     
     
//      <div className='nam'>
//      <label>NAME(REQUIRED)
       
//      </label>
    
    

//      </div>
//      <div className='ft'>
//      <label>
//       <input type="text" value={"FIRST"}></input>&nbsp;&nbsp;&nbsp;&nbsp;
       
     
//      </label>
//      </div>
//      <label>
//       <input type="text" value={"LAST"}></input>
       
     
//      </label><br></br><br></br>
//      <lable>
//       COMPANY NAME
//       <input type="tetx"></input>
//      </lable>
     

    
//      <lable><br></br><br></br>

//      <div className='date'>
//       DATE OF BIRTH<br></br>
//       <input type="date"></input>
    
     
//      </div>
//      </lable>
    

     
//      </form>
//     </>
    
//   )
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<MyForm />);


// export default MyForm;




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

import { useState } from "react";
//import RentalHeader from "components/Headers/RentalHeader.js";
import RentalownerHeder from "components/Headers/RentalownerHeder.js";

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
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const Rentalowner = () => {
  const [prodropdownOpen, setproDropdownOpen] = React.useState(false);
  const [bankdropdownOpen, setbankDropdownOpen] = React.useState(false);
  const [userdropdownOpen, setuserDropdownOpen] = React.useState(false);
  const [baddropdownOpen, setbadDropdownOpen] = React.useState(false);
  const [bathdropdownOpen, setBathDropdownOpen] = React.useState(false);
  const [isAddBankDialogOpen, setAddBankDialogOpen] = useState(false);

  const [selectedProp, setSelectedProp] = useState("Select");
  const [selectedBank, setSelectedBank] = useState("Select or add new");
  const [selectedUser, setSelectedUser] = useState("Select a staff member..");
  const [selectedBad, setSelectedBad] = useState("6 Bed");
  const [selectedBath, setSelectedBath] = useState("5 Bath");

  const toggle1 = () => setproDropdownOpen((prevState) => !prevState);
  const toggle2 = () => setbankDropdownOpen((prevState) => !prevState);
  const toggle3 = () => setuserDropdownOpen((prevState) => !prevState);
  const toggle4 = () => setbadDropdownOpen((prevState) => !prevState);
  const toggle5 = () => setBathDropdownOpen((prevState) => !prevState);

  const [open, setOpen] = React.useState(false);

  const handlePropSelection = (value) => {
    setSelectedProp(value);
    setproDropdownOpen(true); 
  };

  const handleBankSelection = (value) => {
    setSelectedBank(value);
    setbankDropdownOpen(true); 
  };

  const toggleAddBankDialog = () => {
    setAddBankDialogOpen((prevState) => !prevState);
  };

  const handleCloseDialog = () => {
    setAddBankDialogOpen(false); 
  };

  const handleUserSelection = (value) => {
    setSelectedUser(value);
    setuserDropdownOpen(true); 
  };

  const handleBadSelection = (value) => {
    setSelectedBad(value);
    setbadDropdownOpen(true); 
  };

  const handleBathSelection = (value) => {
    setSelectedBath(value);
    setBathDropdownOpen(true); 
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    // setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const handlePropertyTypeSelect = (propertyType) => {
    setSelectedPropertyType(propertyType);
    localStorage.setItem("propertyType", propertyType);
  };

  const [selectedOperatingAccount, setSelectedOperatingAccount] = useState("");
  const handleOperatingAccount = (operatingAccount) => {
    setSelectedOperatingAccount(operatingAccount);
    localStorage.setItem("operatingAccount", operatingAccount);
  };

  // ==================================================================

  let [editData, setEditData] = React.useState({});
  let [id, setId] = React.useState();

  //   auto form fill up in edit
  let seletedEditData = async (datas) => {
    // setModalShowForPopupForm(true);
    setId(datas._id);
    setEditData(datas);
  };
  let navigate = useNavigate();
  const handleSubmit = async (values) => {
    console.log(values, "values");
    try {
      values["property_type"] = localStorage.getItem("propertyType");
      const res = await axios.post(
        "http://64.225.8.160:4000//rentals/rentals",
        values
      );

      if (res.data.statusCode === 200) {
        navigate("/admin/tables");
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let rentalsFormik = useFormik({
    initialValues: {
      rental_adress: "",
      rental_units: "",
      propertyType: "",
    },
    validationSchema: yup.object({
      rental_adress: yup.string().required("Required"),
      rental_units: yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
      console.log(values, "values");
    },
  });

  return (
    <>
      <RentalownerHeder />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card
              className="bg-secondary shadow"
              onSubmit={rentalsFormik.handleSubmit}
            >
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">New Rental Owner</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    {/* <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        size="sm"
                      >
                        Settings
                      </Button> */}
                  </Col>
                </Row>
              </CardHeader>
             

              <CardBody>
                <Form role="form">
                  <h6 className="heading-small text-muted mb-4">
                  
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-property"
                          >
                            Name
                          </label>
                          <br />
                          <br />
                       
                      




                      <Row>
                      <Col lg="4">
                        <FormGroup>
                       
                          <Input
                            className="form-control-alternative"
                            id="input-first"
                            placeholder="first"
                            type="text"
                            name="rental_first"
                            onBlur={rentalsFormik.handleBlur}
                            onChange={rentalsFormik.handleChange}
                            value={rentalsFormik.values.rental_city}
                          />
                          {rentalsFormik.touched.rental_city &&
                          rentalsFormik.errors.rental_city ? (
                            <div style={{ color: "red" }}>
                              {rentalsFormik.errors.rental_city}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                      
                          <Input
                            className="form-control-alternative"
                            id="input-las"
                            placeholder="last"
                            type="text"
                            name="rental_last"
                            onBlur={rentalsFormik.handleBlur}
                            onChange={rentalsFormik.handleChange}
                            value={rentalsFormik.values.rental_country}
                          />
                          {rentalsFormik.touched.rental_country &&
                          rentalsFormik.errors.rental_country ? (
                            <div style={{ color: "red" }}>
                              {rentalsFormik.errors.rental_country}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                      
</Row>


                        <Row>
                        <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                             Company Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-compnay name"
                              placeholder="company name"
                              type="text"
                              name="copmpany name"
                              onBlur={rentalsFormik.handleBlur}
                              onChange={rentalsFormik.handleChange}
                              value={rentalsFormik.values.rental_adress}
                            />
                            {rentalsFormik.touched.rental_adress &&
                            rentalsFormik.errors.rental_adress ? (
                              <div style={{ color: "red" }}>
                                {rentalsFormik.errors.rental_adress}
                              </div>
                            ) : null}
                          </FormGroup>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


                          <FormGroup>
                            
                          <Checkbox></Checkbox>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                             Company
                            </label>

                        </FormGroup>

                        </Row>









                     <Row>
                          <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-unitadd"
                          >
                           Date Of Birth
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-unitadd"
                            placeholder="date"
                            type="date"
                          />
                        </FormGroup>
                        </Row>
                       <hr></hr>





                      


                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                            Managment agreement
                         </label>
                   <br></br><br></br>

                      <Row>
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
                     
                      &nbsp; &nbsp; &nbsp;
                    
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
                        </Row>


</FormGroup>
<hr></hr>




                        <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                            Contact information
                         </label>
                         </FormGroup>
                         <hr></hr>


                         <Row>

                         <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-property"
                          >
                           Primary E-mail 
                          </label>
                          </FormGroup>

                           
                          <FormGroup>
                         
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder=""
                            type="text"
                            name="rental_email"
                            onBlur={rentalsFormik.handleBlur}
                            onChange={rentalsFormik.handleChange}
                            value={rentalsFormik.values.rental_email}
                          />
                          {rentalsFormik.touched.rental_email&&
                          rentalsFormik.errors.rental_email ? (
                            <div style={{ color: "red" }}>
                              {rentalsFormik.errors.rental_email}
                            </div>
                          ) : null}
                        </FormGroup>



  
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-property"
                          >
                         Alternative E-mail
                          </label>
                          </FormGroup>
                          <FormGroup>
                         
                         <Input
                           className="form-control-alternative"
                           id="input-email"
                           placeholder=""
                           type="text"
                           name="rental_email"
                           onBlur={rentalsFormik.handleBlur}
                           onChange={rentalsFormik.handleChange}
                           value={rentalsFormik.values.rental_email}
                         />
                         {rentalsFormik.touched.rental_email &&
                         rentalsFormik.errors.rental_email ? (
                           <div style={{ color: "red" }}>
                             {rentalsFormik.errors.rental_email}
                           </div>
                         ) : null}
                          
                       </FormGroup>
                       </Row>


                     <Col></Col>
                       <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-property"
                          >
                        Phone Numbers
                          </label>

                          
                          </FormGroup>
                       

                         
                          <input type="text"/><br/>
                         
                          <input type="text"/><br/>  
                       
                          <input type="text"/><br/>  
                         
                          <input type="text"/> 
                         
                       
                  </FormGroup>

                  
                          {/* <label
                            className="form-control-label"
                            htmlFor="input-property"
                          >
                       Street Address
                          </label>

                          
                          </FormGroup>
                          <input type="text" style={{width:'500px'}}/><br/>
                         
                         <input type="text" style={{width:'500px'}}/><br/>  
                      
                         <input type="text" style={{width:'500px'}}/><br/>   */}
                         
                       




                   </Col>
                    </Row>
                    <br></br>
                  
                  
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
                            name="rental_city"
                            onBlur={rentalsFormik.handleBlur}
                            onChange={rentalsFormik.handleChange}
                            value={rentalsFormik.values.rental_city}
                          />
                          {rentalsFormik.touched.rental_city &&
                          rentalsFormik.errors.rental_city ? (
                            <div style={{ color: "red" }}>
                              {rentalsFormik.errors.rental_city}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                          State
                          </label>
                         
                            <Input
                            className="form-control-alternative"
                            id="input-country"
                            placeholder="State"
                            type="text"
                            name="rental_country"
                            onBlur={rentalsFormik.handleBlur}
                            onChange={rentalsFormik.handleChange}
                            value={rentalsFormik.values.rental_country}
                          />
                          {rentalsFormik.touched.rental_country &&
                          rentalsFormik.errors.rental_country ? (
                            <div style={{ color: "red" }}>
                              {rentalsFormik.errors.rental_country}
                            </div>
                          ) : null}
                        </FormGroup>


                      </Col>

                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                          Zip
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-postal-code"
                            placeholder="code"
                            type="number"
                            name="rental_postcode"
                            onBlur={rentalsFormik.handleBlur}
                            onChange={rentalsFormik.handleChange}
                            value={rentalsFormik.values.rental_postcode}
                          />
                          {rentalsFormik.touched.rental_postcode &&
                          rentalsFormik.errors.rental_postcode ? (
                            <div style={{ color: "red" }}>
                              {rentalsFormik.errors.rental_postcode}
                            </div>
                          ) : null}
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                           Country
                            </label>
                            <br />
                            <div style={{display:'flex'}}>
                                <Dropdown isOpen={baddropdownOpen} toggle={toggle4} >
                                        <DropdownToggle caret style={{ width: '200%'}}>United state &nbsp;&nbsp;</DropdownToggle>
                                        <DropdownMenu style={{ width: '200px'}}>
                                            <DropdownItem onClick={() => handleBadSelection("2 ")}>Afghanistan </DropdownItem>
                                            <DropdownItem onClick={() => handleBadSelection("3 ")}>Burundi</DropdownItem>
                                            <DropdownItem onClick={() => handleBadSelection("4 ")}>Cameroon</DropdownItem>
                                            <DropdownItem onClick={() => handleBadSelection("5 ")}>Canada</DropdownItem>
                                            <DropdownItem onClick={() => handleBadSelection("6 ")}>Burma</DropdownItem>
                                            <DropdownItem onClick={() => handleBadSelection("7 ")}>chad</DropdownItem>
                                        </DropdownMenu>
                                        </Dropdown>
                                        </div>
                                        </FormGroup>
                                        <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                     
                        Comments<br></br>
                        <input type="text" style={{height:'5000px'}}  style={{width:'100%'}}></input>
                            </label>
                            </FormGroup>
                            <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                         1099-NEC tax filing information
                         </label>
                         </FormGroup>


                       <Row>
                         <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                           Tax Identity Type
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-compnay name"
                              placeholder="Select Type"
                              type="text"
                              name="copmpany name"
                              onBlur={rentalsFormik.handleBlur}
                              onChange={rentalsFormik.handleChange}
                              value={rentalsFormik.values.rental_adress}
                            />
                            {rentalsFormik.touched.rental_adress &&
                            rentalsFormik.errors.rental_adress ? (
                              <div style={{ color: "red" }}>
                                {rentalsFormik.errors.rental_adress}
                              </div>
                            ) : null}
                          </FormGroup>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                           Taxpayer Id
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-compnay name"
                              placeholder="Enter SSN or EIN....."
                              type="text"
                              name="copmpany name"
                              onBlur={rentalsFormik.handleBlur}
                              onChange={rentalsFormik.handleChange}
                              value={rentalsFormik.values.rental_adress}
                            />
                            {rentalsFormik.touched.rental_adress &&
                            rentalsFormik.errors.rental_adress ? (
                              <div style={{ color: "red" }}>
                                {rentalsFormik.errors.rental_adress}
                              </div>
                            ) : null}
                          </FormGroup>

                          </Row>  
                          
                          <FormGroup>
                            
                          <Checkbox></Checkbox>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                            Use a different name
                            </label>

                        </FormGroup>
                        <FormGroup>
                            
                            <Checkbox></Checkbox>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                           Use a different address
                              </label>
  
                          </FormGroup>
                          <FormGroup>

                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                          Rental properties owned
                            </label>
                            <br></br>
                            Select the Propertits owned by this rental owner:
                            </FormGroup>

                                
                  <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-property"
                          >
                            <input type="text" value="contain......"></input>
                  
                          </label>
                          <hr></hr>

                          
                          </FormGroup>
                              
                          <FormGroup>
                            
                            <Checkbox></Checkbox>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                        Select All
                              </label>
                              <hr></hr>
  
                          </FormGroup>
                          {/* <FormGroup>
                          <lable> 3 Industrial Road</lable><br></br>
                          <lable> 74 Grove Street (Single family home)</lable><br></br> 
                          <lable>100 Main Ave (duplex)</lable><br></br>
                          <lable> 150 Main Ave (fourplex)</lable><br></br>
                          <lable>160 East End Avenue (condo/townhouse)...</lable><br></br>
                          <lable>  Garden Row (multi-building complex)</lable><br></br>


                          </FormGroup> */}
  
  
  
  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ background: "green" }}
                  >
                    Create Owner
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
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Rentalowner;






















