import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

const TaxCreateForm = () => {

    const [name, setName] = useState('')
    const [percentage, setPercentage] = useState(0)

    const create = (e) => {
        e.preventDefault()
        if (!noValidate()){
            //createTax()
        } else {
            alert("Please check the data entered and complete all necessary fields");
        }
        
    }

    const noValidate = () =>{
            return !(name.length && 1>=percentage>=0)
        }
    
        
    
        return (
            <>
            <Container>
            <Form >
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={(e) => { setName(e.target.value)}}/>
                </Form.Group>    
                <Form.Group className="mb-3">
                    <Form.Label>Percentage</Form.Label>
                    <Form.Control placeholder="Please enter a number between 0 and 1" onChange={(e) => { setPercentage(e.target.value)}}/>
                </Form.Group>    
                <Form.Group className="mb-3">
                <Row>
                    <Col>            
                        <Button onClick={create}>Create</Button>
                    </Col>
                </Row>
                </Form.Group>
            </Form>
            </Container>
            </>
          );
    }    

export default TaxCreateForm;