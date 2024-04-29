import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveReview } from '../actions/movieActions';

function FormInput({ label, type = "text", name, value, onChange, min, max }) {
    return (
        <label>
            {label}:
            {type === "textarea" ? (
                <textarea name={name} value={value} onChange={onChange} />
            ) : (
                <input type={type} name={name} value={value} onChange={onChange} {...(min && { min })} {...(max && { max })} />
            )}
        </label>
    );
}

function ReviewForm({ movieId }) {
    const dispatch = useDispatch();
    const [reviewData, setReviewData] = useState({ review: '', rating: 0 });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
       
        (prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        dispatch(saveReview(movieId, reviewData));
        setReviewData({ review: '', rating: 0 });
    };

    return (
        <form onSubmit={handleSubmitReview}>
            <FormInput
                label="Review"
                type="textarea"
                name="review"
                value={reviewData.review}
                onChange={handleInputChange}
            />
            <FormInput
                label="Rating"
                type="number"
                name="rating"
                value={reviewData.rating}
                onChange={handleInputChange}
                min={0}
                max={5}
            />
            <button type="submit">Submit Review</button>
        </form>
    );
}

export default ReviewForm;
