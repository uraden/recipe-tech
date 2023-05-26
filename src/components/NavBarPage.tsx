import React, { useState } from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

export default function App() {
  const [showBasic] = useState(false);

  return (
    <MDBNavbar expand="lg" light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand href="#">Recipe</MDBNavbarBrand>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-5 mb-lg-0">
            <MDBNavbarItem>
              <Link to="/recipe-tech">
                <MDBNavbarLink aria-current="page">Home</MDBNavbarLink>
              </Link>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <Link to="/form">
                <MDBNavbarLink>Form</MDBNavbarLink>
              </Link>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink href="#">Detail</MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
          
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
