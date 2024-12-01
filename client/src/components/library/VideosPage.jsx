import { useState } from 'react';
import { experts } from '../../data/experts';
import { VideoCall } from '@mui/icons-material';

const VideosPage = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');

    const getAllVideos = () => {
        return experts.flatMap(expert => expert.videos || []);
    };

    const getFilteredVideos = () => {
        if (selectedFilter === 'all') return getAllVideos();
        return experts
            .filter(expert => expert.type === selectedFilter)
            .flatMap(expert => expert.videos || []);
    };

    return (
        <div className="library-page">
            <h2>ವಿಡಿಯೋಗಳು</h2>
            
            <div className="filter-controls">
                <button 
                    className={`filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedFilter('all')}
                >
                    ಎಲ್ಲಾ
                </button>
                <button 
                    className={`filter-btn ${selectedFilter === 'agriculture' ? 'active' : ''}`}
                    onClick={() => setSelectedFilter('agriculture')}
                >
                    ಕೃಷಿ
                </button>
                <button 
                    className={`filter-btn ${selectedFilter === 'market' ? 'active' : ''}`}
                    onClick={() => setSelectedFilter('market')}
                >
                    ಮಾರುಕಟ್ಟೆ
                </button>
                <button 
                    className={`filter-btn ${selectedFilter === 'business' ? 'active' : ''}`}
                    onClick={() => setSelectedFilter('business')}
                >
                    ವ್ಯಾಪಾರ
                </button>
            </div>

            <div className="videos-grid">
                {getFilteredVideos().map((video, index) => (
                    <div key={index} className="video-card">
                        <div className="video-thumbnail">
                            <img src={video.thumbnail} alt={video.title} />
                            <span className="duration">{video.duration}</span>
                        </div>
                        <div className="video-info">
                            <h3>{video.title}</h3>
                            <p className="expert-name">{video.expertName}</p>
                            <p className="description">{video.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideosPage;
