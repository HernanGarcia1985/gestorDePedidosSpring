import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap'
import { Pencil, Trash3, Eye, PlusSquare, ArrowLeftSquare } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';
import deleteAsset from '../utils/deleteAsset'

function AssetAll({allAssets}) {

  let user = localStorage.getItem('userLogged') ? localStorage.getItem('userLogged') : '';

  let admin = (!user || !(JSON.parse(user).roles[0]==="ADMIN")) ? false : true;

  const destroy = (id) => {
    
    if(window.confirm("Are you sure to delete the asset? This operation is not reversible.")){
      deleteAsset(id)
    } else {
      console.log("Operation cancelled")
    }
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
          <th style={border}></th>
          <th style={border}></th>
          <th style={border}></th>
          {admin ? <th style={border}>Create</th> : null }
          {admin ? <th style={border}><Link to={'/assets/create'}><Button className="btn-light"><PlusSquare></PlusSquare></Button></Link></th>: null }
        </tr>
        <tr>
          <th>#</th>  
            <th>Asset Type</th>
            <th>Name</th>
            <th>Base Price</th>
            <th>Special</th>
            <th>Support Charge</th>
            <th>Warranty %</th>
            {admin ? <th>Edit</th> : <th>View</th> }
            {admin ? <th>Delete</th> : null }
        </tr>
      </thead>
      <tbody>
            {allAssets.map((asset, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{asset.assetType.toUpperCase()}</td>
                    <td>{asset.name}</td>
                    <td>{asset.basePrice.toFixed(2)}</td>
                    <td>{asset.assetType.toLowerCase() ==='product' ? '-' : asset.special===true ? 'YES': 'NO'}</td>
                    <td>{asset.special===true ? asset.supportCharge.toFixed(2) : '-'}</td>
                    <td>{asset.assetType.toLowerCase() ==='product' ? (100*asset.warrantyPercentage.toFixed(4)).toFixed(2) : '-' }</td>
                    <td><Link to={`/assets/${asset.id}`}><Button className="btn-light">{admin ? <Pencil></Pencil> : <Eye></Eye> }</Button></Link></td>
                    {admin ? <td ><Button key={asset.id} className="btn-danger" onClick={() => destroy(asset.id)}><Trash3></Trash3></Button></td> : null }
                </tr>
            ))}
      </tbody>
    </Table>
  );
}

export default AssetAll;