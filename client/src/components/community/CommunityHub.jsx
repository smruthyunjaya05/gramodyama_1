import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
    Container, 
    Grid, 
    Card, 
    Typography, 
    TextField, 
    Button, 
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    Box
} from '@mui/material';
import { Send, ThumbUp } from '@mui/icons-material';

const CommunityHub = () => {
    const { ideaId } = useParams();
    const [idea, setIdea] = useState(null);
    const [discussions, setDiscussions] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        // Fetch idea details
        const ideas = JSON.parse(localStorage.getItem('ideas')) || [];
        const currentIdea = ideas.find(i => i.id === parseInt(ideaId));
        setIdea(currentIdea);

        // Fetch discussions
        const storedDiscussions = JSON.parse(localStorage.getItem(`discussions_${ideaId}`)) || [];
        setDiscussions(storedDiscussions);
    }, [ideaId]);

    const handlePostMessage = () => {
        if (!newMessage.trim()) return;

        const newDiscussion = {
            id: Date.now(),
            message: newMessage,
            author: "Current User",
            timestamp: new Date().toISOString(),
            likes: 0
        };

        const updatedDiscussions = [...discussions, newDiscussion];
        setDiscussions(updatedDiscussions);
        localStorage.setItem(`discussions_${ideaId}`, JSON.stringify(updatedDiscussions));
        setNewMessage('');
    };

    if (!idea) return <Typography>Loading...</Typography>;

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h4" gutterBottom>
                        {idea.title} - ಸಮುದಾಯ ಹಬ್
                    </Typography>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            ಚರ್ಚೆಗಳು
                        </Typography>
                        <List>
                            {discussions.map((discussion) => (
                                <ListItem key={discussion.id} alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar>{discussion.author[0]}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={discussion.message}
                                        secondary={
                                            <Typography component="span" variant="body2" color="textSecondary">
                                                {new Date(discussion.timestamp).toLocaleString()}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                fullWidth
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಬರೆಯಿರಿ..."
                            />
                            <Button 
                                variant="contained" 
                                onClick={handlePostMessage}
                                endIcon={<Send />}
                            >
                                ಕಳುಹಿಸಿ
                            </Button>
                        </Box>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            ಹೂಡಿಕೆ ವಿವರಗಳು
                        </Typography>
                        <Typography>
                            ಒಟ್ಟು ಹೂಡಿಕೆ: ₹{idea.stats?.investments?.total || 0}
                        </Typography>
                        <Typography>
                            ಹೂಡಿಕೆದಾರರ ಸಂಖ್ಯೆ: {idea.stats?.investments?.commitments?.length || 0}
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CommunityHub;