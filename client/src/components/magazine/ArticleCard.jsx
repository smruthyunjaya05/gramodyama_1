import { 
    Card, CardContent, CardMedia, 
    Typography, Button, Box 
} from '@mui/material';
import { ThumbUp, Comment, Share } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';

const ArticleCard = ({ article }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/magazine/article/${article.id}`);
    };

    return (
        <Card onClick={handleClick} sx={{ cursor: 'pointer' }}>
            <CardMedia
                component="img"
                height="200"
                image={article.image}
                alt={article.title}
            />
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {article.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {article.summary}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Button startIcon={<ThumbUp />}>
                        {article.likes}
                    </Button>
                    <Button startIcon={<Comment />}>
                        {article.comments.length}
                    </Button>
                    <Button startIcon={<Share />}>
                        ಹಂಚಿಕೊಳ್ಳಿ
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ArticleCard;
