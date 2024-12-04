import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Card,
    Typography,
    Box,
    TextField,
    Button,
    List,
    ListItem,
    Avatar,
    Divider
} from '@mui/material';

const IdeaDetail = () => {
    const { id } = useParams();
    const [idea, setIdea] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        loadIdeaAndComments();
    }, [id]);

    const loadIdeaAndComments = () => {
        const ideas = JSON.parse(localStorage.getItem('ideas')) || [];
        const currentIdea = ideas.find(i => i.id === parseInt(id));
        if (currentIdea) {
            setIdea(currentIdea);
            setComments(currentIdea.stats.comments || []);
        }
    };

    const handleComment = () => {
        if (!newComment.trim()) return;

        const comment = {
            id: Date.now(),
            text: newComment,
            userId: 'current-user',
            userName: 'User', // Can be replaced with actual user name
            timestamp: new Date().toISOString()
        };

        const ideas = JSON.parse(localStorage.getItem('ideas')) || [];
        const updatedIdeas = ideas.map(item => {
            if (item.id === parseInt(id)) {
                const updatedComments = [...(item.stats.comments || []), comment];
                return {
                    ...item,
                    stats: {
                        ...item.stats,
                        comments: updatedComments
                    }
                };
            }
            return item;
        });

        localStorage.setItem('ideas', JSON.stringify(updatedIdeas));
        setComments(prev => [...prev, comment]);
        setNewComment('');
        loadIdeaAndComments(); // Reload to ensure consistency
    };

    if (!idea) return <Typography>Loading...</Typography>;

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Card sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    {idea.title}
                </Typography>

                <Box sx={{ my: 3 }}>
                    <Typography variant="h6">ಪ್ರತಿಕ್ರಿಯೆಗಳು</Typography>
                    <Box sx={{ mt: 2, mb: 3 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಬರೆಯಿರಿ..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button 
                            variant="contained" 
                            onClick={handleComment}
                            sx={{ mt: 1 }}
                            disabled={!newComment.trim()}
                        >
                            ಕಳುಹಿಸಿ
                        </Button>
                    </Box>

                    <List>
                        {comments.map((comment, index) => (
                            <Box key={comment.id}>
                                {index > 0 && <Divider />}
                                <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', py: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 1 }}>
                                        <Avatar sx={{ mr: 2 }}>{comment.userName?.[0] || 'U'}</Avatar>
                                        <Typography variant="subtitle2">
                                            {comment.userName || 'User'}
                                        </Typography>
                                        <Typography variant="caption" sx={{ ml: 'auto' }}>
                                            {new Date(comment.timestamp).toLocaleString()}
                                        </Typography>
                                    </Box>
                                    <Typography>{comment.text}</Typography>
                                </ListItem>
                            </Box>
                        ))}
                    </List>
                </Box>
            </Card>
        </Container>
    );
};

export default IdeaDetail;