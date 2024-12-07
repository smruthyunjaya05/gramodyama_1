import React from 'react';
import { useNavigate } from 'react-router-dom';
import { courses } from '../../data/courses';
import '../../styles/courses.css';

const CoursesList = () => {
    const navigate = useNavigate();

    return (
        <div className="courses-container">
            <h2>ಲಭ್ಯವಿರುವ ತರಬೇತಿಗಳು</h2>
            <div className="courses-grid">
                {courses.map(course => (
                    <div key={course.id} className="course-card">
                        <h3>{course.title}</h3>
                        <div className="course-info">
                            <p><strong>ತರಬೇತುದಾರರು:</strong> {course.tutor}</p>
                            <p><strong>ಅವಧಿ:</strong> {course.duration}</p>
                            <p><strong>ಮಾಡ್ಯೂಲ್‌ಗಳು:</strong> {course.modules.length}</p>
                        </div>
                        <p>{course.shortDescription}</p>
                        <button 
                            className="view-details-btn"
                            onClick={() => navigate(`/courses/${course.id}`)}
                        >
                            ಹೆಚ್ಚಿನ ವಿವರಗಳು
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoursesList;
