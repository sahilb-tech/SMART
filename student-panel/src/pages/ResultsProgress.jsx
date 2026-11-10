import { TrendingUp } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
export default function ResultsProgress() {
  return <div><PageHeader title="Results & Progress" description="Follow your learning progress, marks and teacher feedback."/>
    <div className="progress-summary"><div><span className="eyebrow">OVERALL LEARNING PROGRESS</span><h2>Not available yet</h2><p>Your progress will be calculated after your learning activity is connected.</p></div><div className="progress-ring"><span>—</span></div></div>
    <div className="empty-panel"><div className="empty-icon"><TrendingUp size={30}/></div><h3>Your results will appear here</h3><p>Published exercise marks, periodic test results, chapter progress and teacher feedback will be collected in this page.</p></div>
  </div>
}
