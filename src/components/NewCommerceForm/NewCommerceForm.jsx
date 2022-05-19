import { useContext, useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import commerceService from "../../services/commerce.service"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';



const NewCommerceForm = () => {

    const { user } = useContext(AuthContext)
    const [value, setValue] = useState(null);
    const [latitude, setLatitude] = useState()
    const [longitude, setLongitude] = useState()
    // const [commerceName, setCommerceName] = useState()

    geocodeByAddress(value?.value.description)
        .then(results => {
            console.log(results)
            // setCommerceName(results[0].address_components[0].long_name)
            return getLatLng(results[0])
        })
        .then((response) => {
            setLatitude(response.lat)
            setLongitude(response.lng)
        })

    // FORM

    const [commerceForm, setCommerceForm] = useState({

        title: '',
        description: '',
        lat: '',
        lng: '',
        imageUrl: '',
        category: '',
        likes: 0
    })

    useEffect(() => {
        setCommerceForm({
            ...commerceForm,
            owner: user?._id
        })
    }, [user])

    const navigate = useNavigate()



    const handleInputChange = e => {
        const { name, value } = e.currentTarget
        setCommerceForm({
            ...commerceForm,
            [name]: value,
            lat: latitude,
            lng: longitude
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        commerceService
            .createCommerce(commerceForm)
            .then(() => {
                navigate('/commerces')
            })
            .catch(err => console.log(err))
    }

    const { title, description, lat, lng, category, imageUrl } = commerceForm

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <GooglePlacesAutocomplete
                    apiKey={process.env.REACT_APP_API_KEY} selectProps={{ value, onChange: setValue }}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" value={description} onChange={handleInputChange} name="description" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Commerce Name</Form.Label>
                <Form.Control type="text" name="title" value={title} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" name="category" value={category} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Latitude</Form.Label>
                <Form.Control type="number" name="lat" value={latitude} onChange={handleInputChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Longitude</Form.Label>
                <Form.Control type="number" name="lng" value={longitude} onChange={handleInputChange} />
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