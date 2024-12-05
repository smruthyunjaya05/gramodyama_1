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
    AreaChart, 
    Area, 
    PieChart, 
    Pie, 
    Cell,
    ResponsiveContainer, 
    BarChart, 
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts';

const InvestmentDashboard = () => {
    const navigate = useNavigate();
    const [investments, setInvestments] = useState([]);
    const [portfolioValue, setPortfolioValue] = useState(0);
    const [timeFilter, setTimeFilter] = useState('all');
    const [chartType, setChartType] = useState('area');
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
            timestamp: idea.stats.investments.commitments[0].timestamp
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

    const renderChart = () => {
        const data = getFilteredData();
        
        if (data.length === 0) {
            return (
                <Typography variant="h6" align="center" sx={{ py: 4 }}>
                    ಯಾವುದೇ ಹೂಡಿಕೆಗಳು ಲಭ್ಯವಿಲ್ಲ
                </Typography>
            );
        }

        switch(chartType) {
            case 'area':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="title" />
                            <YAxis />
                            <Tooltip />
                            <Area 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#8884d8"
                                fill="#8884d8" 
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                );
            case 'pie':
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
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                );
            case 'bar':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="title" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                );
            default:
                return null;
        }
    };

    const handleCommunityClick = (ideaId) => {
        navigate(`/community/${ideaId}`);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel>ಸಮಯ ಅವಧಿ</InputLabel>
                            <Select
                                value={timeFilter}
                                onChange={(e) => setTimeFilter(e.target.value)}
                            >
                                <MenuItem value="all">ಎಲ್ಲಾ</MenuItem>
                                <MenuItem value="month">ತಿಂಗಳು</MenuItem>
                                <MenuItem value="quarter">ತ್ರೈಮಾಸಿಕ</MenuItem>
                                <MenuItem value="year">ವರ್ಷ</MenuItem>
                            </Select>
                        </FormControl>
                        <Tabs 
                            value={chartType} 
                            onChange={(e, v) => setChartType(v)}
                        >
                            <Tab label="ಏರಿಯಾ" value="area" />
                            <Tab label="ಪೈ" value="pie" />
                            <Tab label="ಬಾರ್" value="bar" />
                        </Tabs>
                    </Box>
                    <Card sx={{ p: 3 }}>
                        {renderChart()}
                    </Card>
                </Grid>

                {/* Investment List */}
                <Grid item xs={12}>
                    <Card sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>ನಿಮ್ಮ ಹೂಡಿಕೆಗಳು</Typography>
                        {investments.map((investment) => (
                            <Box key={investment.title} sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <Typography variant="h6">{investment.title}</Typography>
                                    <Typography color="textSecondary">
                                        ಹೂಡಿಕೆ: ₹{investment.value}
                                    </Typography>
                                </div>
                                <Button 
                                    variant="contained" 
                                    onClick={() => handleCommunityClick(investment.id)}
                                >
                                    ಸಮುದಾಯ ಹಬ್
                                </Button>
                            </Box>
                        ))}
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default InvestmentDashboard;