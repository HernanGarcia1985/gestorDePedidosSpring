import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap'
import { Pencil, Trash3, PlusSquare, ArrowLeftSquare} from "react-bootstrap-icons";
import { Link } from 'react-router-dom';
import deleteCustomer from '../utils/deleteCustomer'

function CustomerAll({allCustomers}) {

  let user = localStorage.getItem('userLogged') ? localStorage.getItem('userLogged') : '';

  let admin = (!user || !(JSON.parse(user).roles[0]==="ADMIN")) ? false : true;
  
  const destroy = (id) => {
    
    if(window.confirm("Are you sure to delete the client? This operation is not reversible.")){
      deleteCustomer(id)
    } else {
      console.log("Operation cancelled")
    }
  }

  const border = {
    borderStyle: "none",
    //color: "indigo",
    paddingBottom: "1.5rem"
  }

    console.log(allCustomers)
  return (
    <Table responsive>
      <thead>
        <tr>
          <th style={border}>Back</th>
          <th style={border}><Link to={'/home'}><Button className="btn-light"><ArrowLeftSquare></ArrowLeftSquare></Button></Link></th>
          <th style={border}></th>
          <th style={border}></th>
          <th style={border}></th>
          {admin ? <th style={border}></th> : null }
          <th style={border}></th>
          <th style={border}>Create</th>
          <th style={border}><Link to={'/customers/create'}><Button className="btn-light"><PlusSquare></PlusSquare></Button></Link></th>
        </tr>
        <tr>
          <th>#</th>  
            <th>Customer Type</th>
            <th>BusinessName</th>
            <th>CUIT</th>
            <th>Name</th>
            <th>Last Name</th>
            <th>DNI</th>
            {admin ? <th>Edit</th> : <th>View</th> }
            {admin ? <th>Delete</th> : null }
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
                    {admin ? <td ><Button key={customer.id} className="btn-danger" onClick={() => destroy(customer.id)}><Trash3></Trash3></Button></td> : null }
                </tr>
            ))}
      </tbody>
    </Table>
  );
}

export default CustomerAll;