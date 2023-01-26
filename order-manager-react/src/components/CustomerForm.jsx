import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import createCustomer from '../utils/createCustomer';

const CustomerForm = () => {

    const [customerType, setCustomerType] = useState('')
    const [businessName, setBusinessName] = useState('')
    const [startOfActivities, setStartOfActivities] = useState('')
    const [cuit, setCuit] = useState('')
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dni, setDni] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const create = (e) => {
        e.preventDefault()
        if (!noValidate()){
            createCustomer(customerType, businessName, startOfActivities, cuit, name, lastName, dni, email, phone, address)
        } else {
            alert("Please check the data entered and complete all necessary fields");
        }    
    }

    const noValidate = () =>{
        if (customerType.toLowerCase() ==='person'){
            return !(name.length && lastName.length && dni.length && email.includes('@') && phone.length && address.length)    
        } else if (customerType.toLowerCase() ==='company') {
            return !(businessName.length && startOfActivities.length && cuit.length && name.length && lastName.length && dni.length && email.includes('@') && phone.length && address.length)    
        } else {
            return true
        }
    }

  return (
    <>
    <Container>
    <Form >
        <Form.Group className="mb-3 " >
            <Form.Check inline type="radio" name="PersonOrCompany" label="Person"  value = "Person" onChange={(e) => { setCustomerType(e.target.value)}}/>
            <Form.Check inline type="radio" name="PersonOrCompany" label="Company" value = "Company" onChange={(e) => { setCustomerType(e.target.value)}}/>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Business Name</Form.Label>
            <Form.Control placeholder="Business Name" onChange={(e) => { setBusinessName(e.target.value)}}/>
        </Form.Group>
        <Row>
            <Col className="md-auto">
                <Form.Group className="mb-3">
                    <Form.Label>Start Of Activities</Form.Label>
                    <Form.Control type="date" placeholder="Start Of Activities" onChange={(e) => { setStartOfActivities(e.target.value)}}/>
                </Form.Group>
            </Col>
            <Col className="md-auto">
                <Form.Group className="mb-3">
                    <Form.Label>CUIT</Form.Label>
                    <Form.Control placeholder="Number of CUIT" onChange={(e) => { setCuit(e.target.value)}}/>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder="Name" onChange={(e) => { setName(e.target.value)}}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control placeholder="Last Name" onChange={(e) => { setLastName(e.target.value)}}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control placeholder="Number of DNI, CI or ID" onChange={(e) => { setDni(e.target.value)}}/>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder="Contact Email" onChange={(e) => { setEmail(e.target.value)}}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control placeholder="Contact Phone" onChange={(e) => { setPhone(e.target.value)}}/>
                </Form.Group>
            </Col>
        </Row>
            <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="Address" onChange={(e) => { setAddress(e.target.value)}}/>
            </Form.Group>
        
        <Button onClick={create}>Create</Button>
    </Form>
    </Container>
    </>
  );
}

export default CustomerForm;