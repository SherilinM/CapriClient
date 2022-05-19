import { Col } from "react-bootstrap"
import CommerceCard from "../CommerceCard/CommerceCard"

const ResultsCommerces = ({ commerces, width }) => {

    console.log('mis favoritos son -->', commerces)

    return (
        <>
            {
                commerces.length !== 0 && commerces.map(eachCommerce => {
                    return (
                        <Col sm={width} key={eachCommerce._id}>
                            <CommerceCard {...eachCommerce} />
                        </Col>
                    )
                })
            }
        </>
    )
}

export default ResultsCommerces