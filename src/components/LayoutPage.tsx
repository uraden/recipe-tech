import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/recipe"><Nav.Link>Recipe Detail</Nav.Link></Link>
            <Link to="/create"><Nav.Link>Create Form </Nav.Link></Link>
            <Link to="/"><Nav.Link>THIS IS THE LIST</Nav.Link></Link>
          </Nav>
          <Form>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default Layout;
