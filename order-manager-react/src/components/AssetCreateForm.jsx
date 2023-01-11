import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import createAsset from '../utils/createAsset';

const CustomerForm = () => {

    const [assetType, setAssetType] = useState('')
    const [name, setName] = useState('')
    const [basePrice, setBasePrice] = useState('')
    const [special, setSpecial] = useState('')
    const [supportCharge, setSupportCharge] = useState('')
    const [warrantyPercentage, setWarrantyPercentage] = useState('')

     const create = (e) => {
        e.preventDefault()
        if (!noValidate()){
            createAsset(assetType, name, basePrice, special, supportCharge, warrantyPercentage)
        } else {
            alert("Please check the data entered and complete all necessary fields");
        }    
    }

    const noValidate = () =>{
        if (assetType.toLowerCase() ==='service'){
            return !(name.length && basePrice.length && special.length && supportCharge.length)   
        } else if (assetType.toLowerCase() ==='product') {
            return !(name.length && basePrice.length && warrantyPercentage.length)    
        } else {
            return true
        }
    }

  return (
    <>
    <Container>
    <Form >
        <Form.Group className="mb-3 " >
            <Form.Check inline type="radio" name="ServiceOrProduct" label="Service"  value = "Service" onChange={(e) => { setAssetType(e.target.value)}}/>
            <Form.Check inline type="radio" name="ServiceOrProduct" label="Product" value = "Product" onChange={(e) => { setAssetType(e.target.value)}}/>
        </Form.Group>
        <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder="Name" onChange={(e) => { setName(e.target.value)}}/>
                </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Base Price</Form.Label>
            <Form.Control type="number" placeholder="Base Price" onChange={(e) => { setBasePrice(e.target.value)}}/>
        </Form.Group>
        <Row>
            <Col md-auto>
                <Form.Group className="mb-3">
                    <Form.Label>If this SPECIAL service?</Form.Label>
                    <Form.Select placeholder="If this special service?" onChange={(e) => { setSpecial(e.target.value)}}>
                        <option value={true} >YES</option>
                        <option value={false} >NO</option>
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Support Charge</Form.Label>
                    <Form.Control type="number" placeholder="Support Charge" onChange={(e) => { setSupportCharge(e.target.value)}}/>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Warranty Percentage</Form.Label>
                    <Form.Control type="number" placeholder="Enter Warranty Percentage in 0.10 format" onChange={(e) => { setWarrantyPercentage(e.target.value)}}/>
                </Form.Group>
            </Col>
        </Row>    
        <Button onClick={create}>Create</Button>
    </Form>
    </Container>
    </>
  );
}

export default CustomerForm;