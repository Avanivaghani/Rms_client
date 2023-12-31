import {
    Card,
    CardBody,
    CardTitle,
    Container,
    Row,
    Col,
    Button,
  } from "reactstrap";
  import AuthNavbar from "components/Navbars/AuthNavbar.js";
  import { useNavigate } from "react-router-dom";
  
  const StaffMemberHeader = () => {
    let navigate = useNavigate();
    return (
      <>
        <AuthNavbar />
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              <Button
                color="primary"
                href="#pablo"
                onClick={() => navigate("/admin/AddStaffMember")}
                size="sm"
                style={{ background: "white", color: "blue" }}
              >
                Add New Staff Member
              </Button>      
            </div>
          </Container>
        </div>
      </>
    );
  };
  
  export default StaffMemberHeader;
  