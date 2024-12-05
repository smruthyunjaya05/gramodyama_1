import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
    Container, Card, Typography, Box, 
    Avatar, TextField, Button, Divider,
    List, ListItem, ListItemAvatar, ListItemText 
} from '@mui/material';
import { ThumbUp, Comment, Share } from '@mui/icons-material';

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const articles = JSON.parse(localStorage.getItem('magazine_articles')) || [];
        const currentArticle = articles.find(a => a.id === parseInt(id));
        if (currentArticle && !currentArticle.comments) {
            currentArticle.comments = [];
        }
        setArticle(currentArticle);
    }, [id]);

    const handleComment = () => {
        if (!comment.trim()) return;

        const newComment = {
            id: Date.now(),
            text: comment,
            author: "Current User",
            timestamp: new Date().toISOString()
        };

        const articles = JSON.parse(localStorage.getItem('magazine_articles')) || [];
        const updatedArticles = articles.map(a => {
            if (a.id === parseInt(id)) {
                return {
                    ...a,
                    comments: [...a.comments, newComment]
                };
            }
            return a;
        });

        localStorage.setItem('magazine_articles', JSON.stringify(updatedArticles));
        setArticle(updatedArticles.find(a => a.id === parseInt(id)));
        setComment('');
    };

    if (!article) return <Typography>Loading...</Typography>;

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Card sx={{ p: 3 }}>
                {/* Article Header */}
                <Typography variant="h4" gutterBottom>
                    {article.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                    <Avatar>{article.author[0]}</Avatar>
                    <div>
                        <Typography>{article.author}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {new Date(article.timestamp).toLocaleDateString()}
                        </Typography>
                    </div>
                </Box>

                {/* Article Image */}
                {article.image && (
                    <Box 
                        component="img"
                        src={article.image}
                        alt={article.title}
                        sx={{ width: '100%', borderRadius: 1, mb: 3 }}
                    />
                )}

                {/* Article Content */}
                <Typography variant="body1" paragraph>
                    {article.content}
                </Typography>

                {/* Interaction Buttons */}
                <Box sx={{ display: 'flex', gap: 2, my: 3 }}>
                    <Button startIcon={<ThumbUp />}>
                        ಇಷ್ಟವಾಯಿತು ({article.likes})
                    </Button>
                    <Button startIcon={<Comment />}>
                        ಪ್ರತಿಕ್ರಿಯೆಗಳು ({article.comments.length})
                    </Button>
                    <Button startIcon={<Share />}>
                        ಹಂಚಿಕೊಳ್ಳಿ
                    </Button>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Comments Section */}
                <Typography variant="h6" gutterBottom>
                    ಪ್ರತಿಕ್ರಿಯೆಗಳು
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={2}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="ನಿಮ್ಮ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಬರೆಯಿರಿ..."
                    />
                    <Button 
                        variant="contained" 
                        onClick={handleComment}
                        sx={{ mt: 1 }}
                    >
                        ಪ್ರತಿಕ್ರಿಯೆ ನೀಡಿ
                    </Button>
                </Box>

                <List>
                    {article.comments.map((comment) => (
                        <ListItem key={comment.id} alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar>{comment.author[0]}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={comment.text}
                                secondary={
                                    <>
                                        <Typography component="span" variant="body2">
                                            {comment.author} • 
                                        </Typography>
                                        {" "}
                                        {new Date(comment.timestamp).toLocaleString()}
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Card>
        </Container>
    );
};

export default ArticleDetail;
