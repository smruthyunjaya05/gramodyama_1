import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Container, 
    Grid, 
    Card, 
    Typography, 
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Tabs,
    Tab,
    Button
} from '@mui/material';
import { 
    LineChart, Line, PieChart, Pie, Cell,
    ResponsiveContainer, XAxis, YAxis,
    CartesianGrid, Tooltip, Legend 
} from 'recharts';

const InvestmentDashboard = () => {
    const navigate = useNavigate();
    const [investments, setInvestments] = useState([]);
    const [portfolioValue, setPortfolioValue] = useState(0);
    const [timeFilter, setTimeFilter] = useState('all');
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    useEffect(() => {
        // Transform the data for charts
        const ideas = JSON.parse(localStorage.getItem('ideas')) || [];
        const userInvestments = ideas.filter(idea => 
            idea.stats?.investments?.commitments?.length > 0
        ).map(idea => ({
            id: idea.id,
            title: idea.title,
            value: idea.stats.investments.total || 0,
            timestamp: idea.stats.investments.commitments[0].timestamp,
            stats: idea.stats
        }));

        setInvestments(userInvestments);
        
        const totalValue = userInvestments.reduce((acc, inv) => acc + inv.value, 0);
        setPortfolioValue(totalValue);
    }, []);

    const getFilteredData = () => {
        const now = new Date();
        return investments.filter(inv => {
            const invDate = new Date(inv.timestamp);
            switch(timeFilter) {
                case 'month':
                    return now.getMonth() === invDate.getMonth();
                case 'quarter':
                    return now.getMonth() - invDate.getMonth() <= 3;
                case 'year':
                    return now.getFullYear() === invDate.getFullYear();
                default:
                    return true;
            }
        });
    };

    const renderPieChart = () => {
        const data = getFilteredData();
        
        return (
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="title"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        );
    };

    const renderInvestmentGraph = (investment) => {
        // Create time-series data for individual investment
        const commitments = investment.stats?.investments?.commitments || [];
        const timeData = commitments.map(commit => ({
            date: new Date(commit.timestamp).toLocaleDateString(),
            value: commit.amount,
            totalValue: investment.value,
            growthRate: ((investment.value / commit.amount - 1) * 100).toFixed(2)
        }));

        return (
            <ResponsiveContainer width="100%" height={200}>
                <LineChart data={timeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8884d8" 
                        name="ಹೂಡಿಕೆ ಮೌಲ್ಯ"
                    />
                </LineChart>
            </ResponsiveContainer>
        );
    };

    const handleCommunityClick = (ideaId) => {
        navigate(`/community/${ideaId}`);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Portfolio Overview with Pie Chart */}
                <Grid item xs={12}>
                    <Card sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            ಹೂಡಿಕೆ ವಿತರಣೆ
                        </Typography>
                        {renderPieChart()}
                    </Card>
                </Grid>

                {/* Individual Investment Cards */}
                {investments.map((investment) => (
                    <Grid item xs={12} key={investment.id}>
                        <Card sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <div>
                                    <Typography variant="h6">{investment.title}</Typography>
                                    <Typography color="textSecondary">
                                        ಹೂಡಿಕೆ: ₹{investment.value}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        ಪೋರ್ಟ್‌ಫೋಲಿಯೊ %: 
                                        {((investment.value / portfolioValue) * 100).toFixed(2)}%
                                    </Typography>
                                </div>
                                <Button 
                                    variant="contained" 
                                    onClick={() => handleCommunityClick(investment.id)}
                                >
                                    ಸಮುದಾಯ ಹಬ್
                                </Button>
                            </Box>
                            {renderInvestmentGraph(investment)}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
export default InvestmentDashboard;