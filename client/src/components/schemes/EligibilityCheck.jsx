import { useState } from 'react';

const EligibilityCheck = ({ scheme, onClose }) => {
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        income: '',
        landHolding: '',
        region: '',
        caste: '',
        maritalStatus: '',
        previousBeneficiary: 'no',
        existingLoans: 'no',
        loanAmount: ''
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const checkEligibility = () => {
        const isEligible = 
            parseInt(formData.age) >= scheme.eligibilityCriteria.age.min &&
            parseInt(formData.age) <= scheme.eligibilityCriteria.age.max &&
            parseInt(formData.income) <= scheme.eligibilityCriteria.income.max &&
            parseFloat(formData.landHolding) <= scheme.eligibilityCriteria.landHolding.max &&
            scheme.eligibilityCriteria.region.includes(formData.region) &&
            scheme.eligibilityCriteria.caste.includes(formData.caste);

        setResult(isEligible);
    };

    return (
        <div className="eligibility-check-modal">
            <div className="modal-content">
                <h3>ಅರ್ಹತೆ ಪರಿಶೀಲನೆ</h3>
                
                <form className="eligibility-form" onSubmit={(e) => {
                    e.preventDefault();
                    checkEligibility();
                }}>
                    <div className="form-group">
                        <label>ವಯಸ್ಸು</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>ಲಿಂಗ</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} required>
                            <option value="">ಆಯ್ಕೆ ಮಾಡಿ</option>
                            <option value="male">ಪುರುಷ</option>
                            <option value="female">ಮಹಿಳೆ</option>
                            <option value="other">ಇತರೆ</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>ವಾರ್ಷಿಕ ಆದಾಯ</label>
                        <input
                            type="number"
                            name="income"
                            value={formData.income}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>ಜಮೀನು (ಹೆಕ್ಟೇರ್)</label>
                        <input
                            type="number"
                            name="landHolding"
                            value={formData.landHolding}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>ಪ್ರದೇಶ</label>
                        <select name="region" value={formData.region} onChange={handleChange} required>
                            <option value="">ಆಯ್ಕೆ ಮಾಡಿ</option>
                            {scheme.eligibilityCriteria.region.map(region => (
                                <option key={region} value={region}>{region}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>ಜಾತಿ ವರ್ಗ</label>
                        <select name="caste" value={formData.caste} onChange={handleChange} required>
                            <option value="">ಆಯ್ಕೆ ಮಾಡಿ</option>
                            {scheme.eligibilityCriteria.caste.map(caste => (
                                <option key={caste} value={caste}>{caste}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="check-btn">ಪರಿಶೀಲಿಸಿ</button>
                </form>

                {result !== null && (
                    <div className={`result ${result ? 'eligible' : 'not-eligible'}`}>
                        {result ? 'ನೀವು ಅರ್ಹರಾಗಿರುವಿರಿ!' : 'ಕ್ಷಮಿಸಿ, ನೀವು ಅರ್ಹರಾಗಿಲ್ಲ'}
                    </div>
                )}

                <button className="close-btn" onClick={onClose}>×</button>
            </div>
        </div>
    );
};

export default EligibilityCheck;