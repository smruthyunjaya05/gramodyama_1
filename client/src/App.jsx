import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SchemeDetails from './pages/SchemeDetails';
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
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="scheme-details" element={<SchemeDetails />} />
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
          
          <Route path="/courses/:id/progress" element={<CourseProgress />} />
          <Route path="/courses/:id/learn" element={<CourseLearning />} />
          
          


        
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


