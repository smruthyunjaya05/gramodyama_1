import { useState } from 'react';
import { Container, Tabs, Tab, Box } from '@mui/material';
import CreatePost from './CreatePost';
import IdeaFeed from './IdeaFeed';

const IdeasHub = () => {
    const [currentTab, setCurrentTab] = useState(0);

    return (
        <Container maxWidth="lg">
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)}>
                    <Tab label="ಹೊಸ ನೋಡಿ" />
                    <Tab label="ನಿಮ್ಮ ಕಲ್ಪನೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ" />
                </Tabs>
            </Box>

            {currentTab === 0 && <IdeaFeed />}
            {currentTab === 1 && <CreatePost />}
        </Container>
    );
};

export default IdeasHub;
