import { useNavigate } from 'react-router-dom';
import { schemes } from '../../data/schemes';

const SchemesList = () => {
    const navigate = useNavigate();
    const allSchemes = Object.values(schemes).flat();

    return (
        <div className="schemes-list-container">
            <h2>ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು</h2>
            
            <div className="schemes-grid">
                {allSchemes.map((scheme) => (
                    <div 
                        key={scheme.id} 
                        className="scheme-card"
                        onClick={() => navigate(`/schemes/${scheme.id}`)}
                    >
                        <img src={scheme.thumbnail} alt={scheme.name} />
                        <div className="scheme-info">
                            <h3>{scheme.name}</h3>
                            <p className="category">{scheme.category}</p>
                            <p className="description">{scheme.description}</p>
                            <p className="period">ಅವಧಿ: {scheme.implementationPeriod}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SchemesList;
