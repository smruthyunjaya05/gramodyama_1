import { useState } from 'react';
import { 
    Container, Card, TextField, 
    Button, Typography, Select, 
    MenuItem, FormControl, 
    InputLabel 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SubmitArticle = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        summary: '',
        content: '',
        image: null
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newArticle = {
            id: Date.now(),
            ...formData,
            timestamp: new Date().toISOString(),
            likes: 0,
            comments: [],
            author: "Current User" // Replace with actual user data
        };

        const articles = JSON.parse(localStorage.getItem('magazine_articles')) || [];
        localStorage.setItem('magazine_articles', JSON.stringify([...articles, newArticle]));
        
        navigate('/magazine');
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Card sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    ನಿಮ್ಮ ಕಥೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ
                </Typography>
                
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="ಶೀರ್ಷಿಕೆ"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        margin="normal"
                        required
                    />

                    <FormControl fullWidth margin="normal">
                        <InputLabel>ವರ್ಗ</InputLabel>
                        <Select
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                            required
                        >
                            <MenuItem value="success">ಯಶೋಗಾಥೆ</MenuItem>
                            <MenuItem value="innovation">ನಾವೀನ್ಯತೆ</MenuItem>
                            <MenuItem value="courses">ತರಬೇತಿ</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        label="ಸಾರಾಂಶ"
                        value={formData.summary}
                        onChange={(e) => setFormData({...formData, summary: e.target.value})}
                        margin="normal"
                        multiline
                        rows={2}
                        required
                    />

                    <TextField
                        fullWidth
                        label="ವಿವರವಾದ ಮಾಹಿತಿ"
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        margin="normal"
                        multiline
                        rows={6}
                        required
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        ಸಲ್ಲಿಸಿ
                    </Button>
                </form>
            </Card>
        </Container>
    );
};

export default SubmitArticle;
