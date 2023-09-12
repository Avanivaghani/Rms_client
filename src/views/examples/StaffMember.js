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
    Table,
    Badge,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from "reactstrap";
  import StaffMemberHeader from "components/Headers/StaffMemberHeader";
  import React from 'react';
  import DeleteIcon from "@mui/icons-material/Delete";
  import EditIcon from "@mui/icons-material/Edit";
  
  import { useState, useEffect } from "react";
  import axios from "axios";
  import Dialog from "@mui/material/Dialog";
  import DialogActions from "@mui/material/DialogActions";
  import DialogContent from "@mui/material/DialogContent";
  import DialogTitle from "@mui/material/DialogTitle";

  const StaffMember = () => {
    let [StaffMemberData, setStaffMemberData] = useState();
    const [open, setOpen] = React.useState(false);
    const [isEditDialogOpen, setEditDialogOpen] = React.useState(false);
    const [editingStaffMember, setEditingStaffMember] = React.useState(null);
    let [modalShowForPopupForm, setModalShowForPopupForm] = React.useState(false);
    let [id, setId] = React.useState();
    
    let [editData, setEditData] = React.useState({});

    const openEditDialog = (staff) => {
      setEditingStaffMember(staff);
      setEditDialogOpen(true);
    };
  
    const closeEditDialog = () => {
      setEditDialogOpen(false);
      setEditingStaffMember(null);
    };

    const getStaffMemberData = async () => {
      try {
        const response = await axios.get(
          "http://64.225.8.160:4000/addstaffmember/addstaffmember"
        );
        setStaffMemberData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const editStaffMemberData = async (id, updatedData) => {
      try {
        const editUrl = `http://64.225.8.160:4000/addstaffmember/staffmember/${id}`;
        console.log("Edit URL:", editUrl);
        console.log("ID:", id);
        console.log("Updated Data:", updatedData); // Log the updated data for debugging
  
        const response = await axios.put(editUrl, updatedData); // Send the updated data in the request body
        console.log("Edit Response:", response);
  
        if (response.status === 200) {
          getStaffMemberData(); // Refresh the data after successful edit
        } else {
          console.error("Edit request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error editing:", error);
      }
    };

    // Delete selected
    var deleteStaffMember = (id) => {
      axios
        .delete(
          "http://64.225.8.160:4000/addstaffmember/delete_staffmember",
          {
            data: { _id: id }, // Send the id as _id in the request body
          }
        )
        .then((response) => {
          if (response.data.statusCode === 200) {
            alert("Staff Member deleted successfully");
            getStaffMemberData()
            // You may want to refresh your data or perform other actions here
          } else {
            alert("Failed to delete");
          }
        })
        .catch((error) => {
          console.error("Error deleting:", error);
        });
    };

     //   auto form fill up in edit
      let seletedEditData = async (datas) => {
        setModalShowForPopupForm(true);
        setId(datas._id);
        setEditData(datas);
      };

      const handleClose = () => {
        setOpen(false);
      };

      useEffect(() => {
        getStaffMemberData();
      }, []);

    return (
      <>
        <StaffMemberHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Staff Members</h3>   
                </CardHeader>
  
  
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      
                      <th scope="col">NAME</th>
                      <th scope="col">DESIGNATION</th>
                      <th scope="col">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                  {StaffMemberData?.map((staff) => (
                    <tr key={staff._id}>
                      <td>{staff.staffmember_name}</td>
                      <td>{staff.staffmember_designation}</td>
                      <td>
                        <div style={{ display: "flex" }}>
                          
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => deleteStaffMember(staff._id)}
                          >
                            <DeleteIcon />
                          </div>&nbsp; &nbsp; &nbsp;
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => openEditDialog(staff)} 
                          >
                            <EditIcon />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                 </Table>   
              </Card>
              </div>
           </Row>
        </Container>
        <Dialog
        open={isEditDialogOpen}
        onClose={closeEditDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle style={{ background: "#F0F8FF" }}>Update</DialogTitle><br/>
        <DialogContent style={{ width: "100%", maxWidth: "500px" }}>
          
        <FormGroup>
            <label className="form-control-label" htmlFor="input-property">
            What is the name of new staff member?
            </label>
            <br />
            {/* <InputLabel htmlFor="input-protype">Property Type</InputLabel> */}
            <Input
              className="form-control-alternative"
              id="input-staffmember"
              type="text"
              name="staffmember_name"
              value={editingStaffMember?.staffmember_name || ""}
              onChange={(e) => {
              const newValue = e.target.value;
              setEditingStaffMember((prev) => ({
                ...prev,
                staffmember_name: newValue,
              }));
            }}
            />

         
          </FormGroup><br/><br/>
            
          <FormGroup>
            <label className="form-control-label" htmlFor="input-property">
            What is the designation?
            </label>
            <br />
            
            <Input
              className="form-control-alternative"
              id="input-staffmember"
              type="text"
              name="staffmember_designation"
              value={editingStaffMember?.staffmember_designation || ""}
              onChange={(e) => {
              const newValue = e.target.value;
              setEditingStaffMember((prev) => ({
                ...prev,
                staffmember_designation: newValue,
              }));
            }}
            />
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog}>Cancel</Button>
          <Button
            onClick={() => {
              // Handle the update logic here
              editStaffMemberData(editingStaffMember._id, editingStaffMember);
              closeEditDialog();
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      </>
    );
  };
  
  export default StaffMember;
  
  