import React from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Card, Button, Grid, Typography } from '@mui/material';
import { Phone, Email, VideoLibrary, Article } from '@mui/icons-material';
import { experts } from '../../data/experts';

const ExpertProfile = () => {
  const { expertType, expertId } = useParams();
  
  const expert = experts[expertType]?.find(
    exp => exp.id === parseInt(expertId)
  );

  if (!expert) {
    return (
      <div className="expert-not-found">
        <Typography variant="h5">Expert profile not found</Typography>
      </div>
    );
  }

  return (
    <Card className="expert-profile">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <div className="expert-avatar">
            <Avatar src={expert.image} sx={{ width: 200, height: 200 }}/>
            <Typography variant="h5">{expert.name}</Typography>
            <Typography variant="subtitle1">{expert.designation}</Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h6">ಅನುಭವ</Typography>
          <Typography>{expert.experience}</Typography>
          
          <Typography variant="h6" sx={{ mt: 2 }}>ವಿಶೇಷತೆ</Typography>
          <Typography>{expert.specialization}</Typography>
          
          <div className="contact-options">
            <Button variant="contained" startIcon={<Phone />}>
              {expert.phone}
            </Button>
            <Button variant="contained" startIcon={<Email />}>
              {expert.email}
            </Button>
          </div>
          
          <div className="content-section">
            <Typography variant="h6">ವಿಡಿಯೋಗಳು</Typography>
            <Grid container spacing={2}>
              {expert.videos.map(video => (
                <Grid item xs={12} sm={6} key={video.id}>
                  <Card className="video-card">
                    <VideoLibrary />
                    <Typography>{video.title}</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            <Typography variant="h6" sx={{ mt: 3 }}>ಲೇಖನಗಳು</Typography>
            <Grid container spacing={2}>
              {expert.articles.map(article => (
                <Grid item xs={12} sm={6} key={article.id}>
                  <Card className="article-card">
                    <Article />
                    <Typography>{article.title}</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ExpertProfile;
