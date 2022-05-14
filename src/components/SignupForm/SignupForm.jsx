import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import authService from "../../services/auth.service"
import { useNavigate } from 'react-router-dom'

const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        firstName: '',
        lastName: '',
        profileImg: '',
        telephone: '',
        username: '',
        password: '',
        email: ''
    })

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()

        authService
            .signup(signupData)
            .then(res => {
                navigate('/commerces')
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setSignupData({ ...signupData, [name]: value })
    }

    const { firstName, lastName, telephone, profileImg, username, password, email } = signupData

    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" onChange={handleInputChange} name="firstName" value={firstName} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="lasName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" onChange={handleInputChange} name="lastName" value={lastName} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="telephone">
                <Form.Label>Telephone</Form.Label>
                <Form.Control type="number" onChange={handleInputChange} name="telephone" value={telephone} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="profileImg">
                <Form.Label>Profile Image</Form.Label>
                <Form.Control type="text" onChange={handleInputChange} name="profileImg" value={profileImg} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" onChange={handleInputChange} name="username" value={username} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={handleInputChange} name="email" value={email} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={handleInputChange} name="password" value={password} />
            </Form.Group>

            <Button variant="dark" type="submit">Signup</Button>
        </Form>
    )
}

export default SignupForm