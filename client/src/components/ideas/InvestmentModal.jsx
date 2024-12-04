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
            <DialogTitle>ಹೂಡಿಕೆ ಮಾಡಿ</DialogTitle>
            <DialogContent>
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
                />
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="ಸಂದೇಶ"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>ರದ್ದುಮಾಡಿ</Button>
                <Button 
                    onClick={handleInvest}
                    variant="contained"
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
