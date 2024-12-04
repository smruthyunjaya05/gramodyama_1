import { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
    Typography,
    Box
} from '@mui/material';

const MessageSystem = ({ ideaId, recipientId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem(`messages_${ideaId}`)) || [];
        setMessages(storedMessages);
    }, [ideaId]);

    const sendMessage = () => {
        const message = {
            id: Date.now(),
            text: newMessage,
            timestamp: new Date().toISOString(),
            sender: 'user',
            recipient: recipientId
        };

        const updatedMessages = [...messages, message];
        localStorage.setItem(`messages_${ideaId}`, JSON.stringify(updatedMessages));
        setMessages(updatedMessages);
        setNewMessage('');
    };

    return (
        <Container maxWidth="md">
            <Paper sx={{ p: 2, height: '70vh', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" gutterBottom>
                    ಸಂದೇಶಗಳು
                </Typography>

                <List sx={{ flexGrow: 1, overflow: 'auto' }}>
                    {messages.map(message => (
                        <ListItem 
                            key={message.id}
                            sx={{
                                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start'
                            }}
                        >
                            <Paper 
                                sx={{ 
                                    p: 1, 
                                    bgcolor: message.sender === 'user' ? '#e3f2fd' : '#f5f5f5'
                                }}
                            >
                                <ListItemText 
                                    primary={message.text}
                                    secondary={new Date(message.timestamp).toLocaleString()}
                                />
                            </Paper>
                        </ListItem>
                    ))}
                </List>

                <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <TextField
                        fullWidth
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="ಸಂದೇಶ ಬರೆಯಿರಿ..."
                    />
                    <Button 
                        variant="contained"
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                    >
                        ಕಳುಹಿಸಿ
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default MessageSystem;