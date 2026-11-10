import { FileText } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
export default function PeriodicTests() {
  return <div><PageHeader title="Periodic Tests" description="View scheduled assessments and check your published test results."/>
    <div className="test-grid"><article className="test-card"><span className="test-tag">PERIODIC TEST 1</span><h2>Test 1</h2><p>Chapters and schedule will be shared by your teacher.</p><span className="status-muted">Not scheduled</span></article><article className="test-card"><span className="test-tag">PERIODIC TEST 2</span><h2>Test 2</h2><p>Chapters and schedule will be shared by your teacher.</p><span className="status-muted">Not scheduled</span></article></div>
    <div className="notice-card"><FileText size={20}/><div><strong>Assessment information</strong><p>Test instructions, duration, question papers and results will be visible when published by your school.</p></div></div>
  </div>
}
