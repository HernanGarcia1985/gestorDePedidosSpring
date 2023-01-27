import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
//import createAsset from '../utils/createAsset';
import { PlusSquare, DashSquare } from "react-bootstrap-icons";

const OrderCreateForm = ({allCustomers, allAssets}) => {

    const [idCustomer, setIdCustomer] = useState('')
    // const [name, setName] = useState('')
    // const [basePrice, setBasePrice] = useState('')
    // const [special, setSpecial] = useState('')
    // const [supportCharge, setSupportCharge] = useState('')
    // const [warrantyPercentage, setWarrantyPercentage] = useState('')
    const [assetList, setAssetList] = useState()
    const [prueba, setPrueba] = useState(true) //Para que actualice los tax asociados automaticamente!
    
    let arrayAssset = [];
    let assetSelected = '1'; //AllAssets[0].id.toString();
    let position;
    let assetListUpdated = [];

    function addAsset () {
        console.log('ingreso: ',assetSelected);
        if(assetList){
            if(assetList.indexOf(assetSelected) === -1){
                arrayAssset = assetList;
                arrayAssset.push(assetSelected)
                console.log('se agregó')
                setAssetList(arrayAssset)
                setPrueba(!prueba) //Para que actualice los tax asociados automaticamente!
            } else {
                console.log("repetido")
            }
        } else {
            console.log("primera vez")
            arrayAssset.push(assetSelected)
            setAssetList(arrayAssset)
        }
    }

    function removeAsset () {
        console.log('ingreso: ',assetSelected);
        if(assetList){
            position = assetList.indexOf(assetSelected);
            if(position !== -1){
                arrayAssset = assetList;
                arrayAssset = arrayAssset.filter(asset => asset !== arrayAssset[position])
                console.log('se eliminó')
                setAssetList(arrayAssset)
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
            transformAssets();
            //createAsset(assetType, name, basePrice, special, supportCharge, warrantyPercentage, assetListUpdated)
        } else {
            alert("Please check the data entered and complete all necessary fields");
        }    
    }

    const noValidate = () =>{
        // if (assetType.toLowerCase() ==='service'){
        //     return !(name.length && basePrice.length && special.length && supportCharge.length)   
        // } else if (assetType.toLowerCase() ==='product') {
        //     return !(name.length && basePrice.length && warrantyPercentage.length)    
        // } else {
        //     return true
        // }
    }

    const transformAssets = () => {
        if (assetList) {
            assetListUpdated = allAssets.filter(asset => {
                return assetList.includes(asset.id.toString())
            })
        }
    }

  return (
    <>
    <Container>
    <Form >
        <Form.Group className="mb-3">
            <Form.Label>Customer</Form.Label>
            <Form.Select onChange={(e) => {setIdCustomer(e.target.value)}}>    
                {allCustomers ? allCustomers.map((customer, index) => (
                    customer.customerType.toLowerCase() ==='person' ?
                    <option key={index} value={customer.id} >{customer.name} {customer.lastName} ({customer.customerType.toUpperCase()})</option>
                    : <option key={index} value={customer.id} >{customer.businessName} ({customer.customerType.toUpperCase()})</option>
                )) : null}           
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Included assets</Form.Label>
            <Row>
                <Col>
                    {assetList ? allAssets.map((asset,index) => (
                        assetList.includes(asset.id.toString()) ? <Form.Control disabled key={index} defaultValue={asset.name}/> : null
                    )) : null}
                </Col>
                <Col>
                    {assetList ? allAssets.map((asset,index) => (
                        assetList.includes(asset.id.toString()) ? <Form.Control disabled key={index} defaultValue={asset.basePrice}/> : null
                    )) : null}
                </Col>
            </Row>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>All Assets</Form.Label>
            <Form.Select onChange={(e) => {assetSelected = e.target.value}}>    
                {allAssets ? allAssets.map((asset, index) => (
                    <option key={index} value={asset.id} >{asset.name}</option>
                )) : null}           
            </Form.Select>
            <Row>
                <Col>
                    <Button onClick={addAsset}>Add  <PlusSquare></PlusSquare></Button>
                </Col>
                <Col>
                    <Button onClick={removeAsset}>Remove  <DashSquare></DashSquare></Button>
                </Col>
            </Row>
            </Form.Group>        
        <Button onClick={create}>Save</Button>
    </Form>
    </Container>
    </>
  );
}

export default OrderCreateForm;