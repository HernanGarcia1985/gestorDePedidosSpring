import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { PlusSquare, DashSquare } from "react-bootstrap-icons";
import { useNavigate } from 'react-router-dom';

const OrderCreateForm = ({allCustomers, allAssets}) => {

    const [idCustomer, setIdCustomer] = useState(allCustomers[0].id.toString())
    const [quantity, setQuantity] = useState()
    const [yearsWarranty, setYearsWarranty] = useState()
    const [assetList, setAssetList] = useState()
    const [prueba, setPrueba] = useState(true) //Para que actualice los tax asociados automaticamente!
    
    let arrayAssset = [];
    let assetSelected = allAssets[0].id.toString();
    let position;
    let assetListUpdated = [];

    const navigate = useNavigate();

    function addAsset () {
        console.log('ingreso: ',assetSelected);
        if(assetList){
            if(assetList.indexOf(assetSelected) === -1){
                arrayAssset = assetList;
                arrayAssset.push(assetSelected)
                console.log('se agregó')
                setAssetList(arrayAssset)
                setPrueba(!prueba) //Para que actualice los tax asociados automaticamente!
            } else {
                console.log("repetido")
            }
        } else {
            console.log("primera vez")
            arrayAssset.push(assetSelected)
            setAssetList(arrayAssset)
        }
    }

    function removeAsset () {
        console.log('ingreso: ',assetSelected);
        if(assetList){
            position = assetList.indexOf(assetSelected);
            if(position !== -1){
                arrayAssset = assetList;
                arrayAssset = arrayAssset.filter(asset => asset !== arrayAssset[position])
                console.log('se eliminó')
                setAssetList(arrayAssset)
            } else {
                console.log("no estaba en la lista")
            }
        } else {
            console.log("no hay elementos a eliminar")
        }
    }

     const validateOrder = (e) => {
        e.preventDefault()
        if (!noValidate()){
            transformAssets();
            navigate('/orders/validate', {
                state: {
                    idCustomer,
                    assetListUpdated,
                    quantity,
                    yearsWarranty
                }
            });
        } else {
            alert("At least one asset is required to create an order. Please check the data entered and complete all necessary fields");
        }    
    }

    const noValidate = () =>{
        if (assetList && assetList.length){
            return !(quantity && quantity.length)       
        } else {
            return true
        }
    }

    const transformAssets = () => {
        if (assetList) {
            assetListUpdated = allAssets.filter(asset => {
                return assetList.includes(asset.id.toString())
            })
        }
    }

    const storeQuantities = (idAsset, qty) => {
        let quantityList;
        if(parseInt(qty)>0){
            let obj = {
                idAsset: idAsset,
                qty: parseInt(qty)
            }
            if (quantity){
                quantityList = quantity;
                let found = quantity.filter(x => {
                    return x.idAsset === obj.idAsset
                })
                if (found.length){
                    let idx =quantity.indexOf(found[0]);
                    quantityList[idx] = obj;
                } else {
                    quantityList.push(obj);
                }
                setQuantity(quantityList)
                console.log("finalmente qty: ", quantity)
            } else {
                setQuantity([obj])
            }
        } else {
            alert("Quantity must be greater than zero")
        }
    }

    const storeYearsWarranty = (idAsset, years) => {
        let yearsWarrList;
        if(parseInt(years)>=0) {
            let obj = {
                idAsset: idAsset,
                years: parseInt(years)
            }
            if (yearsWarranty){
                yearsWarrList = yearsWarranty;
                let found = yearsWarranty.filter(x => {
                    return x.idAsset === obj.idAsset
                })
                if (found.length){
                    let idx =yearsWarranty.indexOf(found[0]);
                    yearsWarrList[idx] = obj;
                } else {
                    yearsWarrList.push(obj);
                }
                setYearsWarranty(yearsWarrList)
                console.log("finalmente years: ", yearsWarranty)
            } else {
                setYearsWarranty([obj])
            }
        } else {
            alert("Years of Warranty must be greater than or equal to zero")
        }    
    }

  return (
    <>
    <Container>
    <Form >
        <Form.Group className="mb-3">
            <Form.Label>Customer</Form.Label>
            <Form.Select onChange={(e) => {setIdCustomer(e.target.value)}}>    
                {allCustomers ? allCustomers.map((customer, index) => (
                    customer.customerType.toLowerCase() ==='person' ?
                    <option key={index} value={customer.id} >{customer.name} {customer.lastName} ({customer.customerType.toUpperCase()})</option>
                    : <option key={index} value={customer.id} >{customer.businessName} ({customer.customerType.toUpperCase()})</option>
                )) : null}           
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Included Assets</Form.Label>
        </Form.Group>
        <Form.Group className="mb-3">
            {assetList && assetList.length ? null : <Form.Label>There are no assets associated to the order yet</Form.Label> }
            <Row>
                <Col>
                    {assetList && assetList.length ? <Form.Label>Item</Form.Label> : null }
                    {assetList && assetList.length ? allAssets.map((asset,index) => (
                        assetList.includes(asset.id.toString()) ? <Form.Control disabled key={index} defaultValue={asset.name}/> : null
                    )) : null}
                </Col>
                <Col>
                    {assetList && assetList.length ? <Form.Label>Base Price</Form.Label> : null }
                    {assetList && assetList.length ? allAssets.map((asset,index) => (
                        assetList.includes(asset.id.toString()) ? <Form.Control disabled key={index} defaultValue={asset.basePrice}/> : null
                    )) : null}
                </Col>
                <Col>
                    {assetList && assetList.length ? <Form.Label>Support Charge</Form.Label> : null }
                    {assetList && assetList.length ? allAssets.map((asset,index) => (
                        assetList.includes(asset.id.toString()) ? asset.special===true ? <Form.Control key={index} disabled defaultValue={asset.supportCharge}/> : <Form.Control key={index} disabled defaultValue="N/A"/>
                         : null
                    )) : null}
                </Col>
                <Col>
                    {assetList && assetList.length ? <Form.Label>Quantity</Form.Label> : null }
                    {assetList && assetList.length ? allAssets.map((asset,index) => (
                        assetList.includes(asset.id.toString()) ? asset.assetType.toLowerCase() === 'product' ? <Form.Control type="number" min="1" key={index} onChange={(e) => {storeQuantities(asset.id, e.target.value)}}/> : <Form.Control key={index} disabled defaultValue="N/A"/>
                        : null
                    )) : null}
                </Col>
                <Col>
                    {assetList && assetList.length ? <Form.Label>Warranty (Years)</Form.Label> : null }
                    {assetList && assetList.length ? allAssets.map((asset,index) => (
                        assetList.includes(asset.id.toString()) ? asset.assetType.toLowerCase() === 'product' ? <Form.Control type="number" min="0" defaultValue="0" key={index} onChange={(e) => { storeYearsWarranty(asset.id, e.target.value)}}/> : <Form.Control key={index} disabled defaultValue="N/A"/>
                         : null
                    )) : null}
                </Col>
            </Row>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>All Assets</Form.Label>
            <Form.Select onChange={(e) => {assetSelected = e.target.value}}>    
                {allAssets ? allAssets.map((asset, index) => (
                    <option key={index} value={asset.id} >{asset.name}</option>
                )) : null}           
            </Form.Select>
            <Row>
                <Col>
                    <Button onClick={addAsset}>Add  <PlusSquare></PlusSquare></Button>
                </Col>
                <Col>
                    <Button onClick={removeAsset}>Remove  <DashSquare></DashSquare></Button>
                </Col>
            </Row>
            </Form.Group>        
        <Button onClick={validateOrder}>Validate</Button>
    </Form>
    </Container>
    </>
  );
}

export default OrderCreateForm;