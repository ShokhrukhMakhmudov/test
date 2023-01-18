import React, { useState, useEffect } from "react";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { useDispatch, useSelector } from "react-redux";

import Photo from "./Photo";

const mainUrl = `https://api.unsplash.com/photos/`;
const key = "VwbVEXERCkdgx_eltPj_PWxVbkNUSKLGJLhgSVEKkSA";
const clientID = `?client_id=${key}`;

function App() {
    const dispatch = useDispatch();
    const photos = useSelector((state) => state);

    const [loading, setLoading] = useState(false);

    const [filtered, setFiltered] = useState(false);

    const fetchApi = async () => {
        setLoading(true);

        let url = `${mainUrl}${clientID}&per_page=20`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            dispatch({ type: "ADD_DATA", payload: data });
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchApi();
        // eslint-disable-next-line
    }, []);

    const filterData = () => {
        let status = !filtered;
        setFiltered(status);
        console.log(status);
        dispatch({ type: "FILTER_DATA", payload: status });
    };

    return (
        <main>
            <section className="filter">
                <button className="filter-btn" onClick={filterData}>
                    <span>my favorites</span>
                    {filtered ? <AiFillHeart /> : <AiOutlineHeart />}
                </button>
            </section>
            <section className="photos">
                <div className="photos-center">
                    {photos &&
                        photos.map((image) => {
                            return <Photo key={image.id} {...image} />;
                        })}
                </div>
                {loading && <h2 className="loading">Loading...</h2>}
            </section>
        </main>
    );
}

export default App;
