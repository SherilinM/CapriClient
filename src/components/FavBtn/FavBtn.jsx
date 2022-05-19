import './FavBtn.css'
import userService from "../../services/user.service"
import commerceService from '../../services/commerce.service'
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/auth.context"




const FavBtn = ({ commerce_id }) => {

    const [isFav, setIsFav] = useState(false)
    const [btnState, setBtnState] = useState('Charging...')
    const { user } = useContext(AuthContext)
    const [commerceName, setCommerceName] = useState('loading...')


    useEffect(() => {
        checkIffav()
    }, [user])

    useEffect(() => {
        getCommerceName()
    }, [])

    const getCommerceName = () => {
        commerceService
            .getOneCommerce(commerce_id)
            .then(({ data }) => {
                setCommerceName(data.like)
            })
    }


    const checkIffav = () => {
        userService
            .getUserDetails()
            .then(({ data }) => {
                let foundFavCommerce = ''

                data?.favCommerce.forEach(elm => {
                    if (elm.name === commerceName) {
                        foundFavCommerce = elm.name
                    }
                })

                if (foundFavCommerce !== '') {
                    setIsFav(true)
                    setBtnState('saved')
                } else {
                    setIsFav(false)
                    setBtnState('save')
                }
            })
    }

    const handleFavBtn = () => {

        if (!isFav) {
            userService
                .addCommerceToFav(commerce_id)
                .then(() => {
                    setIsFav(true)
                    setBtnState('saved')
                })
                .catch(err => console.log(err))
        } else if (isFav) {
            userService
                .removeCommerceFromFav(commerce_id)
                .then(() => {
                    setIsFav(false)
                    setBtnState('save')
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,200,0,0" />
            <div className={"badge-favs " + btnState} onClick={handleFavBtn}>
                <div className="s_container">
                    <span id="star" className="material-symbols-outlined">grade</span>
                </div>
                {btnState}
            </div>
        </>

    )

}

export default FavBtn