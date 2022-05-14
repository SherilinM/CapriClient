import { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import CommerceCard from "../CommerceCard/CommerceCard"
import Loader from "../Loader/Loader"
import commerceService from "../../services/commerce.service"

const CommerceList = () => {

    const [commerces, setCommerces] = useState([])

    useEffect(() => {
        commerceService
            .getAllCommerces()
            .then(({ data }) => setCommerces(data))
            .then(err => console.log(err))
    }, [])

    return (
        commerces.length
            ?
            <Row className="mb-5">
                {
                    commerces.map(commerce => {
                        return (
                            <Col md={{ span: 6 }} key={commerce._id} className="p-2">
                                <CommerceCard {...commerce} />
                            </Col>
                        )
                    })
                }
            </Row>
            :
            <Loader />
    )
}

export default CommerceList