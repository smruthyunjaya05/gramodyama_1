import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Typography,
    Box
} from '@mui/material';

const InvestmentModal = ({ open, onClose, idea }) => {
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleInvest = () => {
        const investment = {
            id: Date.now(),
            amount: Number(amount),
            message,
            timestamp: new Date().toISOString(),
            status: 'pending'
        };

        const ideas = JSON.parse(localStorage.getItem('ideas')) || [];
        const updatedIdeas = ideas.map(item => {
            if (item.id === idea.id) {
                return {
                    ...item,
                    stats: {
                        ...item.stats,
                        investments: {
                            total: item.stats.investments.total + Number(amount),
                            commitments: [...item.stats.investments.commitments, investment]
                        }
                    }
                };
            }
            return item;
        });

        localStorage.setItem('ideas', JSON.stringify(updatedIdeas));
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ backgroundColor: '#6e9735', color: '#ffffff', borderRadius: '8px 8px 0 0' }}>
                ಹೂಡಿಕೆ ಮಾಡಿ
            </DialogTitle>
            <DialogContent sx={{ backgroundColor: '#f9f9f9', padding: '20px' }}>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="textSecondary">
                        ಕನಿಷ್ಠ: ₹{idea.investmentLimits.min}
                        ಗರಿಷ್ಠ: ₹{idea.investmentLimits.max}
                    </Typography>
                </Box>
                <TextField
                    fullWidth
                    type="number"
                    label="ಹೂಡಿಕೆ ಮೊತ್ತ"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    margin="normal"
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
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="ಸಂದೇಶ"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    margin="normal"
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
            </DialogContent>
            <DialogActions sx={{ backgroundColor: '#f9f9f9', padding: '10px' }}>
                <Button 
                    onClick={onClose}
                    sx={{
                        color: '#6e9735',
                        '&:hover': {
                            backgroundColor: '#e2e8d5',
                        }
                    }}
                >
                    ರದ್ದುಮಾಡಿ
                </Button>
                <Button 
                    onClick={handleInvest}
                    variant="contained"
                    sx={{
                        backgroundColor: '#6e9735',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#5a7c2c',
                        },
                        '&.Mui-disabled': {
                            backgroundColor: '#d0e0b3',
                            color: '#b0b0b0',
                        },
                    }}
                    disabled={
                        !amount || 
                        amount < idea.investmentLimits.min || 
                        amount > idea.investmentLimits.max
                    }
                >
                    ಹೂಡಿಕೆ ಮಾಡಿ
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default InvestmentModal;
