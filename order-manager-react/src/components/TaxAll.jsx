import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap'
import { Pencil, Trash3, Eye, PlusSquare, ArrowLeftSquare } from "react-bootstrap-icons";
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

  const alignTax = {
    // textAlign: "left",
  }

  const border = {
    borderStyle: "none",
    //color: "indigo",
    paddingBottom: "1.5rem"
  }

  return (
    <Table responsive>
      <thead> 
        <tr>
          <th style={border}>Back</th>
          <th style={border}><Link to={'/home'}><Button className="btn-light"><ArrowLeftSquare></ArrowLeftSquare></Button></Link></th>
          <th style={border}></th>
          <th style={border}></th>
          {admin ? <th style={border}>Create</th> : null }
          {admin ? <th style={border}><Link to={'/taxes/create'}><Button className="btn-light"><PlusSquare></PlusSquare></Button></Link></th> : null }
        </tr>
        <tr>
          <th>#</th>
            <th></th>  
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
                    <td></td>
                    <td style={alignTax}>{tax.name}</td>
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