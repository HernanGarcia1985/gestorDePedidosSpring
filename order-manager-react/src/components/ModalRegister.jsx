import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'

const ModalRegister = (props) => {


    return (
        <div>
            <Modal {...props} >
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body
                    className="text-success fs-5 bg-dark">
                    {props.message}
                </Modal.Body>
                <Modal.Footer>
                    <Link to='/auth/signin'>
                        <Button variant="secondary" onClick={props.onHide}>Close</Button>
                    </Link>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default ModalRegister