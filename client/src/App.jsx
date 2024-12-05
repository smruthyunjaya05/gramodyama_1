import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

import ResourceLibrary from './pages/ResourceLibrary';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import './App.css';
import './styles/pages.css';
import './styles/experts.css';
import SkillsDevelopment from './components/home/SkillsDevelopment';
import ExpertList from './components/experts/ExpertList';
import ExpertProfile from './components/experts/ExpertProfile';
import Videos from './components/library/Videos';
import Articles from './components/library/Articles';
import CoursesList from './components/courses/CoursesList';
import CourseDetail from './components/courses/CourseDetail';
import UserCourses from './components/courses/UserCourses';
import Certificate from './components/courses/Certificate';
import CourseProgress from './components/courses/CourseProgress';
import CourseLearning from './components/courses/CourseLearning';
import SchemesList from './components/schemes/SchemesList';
import SchemeDetails from './components/schemes/SchemeDetails';
import ApplicationProcess from './components/schemes/ApplicationProcess';
import IdeasHub from './components/ideas/IdeasHub';

import CreatePost from './components/ideas/CreatePost';
import IdeaFeed from './components/ideas/IdeaFeed';
import IdeaDetail from './components/ideas/IdeaDetail';
import InvestmentPage from './components/ideas/InvestmentPage';
import InvestmentDashboard from './components/dashboard/InvestmentDashboard';
import CommunityHub from './components/community/CommunityHub';
import MagazineHome from './components/magazine/MagazineHome';
import SubmitArticle from './components/magazine/SubmitArticle';


import ArticleDetail from './components/magazine/ArticleDetail';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
         
          <Route path="/" element={<SkillsDevelopment />} />
          <Route path="/experts/:expertType" element={<ExpertList />} />
          <Route path="/experts/:expertType/:expertId" element={<ExpertProfile />} />
          <Route path="resources" element={<ResourceLibrary />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/experts/:expertType" element={<ExpertList />} />
          <Route path="/experts/:expertType/:expertId" element={<ExpertProfile />} />
          <Route path="/library/videos" element={<Videos />} />
          <Route path="/library/articles" element={<Articles />} />
          <Route path="/courses" element={<CoursesList />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/my-courses" element={<UserCourses />} />
          <Route path="/certificates" element={<Certificate />} />
          <Route path="/schemes" element={<SchemesList />} />
          <Route path="/schemes/:id" element={<SchemeDetails />} />
          <Route path="/schemes/:id/apply" element={<ApplicationProcess />} />
          <Route path="/ideas" element={<IdeasHub />} />
          <Route path="/courses/:id/certificate" element={<Certificate />} />
          <Route path="/courses/:id/progress" element={<CourseProgress />} />
          <Route path="/courses/:id/learn" element={<CourseLearning />} />
          <Route path="/ideas/create" element={<CreatePost />} />
          <Route path="/ideas" element={<IdeaFeed />} />
          <Route path="/ideas/:id" element={<IdeaDetail />} />
          <Route path="/ideas/:id/invest" element={<InvestmentPage />} />
          <Route path="/dashboard" element={<InvestmentDashboard />} />
          <Route path="/community/:ideaId" element={<CommunityHub />} />
          <Route path="/" element={<Home />} />
          
          <Route path="/magazine" element={<MagazineHome />} />
          <Route path="/magazine/submit" element={<SubmitArticle />} />
          <Route path="/magazine/article/:id" element={<ArticleDetail />} />
          


        
        </Route>
      </Routes>
    </Router>
  );
}

export default App;



import './styles/schemes.css';
