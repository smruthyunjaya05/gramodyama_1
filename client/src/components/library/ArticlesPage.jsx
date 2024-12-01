import { useState } from 'react';
import { experts } from '../../data/experts';
import { Book } from '@mui/icons-material';

const ArticlesPage = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');

    const getAllArticles = () => {
        return experts.flatMap(expert => expert.articles || []);
    };

    const getFilteredArticles = () => {
        if (selectedFilter === 'all') return getAllArticles();
        return experts
            .filter(expert => expert.type === selectedFilter)
            .flatMap(expert => expert.articles || []);
    };

    return (
        <div className="library-page">
            <h2>ದಾಖಲೆಗಳು</h2>
            
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

            <div className="articles-grid">
                {getFilteredArticles().map((article, index) => (
                    <div key={index} className="article-card">
                        <div className="article-thumbnail">
                            <img src={article.thumbnail} alt={article.title} />
                        </div>
                        <div className="article-info">
                            <h3>{article.title}</h3>
                            <p className="expert-name">{article.expertName}</p>
                            <p className="description">{article.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArticlesPage;
