import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import createAsset from '../utils/createAsset';
import { PlusSquare, DashSquare, ArrowLeftSquare } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';

const AssetCreateForm = ({allTaxes}) => {

    const [assetType, setAssetType] = useState('')
    const [name, setName] = useState('')
    const [basePrice, setBasePrice] = useState('')
    const [special, setSpecial] = useState('')
    const [supportCharge, setSupportCharge] = useState('')
    const [warrantyPercentage, setWarrantyPercentage] = useState('')
    const [assetTaxes, setAssetTaxes] = useState()
    const [prueba, setPrueba] = useState(true) //Para que actualice los tax asociados automaticamente!
    
    let arrayTax = [];
    let taxSelected = '1';
    let position;
    let assetTaxesUpdated = [];

    function addTax () {
        console.log('ingreso: ',taxSelected);
        if(assetTaxes){
            if(assetTaxes.indexOf(taxSelected) === -1){
                arrayTax = assetTaxes;
                arrayTax.push(taxSelected)
                console.log('se agregó')
                setAssetTaxes(arrayTax)
                setPrueba(!prueba) //Para que actualice los tax asociados automaticamente!
            } else {
                console.log("repetido")
            }
        } else {
            console.log("primera vez")
            arrayTax.push(taxSelected)
            setAssetTaxes(arrayTax)
        }
    }

    function removeTax () {
        console.log('ingreso: ',taxSelected);
        if(assetTaxes){
            position = assetTaxes.indexOf(taxSelected);
            if(position !== -1){
                arrayTax = assetTaxes;
                arrayTax = arrayTax.filter(tax => tax !== arrayTax[position])
                console.log('se eliminó')
                setAssetTaxes(arrayTax)
            } else {
                console.log("no estaba en la lista")
            }
        } else {
            console.log("no hay elementos a eliminar")
        }
    }

     const create = (e) => {
        e.preventDefault()
        if (!noValidate()){
            transformTaxes();
            createAsset(assetType, name, basePrice, special, supportCharge, warrantyPercentage, assetTaxesUpdated)
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

    const transformTaxes = () => {
        if (assetTaxes) {
            assetTaxesUpdated = allTaxes.filter(tax => {
                return assetTaxes.includes(tax.id.toString())
            })
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
        {assetType !== "" ? 
        <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Name" onChange={(e) => { setName(e.target.value)}}/>
        </Form.Group> : null }
        {assetType !== "" ? <Form.Group className="mb-3">
            <Form.Label>Base Price</Form.Label>
            <Form.Control type="number" min="1" placeholder="Base Price" onChange={(e) => { setBasePrice(e.target.value)}}/>
        </Form.Group> : null }
        {assetType === "Service" ?
        <Row>
            <Col className="md-auto">
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
                    <Form.Control type="number" min="0" placeholder="Support Charge" onChange={(e) => { setSupportCharge(e.target.value)}}/>
                </Form.Group>
            </Col>
        </Row> : null }
        {assetType === "Product" ?
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>Warranty Percentage</Form.Label>
                    <Form.Control type="number" min="0" max="1" placeholder="Please enter Warranty Percentage in 0.10 format (A number between 0 and 1)" onChange={(e) => { setWarrantyPercentage(e.target.value)}}/>
                </Form.Group>
            </Col>
        </Row> : null }
        {assetType !== "" ? 
        <Form.Group className="mb-3">
            <Form.Label>Associate Taxes</Form.Label>
            {assetTaxes ? allTaxes.map((tax,index) => (
                assetTaxes.includes(tax.id.toString()) ? <Form.Control disabled key={index} defaultValue={tax.name}/> : null
            )) : null}
        </Form.Group> : null }
        {assetType !== "" ? 
        <Form.Group className="mb-3">
            <Form.Label>All Taxes</Form.Label>
            <Form.Select onChange={(e) => {taxSelected = e.target.value}}>    
                {allTaxes ? allTaxes.map((tax, index) => (
                    <option key={index} value={tax.id} >{tax.name}</option>
                )) : null}           
            </Form.Select>
            <Row>
                <Col>
                    <Button onClick={addTax}>Add  <PlusSquare></PlusSquare></Button>
                </Col>
                <Col>
                    <Button onClick={removeTax}>Remove  <DashSquare></DashSquare></Button>
                </Col>
            </Row>
        </Form.Group> : null }
        <Form.Group className="mb-3">
            {assetType !== "" ?
                <Row>
                    <Col>
                        <Link to={'/home'}><Button className="btn-info">Home <ArrowLeftSquare></ArrowLeftSquare></Button></Link>
                    </Col>
                    <Col>
                        <Button onClick={create}>Create</Button>
                    </Col>
                </Row>
            : <Link to={'/home'}><Button className="btn-info">Home <ArrowLeftSquare></ArrowLeftSquare></Button></Link> }
        </Form.Group>
    </Form>
    </Container>
    </>
  );
}

export default AssetCreateForm;