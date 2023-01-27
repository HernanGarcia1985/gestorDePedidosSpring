import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap'
import { Pencil, Trash3, Eye } from "react-bootstrap-icons";
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


  return (
    <Table responsive>
      <thead>
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
                    <td>{asset.basePrice}</td>
                    <td>{asset.special===true ? 'YES': ''}</td>
                    <td>{asset.special===true ? asset.supportCharge : ''}</td>
                    <td>{asset.assetType.toLowerCase() ==='product' ? asset.warrantyPercentage*100 : '' }</td>
                    <td><Link to={`/assets/${asset.id}`}><Button className="btn-light">{admin ? <Pencil></Pencil> : <Eye></Eye> }</Button></Link></td>
                    {admin ? <td ><Button key={asset.id} className="btn-danger" onClick={() => destroy(asset.id)}><Trash3></Trash3></Button></td> : null }
                </tr>
            ))}
      </tbody>
    </Table>
  );
}

export default AssetAll;