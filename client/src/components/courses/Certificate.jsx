import React from 'react';
import { useParams } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { courses } from '../../data/courses';

const Certificate = () => {
    const { id } = useParams();
    const course = courses.find(c => c.id === parseInt(id));
    
    const generateCertificate = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        // Add certificate styling
        doc.setFillColor(240, 240, 240);
        doc.rect(0, 0, 297, 210, 'F');
        
        // Add border
        doc.setDrawColor(51, 51, 51);
        doc.setLineWidth(1);
        doc.rect(10, 10, 277, 190);

        // Add header
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(40);
        doc.setTextColor(51, 51, 51);
        doc.text('ಪ್ರಮಾಣಪತ್ರ', 148.5, 40, { align: 'center' });

        // Add content
        doc.setFontSize(20);
        doc.text('ಈ ಮೂಲಕ ಪ್ರಮಾಣೀಕರಿಸುವುದೇನೆಂದರೆ', 148.5, 70, { align: 'center' });
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(24);
        doc.text('[ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು]', 148.5, 90, { align: 'center' });
        
        doc.setFontSize(20);
        doc.text(`ಈ ಕೆಳಗಿನ ಕೋರ್ಸ್ ಅನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಳಿಸಿದ್ದಾರೆ`, 148.5, 110, { align: 'center' });
        
        doc.setFont('helvetica', 'bold');
        doc.text(course.title, 148.5, 130, { align: 'center' });

        // Add date
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(16);
        doc.text(`ದಿನಾಂಕ: ${new Date().toLocaleDateString()}`, 148.5, 150, { align: 'center' });

        // Add signatures
        doc.line(60, 170, 120, 170);
        doc.line(177, 170, 237, 170);
        doc.setFontSize(12);
        doc.text('ತರಬೇತುದಾರರ ಸಹಿ', 90, 180, { align: 'center' });
        doc.text('ಸಂಸ್ಥೆಯ ಮುಖ್ಯಸ್ಥರ ಸಹಿ', 207, 180, { align: 'center' });

        doc.save(`${course.title}_certificate.pdf`);
    };

    return (
        <div className="certificate-container">
            <div className="certificate-preview">
                <h2>ಅಭಿನಂದನೆಗಳು!</h2>
                <p>ನೀವು {course.title} ಕೋರ್ಸ್ ಅನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ</p>
                <button 
                    className="download-certificate-btn"
                    onClick={generateCertificate}
                >
                    ಪ್ರಮಾಣಪತ್ರ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ
                </button>
            </div>
        </div>
    );
};

export default Certificate;