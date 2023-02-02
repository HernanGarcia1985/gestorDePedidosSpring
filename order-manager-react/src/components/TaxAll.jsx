import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap'
import { Pencil, Trash3, Eye } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';
import deleteTax from '../utils/deleteTax';

function TaxAll({allTaxes}) {

  let user = localStorage.getItem('userLogged') ? localStorage.getItem('userLogged') : '';

  let admin = (!user || !(JSON.parse(user).roles[0]==="ADMIN")) ? false : true;

  const destroy = (id) => {
    
    if(window.confirm("Are you sure to delete the tax? This operation is not reversible.")){
      deleteTax(id)
    } else {
      console.log("Operation cancelled")
    }
  }


  return (
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>  
            <th>Name</th>
            <th>Percentage</th>
            {admin ? <th>Edit</th> : <th>View</th> }
            {admin ? <th>Delete</th> : null }
        </tr>
      </thead>
      <tbody>
            {allTaxes.map((tax, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{tax.name}</td>
                    <td>{tax.percentage>0? (100*tax.percentage.toFixed(4)).toFixed(2): ''}</td>
                    <td><Link to={`/taxes/${tax.id}`}><Button className="btn-light">{admin ? <Pencil></Pencil> : <Eye></Eye> }</Button></Link></td>
                    {admin ? <td ><Button key={tax.id} className="btn-danger" onClick={() => destroy(tax.id)}><Trash3></Trash3></Button></td> : null }
                </tr>
            ))}
      </tbody>
    </Table>
  );
}

export default TaxAll;