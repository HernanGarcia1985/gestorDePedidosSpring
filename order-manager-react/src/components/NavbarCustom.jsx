import "../index.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const NavbarCustom = () => {

    const signoff = () => {
        if(localStorage.getItem('userLogged')){
            localStorage.removeItem('userLogged')
            alert('Logged out successfully.')
        }    
    }

    return(
        <Navbar bg="light" expand="lg">
            <Container fluid>
            <Navbar.Brand className="logo" href="https://finneg.com/ar/">Finnegans</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title="Orders" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/orders/create">Create new Order</NavDropdown.Item>
                    <NavDropdown.Item href="/orders/update">Update an Order</NavDropdown.Item>
                    <NavDropdown.Item href="/orders/show">View an Order</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/orders/delete">Delete an Order</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Customers" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/customers/create">Create new Customer</NavDropdown.Item>
                    <NavDropdown.Item href="/customers/update">Update a Customer</NavDropdown.Item>
                    <NavDropdown.Item href="/customers/show">View a Customer</NavDropdown.Item>
                    <NavDropdown.Item href="/customers/">View all Customers</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/customers/delete">Delete a Customer</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Assets" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/assets/create">Create new Asset</NavDropdown.Item>
                    <NavDropdown.Item href="/assets/update">Update an Asset</NavDropdown.Item>
                    <NavDropdown.Item href="/assets/show">View an Asset</NavDropdown.Item>
                    <NavDropdown.Item href="/assets/">View all Assets</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/assets/delete">Delete an Asset</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Reports" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/reports/historicalOrders">Historical Orders</NavDropdown.Item>
                    <NavDropdown.Item href="/reports/biggestDiscount">Biggest Discount</NavDropdown.Item>
                    <NavDropdown.Item href="/reports/totalDiscount">Total Discount</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Users" id="basic-nav-dropdown">
                    {localStorage.getItem('userLogged') ? null : <NavDropdown.Item href="/auth/signin">SignIn</NavDropdown.Item>}
                    <NavDropdown.Item href="/auth/signup">SignUp</NavDropdown.Item>
                    {localStorage.getItem('userLogged') ? <NavDropdown.Item onClick={signoff}>LogOut</NavDropdown.Item> : null }
                    </NavDropdown>    
                </Nav>
                <Form className="d-flex">
                    <Container>
                        {localStorage.getItem('userLogged') ? <Form.Label >Welcome {JSON.parse(localStorage.getItem('userLogged')).username}</Form.Label> : null}
                    </Container>
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                        />
                    <Button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</Button>
                </Form>
                </Navbar.Collapse>    
            </Container>
        </Navbar>
    )
}

export default NavbarCustom