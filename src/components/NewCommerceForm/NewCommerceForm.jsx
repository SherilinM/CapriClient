import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import commerceService from "../../services/commerce.service"

const NewCommerceForm = ({ fireFinalActions }) => {

    const [commerceData, setCommerceData] = useState({

        title: '',
        description: '',
        address: '',
        imageUrl: ''
    })

    const handleInputChange = e => {
        const { name, value } = e.currentTarget

        setCommerceData({
            ...commerceData,
            [name]: value
        })
    }

    const handleSubmit = e => {

        e.preventDefault()

        commerceService
            .createCommerce(commerceData)
            .then(response => {
                fireFinalActions()
            })
            .catch(err => console.log(err))
    }

    const { title, description, address, imageUrl } = commerceData

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={title} onChange={handleInputChange} name="title" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={description} onChange={handleInputChange} name="description" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" value={address} onChange={handleInputChange} name="address" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="imageUrl">
                <Form.Label>imageUrl</Form.Label>
                <Form.Control type="text" value={imageUrl} onChange={handleInputChange} name="imageUrl" />
            </Form.Group>

            <Button variant="dark" type="submit"> Create Commerce </Button>
        </Form>
    )
}

export default NewCommerceForm