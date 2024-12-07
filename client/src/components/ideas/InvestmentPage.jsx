import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Card,
    Typography,
    Box,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Divider,
    Modal
} from '@mui/material';
import html2canvas from 'html2canvas';

const InvestmentPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [idea, setIdea] = useState(null);
    const [investmentAmount, setInvestmentAmount] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showCertificate, setShowCertificate] = useState(false);
    const [certificateData, setCertificateData] = useState(null);

    useEffect(() => {
        const currentIdea = JSON.parse(sessionStorage.getItem('currentIdea'));
        setIdea(currentIdea);
    }, []);

    const generateCertificate = (investmentDetails) => {
        const certificateData = {
            investorName: "Current User", // Replace with actual user name
            amount: investmentDetails.amount,
            businessName: idea.title,
            ownerName: idea.ownerName,
            date: new Date().toLocaleDateString(),
            certificateId: `INV-${Date.now()}`
        };
        setCertificateData(certificateData);
        setShowCertificate(true);
    };

    const handleInvest = () => {
        if (!investmentAmount || !termsAccepted) return;

        const investment = {
            id: Date.now(),
            amount: parseFloat(investmentAmount),
            timestamp: new Date().toISOString(),
            status: 'confirmed'
        };

        const ideas = JSON.parse(localStorage.getItem('ideas')) || [];
        const updatedIdeas = ideas.map(item => {
            if (item.id === parseInt(id)) {
                return {
                    ...item,
                    stats: {
                        ...item.stats,
                        investments: {
                            total: (item.stats.investments?.total || 0) + parseFloat(investmentAmount),
                            commitments: [...(item.stats.investments?.commitments || []), investment]
                        }
                    }
                };
            }
            return item;
        });

        localStorage.setItem('ideas', JSON.stringify(updatedIdeas));
        generateCertificate(investment);
    };

    const downloadCertificate = () => {
        const certificate = document.getElementById('investment-certificate');
        html2canvas(certificate).then(canvas => {
            const link = document.createElement('a');
            link.download = `investment-certificate-${certificateData.certificateId}.png`;
            link.href = canvas.toDataURL();
            link.click();
        });
    };

    if (!idea) return <Typography>Loading...</Typography>;

    return (
        <>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Card sx={{ p: 3, backgroundColor: '#f9f9f9', boxShadow: 3 }}>
                    <Typography variant="h4" gutterBottom sx={{ color: '#6e9735' }}>
                        ಹೂಡಿಕೆ ಮಾಡಿ
                    </Typography>

                    <Box sx={{ my: 3 }}>
                        <Typography variant="h6" sx={{ color: '#6e9735' }}>{idea.title}</Typography>
                        <Typography color="textSecondary">{idea.category}</Typography>
                    </Box>

                    <Divider sx={{ my: 3, borderColor: '#6e9735' }} />

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ color: '#6e9735' }}>ಮಾಲೀಕರ ವಿವರಗಳು</Typography>
                        <Typography>ಹೆಸರು: {idea.ownerName}</Typography>
                        <Typography>ಇಮೇಲ್: {idea.ownerEmail}</Typography>
                        <Typography>ಫೋನ್: {idea.ownerPhone}</Typography>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ color: '#6e9735' }}>ಹೂಡಿಕೆ ವಿವರಗಳು</Typography>
                        <Typography>ಅಗತ್ಯವಿರುವ ಹೂಡಿಕೆ: ₹{idea.requiredInvestment}</Typography>
                        <Typography>ಒಟ್ಟು ಹೂಡಿಕೆ: ₹{idea.stats.investments?.total || 0}</Typography>
                    </Box>

                    <TextField
                        fullWidth
                        type="number"
                        label="ಹೂಡಿಕೆ ಮೊತ್ತ"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        margin="normal"
                        inputProps={{ min: 1 }}
                        required
                        sx={{
                            '& .MuiInputBase-root': {
                                borderColor: '#6e9735',
                            },
                            '& .MuiInputLabel-root': {
                                color: '#6e9735',
                            },
                            '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                    borderColor: '#6e9735',
                                }
                            },
                        }}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox 
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                                sx={{
                                    color: '#6e9735',
                                    '&.Mui-checked': {
                                        color: '#6e9735',
                                    }
                                }}
                            />
                        }
                        label="ನಾನು ಎಲ್ಲಾ ನಿಯಮಗಳನ್ನು ಒಪ್ಪುತ್ತೇನೆ"
                        sx={{ color: '#6e9735' }}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleInvest}
                        disabled={!Number(investmentAmount) || !termsAccepted}
                        sx={{
                            mt: 3,
                            backgroundColor: '#6e9735',
                            '&:hover': {
                                backgroundColor: '#5a7c2c',
                            }
                        }}
                    >
                        ಹೂಡಿಕೆ ಮಾಡಿ
                    </Button>
                </Card>
            </Container>

            <Modal
                open={showCertificate}
                onClose={() => navigate('/ideas')}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box sx={{ width: '80%', maxWidth: 800, bgcolor: 'background.paper', p: 4, boxShadow: 3 }}>
                    <div id="investment-certificate" style={{
                        padding: '40px',
                        border: '10px solid #6e9735', // Green border for the certificate
                        background: '#fff',
                        textAlign: 'center'
                    }}>
                        <Typography variant="h3" sx={{ color: '#6e9735', mb: 3 }}>
                            ಹೂಡಿಕೆ ಪ್ರಮಾಣಪತ್ರ
                        </Typography>

                        <Typography variant="h6" sx={{ mb: 4 }}>
                            ಪ್ರಮಾಣೀಕರಿಸಲಾಗಿದೆ
                        </Typography>

                        <Typography paragraph>
                            {certificateData?.investorName} ರವರು {certificateData?.businessName} ವ್ಯವಹಾರದಲ್ಲಿ
                        </Typography>

                        <Typography variant="h4" sx={{ color: '#6e9735', my: 3 }}>
                            ₹{certificateData?.amount}
                        </Typography>

                        <Typography paragraph>
                            ಮೊತ್ತವನ್ನು ಹೂಡಿಕೆ ಮಾಡಿರುತ್ತಾರೆ
                        </Typography>

                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', px: 4 }}>
                            <Box>
                                <Typography>{certificateData?.date}</Typography>
                                <Divider sx={{ borderColor: '#6e9735' }}>ದಿನಾಂಕ</Divider>
                            </Box>
                            <Box>
                                <Typography>{certificateData?.ownerName}</Typography>
                                <Divider sx={{ borderColor: '#6e9735' }}>ಮಾಲೀಕರ ಸಹಿ</Divider>
                            </Box>
                        </Box>

                        <Typography variant="caption" sx={{ mt: 4, display: 'block', color: '#6e9735' }}>
                            Certificate ID: {certificateData?.certificateId}
                        </Typography>
                    </div>

                    <Button
                        variant="contained"
                        onClick={downloadCertificate}
                        fullWidth
                        sx={{
                            mt: 2,
                            backgroundColor: '#6e9735',
                            '&:hover': {
                                backgroundColor: '#5a7c2c',
                            }
                        }}
                    >
                        ಪ್ರಮಾಣಪತ್ರವನ್ನು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default InvestmentPage;
