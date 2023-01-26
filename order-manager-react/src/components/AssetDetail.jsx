import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import updateAsset from '../utils/updateAsset';
import deleteAsset from '../utils/deleteAsset';
import { useParams } from 'react-router-dom';
import { PlusSquare, DashSquare } from "react-bootstrap-icons";

const AssetDetail = ({asset, allTaxes}) => {

    const [assetType, setAssetType] = useState(asset.assetType)
    const [name, setName] = useState(asset.name)
    const [basePrice, setBasePrice] = useState(asset.basePrice)
    const [special, setSpecial] = useState(asset.special)
    const [supportCharge, setSupportCharge] = useState(asset.supportCharge)
    const [warrantyPercentage, setWarrantyPercentage] = useState(asset.warrantyPercentage)
    const [assetTaxes, setAssetTaxes] = useState()
    const [prueba, setPrueba] = useState(true) //Para que actualice los tax asociados automaticamente!

    console.log('impuestos: ',assetTaxes)
    console.log('bien: ',asset)

    const {id} = useParams()

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

    const update = (e) => {
        e.preventDefault()
        if (!noValidate()){
            transformTaxes();
            if(window.confirm("Are you sure to update the asset? This operation is not reversible.")){
                updateAsset(id, assetType, name, basePrice, special, supportCharge, warrantyPercentage, assetTaxesUpdated)
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

    const transformTaxes = () => {
        if (assetTaxes) {
            assetTaxesUpdated = allTaxes.filter(tax => {
                return assetTaxes.includes(tax.id.toString())
            })
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
                    <Form.Label>Associate Taxes</Form.Label>
                    {assetTaxes ? allTaxes.map((tax,index) => (
                        assetTaxes.includes(tax.id.toString()) ? <Form.Control disabled key={index} defaultValue={tax.name}/> : null
                    )) : null}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>All Taxes</Form.Label>
                    <Form.Select onChange={(e) => { taxSelected = e.target.value }}>
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
            <Col className="md-auto">
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
                    <Form.Label>Associate Taxes</Form.Label>
                    {assetTaxes ? allTaxes.map((tax,index) => (
                        assetTaxes.includes(tax.id.toString()) ? <Form.Control disabled key={index} defaultValue={tax.name}/> : null
                    )) : null}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>All Taxes</Form.Label>
                    <Form.Select onChange={(e) => { taxSelected = e.target.value }}>
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