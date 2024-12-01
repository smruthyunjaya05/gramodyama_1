import React, { useState } from 'react';
import { Rating } from '@mui/material';

const CourseReviews = ({ courseId }) => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleReviewSubmit = () => {
        const review = {
            userId: 'currentUserId', // Replace with actual user ID
            rating,
            comment,
            date: new Date().toISOString()
        };

        const courseReviews = JSON.parse(localStorage.getItem(`course_${courseId}_reviews`)) || [];
        courseReviews.push(review);
        localStorage.setItem(`course_${courseId}_reviews`, JSON.stringify(courseReviews));

        setRating(0);
        setComment('');
    };

    return (
        <div className="course-reviews">
            <h3>ಕೋರ್ಸ್ ಸಮೀಕ್ಷೆಗಳು</h3>
            
            <div className="add-review">
                <Rating 
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                />
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="ನಿಮ್ಮ ಅಭಿಪ್ರಾಯ ಬರೆಯಿರಿ..."
                />
                <button 
                    className="submit-review-btn"
                    onClick={handleReviewSubmit}
                    disabled={!rating || !comment}
                >
                    ಸಮೀಕ್ಷೆ ಸಲ್ಲಿಸಿ
                </button>
            </div>

            <div className="reviews-list">
                {courseReviews.map((review, index) => (
                    <div key={index} className="review-item">
                        <Rating value={review.rating} readOnly />
                        <p>{review.comment}</p>
                        <span className="review-date">
                            {new Date(review.date).toLocaleDateString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
