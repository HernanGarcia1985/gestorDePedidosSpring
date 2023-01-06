import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap'
import { Pencil, Trash3 } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';
import deleteCustomer from '../utils/deleteCustomer'

function CustomerAll({allCustomers}) {

  const destroy = (id) => {
    
    if(window.confirm("Are you sure to delete the client? This operation is not reversible.")){
      deleteCustomer(id)
    } else {
      console.log("Operation cancelled")
    }
  }

    console.log(allCustomers)
  return (
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>  
            <th>Customer Type</th>
            <th>BusinessName</th>
            <th>CUIT</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>DNI</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
      </thead>
      <tbody>
            {allCustomers.map((customer, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{customer.customerType.toUpperCase()}</td>
                    <td>{customer.businessName}</td>
                    <td>{customer.cuit}</td>
                    <td>{customer.name}</td>
                    <td>{customer.lastName}</td>
                    <td>{customer.dni}</td>
                    <td><Link to={`/customers/${customer.id}`}><Button className="btn-light"><Pencil></Pencil></Button></Link></td>
                    <td ><Button key={customer.id} className="btn-danger" onClick={() => destroy(customer.id)}><Trash3></Trash3></Button></td>
                </tr>
            ))}
      </tbody>
    </Table>
  );
}

export default CustomerAll;