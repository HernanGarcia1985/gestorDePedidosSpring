import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
//import deleteAsset from '../utils/deleteAsset';
import { useParams } from 'react-router-dom';
import { PlusSquare, DashSquare } from "react-bootstrap-icons";

const OrderDetail = ({order, allAssets}) => {

    const [customer, setCustomer] = useState(order.company ? order.company.businessName : order.person.name+' '+order.person.lastName)
    const [dateCreated, setDateCreated] = useState(order.dateCreated)
    const [totalPrice, setTotalPrice] = useState(order.totalPrice)
    const [subTotalPrice, setSubTotalPrice] = useState(order.subTotalPrice)
    const [totalDiscount, setTotalDiscount] = useState(order.totalDiscount)
    const [status, setStatus] = useState(order.status ? 'ACTIVE': 'CANCELLED')
    const [orderDetailList, setOrderDetailList] = useState(order.orderDetailList && order.orderDetailList.length ? order.orderDetailList : null)
    const [prueba, setPrueba] = useState(true) //Para que actualice los assets asociados automaticamente!

    let user = sessionStorage.getItem('userLogged') ? sessionStorage.getItem('userLogged') : '';

    let admin = (!user || !(JSON.parse(user).roles[0]==="ADMIN")) ? false : true;

    console.log(orderDetailList)

    const {id} = useParams()

    let arrayAsset = [];
    let assetSelected = allAssets[0].id.toString(); //'1';
    let position;
    let assetListUpdated = [];

    function addAsset () {
        console.log('ingreso: ',assetSelected);
        if(orderDetailList){
            if(orderDetailList.indexOf(assetSelected) === -1){
                arrayAsset = orderDetailList;
                arrayAsset.push(assetSelected)
                console.log('se agregó')
                setOrderDetailList(arrayAsset)
                setPrueba(!prueba) //Para que actualice los assets asociados automaticamente!
            } else {
                console.log("repetido")
            }
        } else {
            console.log("primera vez")
            arrayAsset.push(assetSelected)
            setOrderDetailList(arrayAsset)
        }
    }

    function removeAsset () {
        console.log('ingreso: ',assetSelected);
        if(orderDetailList){
            position = orderDetailList.indexOf(assetSelected);
            if(position !== -1){
                arrayAsset = orderDetailList;
                arrayAsset = arrayAsset.filter(asset => asset !== arrayAsset[position])
                console.log('se eliminó')
                setOrderDetailList(arrayAsset)
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
            if(window.confirm("Are you sure to update the order? This operation is not reversible.")){
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
        if(window.confirm("Are you sure to delete the order? This operation is not reversible.")){
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
        if (orderDetailList) {
            assetListUpdated = allAssets.filter(asset => {
                return orderDetailList.includes(asset.id.toString())
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
            <Form.Label>Detail</Form.Label>
        </Form.Group>
        <Form.Group className="mb-3">
            {orderDetailList && orderDetailList.length ? null : <Form.Label>There are no assets associated to the order</Form.Label> }
            <Row>
                <Col className="col-md-1">
                {orderDetailList && orderDetailList.length ? <Form.Label>#</Form.Label> : null }
                {orderDetailList && orderDetailList.length ? orderDetailList.map((orderDetail,index) => (
                    <Form.Control disabled key={index} defaultValue={index+1}/> 
                )) : null}
                </Col>
                <Col>
                {orderDetailList && orderDetailList.length ? <Form.Label>Item</Form.Label> : null }
                {orderDetailList && orderDetailList.length? orderDetailList.map((orderDetail,index) => (
                    orderDetail.product === null ? <Form.Control disabled key={index} defaultValue={orderDetail.ownService.name}/>
                     : <Form.Control disabled key={index} defaultValue={orderDetail.product.name}/>
                )) : null}
                </Col>
                <Col className="col-md-1">
                {orderDetailList && orderDetailList.length ? <Form.Label>Quantity</Form.Label> : null }
                {orderDetailList && orderDetailList.length? orderDetailList.map((orderDetail,index) => (
                    orderDetail.product === null ? <Form.Control disabled key={index} defaultValue="-"/>
                     : <Form.Control disabled key={index} defaultValue={orderDetail.quantity}/>
                )) : null}
                </Col>
                <Col>
                {orderDetailList && orderDetailList.length ? <Form.Label>Years Of Warranty</Form.Label> : null }
                {orderDetailList && orderDetailList.length? orderDetailList.map((orderDetail,index) => (
                    orderDetail.product === null ? <Form.Control disabled key={index} defaultValue="-"/>
                     : <Form.Control disabled key={index} defaultValue={orderDetail.yearsWarranty}/>
                )) : null}
                </Col>
                <Col>
                {orderDetailList && orderDetailList.length ? <Form.Label>Unit Price</Form.Label> : null }
                {orderDetailList && orderDetailList.length? orderDetailList.map((orderDetail,index) => (
                    <Form.Control disabled key={index} defaultValue={orderDetail.unitItemPrice}/>
                )) : null}
                </Col>
                <Col>
                {orderDetailList && orderDetailList.length ? <Form.Label>Support Charge / Warranty Cost</Form.Label> : null }
                {orderDetailList && orderDetailList.length? orderDetailList.map((orderDetail,index) => (
                    orderDetail.product === null ? <Form.Control disabled key={index} defaultValue={orderDetail.supportCharge}/>
                     : <Form.Control disabled key={index} defaultValue={orderDetail.totalWarrantyPrice}/>
                )) : null}
                </Col>
                <Col>
                {orderDetailList && orderDetailList.length ? <Form.Label>Amount</Form.Label> : null }
                {orderDetailList && orderDetailList.length? orderDetailList.map((orderDetail,index) => (
                    <Form.Control disabled key={index} defaultValue={orderDetail.totalItemPrice}/>
                )) : null}
                </Col>
            </Row>        
        </Form.Group>
        <Form.Group className="mb-3">
            <Row>
                <Col className="col-md-1">
                </Col>
                <Col>
                </Col>
                <Col className="col-md-1">
                </Col>
                <Col>
                </Col>
                <Col>
                </Col>
                <Col>
                    {orderDetailList && orderDetailList.length ? <Form.Label>Subtotal</Form.Label> : null }
                </Col>
                <Col>
                    {orderDetailList && orderDetailList.length ? 
                        <Form.Control disabled defaultValue={subTotalPrice}/>
                     : null}
                </Col>
            </Row>
            <Row>
                <Col className="col-md-1">
                </Col>
                <Col>
                </Col>
                <Col className="col-md-1">
                </Col>
                <Col>
                </Col>
                <Col>
                </Col>
                <Col>
                    {orderDetailList && orderDetailList.length ? <Form.Label>Total Discount</Form.Label> : null }
                </Col>
                <Col>
                    {orderDetailList && orderDetailList.length ? 
                        <Form.Control disabled defaultValue={totalDiscount}/>
                     : null}
                </Col>
            </Row>
            <Row>
                <Col className="col-md-1">
                </Col>
                <Col>
                </Col>
                <Col className="col-md-1">
                </Col>
                <Col>
                </Col>
                <Col>
                </Col>
                <Col>
                    {orderDetailList && orderDetailList.length ? <Form.Label>Total</Form.Label> : null }
                </Col>
                <Col>
                    {orderDetailList && orderDetailList.length ? 
                        <Form.Control disabled defaultValue={totalPrice}/>
                     : null}
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