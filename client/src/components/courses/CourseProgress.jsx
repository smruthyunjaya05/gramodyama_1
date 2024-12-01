import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress, LinearProgress } from '@mui/material';
import { courses } from '../../data/courses';

const CourseProgress = () => {
    const { id } = useParams();
    const course = courses.find(c => c.id === parseInt(id));
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
        } else {
            updatedProgress.completedModules = updatedProgress.completedModules
                .filter(id => id !== moduleId);
        }

        updatedProgress.totalProgress = 
            (updatedProgress.completedModules.length / course.modules.length) * 100;

        setProgress(updatedProgress);
        localStorage.setItem(`course_${id}_progress`, JSON.stringify(updatedProgress));
    };

    return (
        <div className="course-progress-container">
            <div className="progress-header">
                <h2>{course.title}</h2>
                <div className="overall-progress">
                    <CircularProgress 
                        variant="determinate" 
                        value={progress.totalProgress} 
                        size={80}
                    />
                    <span className="progress-percentage">
                        {Math.round(progress.totalProgress)}%
                    </span>
                </div>
            </div>

            <div className="modules-progress">
                {course.modules.map((module, index) => (
                    <div key={module.id} className="module-item">
                        <div className="module-header">
                            <h3>ಮಾಡ್ಯೂಲ್ {index + 1}: {module.title}</h3>
                            <span className="duration">{module.duration}</span>
                        </div>
                        <div className="module-content">
                            <LinearProgress 
                                variant="determinate" 
                                value={progress.completedModules.includes(module.id) ? 100 : 0}
                            />
                            <label className="completion-checkbox">
                                <input
                                    type="checkbox"
                                    checked={progress.completedModules.includes(module.id)}
                                    onChange={() => handleModuleCompletion(module.id)}
                                />
                                ಪೂರ್ಣಗೊಂಡಿದೆ
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseProgress;