import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '../../data/courses';


const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const course = courses.find(c => c.id === parseInt(id));
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        const registeredCourses = JSON.parse(localStorage.getItem('registeredCourses')) || [];
        setIsRegistered(registeredCourses.some(c => c.id === parseInt(id)));
    }, [id]);

    const handleRegistration = () => {
        const registeredCourses = JSON.parse(localStorage.getItem('registeredCourses')) || [];
        registeredCourses.push(course);
        localStorage.setItem('registeredCourses', JSON.stringify(registeredCourses));
        navigate('/my-courses');
    };

    if (!course) return <div>Course not found</div>;

    return (
        <div className="course-detail-container">
            <h2>{course.title}</h2>
            <div className="course-info">
                <p><span>ತರಬೇತುದಾರರು:</span> {course.tutor}</p>
                <p><span>ಅವಧಿ:</span> {course.duration}</p>
                <p><span>ಪ್ರಾರಂಭ:</span> {course.startDate}</p>
                <p><span>ಮುಕ್ತಾಯ:</span> {course.endDate}</p>
            </div>
            <div className="course-description">
                <h3>ವಿವರಣೆ</h3>
                <p>{course.fullDescription}</p>
            </div>
            <div className="syllabus">
                <h3>ಪಠ್ಯಕ್ರಮ</h3>
                <div className="syllabus-container">
                    {course.syllabus.map((item, index) => (
                        <div className="syllabus-item" key={index}>
                            <p>{item}</p>
                        </div>
                    ))}
                </div>
            </div>
            {!isRegistered ? (
                <button 
                    className="register-btn"
                    onClick={handleRegistration}
                >
                    ನೋಂದಣಿ ಮಾಡಿ
                </button>
            ) : (
                <button 
                    className="continue-btn"
                    onClick={() => navigate(`/courses/${id}/learn`)}
                >
                    ಕಲಿಕೆ ಮುಂದುವರಿಸಿ
                </button>
            )}
        </div>
    );
};

export default CourseDetail;
