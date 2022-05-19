import './Comment.css'

const Comment = ({ comment, owner }) => {

    return (
        <>
            <img className="profileImg" src={owner.profileImg}></img>
            <p className="userName">{owner.firstName}</p>
            <p className="userComment">{comment}</p>
            <hr></hr>
        </>
    )
}

export default Comment