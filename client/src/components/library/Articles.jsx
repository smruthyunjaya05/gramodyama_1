import React, { useState } from 'react';
import { libraryContent } from '../../data/library';

const Articles = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    
    const categories = ['all', ...new Set(libraryContent.articles.map(article => article.category))];
    
    const filteredArticles = activeFilter === 'all'
        ? libraryContent.articles
        : libraryContent.articles.filter(article => article.category === activeFilter);

    return (
        <div className="articles-container">
            <div className="section-header">
                <h2>ದಾಖಲೆಗಳು</h2>
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
            <div className="articles-grid">
                {filteredArticles.map((article) => (
                    <div key={article.id} className="article-card">
                        <div className="content-info">
                            <h3>{article.title}</h3>
                            <p>{article.description}</p>
                            <span className="category-tag">{article.category}</span>
                            <a href={article.url} className="read-more" target="_blank" rel="noopener noreferrer">
                                ಓದಿ →
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Articles;
