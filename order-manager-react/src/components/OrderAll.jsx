import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap'
import { XSquare, Eye } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';
import annulmentAnOrder from '../utils/annulmentAnOrder';

function OrderAll({allOrders}) {

  let user = localStorage.getItem('userLogged') ? localStorage.getItem('userLogged') : '';

  let admin = (!user || !(JSON.parse(user).roles[0]==="ADMIN")) ? false : true;

  const cancelOrder = (id) => {
    
    if(window.confirm("Are you sure to annul the order? This operation is not reversible.")){
      annulmentAnOrder(id)
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
            <th>Total Discount</th>
            <th>Total Price</th>
            <th>View</th>
            {admin ? <th>Annul</th> : null }
        </tr>
      </thead>
      <tbody>
            {allOrders.map((order, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{order.id}</td>
                    <td>{order.company ? order.company.businessName : order.person.name+' '+order.person.lastName}</td>
                    <td>{order.dateCreated}</td>
                    <td>{order.status ? 'ACTIVE': 'CANCELLED'}</td>
                    <td>{order.totalDiscount>0 ? order.totalDiscount: '-'}</td>
                    <td>{order.totalPrice ? order.totalPrice : '0'}</td>
                    <td><Link to={`/orders/${order.id}`}><Button className="btn-light"><Eye></Eye></Button></Link></td>
                    {admin ? <td ><Button key={order.id} className="btn-danger" onClick={() => cancelOrder(order.id)}><XSquare></XSquare></Button></td> : null }
                </tr>
            ))}
      </tbody>
    </Table>
  );
}

export default OrderAll;