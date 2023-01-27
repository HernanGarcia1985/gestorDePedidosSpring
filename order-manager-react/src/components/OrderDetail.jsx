import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
//import updateAsset from '../utils/updateAsset';
//import deleteAsset from '../utils/deleteAsset';
import { useParams } from 'react-router-dom';
import { PlusSquare, DashSquare } from "react-bootstrap-icons";

const OrderDetail = ({order, allAssets}) => {

    const [customer, setCustomer] = useState(order.company ? order.company.businessName : order.person.name+' '+order.person.lastName)
    const [dateCreated, setDateCreated] = useState(order.dateCreated)
    const [status, setStatus] = useState(order.status ? 'ACTIVE': 'CANCELED')
    const [assetList, setAssetList] = useState(order.orderDetailList ? order.orderDetailList.map(orderDetail => orderDetail.product? orderDetail.product.id.toString(): orderDetail.ownService.id.toString()) : null)
    const [prueba, setPrueba] = useState(true) //Para que actualice los tax asociados automaticamente!

    let user = localStorage.getItem('userLogged') ? localStorage.getItem('userLogged') : '';

    let admin = (!user || !(JSON.parse(user).roles[0]==="ADMIN")) ? false : true;

    console.log(assetList)

    const {id} = useParams()

    let arrayAsset = [];
    let assetSelected = '1'; //AllAssets[0].id.toString();
    let position;
    let assetListUpdated = [];

    function addAsset () {
        console.log('ingreso: ',assetSelected);
        if(assetList){
            if(assetList.indexOf(assetSelected) === -1){
                arrayAsset = assetList;
                arrayAsset.push(assetSelected)
                console.log('se agregó')
                setAssetList(arrayAsset)
                setPrueba(!prueba) //Para que actualice los tax asociados automaticamente!
            } else {
                console.log("repetido")
            }
        } else {
            console.log("primera vez")
            arrayAsset.push(assetSelected)
            setAssetList(arrayAsset)
        }
    }

    function removeAsset () {
        console.log('ingreso: ',assetSelected);
        if(assetList){
            position = assetList.indexOf(assetSelected);
            if(position !== -1){
                arrayAsset = assetList;
                arrayAsset = arrayAsset.filter(asset => asset !== arrayAsset[position])
                console.log('se eliminó')
                setAssetList(arrayAsset)
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
            transformAssets();
            if(window.confirm("Are you sure to update the asset? This operation is not reversible.")){
                //updateAsset(id, assetType, name, basePrice, special, supportCharge, warrantyPercentage, assetTaxesUpdated)
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
            //deleteAsset(id)
        } else {
            console.log("Operation cancelled")
        }
    }

    const noValidate = () =>{
        // if (assetType.toLowerCase() ==='service'){
        //     console.log(name.length, basePrice, special, supportCharge)
        //     let boolean = special === true || special === false ? true : false;
        //     return !(name.length && basePrice>0 && boolean && supportCharge>=0)   
        // } else if (assetType.toLowerCase() ==='product') {
        //     return !(name.length && basePrice && warrantyPercentage)    
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
    }//Cambiar!!!!!


  return (
    <>
    <Container>
    <Form >
        <Row>
            <Col className="md-auto">
                <Form.Group className="mb-3">
                    <Form.Label>Order number</Form.Label>
                <Form.Control type="number" defaultValue={id} disabled />
                </Form.Group> 
            </Col>
            <Col className="md-auto">
                <Form.Group className="mb-3">
                    <Form.Label>Created Date</Form.Label>
                    <Form.Control type="date" defaultValue={dateCreated} onChange={(e) => { setDateCreated(e.target.value)}}/>
                </Form.Group>
            </Col>
            <Col className="md-auto">
                <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Control defaultValue={status} disabled onChange={(e) => { setStatus(e.target.value)}}/>
                </Form.Group>
            </Col>
        </Row>
        <Form.Group className="mb-3 " >
            <Form.Label>Customer</Form.Label>
            <Form.Control type='text' defaultValue={customer} disabled onLoad={(e) => { setCustomer(e.target.value)}}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Included assets</Form.Label>
                {assetList ? allAssets.map((asset,index) => (
                    assetList.includes(asset.id.toString()) ? <Form.Control disabled key={index} defaultValue={asset.name}/> : null
                )) : null}
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
                    {admin ? <Button onClick={addAsset}>Add  <PlusSquare></PlusSquare></Button> : null }
                </Col>
                <Col>
                    {admin ? <Button onClick={removeAsset}>Remove  <DashSquare></DashSquare></Button> : null }
                </Col>
            </Row>
        </Form.Group>
        <Form.Group className="mb-3">
        <Row>
            <Col>            
                {admin ? <Button onClick={update}>Save</Button> : null }
            </Col>
            <Col>
                {admin ? <Button onClick={destroy}>Annul</Button> : null }
            </Col>
        </Row>
        </Form.Group>
    </Form>
    </Container>
    </>
  );
}

export default OrderDetail;