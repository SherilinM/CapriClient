import './HomePage.css'
import Carousel from 'react-bootstrap/Carousel'
import commerceService from "../../services/commerce.service"
import { useEffect, useState } from "react"
import { InputGroup, DropdownButton, Dropdown, FormControl } from "react-bootstrap"




const HomePage = () => {

    const [commerces, setCommerces] = useState([])
    const [commerceFilterByTitle, setcommerceFilterByTitle] = useState([])


    useEffect(() => {
        commerceService
            .getAllCommerces()
            .then(({ data }) => setCommerces(data))
            .then(err => console.log(err))
    }, [])

    return (
        <div className="hero-wrapper h-100">
            <div className="search-input text-center">
                <InputGroup className="mb-3">
                    <DropdownButton
                        title="Categories"
                        id="input-group-dropdown-1"
                    >
                        {
                            console.log(new Set(commerces.map(commerce => commerce.category)))
                        }
                    </DropdownButton>
                    <FormControl aria-label="Text input with dropdown button" />
                </InputGroup>
            </div>

            <Carousel fade className="">
                <Carousel.Item interval={20000}>
                    < img
                        className="img img-fluid"
                        src="https://larrumba.com/wp-content/uploads/2022/01/Perrachica_Cabecera.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="img img-fluid"
                        src="https://images.xceed.me/clubs/covers/panda-club-club-madrid-xceed-0e36.jpg"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="img img-fluid"
                        src="https://larrumba.com/wp-content/uploads/2022/01/Marieta_Cabecera.jpg"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}









export default HomePage