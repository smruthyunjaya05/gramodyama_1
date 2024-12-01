import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const UserCourses = () => {
    const navigate = useNavigate();
    const registeredCourses = JSON.parse(localStorage.getItem('registeredCourses')) || [];

    const getProgress = (courseId) => {
        const progress = JSON.parse(localStorage.getItem(`course_${courseId}_progress`)) || {
            completedModules: [],
            totalProgress: 0
        };
        return progress.totalProgress;
    };

    const handleContinueLearning = (courseId) => {
        navigate(`/courses/${courseId}/learn`);
    };

    return (
        <div className="user-courses-container">
            <h2>ನನ್ನ ತರಬೇತಿಗಳು</h2>
            {registeredCourses.length > 0 ? (
                <div className="registered-courses-grid">
                    {registeredCourses.map(course => (
                        <div key={course.id} className="registered-course-card">
                            <div className="course-progress">
                                <CircularProgress 
                                    variant="determinate" 
                                    value={getProgress(course.id)}
                                    size={60}
                                />
                                <span>{Math.round(getProgress(course.id))}%</span>
                            </div>
                            <div className="course-info">
                                <h3>{course.title}</h3>
                                <p>{course.tutor}</p>
                            </div>
                            <button 
                                className="continue-learning-btn"
                                onClick={() => handleContinueLearning(course.id)}
                            >
                                ಕಲಿಕೆ ಮುಂದುವರಿಸಿ
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-courses">
                    <p>ನೀವು ಯಾವುದೇ ಕೋರ್ಸ್‌ಗಳಿಗೆ ನೋಂದಣಿ ಮಾಡಿಕೊಂಡಿಲ್ಲ</p>
                    <button onClick={() => navigate('/courses')}>
                        ಕೋರ್ಸ್‌ಗಳನ್ನು ಹುಡುಕಿ
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserCourses;