import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
const Photo = ({
    id,
    urls: { regular },
    alt_description,
    likes,
    user: {
        portfolio_url,
        name,
        profile_image: { medium },
    },
    liked_by_user,
}) => {
    const [liked, setLiked] = useState(liked_by_user);

    const dispatch = useDispatch();

    const handleCheck = () => {
        setLiked((prev) => {
            return prev ? false : true;
        });
        dispatch({ type: "LIKED", payload: id });
    };

    return (
        <section className="photo">
            <img src={regular} alt={alt_description} />
            <div className="photo-info">
                <label htmlFor={id}>
                    {liked ? <AiFillHeart /> : <AiOutlineHeart />}
                </label>
                <input
                    type="checkbox"
                    name="liked"
                    id={id}
                    className="input-liked"
                    onChange={handleCheck}
                />
                <div className="photo-info-wrapper">
                    <div>
                        <h4>{name}</h4>
                        <p>{likes} likes</p>
                    </div>
                    <a href={portfolio_url}>
                        <img src={medium} alt={name} className="user-img" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Photo;
