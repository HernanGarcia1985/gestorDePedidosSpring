import Table from 'react-bootstrap/Table';

function CustomerAll({allCustomers}) {

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
        </tr>
      </thead>
      <tbody>
            {allCustomers.map((customer, index) => (
                <tr>
                    <td>{index}</td>
                    <td>{customer.customerType.toUpperCase()}</td>
                    <td>{customer.businessName}</td>
                    <td>{customer.cuit}</td>
                    <td>{customer.name}</td>
                    <td>{customer.lastName}</td>
                    <td>{customer.dni}</td>
                </tr>
            ))}
      </tbody>
    </Table>
  );
}

export default CustomerAll;