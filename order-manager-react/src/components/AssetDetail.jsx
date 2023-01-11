import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import updateAsset from '../utils/updateAsset';
import deleteAsset from '../utils/deleteAsset';
import { useParams } from 'react-router-dom';

const AssetDetail = ({asset}) => {

    const [assetType, setAssetType] = useState(asset.assetType)
    const [name, setName] = useState(asset.name)
    const [basePrice, setBasePrice] = useState(asset.basePrice)
    const [special, setSpecial] = useState(asset.special)
    const [supportCharge, setSupportCharge] = useState(asset.supportCharge)
    const [warrantyPercentage, setWarrantyPercentage] = useState(asset.warrantyPercentage)

    const {id} = useParams()

    const update = (e) => {
        e.preventDefault()
        if (!noValidate()){
            if(window.confirm("Are you sure to update the asset? This operation is not reversible.")){
                updateAsset(id, assetType, name, basePrice, special, supportCharge, warrantyPercentage)
        } else {
            console.log("Operation cancelled")
        }
        } else {
            alert("Please check the data entered and complete all necessary fields");
        }    
    }

    const destroy = (e) => {
        e.preventDefault()
        if(window.confirm("Are you sure to delete the asset? This operation is not reversible.")){
            deleteAsset(id)
        } else {
            console.log("Operation cancelled")
        }
    }

    const noValidate = () =>{
        if (assetType.toLowerCase() ==='service'){
            console.log(name.length, basePrice, special, supportCharge)
            let boolean = special === true || special === false ? true : false;
            return !(name.length && basePrice>0 && boolean && supportCharge>=0)   
        } else if (assetType.toLowerCase() ==='product') {
            return !(name.length && basePrice && warrantyPercentage)    
        } else {
            return true
        }
    }

    if (assetType.toLowerCase() ==='product') {
        return (
            <>
            <Container>
            <Form >
                <Form.Group className="mb-3 " >
                    <Form.Label>Asset Type</Form.Label>
                    <Form.Control type='text' defaultValue={assetType.toUpperCase()} disabled onLoad={(e) => { setAssetType(e.target.value)}}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control defaultValue={name} onChange={(e) => { setName(e.target.value)}}/>
                        </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Base Price</Form.Label>
                    <Form.Control type="number" defaultValue={basePrice} onChange={(e) => { setBasePrice(e.target.value)}}/>
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Warranty Percentage</Form.Label>
                            <Form.Control type="number" defaultValue={warrantyPercentage} onChange={(e) => { setWarrantyPercentage(e.target.value)}}/>
                        </Form.Group>
                    </Col>
                </Row>    
                <Form.Group className="mb-3">
                <Row>
                    <Col>            
                        <Button onClick={update}>Update</Button>
                    </Col>
                    <Col>
                        <Button onClick={destroy}>Delete</Button>
                    </Col>
                </Row>
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
        <Form.Group className="mb-3 " >
            <Form.Label>Asset Type</Form.Label>
            <Form.Control type='text' defaultValue={assetType.toUpperCase()} disabled onLoad={(e) => { setAssetType(e.target.value)}}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control defaultValue={name} onChange={(e) => { setName(e.target.value)}}/>
                </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Base Price</Form.Label>
            <Form.Control type="number" defaultValue={basePrice} onChange={(e) => { setBasePrice(e.target.value)}}/>
        </Form.Group>
        <Row>
            <Col md-auto>
                <Form.Group className="mb-3">
                    <Form.Label>Special</Form.Label>
                    <Form.Control defaultValue={special} onChange={(e) => { setSpecial(e.target.value)}}/>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Support Charge</Form.Label>
                    <Form.Control type="number" defaultValue={supportCharge} onChange={(e) => { setSupportCharge(e.target.value)}}/>
                </Form.Group>
            </Col>
        </Row>
        <Form.Group className="mb-3">
        <Row>
            <Col>            
                <Button onClick={update}>Update</Button>
            </Col>
            <Col>
                <Button onClick={destroy}>Delete</Button>
            </Col>
        </Row>
        </Form.Group>
    </Form>
    </Container>
    </>
  );
}

export default AssetDetail;