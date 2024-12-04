import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    TextField, 
    Button, 
    Container, 
    Typography, 
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';

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
        videoLink: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newPost = {
            ...postData,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            stats: {
                views: 0,
                likes: 0,
                comments: [],
                investments: {
                    total: 0,
                    commitments: []
                }
            }
        };

        const existingPosts = JSON.parse(localStorage.getItem('ideas')) || [];
        const updatedPosts = [newPost, ...existingPosts];
        localStorage.setItem('ideas', JSON.stringify(updatedPosts));

        navigate('/ideas');
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ py: 4 }}>
                <Typography variant="h4" gutterBottom>
                    ನಿಮ್ಮ ಕಲ್ಪನೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="ಕಲ್ಪನೆಯ ಶೀರ್ಷಿಕೆ"
                        value={postData.title}
                        onChange={(e) => setPostData({...postData, title: e.target.value})}
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="ವಿವರಣೆ"
                        value={postData.description}
                        onChange={(e) => setPostData({...postData, description: e.target.value})}
                        margin="normal"
                        required
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>ವರ್ಗ</InputLabel>
                        <Select
                            value={postData.category}
                            onChange={(e) => setPostData({...postData, category: e.target.value})}
                            required
                        >
                            <MenuItem value="Agriculture">Agriculture</MenuItem>
                            <MenuItem value="Technology">Technology</MenuItem>
                            <MenuItem value="Food">Food Processing</MenuItem>
                            <MenuItem value="Handicrafts">Handicrafts</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="ನಿಮ್ಮ ಹೆಸರು"
                        value={postData.ownerName}
                        onChange={(e) => setPostData({...postData, ownerName: e.target.value})}
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        type="email"
                        label="ಇಮೇಲ್"
                        value={postData.ownerEmail}
                        onChange={(e) => setPostData({...postData, ownerEmail: e.target.value})}
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        label="ಫೋನ್ ನಂಬರ್"
                        value={postData.ownerPhone}
                        onChange={(e) => setPostData({...postData, ownerPhone: e.target.value})}
                        margin="normal"
                        required
                    />

                    <TextField
                        fullWidth
                        type="number"
                        label="ಅಗತ್ಯವಿರುವ ಹೂಡಿಕೆ (₹)"
                        value={postData.requiredInvestment}
                        onChange={(e) => setPostData({...postData, requiredInvestment: e.target.value})}
                        margin="normal"
                        required
                    />

                    <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit"
                        sx={{ mt: 3 }}
                        fullWidth
                    >
                        ಹಂಚಿಕೊಳ್ಳಿ
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default CreatePost;