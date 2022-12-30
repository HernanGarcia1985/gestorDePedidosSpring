import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CustomerDetail = ({customer}) => {

    const {id} = useParams()
    
  return (
    <>
    <Container>
    <Form >
        <Form.Group className="mb-3 " >
            <Form.Label>Customer Type</Form.Label>
            <Form.Control type='text' defaultValue={customer.customerType} disabled></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Business Name</Form.Label>
            <Form.Control type='text' defaultValue={customer.businessName}></Form.Control>
        </Form.Group>
        <Row>
            <Col md-auto>
                <Form.Group className="mb-3">
                    <Form.Label>Start Of Activities</Form.Label>
                    <Form.Control type="date" defaultValue={customer.startOfActivities}/>    
                </Form.Group>
            </Col>
            <Col md-auto>
                <Form.Group className="mb-3">
                    <Form.Label>CUIT</Form.Label>
                    <Form.Control defaultValue={customer.cuit}/>   
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control defaultValue={customer.name} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control defaultValue={customer.lastName} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control defaultValue={customer.dni} />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control defaultValue={customer.email} />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control defaultValue={customer.phone} />
                </Form.Group>
            </Col>
        </Row>
            <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control defaultValue={customer.address} />
            </Form.Group>
        <Button type="submit">Update</Button>
    </Form>
    <Form>
        <Button type="submit">Delete</Button>
    </Form>
    </Container>
    </>
  );
}

export default CustomerDetail;