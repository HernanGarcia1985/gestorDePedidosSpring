import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import createAsset from '../utils/createAsset';
import { PlusSquare, DashSquare } from "react-bootstrap-icons";

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
        console.log('taxes: ',assetTaxes);
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
        <Form.Group className="mb-3">
            <Form.Label>Associate Taxes</Form.Label>
            {assetTaxes ? allTaxes.map((tax,index) => (
                assetTaxes.includes(tax.id.toString()) ? <Form.Control disabled key={index} defaultValue={tax.name}/> : null
            )) : null}
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>All Taxes</Form.Label>
            <Form.Select onChange={(e) => {taxSelected = e.target.value}}>    
                {allTaxes ? allTaxes.map((tax, index) => (
                    <option key={index} value={tax.id} >{tax.name}</option>
                )) : null}           
            </Form.Select>
            <Row>
                <Col>
                    <Button onClick={addTax}>Agregar  <PlusSquare></PlusSquare></Button>
                </Col>
                <Col>
                    <Button onClick={removeTax}>Quitar  <DashSquare></DashSquare></Button>
                </Col>
            </Row>
            </Form.Group>        
        <Button onClick={create}>Create</Button>
    </Form>
    </Container>
    </>
  );
}

export default AssetCreateForm;