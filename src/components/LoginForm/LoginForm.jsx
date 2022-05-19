import './LoginForm.css'
import { useContext, useState } from "react"
import { Form, Button, Col } from "react-bootstrap"
import authService from "../../services/auth.service"
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './../../context/auth.context'


const Loginform = () => {

    const [loginData, setLoginData] = useState({
        password: '',
        email: ''
    })

    const navigate = useNavigate()

    const { storeToken, authenticateUser } = useContext(AuthContext)

    const handleSubmit = e => {
        e.preventDefault()

        authService
            .login(loginData)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser()
                navigate('/commerces')
            })
            .catch(err => console.log(err))
    }

    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setLoginData({ ...loginData, [name]: value })
    }

    const { password, email } = loginData

    return (

        <div className='bg-imge'>
            <Form className="input-login" onSubmit={handleSubmit}>

                <Col lg={6}>
                    <Form.Group className="text-grey" controlId="email">
                        <Form.Control type="email" onChange={handleInputChange} placeholder="Email" name="email" value={email} />
                    </Form.Group>
                </Col>

                <Col lg={6}>
                    <Form.Group className="text-grey" controlId="password">
                        <Form.Label></Form.Label>
                        <Form.Control type="password" onChange={handleInputChange} placeholder="Password" name="password" value={password} />
                    </Form.Group>
                </Col>

                <Button className='button' variant="dark" type="submit">Acceder</Button>
            </Form>
        </div>
    )
}

export default Loginform