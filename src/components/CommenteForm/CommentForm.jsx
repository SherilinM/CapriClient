import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import commentService from "../../services/comments.service"
import { AuthContext } from "../../context/auth.context"
import { Form, Button, Col } from "react-bootstrap"
import './CommentForm.css'


const CommentForm = ({ getComments }) => {

    const { user } = useContext(AuthContext)
    const [value, setValue] = useState(null);

    const [commentForm, setCommentForm] = useState({
        comment: '',
    })

    const { commerce_id } = useParams()

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
            .createComment(commerce_id, commentForm)
            .then(() => {
                getComments()
                setCommentForm({ comment: '' })
            })
            .catch(err => console.log(err))
    }


    const { comment } = commentForm

    return (
        <Col lg={8}>
            <Form className='commentForm' onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control type="text" value={commentForm.comment} onChange={handleInputChange} name="comment" />
                </Form.Group>

                <Button variant="dark" type="submit">Comment</Button>
            </Form>
        </Col>
    )
}

export default CommentForm