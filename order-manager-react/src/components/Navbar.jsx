import "../index.css"

const Navbar = () => {
    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand logo" href="https://finneg.com/ar/">Finnegans</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarColor03">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Orders</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Create new Order</a>
                            <a class="dropdown-item" href="#">Update an Order</a>
                            <a class="dropdown-item" href="#">View an Order</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Delete an Order</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Customers</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Create new Customer</a>
                            <a class="dropdown-item" href="#">Update a Customer</a>
                            <a class="dropdown-item" href="#">View a Customer</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Delete a Customer</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Assets</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Create new Asset</a>
                            <a class="dropdown-item" href="#">Update an Asset</a>
                            <a class="dropdown-item" href="#">View an Asset</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Delete an Asset</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Reports</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Historical Orders</a>
                            <a class="dropdown-item" href="#">Biggest Discount</a>
                            <a class="dropdown-item" href="#">Total Discount</a>
                        </div>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">SignIn</a>
                    </li>
                </ul>
                <form class="d-flex">
                    <input class="form-control me-sm-2" type="search" placeholder="Search"></input>
                    <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar