import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap'
import { Pencil, Trash3 } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';
import deleteAsset from '../utils/deleteAsset'

function AssetAll({allAssets}) {

  const destroy = (id) => {
    
    if(window.confirm("Are you sure to delete the asset? This operation is not reversible.")){
      deleteAsset(id)
    } else {
      console.log("Operation cancelled")
    }
  }

    console.log(allAssets)
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
            <th>Warranty Percentage</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
      </thead>
      <tbody>
            {allAssets.map((asset, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{asset.assetType.toUpperCase()}</td>
                    <td>{asset.name}</td>
                    <td>{asset.basePrice}</td>
                    <td>{asset.special}</td>
                    <td>{asset.supportCharge}</td>
                    <td>{asset.warrantyPercentage}</td>
                    <td><Link to={`/assets/${asset.id}`}><Button className="btn-light"><Pencil></Pencil></Button></Link></td>
                    <td ><Button key={asset.id} className="btn-danger" onClick={() => destroy(asset.id)}><Trash3></Trash3></Button></td>
                </tr>
            ))}
      </tbody>
    </Table>
  );
}

export default AssetAll;