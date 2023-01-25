import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import updateTax from '../utils/updateTax'
import deleteTax from '../utils/deleteTax';

const TaxDetail = ({tax}) => {

    let user = localStorage.getItem('userLogged') ? localStorage.getItem('userLogged') : '';

    let admin = (!user || !(JSON.parse(user).roles[0]==="ADMIN")) ? false : true;

    const [name, setName] = useState(tax.name)
    const [percentage, setPercentage] = useState(tax.percentage)

    const {id} = useParams()

    const update = (e) => {
        e.preventDefault()
        if (!noValidate()){
            if(window.confirm("Are you sure to update the tax? This operation is not reversible.")){
                updateTax(id, name, percentage)
            } else {
                console.log("Operation cancelled")
            }
        } else {
            alert("Please check the data entered and complete all necessary fields");
        }
        
    }

    const destroy = (e) => {
        e.preventDefault()
        if(window.confirm("Are you sure to delete the tax? This operation is not reversible.")){
            deleteTax(id)
        } else {
            console.log("Operation cancelled")
        }
    }

    const noValidate = () =>{
        return !(name.length && 1>=percentage.parseFloat()>=0)
    }
    
        
    return (
        <>
        <Container>
        <Form >
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control defaultValue={name} onChange={(e) => { setName(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Percentage</Form.Label>
                <Form.Control defaultValue={percentage} onChange={(e) => { setPercentage(e.target.value)}}/>
            </Form.Group>    
            <Form.Group className="mb-3">
            <Row>
                <Col>            
                    {admin ? <Button onClick={update}>Update</Button> : null }
                </Col>
                <Col>
                    {admin ? <Button onClick={destroy}>Delete</Button> : null }
                </Col>
            </Row>
            </Form.Group>
        </Form>
        </Container>
        </>
    );
}    

export default TaxDetail;