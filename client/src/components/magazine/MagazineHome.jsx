import { useState, useEffect } from 'react';
import { 
    Container, Grid, Card, Typography, 
    Tabs, Tab, Button, Box 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArticleCard from './ArticleCard';

const MagazineHome = () => {
    const [currentTab, setCurrentTab] = useState('featured');
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedArticles = JSON.parse(localStorage.getItem('magazine_articles')) || [];
        setArticles(storedArticles);
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4">ಗ್ರಾಮೋದಯ ವಾರ ಪತ್ರಿಕೆ</Typography>
                <Button 
                    variant="contained" 
                    onClick={() => navigate('/magazine/submit')}
                >
                    ನಿಮ್ಮ ಕಥೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ
                </Button>
            </Box>

            <Tabs 
                value={currentTab} 
                onChange={(e, v) => setCurrentTab(v)}
                sx={{ mb: 3 }}
            >
                <Tab label="ವಿಶೇಷ ಕಥೆಗಳು" value="featured" />
                <Tab label="ಯಶೋಗಾಥೆಗಳು" value="success" />
                <Tab label="ನಾವೀನ್ಯತೆಗಳು" value="innovation" />
                <Tab label="ತರಬೇತಿಗಳು" value="courses" />
            </Tabs>

            <Grid container spacing={3}>
                {articles
                    .filter(article => article.category === currentTab)
                    .map(article => (
                        <Grid item xs={12} md={6} key={article.id}>
                            <ArticleCard article={article} />
                        </Grid>
                    ))}
            </Grid>
        </Container>
    );
};

export default MagazineHome;