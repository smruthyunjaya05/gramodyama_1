import React, { useState } from 'react';
import { libraryContent } from '../../data/library';

const Videos = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    
    const categories = ['all', ...new Set(libraryContent.videos.map(video => video.category))];
    
    const filteredVideos = activeFilter === 'all' 
        ? libraryContent.videos
        : libraryContent.videos.filter(video => video.category === activeFilter);

    return (
        <div className="videos-container">
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
            <div className="videos-grid">
                {filteredVideos.map((video) => (
                    <div key={video.id} className="video-card">
                        <iframe
                            src={video.url}
                            title={video.title}
                            frameBorder="0"
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