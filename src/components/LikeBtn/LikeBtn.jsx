import './LikeBtn.css'
import commerceService from "../../services/commerce.service"
import { useEffect, useState } from 'react'


const LikeBtn = (props) => {

    const [commerceLikes, setCommerceLikes] = useState(0)

    const handleLike = () => {
        if (props.commerceId) {
            commerceService.addLike(props.commerceId)
        }
        getCommerceLikes()
    }

    useEffect(() => {
        getCommerceLikes()
    }, [])

    const getCommerceLikes = () => {
        commerceService
            .getOneCommerce(props.commerceId)
            .then(({ data }) => {
                setCommerceLikes(data.like)
            })
    }

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <div className="badge-likes" onClick={handleLike}>
                <div className="h_container">
                    <span id="heart" className="material-symbols-outlined">favorite</span>
                </div>
                {commerceLikes ? commerceLikes : "0"} {props.isText ? "" : "likes"}
            </div>
        </>

    )

}

export default LikeBtn