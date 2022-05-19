import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import commentService from "../../services/comments.service"
import { AuthContext } from "../../context/auth.context"
import { Form, Button } from "react-bootstrap"




const CommentForm = () => {

    const { user } = useContext(AuthContext)
    const [value, setValue] = useState(null);

    const [commentForm, setCommentForm] = useState({
        comment: '',

    })

    useEffect(() => {
        setCommentForm({
            ...commentForm,
            owner: user?._id
        })
    }, [user])

    const navigate = useNavigate()



    const handleInputChange = e => {
        const { name, value } = e.currentTarget
        setCommentForm({
            ...commentForm,
            [name]: value,

        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        commentService
            .createComment(commentForm)
            .then(() => {
                navigate('/commercesDetails')
            })
            .catch(err => console.log(err))
    }


    const { comment } = commentForm

    return (

        <Form.Group className="mb-3" controlId="comment">
            <Form.Label>Comment</Form.Label>
            <Form.Control type="text" value={commentForm.comment} onChange={handleInputChange} name="comment" />
        </Form.Group>

    )


}










export default CommentForm