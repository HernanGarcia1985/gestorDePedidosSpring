import { Container, Row, Col, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import annulOrder from '../utils/annulOrder';
import { useParams } from 'react-router-dom';
import { XSquare, CheckSquare, ArrowLeftSquare } from "react-bootstrap-icons";
import createOrder from '../utils/createOrder';
import { Link } from 'react-router-dom';

const OrderDetailTable = ({order}) => {

    const customer = order.company ? order.company.businessName : order.person.name+' '+order.person.lastName;
    const [status, setStatus] = useState(order.status ? 'ACTIVE': 'CANCELLED');
    const orderDetailList = order.orderDetailList && order.orderDetailList.length ? order.orderDetailList : null;

    let user = localStorage.getItem('userLogged') ? localStorage.getItem('userLogged') : '';

    let admin = (!user || !(JSON.parse(user).roles[0]==="ADMIN")) ? false : true;

    const {id} = useParams()

    const annulment = (e) => {
        e.preventDefault()
        if(window.confirm("Are you sure to annul the order? This operation is not reversible.")){
            annulOrder(id)
            setStatus(false)
        } else {
            console.log("Operation cancelled")
        }
    }

    const save = () => {
        const idCustomer = order.company ? order.company.id : order.person.id; 
        console.log(idCustomer, orderDetailList)
        createOrder(idCustomer, orderDetailList);
    }

    const activate = () => {
        setStatus(true)
    }

    const borderFont = {
        fontWeight: "normal",
        borderStyle: "none",
        backgroundColor: "rgba(248,249,250,1)"//"lightgrey" #f8f9fa
    }

    const border = {
        borderStyle: "none"
    }

    const bold = {
        fontWeight: "bold"
    }

    const tableDetail = {
        backgroundColor: "rgba(248,249,250,1)",
        borderColor: "black"
    }


  return (
    <>
    <Container>
    <Form >
        <Table responsive>
            <thead>
                <tr>
                    {order ? <th style={border}>Order number: </th> : null } 
                    {order ? <th style={borderFont}>{id ? id : 'CREATING'}</th> : null }
                    {order ? <th style={border}>Created Date: </th> : null }
                    {order ? <th style={borderFont}>{order.dateCreated}</th> : null }
                    {order ? <th style={border}>Status: </th> : null }
                    {order ? <th style={borderFont}>{id ? status: 'CREATING'}</th> : null }
                </tr>
                <br>
                </br>
                <tr>
                    {order ? <th style={border}>Customer: </th> : null }
                    {order ? <th style={borderFont}>{customer}</th> : null }
                </tr>
            </thead>
            <tbody>
                <br>
                </br>  
            </tbody>
        </Table>
        <Form.Group className="mb-3">
            {orderDetailList && orderDetailList.length ? null : <Form.Label style={{fontWeight: "bold"}}>There are no assets associated to the order</Form.Label> }
            <Table responsive style={tableDetail}>
                <thead>
                    <tr>
                    {orderDetailList && orderDetailList.length ? <th>#</th> : null } 
                    {orderDetailList && orderDetailList.length ? <th>Item</th> : null }
                    {orderDetailList && orderDetailList.length ? <th>Qty</th> : null }
                    {orderDetailList && orderDetailList.length ? <th>Years Of Wnty</th> : null }
                    {orderDetailList && orderDetailList.length ? <th>Unit Price</th> : null }
                    {orderDetailList && orderDetailList.length ? <th>Spt Chge / Wnty Cost</th> : null }
                    {orderDetailList && orderDetailList.length ? <th>Amount</th> : null }
                    </tr>
                </thead>
                <tbody>
                    {orderDetailList && orderDetailList.length ? orderDetailList.map((orderDetail, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            {orderDetail.product === null ? <td>{orderDetail.ownService.name}</td> : <td>{orderDetail.product.name}</td>}
                            {orderDetail.product === null ? <td>-</td> : <td>{orderDetail.quantity}</td>}
                            {orderDetail.product === null ? <td>-</td> : <td>{orderDetail.yearsWarranty}</td>}
                            <td>{orderDetail.unitItemPrice.toFixed(2)}</td>
                            {orderDetail.product === null ? 
                                orderDetail.supportCharge>0 ? <td>{orderDetail.supportCharge.toFixed(2)}</td> : <td>-</td>
                                 : orderDetail.totalWarrantyPrice>0 ? <td>{orderDetail.totalWarrantyPrice.toFixed(2)}</td> : <td>-</td>}
                            <td>{orderDetail.totalItemPrice.toFixed(2)}</td>
                        </tr>
                    )) : null }
                        {orderDetailList && orderDetailList.length ? <tr>
                            <td style={border}></td>
                            <td style={border}></td>
                            <td style={border}></td>
                            <td style={border}></td>
                            <td style={border}></td>
                            <td style={bold} >Subtotal</td>
                            <td>{order.subTotalPrice.toFixed(2)}</td>
                        </tr> : null }
                        {orderDetailList && orderDetailList.length ? <tr>
                            <td style={border}></td>
                            <td style={border}></td>
                            <td style={border}></td>
                            <td style={border}></td>
                            <td style={border}></td>
                            <td style={bold} >Total Discount</td>
                            <td>{order.totalDiscount.toFixed(2)}</td>
                        </tr> : null }
                        {orderDetailList && orderDetailList.length ? <tr>
                            <td style={border}></td>
                            <td style={border}></td>
                            <td style={border}></td>
                            <td style={border}></td>
                            <td style={border}></td>
                            <td style={bold} >Total</td>
                            <td>{order.totalPrice.toFixed(2)}</td>
                        </tr> : null }
                </tbody>
            </Table>
        </Form.Group>    
        <Form.Group className="mb-3">
        <Row>
            <Col>    
            </Col>
            <Col>            
            </Col>
            <Col>
                
            </Col>
            <Col>
                {order.id ? 
                <Link to={'/orders'}><Button className="btn-light">Back <ArrowLeftSquare></ArrowLeftSquare></Button></Link>
                 : <Link to={'/orders/create'}><Button className="btn-light">Back <ArrowLeftSquare></ArrowLeftSquare></Button></Link> }
            </Col>
            <Col>
                {order.id ? null : <Button onClick={save}>Save</Button> }    
            </Col>
        </Row>
        </Form.Group>
        <Form.Group className="mb-3">   
        <Row>
            <Col>            
                { admin && order.id ? order.status ? 
                <Form.Label style={bold}>Annul the order?</Form.Label>
                 : <Form.Label style={bold}>Activate the order again?</Form.Label> : null }
            </Col>
            <Col>
                {admin && order.id ? order.status ? 
                <Button className="btn-danger" onClick={annulment}>Annul  <XSquare></XSquare></Button>
                 : <Button className="btn-warning" onClick={activate}>Activate  <CheckSquare></CheckSquare></Button> : null }
            </Col>
            <Col>    
            </Col>
            <Col>    
            </Col>
            <Col>    
            </Col>
            <Col>    
            </Col>
        </Row>
        </Form.Group>
    </Form>
    </Container>
    </>
  );
}

export default OrderDetailTable;