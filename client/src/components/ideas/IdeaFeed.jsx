import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Container, 
    Card, 
    CardContent, 
    Typography, 
    Button,
    Box,
    IconButton,
    Avatar,
    Chip
} from '@mui/material';
import { 
    ThumbUp, 
    Comment, 
    Visibility, 
    MonetizationOn
} from '@mui/icons-material';

const IdeaFeed = () => {
    const navigate = useNavigate();
    const [ideas, setIdeas] = useState([]);

    useEffect(() => {
        loadIdeas();
    }, []);

    const loadIdeas = () => {
        const storedIdeas = JSON.parse(localStorage.getItem('ideas')) || [];
        setIdeas(storedIdeas);
    };

    const handleIdeaClick = (idea) => {
        // Store current idea in sessionStorage for detail view
        sessionStorage.setItem('currentIdea', JSON.stringify(idea));
        navigate(`/ideas/${idea.id}`);
    };

    const handleInvestClick = (e, idea) => {
        e.stopPropagation();
        sessionStorage.setItem('currentIdea', JSON.stringify(idea));
        navigate(`/ideas/${idea.id}/invest`);
    };

    const handleLike = (e, ideaId) => {
        e.stopPropagation();
        const updatedIdeas = ideas.map(idea => {
            if (idea.id === ideaId) {
                return {
                    ...idea,
                    stats: {
                        ...idea.stats,
                        likes: idea.stats.likes + 1
                    }
                };
            }
            return idea;
        });
        setIdeas(updatedIdeas);
        localStorage.setItem('ideas', JSON.stringify(updatedIdeas));
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                ಹೊಸ ಕಲ್ಪನೆಗಳು
            </Typography>

            <Box sx={{ display: 'grid', gap: 3 }}>
                {ideas.map(idea => (
                    <Card 
                        key={idea.id} 
                        onClick={() => handleIdeaClick(idea)}
                        sx={{ 
                            cursor: 'pointer',
                            '&:hover': {
                                boxShadow: 6,
                                transform: 'translateY(-2px)',
                                transition: 'all 0.3s ease'
                            }
                        }}
                    >
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ mr: 2 }}>{idea.ownerName?.[0] || 'U'}</Avatar>
                                <Box>
                                    <Typography variant="h5">{idea.title}</Typography>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        {idea.ownerName}
                                    </Typography>
                                </Box>
                            </Box>

                            <Chip 
                                label={idea.category} 
                                color="primary" 
                                size="small" 
                                sx={{ mb: 2 }}
                            />

                            <Typography paragraph>{idea.description}</Typography>

                            <Box sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mt: 2,
                                pt: 2,
                                borderTop: '1px solid #eee'
                            }}>
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <IconButton onClick={(e) => handleLike(e, idea.id)}>
                                        <ThumbUp />
                                        <Typography variant="caption" sx={{ ml: 1 }}>
                                            {idea.stats?.likes || 0}
                                        </Typography>
                                    </IconButton>
                                    <IconButton>
                                        <Comment />
                                        <Typography variant="caption" sx={{ ml: 1 }}>
                                            {idea.stats?.comments?.length || 0}
                                        </Typography>
                                    </IconButton>
                                    <IconButton>
                                        <Visibility />
                                        <Typography variant="caption" sx={{ ml: 1 }}>
                                            {idea.stats?.views || 0}
                                        </Typography>
                                    </IconButton>
                                </Box>

                                <Box>
                                    <Button 
                                        variant="contained" 
                                        startIcon={<MonetizationOn />}
                                        onClick={(e) => handleInvestClick(e, idea)}
                                    >
                                        ಹೂಡಿಕೆ ಮಾಡಿ
                                    </Button>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    );
};

export default IdeaFeed;