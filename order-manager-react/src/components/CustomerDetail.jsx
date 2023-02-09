import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import updateCustomer from '../utils/updateCustomer'
import deleteCustomer from '../utils/deleteCustomer'
import { ArrowLeftSquare } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';

const CustomerDetail = ({customer}) => {

    const [customerType, setCustomerType] = useState(customer.customerType)
    const [businessName, setBusinessName] = useState(customer.businessName)
    const [startOfActivities, setStartOfActivities] = useState(customer.startOfActivities)
    const [cuit, setCuit] = useState(customer.cuit)
    const [name, setName] = useState(customer.name)
    const [lastName, setLastName] = useState(customer.lastName)
    const [dni, setDni] = useState(customer.dni)
    const [email, setEmail] = useState(customer.email)
    const [phone, setPhone] = useState(customer.phone)
    const [address, setAddress] = useState(customer.address)
    const [updatePersonInCharge, setUpdatePersonInCharge] = useState()
    
    let associatedService = customer.customerAssetServiceList.length>0 ? customer.customerAssetServiceList : [];

    let user = sessionStorage.getItem('userLogged') ? sessionStorage.getItem('userLogged') : '';

    let admin = (!user || !(JSON.parse(user).roles[0]==="ADMIN")) ? false : true;

    const {id} = useParams()

    const update = (e) => {
        e.preventDefault()
        if (!noValidate()){
            if(window.confirm("Are you sure to update the client? This operation is not reversible.")){
                updateCustomer(id, customerType, businessName, startOfActivities, cuit, name, lastName, dni, email, phone, address, updatePersonInCharge)
            } else {
                console.log("Operation cancelled")
            }
        } else {
            alert("Please check the data entered and complete all necessary fields");
        }
        
    }

    const destroy = (e) => {
        e.preventDefault()
        if(window.confirm("Are you sure to delete the client? This operation is not reversible.")){
            deleteCustomer(id)
        } else {
            console.log("Operation cancelled")
        }
    }

    const noValidate = (/*customerType, businessName*/) =>{
        //console.log(updatePersonInCharge)
        if (customerType.toLowerCase() ==='person'){
            return !(name.length && lastName.length && dni.length)    
        } else if (customerType.toLowerCase() ==='company') {
            //console.log(businessName.length)
            return !(businessName.length && startOfActivities.length && cuit.length && name.length && lastName.length && dni.length && email.length && phone.length && address.length && updatePersonInCharge!==undefined)    
        } else {
            return true
        }
    }
        
    if(customerType.toLowerCase() ==='person') {
        return (
            <>
            <Container>
            <Form >
                <Form.Group className="mb-3">
                    <Row>
                        <Col>            
                            <Button onClick={update}>Update</Button>
                        </Col>
                        <Col>
                            <Link to={'/customers'}><Button className="btn-light">Back <ArrowLeftSquare></ArrowLeftSquare></Button></Link>
                        </Col>
                        <Col>
                            {admin ? <Button className="btn-danger" onClick={destroy}>Delete</Button> : null }
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Customer Type</Form.Label>
                    <Form.Control type='text' defaultValue={customerType.toUpperCase()} disabled onLoad={(e) => { setCustomerType(e.target.value)}}></Form.Control>
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control defaultValue={name} onChange={(e) => { setName(e.target.value)}}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control defaultValue={lastName} onChange={(e) => { setLastName(e.target.value)}}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>DNI</Form.Label>
                            <Form.Control defaultValue={dni} onChange={(e) => { setDni(e.target.value)}}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control defaultValue={email} onChange={(e) => { setEmail(e.target.value)}}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control defaultValue={phone} onChange={(e) => { setPhone(e.target.value)}}/>
                        </Form.Group>
                    </Col>
                </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control defaultValue={address} onChange={(e) => { setAddress(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Associated Services</Form.Label>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        {associatedService && associatedService.length ? associatedService.map((customerAssetList,index) => (
                        <Form.Control disabled key={index} defaultValue={customerAssetList.ownService.name}/>
                    )) : <Form.Label>There are no services associated with this customer yet</Form.Label>}
                    </Form.Group>
            </Form>
            </Container>
            </>
          );
    }     
    
  return (
    <>
    <Container>
    <Form >
        <Form.Group className="mb-3">
            <Row>
                <Col>            
                    <Button onClick={update}>Update</Button>
                </Col>
                <Col>
                    <Link to={'/customers'}><Button className="btn-light">Back <ArrowLeftSquare></ArrowLeftSquare></Button></Link>
                </Col>
                <Col>
                    {admin ? <Button className="btn-danger" onClick={destroy}>Delete</Button> : null }
                </Col>
            </Row>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Customer Type</Form.Label>
            <Form.Control type='text' defaultValue={customerType.toUpperCase()} disabled onLoad={(e) => { setCustomerType(e.target.value)}}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Business Name</Form.Label>
            <Form.Control type='text' defaultValue={businessName} onChange={(e) => { setBusinessName(e.target.value)}}></Form.Control>
        </Form.Group>
        <Row>
            <Col className="md-auto">
                <Form.Group className="mb-3">
                    <Form.Label>Start Of Activities</Form.Label>
                    <Form.Control type="date" defaultValue={startOfActivities} onChange={(e) => { setStartOfActivities(e.target.value)}}/>    
                </Form.Group>
            </Col>
            <Col className="md-auto">
                <Form.Group className="mb-3">
                    <Form.Label>CUIT</Form.Label>
                    <Form.Control defaultValue={cuit} onChange={(e) => { setCuit(e.target.value)}}/>   
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Label>Do you want to Update Person In Charge?</Form.Label>
                <Form.Group className="mb-3">
                    <Form.Check inline type="radio" name="updatePersonInCharge" label="Yes" value="true" onClick={(e) => { setUpdatePersonInCharge(e.target.value)}}/>
                    <Form.Check inline type="radio" name="updatePersonInCharge" label="No" value="false" onClick={(e) => { setUpdatePersonInCharge(e.target.value)}}/>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control defaultValue={name} onChange={(e) => { setName(e.target.value)}}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control defaultValue={lastName} onChange={(e) => { setLastName(e.target.value)}}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control defaultValue={dni} onChange={(e) => { setDni(e.target.value)}}/>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control defaultValue={email} onChange={(e) => { setEmail(e.target.value)}}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control defaultValue={phone} onChange={(e) => { setPhone(e.target.value)}}/>
                </Form.Group>
            </Col>
        </Row>
            <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control defaultValue={address} onChange={(e) => { setAddress(e.target.value)}}/>
            </Form.Group>
        <Form.Group className="mb-3">
                    <Form.Label>Associated Services</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3">
                    {associatedService && associatedService.length ? associatedService.map((customerAssetList,index) => (
                    <Form.Control disabled key={index} defaultValue={customerAssetList.ownService.name}/>
                )) : <Form.Label>There are no services associated with this customer yet</Form.Label>}
        </Form.Group>
    </Form>
    </Container>
    </>
  );
}

export default CustomerDetail;