import { Form, Button } from "react-bootstrap"
import { useState } from "react"
import commerceService from "../../services/commerce.service"
import GooglePlacesAutocomplete from "react-google-places-autocomplete"
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete'
import { useNavigate, useParams } from "react-router-dom"


const CommerceEditForm = ({ title, description, imageUrl, category }) => {

    const { commerce_id } = useParams()
    const [commerceForm, setCommerceForm] = useState({

        title: title,
        description: description,
        imageUrl: imageUrl,
        category: category,
    })

    const handleInputChange = e => {
        const { name, value } = e.target
        setCommerceForm({
            ...commerceForm,
            [name]: value,
        })
    }

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()

        commerceService
            .editCommerce(commerce_id, commerceForm)
            .then(() => {
                navigate('/commerces')
            })
            .catch(err => console.log(err))
    }

    return (
        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={commerceForm.description} onChange={handleInputChange} name="description" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Commerce Name</Form.Label>
                <Form.Control type="text" name="title" value={commerceForm.title} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" name="category" value={commerceForm.category} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="imageUrl">
                <Form.Label>imageUrl</Form.Label>
                <Form.Control type="text" value={commerceForm.imageUrl} onChange={handleInputChange} name="imageUrl" />
            </Form.Group>

            <Button variant="dark" type="submit"> Save information </Button>
        </Form>

    )

}


export default CommerceEditForm