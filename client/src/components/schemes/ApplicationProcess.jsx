import { useParams, useNavigate } from 'react-router-dom';
import { schemes } from '../../data/schemes';
import { ArrowBack } from '@mui/icons-material';

const ApplicationProcess = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Find the scheme from all categories
    const scheme = Object.values(schemes)
        .flat()
        .find(s => s.id === parseInt(id));

    if (!scheme) {
        return <div>Loading...</div>;
    }

    return (
        <div className="application-process-container">
            <button 
                className="back-button"
                onClick={() => navigate(`/schemes/${id}`)}
            >
                <ArrowBack /> ಹಿಂದೆ
            </button>

            <h2>{scheme.name} - ಅರ್ಜಿ ಪ್ರಕ್ರಿಯೆ</h2>

            <div className="application-content">
                <section className="process-steps">
                    <h3>ಅರ್ಜಿ ಹಂತಗಳು</h3>
                    <div className="steps-list">
                        {scheme.applicationProcess.steps.map((step, index) => (
                            <div key={index} className="step-item">
                                <div className="step-number">{index + 1}</div>
                                <div className="step-text">{step}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="documents-section">
                    <h3>ಅಗತ್ಯ ದಾಖಲೆಗಳು</h3>
                    <ul className="documents-list">
                        {scheme.applicationProcess.requiredDocuments.map((doc, index) => (
                            <li key={index}>{doc}</li>
                        ))}
                    </ul>
                </section>

                <section className="contact-section">
                    <h3>ಸಹಾಯಕ್ಕಾಗಿ ಸಂಪರ್ಕಿಸಿ</h3>
                    <div className="contact-details">
                        <p>ಫೋನ್: {scheme.applicationProcess.supportContact.phone}</p>
                        <p>ಇಮೇಲ್: {scheme.applicationProcess.supportContact.email}</p>
                    </div>
                    <p className="processing-time">
                        ಸಾಮಾನ್ಯ ಪ್ರಕ್ರಿಯೆ ಸಮಯ: {scheme.applicationProcess.processingTime}
                    </p>
                </section>
            </div>
        </div>
    );
};

export default ApplicationProcess;