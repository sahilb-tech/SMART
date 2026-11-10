import { Navigate, Route, Routes } from 'react-router-dom'
import StudentLayout from './layouts/StudentLayout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import MyLearning from './pages/MyLearning.jsx'
import Exercises from './pages/Exercises.jsx'
import PeriodicTests from './pages/PeriodicTests.jsx'
import ResultsProgress from './pages/ResultsProgress.jsx'
import StudyMaterials from './pages/StudyMaterials.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return <Routes>
    <Route path="/student" element={<StudentLayout />}>
      <Route index element={<Navigate to="dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="learning" element={<MyLearning />} />
      <Route path="exercises" element={<Exercises />} />
      <Route path="periodic-tests" element={<PeriodicTests />} />
      <Route path="progress" element={<ResultsProgress />} />
      <Route path="study-materials" element={<StudyMaterials />} />
    </Route>
    <Route path="/" element={<Navigate to="/student/dashboard" replace />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
}
