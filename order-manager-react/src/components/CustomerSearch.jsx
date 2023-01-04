import { Form, Container, Button } from "react-bootstrap"
import {useState} from 'react'
import { Link } from "react-router-dom"

const CustomerSearch = () => {

    const [customerType, setCustomerType] = useState('')
    const [inputSearch, setInputSearch] = useState('')
    const [route, setRoute] = useState('/customers/')

    const noValidate = () =>{
        if (!customerType){
            alert ("Select Customer Type")
        } else if (inputSearch.length>0 && customerType) {
            return false
        } else {
            return true
        }
    }

    const search = (e) => {
        e.preventDefault()
        console.log('entro')
        if (!noValidate()){
            inputSearch.toString()
            console.log(inputSearch)
            setRoute(route+inputSearch)
            console.log(route)
        } else {
            alert("Please check the data entered and complete all necessary fields");
        }
    }

    return(
        <Container>
            <Form>
                <Form.Group className="mb-3">
                <Form.Label>Serch Customer By</Form.Label>
                    <Form.Select>
                        <option>Id</option>
                        <option>Bussiness Name</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control onChange={(e) => { setInputSearch(e.target.value)}}/>
                </Form.Group>
                <Form.Label>Select Customer Type</Form.Label>
                <Form.Group className="mb-3 " >
                    <Form.Check inline type="radio" name="PersonOrCompany" label="Person"  value = "Person" onChange={(e) => { setCustomerType(e.target.value)}}/>
                    <Form.Check inline type="radio" name="PersonOrCompany" label="Company" value = "Company" onChange={(e) => { setCustomerType(e.target.value)}}/>
                </Form.Group>
                <Form.Group className="mb-3 " >    
                    <Button type='submit' onClick={search}>Validate</Button>
                    <Link to={route}><Button>Search</Button></Link>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default CustomerSearch