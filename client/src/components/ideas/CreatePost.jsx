import React, { useState, useRef, useCallback } from 'react';
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

const CreatePost = () => {
    const navigate = useNavigate();

    const [postData, setPostData] = useState({
        title: '',
        description: '',
        category: '',
        ownerName: '',
        ownerEmail: '',
        ownerPhone: '',
        requiredInvestment: '',
        videoLink: '',
    });

    const [isListening, setIsListening] = useState(false);
    const [speechTranscript, setSpeechTranscript] = useState('');
    const [openEditModal, setOpenEditModal] = useState(false);
    const [error, setError] = useState(null);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    const recognitionRef = useRef(null);

    // Initialize Speech Recognition
    const initSpeechRecognition = useCallback(() => {
        if (!('webkitSpeechRecognition' in window)) {
            setError('ನಿಮ್ಮ ಬ್ರೌಸರ್ ನಲ್ಲಿ ಸ್ಪೀಚ್ ರಿಕಗ್ನಿಷನ್ ಬೆಂಬಲ ಇಲ್ಲ');
            setOpenErrorSnackbar(true);
            return null;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'kn-IN'; // Kannada language code

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = (event) => {
            setIsListening(false);
            const errorMessages = {
                'no-speech': 'ಮಾತನಾಡುವ ಧ್ವನಿಯನ್ನು ಪತ್ತೆಹಚ್ಚಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮರುಪ್ರಯತ್ನಿಸಿ.',
                'audio-capture': 'ಧ್ವನಿ ಕ್ಯಾಪ್ಚರ್ ವಿಫಲವಾಗಿದೆ. ನಿಮ್ಮ ಮೈಕ್ರೋಫೋನ್ ಪರಿಶೀಲಿಸಿ.',
                'not-allowed': 'ಮೈಕ್ರೋಫೋನ್ ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ. ದಯವಿಟ್ಟು ಬ್ರೌಸರ್ ಸೆಟ್ಟಿಂಗ್‍ಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.',
            };
            setError(errorMessages[event.error] || 'ಸ್ಪೀಚ್ ರಿಕಗ್ನಿಷನ್ ಸಮಯದಲ್ಲಿ ಅನಿರೀಕ್ಷಿತ ದೋಷವಾಯಿತು.');
            setOpenErrorSnackbar(true);
        };
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.trim();
            if (transcript) {
                setSpeechTranscript(transcript);
                setOpenEditModal(true);
            } else {
                setError('ಹುಡುಕಲು ಸಾಧ್ಯವಾಗದ ಮಾತು ಪತ್ತೆಯಾಗಿಲ್ಲ.');
                setOpenErrorSnackbar(true);
            }
        };

        return recognition;
    }, []);

    const toggleListening = () => {
        if (isListening && recognitionRef.current) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current = initSpeechRecognition();
            recognitionRef.current?.start();
        }
    };

    const handleEditConfirm = () => {
        setPostData((prev) => ({
            ...prev,
            description: prev.description ? `${prev.description} ${speechTranscript}` : speechTranscript,
        }));
        setSpeechTranscript('');
        setOpenEditModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData((prev) => ({ ...prev, [name]: value }));
    };

    const handleErrorClose = (_, reason) => {
        if (reason !== 'clickaway') setOpenErrorSnackbar(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!postData.title || !postData.description || !postData.category) {
            setError('ದಯವಿಟ್ಟು ಎಲ್ಲಾ ಅಗತ್ಯ ಕ್ಷೇತ್ರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.');
            setOpenErrorSnackbar(true);
            return;
        }

        const newPost = {
            ...postData,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            stats: { views: 0, likes: 0, comments: [], investments: { total: 0, commitments: [] } },
        };

        const existingPosts = JSON.parse(localStorage.getItem('ideas')) || [];
        localStorage.setItem('ideas', JSON.stringify([newPost, ...existingPosts]));
        navigate('/ideas');
    };

    return (
        <Container maxWidth="md">
            <Snackbar
                open={openErrorSnackbar}
                autoHideDuration={6000}
                onClose={handleErrorClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>

            <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)} maxWidth="md" fullWidth>
                <DialogTitle>ಮಾತನಾಡಿದ ಮಾಹಿತಿಯನ್ನು ಸಂಪಾದಿಸಿ</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        defaultValue={speechTranscript}
                        onChange={(e) => setSpeechTranscript(e.target.value)}
                        margin="normal"
                        label="ಸಂಪಾದಿಸಿದ ಪಠ್ಯ"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditModal(false)} color="secondary">
                        ರದ್ದುಮಾಡಿ
                    </Button>
                    <Button onClick={handleEditConfirm} color="primary" variant="contained">
                        ದೃಢೀಕರಿಸಿ
                    </Button>
                </DialogActions>
            </Dialog>

            <Box sx={{ py: 4 }}>
                <Typography variant="h4" gutterBottom>
                    ನಿಮ್ಮ ಕಲ್ಪನೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="ಶೀರ್ಷಿಕೆ"
                        name="title"
                        value={postData.title}
                        onChange={handleInputChange}
                        margin="normal"
                        required
                    />
                    <Box sx={{ position: 'relative' }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="ವಿವರಣೆ"
                            value={postData.description}
                            onChange={(e) => setPostData({ ...postData, description: e.target.value })}
                            margin="normal"
                            required
                        />
                        <IconButton
                            onClick={toggleListening}
                            sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }}
                        >
                            {isListening ? <MicOffIcon color="error" /> : <MicIcon color="primary" />}
                        </IconButton>
                    </Box>
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>ವರ್ಗ</InputLabel>
                        <Select name="category" value={postData.category} onChange={handleInputChange}>
                            <MenuItem value="Technology">ತಂತ್ರಜ್ಞಾನ</MenuItem>
                            <MenuItem value="Health">ಆರೋಗ್ಯ</MenuItem>
                            <MenuItem value="Education">ಶಿಕ್ಷಣ</MenuItem>
                            <MenuItem value="Finance">ಹಣಕಾಸು</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="ನಿಮ್ಮ ಹೆಸರು"
                        name="ownerName"
                        value={postData.ownerName}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="ನಿಮ್ಮ ಇಮೇಲ್"
                        name="ownerEmail"
                        value={postData.ownerEmail}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="ನಿಮ್ಮ ಫೋನ್"
                        name="ownerPhone"
                        value={postData.ownerPhone}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="ಆವಶ್ಯಕ ಹೂಡಿಕೆ"
                        name="requiredInvestment"
                        value={postData.requiredInvestment}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="ವೀಡಿಯೋ ಲಿಂಕ್"
                        name="videoLink"
                        value={postData.videoLink}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }} fullWidth>
                        ಹಂಚಿಕೊಳ್ಳಿ
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default CreatePost;