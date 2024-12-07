import React, { useState } from 'react';
import { libraryContent } from '../../data/library';
import '../../styles/library.css';

const Videos = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    // Extract categories and include 'all' at the beginning
    const categories = ['all', ...new Set(libraryContent.videos.map(video => video.category))];

    // Filter videos based on the active filter
    const filteredVideos = activeFilter === 'all' 
        ? libraryContent.videos 
        : libraryContent.videos.filter(video => video.category === activeFilter);

    return (
        <div className="videos-container">
            {/* Section Header */}
            <div className="section-header">
                <h2>ವಿಡಿಯೋಗಳು</h2>
                <div className="filter-controls">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                            onClick={() => setActiveFilter(category)}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Videos Grid */}
            <div className="videos-grid">
                {filteredVideos.map((video) => (
                    <div key={video.id} className="video-card">
                        {/* Embedded YouTube Video */}
                        <iframe
                            src={video.url}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                        <div className="content-info">
                            <h3>{video.title}</h3>
                            <p>{video.description}</p>
                            <span className="category-tag">{video.category}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Videos;
