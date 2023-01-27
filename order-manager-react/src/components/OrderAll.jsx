import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap'
import { Pencil, Trash3, Eye } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';
//import deleteAsset from '../utils/deleteAsset'

function OrderAll({allOrders}) {

  let user = localStorage.getItem('userLogged') ? localStorage.getItem('userLogged') : '';

  let admin = (!user || !(JSON.parse(user).roles[0]==="ADMIN")) ? false : true;

  const destroy = (id) => {
    
    if(window.confirm("Are you sure to delete the asset? This operation is not reversible.")){
      //deleteAsset(id)
    } else {
      console.log("Operation cancelled")
    }
  }


  return (
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>  
            <th>Order number</th>
            <th>Customer</th>
            <th>Created Date</th>
            <th>Status</th>
            <th>Total Price</th>
            {admin ? <th>Edit</th> : <th>View</th> }
            {admin ? <th>Cancel</th> : null }
        </tr>
      </thead>
      <tbody>
            {allOrders.map((order, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{order.id}</td>
                    <td>{order.company ? order.company.businessName : order.person.name+' '+order.person.lastName}</td>
                    <td>{order.dateCreated}</td>
                    <td>{order.status ? 'ACTIVE': 'CANCELED'}</td>
                    <td>{order.totalPrice ? order.totalPrice : '0'}</td>
                    <td><Link to={`/orders/${order.id}`}><Button className="btn-light">{admin ? <Pencil></Pencil> : <Eye></Eye> }</Button></Link></td>
                    {admin ? <td ><Button key={order.id} className="btn-danger" onClick={() => destroy(order.id)}><Trash3></Trash3></Button></td> : null }
                </tr>
            ))}
      </tbody>
    </Table>
  );
}

export default OrderAll;