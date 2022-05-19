import './HomePage.css'
import commerceService from "../../services/commerce.service"
import { useEffect, useState } from "react"
import { InputGroup, DropdownButton, Dropdown, FormControl, Row, Col, Button, Container } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'




const HomePage = () => {

    /*---get all commerces and filter categories---*/
    const [commerces, setCommerces] = useState([])
    const [commercesCategories, setCommercesCategories] = useState([])

    useEffect(() => {
        commerceService
            .getAllCommerces()
            .then(({ data }) => {
                setCommerces(data)
                let categories = data.map(commerce => { return commerce.category })
                let result = []

                for (let i = 0; i < categories.length; i++) {
                    if (result.indexOf(categories[i]) == -1)
                        result.push(categories[i])
                }
                setCommercesCategories(result)
                //Retrieve all commerce options
                setFilteredCommercesByCategory(data)
            })
    }, [])

    /*---Select categories handler---*/
    const [filteredCommercesByCategory, setFilteredCommercesByCategory] = useState([])

    const handleFilteredCat = () => {
        let result
        if (selectCategory && (selectCategory !== '') && (selectCategory.toLowerCase() !== 'categories')) {
            result = commerces.filter(commerce => {
                return commerce.category === selectCategory
            })
        } else {
            result = commerces
        }
        setFilteredCommercesByCategory(result)
    }

    const [selectCategory, setSelectCategory] = useState('')

    const handleSelectCat = (e) => {
        setSelectCategory(e)
    }

    useEffect(() => {
        handleFilteredCat()
    }, [selectCategory])

    /*--- Hanfle input value ---*/
    const [inputValue, setInputValue] = useState('')

    const handleInputValue = (e) => {
        setInputValue(e.target.value)
    }

    useEffect(() => {
        setInputValue(inputValue)
    }, [inputValue])

    /*-- Navigation ---*/
    const navigate = useNavigate()
    const handleLink = () => {

        if (inputValue && (inputValue !== '')) {
            //Find commerce that have the same title
            let theCommerce = filteredCommercesByCategory.find(el => el.title.toLowerCase() === inputValue.toLowerCase())

            //If exists navigate to ID
            if (theCommerce) {
                navigate('/details/' + theCommerce._id)
                return
            }
        }

        if (selectCategory) {
            //store category and navigate to commerce
            window.localStorage.setItem('theCat', selectCategory);
            navigate('/commerces')
            return
        }

        navigate('/commerces')


    }

    return (
        <>
            <div className="hero">
                <div className='bg-img' />
                <div className='bg-overlay' />
                <Container className="p-4 text-center text-white hero-text">
                    <h1 className="display-4 fw-bolder">Find the best places to enjoy</h1>
                    <p>Here you can find the beginning of a perfect day.</p>
                </Container>
                <div className="input-elements px-3">
                    <InputGroup className="">
                        <a onClick={handleLink}>
                            <InputGroup.Text>
                                <div className='search-icon-group px-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M19.575 21.525 13.175 15.15Q12.425 15.675 11.463 16Q10.5 16.325 9.375 16.325Q6.525 16.325 4.538 14.337Q2.55 12.35 2.55 9.5Q2.55 6.65 4.538 4.662Q6.525 2.675 9.375 2.675Q12.25 2.675 14.225 4.662Q16.2 6.65 16.2 9.5Q16.2 10.625 15.887 11.575Q15.575 12.525 15.025 13.25L21.45 19.675ZM9.375 13.675Q11.125 13.675 12.338 12.462Q13.55 11.25 13.55 9.5Q13.55 7.75 12.338 6.537Q11.125 5.325 9.375 5.325Q7.65 5.325 6.425 6.537Q5.2 7.75 5.2 9.5Q5.2 11.25 6.425 12.462Q7.65 13.675 9.375 13.675Z" /></svg>
                                </div>
                            </InputGroup.Text>
                        </a>
                        <FormControl aria-label="location Input"
                            placeholder="I'm looking for..."
                            id="input-search-commerces"
                            list="input-search-commerces-opt"
                            className="p-3 input-search-bar"
                            onChange={handleInputValue}
                        />
                        <DropdownButton
                            title={(selectCategory) ? selectCategory : "Categories"}
                            id="capri-btn-cat"
                            onSelect={handleSelectCat}
                        >
                            {
                                commercesCategories.map(el => {
                                    return (
                                        <Dropdown.Item eventKey={el}>{el}</Dropdown.Item>
                                    )
                                })
                            }
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="Categories">All categories</Dropdown.Item>
                        </DropdownButton>
                        <datalist id="input-search-commerces-opt">
                            {
                                filteredCommercesByCategory.map(opt => {
                                    return (
                                        <option value={opt.title} />
                                    )
                                })
                            }
                        </datalist>
                    </InputGroup>
                </div>
            </div>

        </>
    )
}


export default HomePage
