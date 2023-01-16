import "../index.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const NavbarCustom = () => {

    let user = localStorage.getItem('userLogged') ? localStorage.getItem('userLogged') : '';

    let admin = (!user || !(JSON.parse(user).roles[0]==="ADMIN")) ? false : true;

    const signoff = () => {
        if(user){
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
                    <NavDropdown.Item href="/orders/show">View an Order</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/orders/">View all Orders</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Customers" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/customers/create">Create new Customer</NavDropdown.Item>
                    <NavDropdown.Item href="/customers/show">View a Customer</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/customers/">View all Customers</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Assets" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/assets/create">Create new Asset</NavDropdown.Item>
                    <NavDropdown.Item href="/assets/show">View an Asset</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/assets/">View all Assets</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Reports" id="basic-nav-dropdown">
                        {admin ? <NavDropdown.Item href="/reports/historicalOrders">Historical Orders</NavDropdown.Item> : null}
                        {admin ? <NavDropdown.Item href="/reports/biggestDiscount">Biggest Discount</NavDropdown.Item> : null}
                        {admin ? <NavDropdown.Item href="/reports/totalDiscount">Total Discount</NavDropdown.Item> : null}
                    </NavDropdown>
                    <NavDropdown title="Users" id="basic-nav-dropdown">
                    {user ? null : <NavDropdown.Item href="/auth/signin">SignIn</NavDropdown.Item>}
                    <NavDropdown.Item href="/auth/signup">SignUp</NavDropdown.Item>
                    {user ? <NavDropdown.Item onClick={signoff}>LogOut</NavDropdown.Item> : null }
                    </NavDropdown>    
                </Nav>
                <Form className="d-flex">
                    <Container>
                        {user ? <Form.Label >Welcome {JSON.parse(user).username}</Form.Label> : null}
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