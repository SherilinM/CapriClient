import './Signup.css'
import { useState } from "react"
import { Form, Button, Container, Col, Row, FormSelect } from "react-bootstrap"
import authService from "../../services/auth.service"
import { useNavigate } from 'react-router-dom'

const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        firstName: '',
        lastName: '',
        profileImg: '',
        telephone: '',
        username: '',
        role: '',
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

    const { firstName, lastName, telephone, profileImg, username, role, password, email } = signupData

    return (


        <div className="hera">
            <div className='bg-imge'>
                {/* <div className='bg-overly' /> */}

            </div >
            <Col lg={8} className="mx-auto m-0 p-5 ">
                <Row>
                    <Form className='form-bg' onSubmit={handleSubmit}>
                        <Col lg={12} className="input-form z-index n1">
                            <Row>
                                <Col lg={6}>
                                    <Form.Group className="mb-3" controlId="firstName">
                                        <Form.Control type="text" onChange={handleInputChange} placeholder="First Name" name="firstName" value={firstName} />
                                    </Form.Group>
                                </Col>

                                <Col lg={6}>
                                    <Form.Group className="mb-3" controlId="lasName">
                                        <Form.Control type="text" onChange={handleInputChange} placeholder="Last name" name="lastName" value={lastName} />
                                    </Form.Group>
                                </Col>

                                <Col lg={6}>
                                    <Form.Group className="mb-3" controlId="telephone">
                                        <Form.Control type="number" onChange={handleInputChange} placeholder="Telephone" name="telephone" value={telephone} />
                                    </Form.Group>
                                </Col>

                                <Col lg={6}>
                                    <Form.Group className="mb-3 text-white" controlId="profileImg">
                                        <Form.Control type="text" onChange={handleInputChange} placeholder="Profile Image" name="profileImg" value={profileImg} />
                                    </Form.Group>
                                </Col>

                                <Col lg={6}>
                                    <Form.Group className="mb-3" controlId="username">
                                        <Form.Control type="text" onChange={handleInputChange} placeholder="Username" name="username" value={username} />
                                    </Form.Group>
                                </Col >

                                <Col lg={6}>
                                    <FormSelect className="User" type="text" name="role" value={role} placeholder="Select role" onChange={handleInputChange}>
                                        <option className="form-input">User or Commerce?</option>
                                        <option className="form-input" value="USER">User</option>
                                        <option className="form-input" value="COMMERCE">Commerce</option>
                                    </FormSelect>
                                </Col>

                                <Col lg={6}>
                                    <Form.Group className="mb-3" controlId="email">
                                        <Form.Control type="email" onChange={handleInputChange} placeholder="Email" name="email" value={email} />
                                    </Form.Group>
                                </Col >

                                <Col lg={6}>
                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Control type="password" onChange={handleInputChange} placeholder="Password" name="password" value={password} />
                                    </Form.Group>
                                </Col >

                                <Button variant="dark" type="submit">Signup</Button>
                            </Row>

                        </Col>
                    </Form>

                </Row>

            </Col>

        </div >


    )
}

export default SignupForm