// import { useState } from "react";
import { Container } from "react-bootstrap"
import NewCommerceForm from "../../components/NewCommerceForm/NewCommerceForm"


// import commerceService from "../../services/commerce.service";

const NewCommercePage = () => {
    return (
        <Container>
            <h1> New Commerce</h1>
            <hr />
            <NewCommerceForm />
        </Container>
    )
}


export default NewCommercePage