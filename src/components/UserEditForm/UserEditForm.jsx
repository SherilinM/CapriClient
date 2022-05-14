import { useContext, useState } from "react"
import { AuthContext } from "../../context/auth.context"
import { Form, Button } from "react-bootstrap"
import userService from "../../services/user.service"
import './UserEditForm.css'


const UserEditForm = ({ firstName, lastName, email, password, telephone, closeModal, refreshDetails }) => {

    const { user } = useContext(AuthContext)

    const [infoForm, setInfoForm] = useState({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        telephone: telephone

    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setInfoForm({
            ...infoForm,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()

        userService
            .editUser(infoForm)
            .then(() => {
                closeModal()
                refreshDetails()
            })
            .catch(err => console.log(err))
    }

    return (
        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="firstName" value={infoForm.firstName} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastName" value={infoForm.lastName} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="email" value={infoForm.email} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" name="password" value={infoForm.password} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Telephone</Form.Label>
                <Form.Control type="text" name="telephone" value={infoForm.telephone} onChange={handleInputChange} />
            </Form.Group>


            <div className="modalBtnDiv">
                <Button variant="dark" type="submit" className="myBtn">Save</Button>
            </div>

        </Form>
    )
}

export default UserEditForm