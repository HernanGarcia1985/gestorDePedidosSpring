import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CustomerForm = () => {
  return (
    <>
    <Container>
    <Form >
        <Form.Group className="mb-3 " >
            <Form.Check inline type="radio" name="PersonOrCompany" label="Person"  value = "Person" />
            <Form.Check inline type="radio" name="PersonOrCompany" label="Company" value = "Company" />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Business Name</Form.Label>
            <Form.Control placeholder="Business Name" />
        </Form.Group>
        <Row>
            <Col md-auto>
                <Form.Group className="mb-3">
                    <Form.Label>Start Of Activities</Form.Label>
                    <Form.Control type="date" placeholder="Start Of Activities" />
                </Form.Group>
            </Col>
            <Col md-auto>
                <Form.Group className="mb-3">
                    <Form.Label>CUIT</Form.Label>
                    <Form.Control placeholder="Number of CUIT" />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder="Name" />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control placeholder="Last Name" />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control placeholder="Number of DNI, CI or ID" />
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder="Contact Email" />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control placeholder="Contact Phone" />
                </Form.Group>
            </Col>
        </Row>
            <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="Address" />
            </Form.Group>
        
        <Button type="submit">Create</Button>
    </Form>
    </Container>
    </>
  );
}

export default CustomerForm;