import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '../../data/courses';
import { CheckCircle, PlayCircleFilled } from '@mui/icons-material';
import { LinearProgress } from '@mui/material';

const CourseLearning = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const course = courses.find(c => c.id === parseInt(id));

    if (!course) {
        return (
            <div className="error-container">
                <h2>ಕೋರ್ಸ್ ಕಂಡುಬಂದಿಲ್ಲ</h2>
                <button onClick={() => navigate('/my-courses')}>
                    ನನ್ನ ಕೋರ್ಸ್‌ಗಳಿಗೆ ಹಿಂತಿರುಗಿ
                </button>
            </div>
        );
    }

    const [activeModule, setActiveModule] = useState(0);
    const [progress, setProgress] = useState({
        completedModules: [],
        totalProgress: 0
    });

    useEffect(() => {
        const savedProgress = JSON.parse(localStorage.getItem(`course_${id}_progress`)) || {
            completedModules: [],
            totalProgress: 0
        };
        setProgress(savedProgress);
    }, [id]);

    const handleModuleCompletion = (moduleId) => {
        const updatedProgress = { ...progress };
        
        if (!updatedProgress.completedModules.includes(moduleId)) {
            updatedProgress.completedModules.push(moduleId);
        }

        updatedProgress.totalProgress = 
            (updatedProgress.completedModules.length / course.modules.length) * 100;

        setProgress(updatedProgress);
        localStorage.setItem(`course_${id}_progress`, JSON.stringify(updatedProgress));

        if (updatedProgress.totalProgress === 100) {
            alert('ಅಭಿನಂದನೆಗಳು! ನೀವು ಕೋರ್ಸ್ ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ');
        }
    };

    return (
        <div className="course-learning-container">
            <div className="learning-sidebar">
                <h3>{course.title}</h3>
                <div className="progress-bar">
                    <LinearProgress variant="determinate" value={progress.totalProgress} />
                    <span>{Math.round(progress.totalProgress)}% ಪೂರ್ಣಗೊಂಡಿದೆ</span>
                </div>
                <div className="modules-list">
                    {course.modules.map((module, index) => (
                        <div 
                            key={module.id} 
                            className={`module-item ${activeModule === index ? 'active' : ''}`}
                            onClick={() => setActiveModule(index)}
                        >
                            {progress.completedModules.includes(module.id) ? 
                                <CheckCircle className="completed-icon" /> : 
                                <PlayCircleFilled />
                            }
                            <span>{module.title}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="learning-content">
                <div className="video-container">
                    <video 
                        controls 
                        src={course.modules[activeModule].videoUrl}
                        poster={course.modules[activeModule].thumbnailUrl}
                    />
                </div>
                <div className="module-details">
                    <h2>{course.modules[activeModule].title}</h2>
                    <p>{course.modules[activeModule].description}</p>
                    <button 
                        className="complete-module-btn"
                        onClick={() => handleModuleCompletion(course.modules[activeModule].id)}
                        disabled={progress.completedModules.includes(course.modules[activeModule].id)}
                    >
                        {progress.completedModules.includes(course.modules[activeModule].id) ? 
                            'ಮಾಡ್ಯೂಲ್ ಪೂರ್ಣಗೊಂಡಿದೆ' : 
                            'ಮಾಡ್ಯೂಲ್ ಪೂರ್ಣಗೊಳಿಸಿ'}
                    </button>
                </div>
                {progress.totalProgress === 100 && (
                    <button 
                        className="get-certificate-btn"
                        onClick={() => navigate(`/courses/${id}/certificate`)}
                    >
                        ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಿರಿ
                    </button>
                )}
            </div>
        </div>
    );
};

export default CourseLearning;
