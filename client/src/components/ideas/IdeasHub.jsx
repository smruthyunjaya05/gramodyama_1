import { useState } from 'react';
import { Container, Tabs, Tab, Box } from '@mui/material';
import CreatePost from './CreatePost';
import IdeaFeed from './IdeaFeed';

const IdeasHub = () => {
    const [currentTab, setCurrentTab] = useState(0);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs 
                    value={currentTab} 
                    onChange={(e, newValue) => setCurrentTab(newValue)} 
                    indicatorColor="primary"
                    sx={{
                        '.MuiTabs-flexContainer': {
                            backgroundColor: '#f9f9f9', // Subtle background for tabs
                            borderRadius: '8px', // Rounded corners for the tab container
                        },
                        '.MuiTab-root': {
                            color: '#6e9735', // Default color for the tab label
                            '&.Mui-selected': {
                                color: '#ffffff', // White color for the selected tab label
                                backgroundColor: '#6e9735', // Green background for selected tab
                                borderRadius: '8px', // Rounded corners for the selected tab
                            },
                            '&:hover': {
                                backgroundColor: '#6e9735', // Hover background color
                                color: '#fff', // White color for hover text
                            },
                            padding: '10px 20px', // Adds more padding to make tabs larger
                        },
                        '.MuiTabs-indicator': {
                            backgroundColor: '#6e9735', // Indicator color for the selected tab
                        },
                    }}
                >
                    <Tab label="ಹೊಸ ನೋಡಿ" />
                    <Tab label="ನಿಮ್ಮ ಕಲ್ಪನೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ" />
                </Tabs>
            </Box>

            {/* Render content based on the selected tab */}
            {currentTab === 0 && <IdeaFeed />}
            {currentTab === 1 && <CreatePost />}
        </Container>
    );
};

export default IdeasHub;
