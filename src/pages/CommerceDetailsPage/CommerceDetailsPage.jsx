import './CommerceDetailsPage.css'
import FavBoton from "./../../components/FavBoton"
import Moment, { localFata } from 'moment'
import { useEffect, useState } from 'react'
import commerceService from '../../services/commerce.service'
import CommerceDetails from '../../components/CommerceDetails/CommerceDetails'
import { useNavigate } from 'react-router-dom'
import { Container, Row } from 'react-bootstrap'




const moment = extendMoment(Moment)

const CommerceDetailsPage = () => {

    const [commerceDetails, setCommerceDatils] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)

    const [isFav, setIsFav] = useState()
    const [btnState, setBtnState] = useState('Cargando...')

    // const [commerceImages, setCommerceImages] = useState([])

    // function updataeImageState(images)
    // setCommerceImages(imaages)

    useEffect(() => {
        getCommerceDetails()
    }, [])

    const getCommerceDetails = () => {
        commerceService
            .getOneCommerce(commerce_id)
            .then(({ data }) => {
                setCommerceDatils(data)
                // setCommerceImages(data.images)
                setIsLoaded(true)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        commerceDetails.title && checkIfFav()
    }, [user, commerceDetails])


    const checkIfFav = () => {
        commerceService
            .getUserDetails()
            .then(({ data }) => {

                let founFavCommerce = ''

                data?.favCommerces.forEach(elm => {
                    if (elm.name === commerceDetails.name) {
                        founFavCommerce = elm.name
                    }
                })

                if (foundFavCommerce !== '') {
                    setIsFav(true)
                    setBtnState('Delete favorite')
                } else {
                    setIsFav(false)
                    setBtnState('Add to Favorite')
                }
            })
    }

    useEffect(() => {
        commerceDetails - title && checkIfMine(commerce_id)
    }, [user, commerceDetails])

    const checkIfMine = (commerce_id) => {
        commerceService
            .getAllPropertiesOfOneUser()
            .then(({ data }) => {
                data.forEach(elm => {
                    if (elm._id === commerce_id) setIsMine(true)
                })
            })
    }

    const handleFavBtn = () => {
        console.log("FavBtn")
        if (!isFav) {

            commerceService
                .addCommerceToFav(commerce_id)
                .then(() => {
                    setIsFav(true)
                    setBtnState('Delete Favorite')
                })
                .catch(err => console.log(err))
        } else if (isFav) {
            commerceService
                .substractCommerceFromFavs(commerce_id)
                .then(() => {
                    setIsFav(false)
                    setBtnState('Add to Favorite')
                })
                .catch(err => console.log(err))
        }
    }


    const navigate = useNavigate()
    const handleEditBtn = () => setShowModal(true)
    const handleSaveBtn = () => setShowModal(false)


    return (
        <Container>
            <Row className="Row1">
                <Col sm={9}>
                    <h1 className="Commerce1">{commerceDetails?.name} </h1>
                    <p>{commerceDetails?.street}</p>
                </Col>
                <Col sm={3}>
                    <FavBoton btnState={btnState} handleFavBtn={handleFavBtn} />
                </Col>
            </Row>

            <Row className="Row2">
                {/* hacer commerceImages ???? */}
                {/* {isLoaded && <CommerceImages commerceImages={commerceImages} {...commerceDetails} isMine={isMine} updataeImagesState={updataeImagesState} getCommerceDetails={getCommerceDetails}></CommerceImages>} */}
            </Row>

            <Row>
                {isMine &&
                    <Col>
                        <Button className="myBtn" onClick={handleEditBtn}>Edit information</Button>
                    </Col>}
            </Row>

            <Modal show={showModal} onHide={handleSaveBtn} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit commerce information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CommerceEditForm closeModal={handleSaveBtn} {...commerceDetails} commerce_id={commerce_id} refreshDetails={getcommerceDetails} />
                </Modal.Body>
            </Modal>

        </Container>)
}



export default CommerceDetailsPage