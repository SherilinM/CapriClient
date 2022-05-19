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
            .then(({ data }) => {
                let result = data
                let theCat = window.localStorage.getItem('theCat')
                if (data && theCat && (theCat != '') && (theCat.toLowerCase() !== 'categories')) {
                    console.log("parsing data")
                    result = data.filter(theData => {
                        return theData.category === theCat
                    })
                    //Reset
                    window.localStorage.removeItem('theCat')
                }
                setCommerces(result)
                console.log(commerces)
            })
            .then(err => console.log(err))
    }, [])

    return (
        commerces.length
            ?
            <Row className="mb-5">
                {
                    commerces.map(commerce => {
                        return (
                            <Col md={{ span: 12 }} key={commerce._id} className="p-2">
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


























