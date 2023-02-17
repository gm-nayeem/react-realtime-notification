import "./card.css";
import { useState } from "react";

const Card = ({ post, socket, user }) => {
    const [liked, setLiked] = useState(false);

    const handleNotification = (type) => {
        type === 1 && setLiked(true);
        // socket.emit("sendNotification", {
        //   senderName: user,
        //   receiverName: post.username,
        //   type,
        // });
    };

    return (
        <div className="card">
            <div className="info">
                <img src={post.userImg} alt="" className="userImg" />
                <span>{post.fullname}</span>
            </div>
            <img src={post.postImg} alt="" className="postImg" />
            <div className="interaction">
                {liked ? (
                    <img src="../../images/heartFilled.svg" alt=""
                        className="cardIcon" />
                ) : (
                    <img
                        src="../../images/heart.svg"
                        alt=""
                        className="cardIcon"
                        onClick={() => handleNotification(1)}
                    />
                )}
                <img
                    src="../../images/comment.svg"
                    alt=""
                    className="cardIcon"
                    onClick={() => handleNotification(2)}
                />
                <img
                    src="../../images/share.svg"
                    alt=""
                    className="cardIcon"
                    onClick={() => handleNotification(3)}
                />
                <img src="../../images/info.svg" alt=""
                    className="cardIcon infoIcon"
                />
            </div>
        </div>
    );
};

export default Card;