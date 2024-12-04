import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { schemes } from '../../data/schemes';
import EligibilityCheck from './EligibilityCheck';

const SchemeDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [showEligibility, setShowEligibility] = useState(false);
    
    const scheme = Object.values(schemes)
        .flat()
        .find(s => s.id === parseInt(id));

    return (
        <div className="scheme-details-container">
            <h2>{scheme.name}</h2>
            
            <section className="scheme-overview">
                <img src={scheme.thumbnail} alt={scheme.name} />
                <div className="basic-info">
                    <p className="category">{scheme.category}</p>
                    <p className="period">ಅವಧಿ: {scheme.implementationPeriod}</p>
                </div>
            </section>

            <section className="scheme-content">
                <div className="objectives">
                    <h3>ಯೋಜನೆಯ ಉದ್ದೇಶಗಳು</h3>
                    <ul>
                        {scheme.objectives.map((obj, index) => (
                            <li key={index}>{obj}</li>
                        ))}
                    </ul>
                </div>

                <div className="benefits">
                    <h3>ಪ್ರಯೋಜನಗಳು</h3>
                    <ul>
                        {scheme.benefits.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                        ))}
                    </ul>
                </div>

                <div className="target-beneficiaries">
                    <h3>ಅರ್ಹ ಫಲಾನುಭವಿಗಳು</h3>
                    <ul>
                        {scheme.targetBeneficiaries.map((target, index) => (
                            <li key={index}>{target}</li>
                        ))}
                    </ul>
                </div>

                <div className="financial-details">
                    <h3>ಆರ್ಥಿಕ ವಿವರಗಳು</h3>
                    <p>ಗರಿಷ್ಠ ನೆರವು: {scheme.financialDetails.maxAssistance}</p>
                    <p>ವಿತರಣೆ: {scheme.financialDetails.phases}</p>
                    <p>ಷರತ್ತುಗಳು: {scheme.financialDetails.conditions}</p>
                </div>
            </section>

            <div className="action-buttons">
                <button 
                    className="eligibility-btn"
                    onClick={() => setShowEligibility(true)}
                >
                    ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ
                </button>
                <button 
                    className="apply-btn"
                    onClick={() => navigate(`/schemes/${id}/apply`)}
                >
                    ಅರ್ಜಿ ಸಲ್ಲಿಸಿ
                </button>
            </div>

            {showEligibility && (
                <EligibilityCheck 
                    scheme={scheme}
                    onClose={() => setShowEligibility(false)}
                />
            )}
        </div>
    );
};
export default SchemeDetails;
