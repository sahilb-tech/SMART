import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight, BookOpen, CheckCircle2, Clock3, FileText, Flame, Gamepad2,
  GraduationCap, Laptop, Play, Sparkles, Target, Trophy, Zap
} from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import StatCard from '../components/StatCard.jsx'
import f1 from '../curriculum/foundation1/class1.json'
import f2 from '../curriculum/foundation2/class2.json'
import f3 from '../curriculum/foundation3/class3.json'
import f4 from '../curriculum/foundation4/class4.json'

const books = { 'Foundation 1': f1, 'Foundation 2': f2, 'Foundation 3': f3, 'Foundation 4': f4 }
const read = key => { try { return JSON.parse(localStorage.getItem(key) || '{}') } catch { return {} } }

export default function Dashboard() {
  const [foundation, setFoundation] = useState(() => localStorage.getItem('vico:selected-foundation') || 'Foundation 1')
  const [progress, setProgress] = useState(() => read(`vico:student-progress:${(localStorage.getItem('vico:selected-foundation') || 'Foundation 1').toLowerCase().replace(' ', '-')}`))
  useEffect(() => {
    const sync = e => setFoundation(e.detail || localStorage.getItem('vico:selected-foundation') || 'Foundation 1')
    const syncProgress = () => setProgress(read(`vico:student-progress:${foundation.toLowerCase().replace(' ', '-')}`))
    window.addEventListener('vico-foundation-change', sync)
    window.addEventListener('vico-progress-change', syncProgress)
    window.addEventListener('storage', syncProgress)
    return () => {
      window.removeEventListener('vico-foundation-change', sync)
      window.removeEventListener('vico-progress-change', syncProgress)
      window.removeEventListener('storage', syncProgress)
    }
  }, [foundation])
  useEffect(() => setProgress(read(`vico:student-progress:${foundation.toLowerCase().replace(' ', '-')}`)), [foundation])

  const book = books[foundation] || f1
  const chapters = book.chapters || []
  const topics = chapters.flatMap(ch => (ch.topics || []).map(topic => ({ ...topic, chapter: ch })))
  const completed = topics.filter(t => progress[t.id] === 'completed').length
  const percent = topics.length ? Math.round(completed / topics.length * 100) : 0
  const next = topics.find(t => progress[t.id] !== 'completed') || topics[0]
  const chapterProgress = chapters.map(ch => {
    const count = ch.topics?.length || 0
    const done = (ch.topics || []).filter(t => progress[t.id] === 'completed').length
    return { ...ch, count, done, percent: count ? Math.round(done / count * 100) : 0 }
  })
  const nextChapter = next?.chapter
  const foundationNumber = foundation.match(/\d+/)?.[0] || '1'

  return <div className="student-dashboard">
    <PageHeader title="Good morning, learner!" description={`Ready to discover something new? Continue your ${book.foundation} learning journey with VICO.`} />

    <section className="student-hero">
      <div className="student-hero-copy">
        <span className="student-hero-kicker"><Sparkles size={15}/> YOUR LEARNING JOURNEY</span>
        <h2>Learn, explore and have fun!</h2>
        <p>{book.textbook_title} · {book.class_name} · {chapters.length} chapters waiting for you.</p>
        <Link className="student-hero-button" to="/student/learning">Continue My Learning <ArrowRight size={17}/></Link>
      </div>
      <div className="student-hero-art" aria-hidden="true">
        <div className="student-hero-orbit"></div>
        <img className="student-hero-character" src="/images/vico-student-hero-character.png" alt="" />
      </div>
    </section>

    <section className="stats-grid student-stats-grid">
      <StatCard label="Learning progress" value={`${percent}%`} note={`${completed} of ${topics.length} topics completed`} icon={Target}/>
      <StatCard label="Chapters" value={chapters.length} note="In your selected textbook" icon={BookOpen}/>
      <StatCard label="Topics to learn" value={topics.length - completed} note={`${completed} topics completed`} icon={CheckCircle2}/>
      <StatCard label="Study materials" value="1" note="Your assigned textbook" icon={FileText}/>
    </section>

    <div className="student-dashboard-main-grid">
      <section className="student-dashboard-panel today-learning-panel">
        <div className="student-panel-heading"><div><CalendarIcon/><h2>Today's Learning</h2></div><span className="student-today-pill">{book.foundation} · {book.class_name}</span></div>
        {next ? <div className="today-learning-content">
          <div className="today-book-cover"><span>{book.foundation}</span><strong>{book.textbook_title}</strong><small>VICO LEARNING</small><div>💻</div></div>
          <div className="today-learning-detail">
            <span className="student-eyebrow">CHAPTER {nextChapter?.chapter_number} · {book.foundation.toUpperCase()}</span>
            <h3>{nextChapter?.title}</h3>
            <h4>Next topic: {next.title}</h4>
            <p>{next.content}</p>
            <div className="today-progress-meta"><span>{nextChapter?.topics?.filter(t => progress[t.id] === 'completed').length || 0} of {nextChapter?.topics?.length || 0} topics completed</span><strong>{nextChapter?.topics?.length ? Math.round((nextChapter.topics.filter(t => progress[t.id] === 'completed').length / nextChapter.topics.length) * 100) : 0}%</strong></div>
            <div className="today-progress-track"><span style={{width:`${nextChapter?.topics?.length ? Math.round((nextChapter.topics.filter(t => progress[t.id] === 'completed').length / nextChapter.topics.length) * 100) : 0}%`}}/></div>
            <div className="today-learning-actions"><Link to="/student/learning" className="student-primary-action"><Play size={15} fill="currentColor"/> Start Learning</Link><Link to="/student/learning" className="student-secondary-action"><BookOpen size={15}/> Open Chapter</Link></div>
          </div>
        </div> : <div className="student-empty-today">Your lessons will appear here when a Foundation is selected.</div>}
      </section>

      <section className="student-dashboard-panel quick-actions-panel">
        <div className="student-panel-heading"><div><Zap size={21}/><h2>Quick Actions</h2></div></div>
        <div className="student-quick-actions">
          <Link to="/student/learning"><span className="quick-action-icon purple"><BookOpen size={23}/></span><strong>Explore Lessons</strong><small>Read your chapters</small></Link>
          <Link to="/student/exercises"><span className="quick-action-icon green"><Gamepad2 size={23}/></span><strong>Practise & Play</strong><small>Try learning activities</small></Link>
          <Link to="/student/periodic-tests"><span className="quick-action-icon blue"><FileText size={23}/></span><strong>Take a Test</strong><small>Check what you know</small></Link>
          <Link to="/student/study-materials"><span className="quick-action-icon orange"><GraduationCap size={23}/></span><strong>Study Materials</strong><small>Open your textbook</small></Link>
        </div>
      </section>
    </div>

    <div className="student-dashboard-lower-grid">
      <section className="student-dashboard-panel student-chapters-panel">
        <div className="student-panel-heading"><div><BookOpen size={21}/><h2>My Chapters</h2></div><Link to="/student/learning">View All <ArrowRight size={14}/></Link></div>
        <div className="student-chapter-list">{chapterProgress.slice(0,5).map((ch,i)=><Link to="/student/learning" key={ch.chapter_number} className="student-chapter-row">
          <span className={`student-chapter-icon chapter-tone-${i%4}`}><BookOpen size={17}/></span>
          <span className="student-chapter-info"><strong>{ch.title}</strong><small>{ch.done} of {ch.count} topics completed</small><span className="student-chapter-track"><i style={{width:`${ch.percent}%`}}/></span></span>
          <b>{ch.percent}%</b><ArrowRight size={14}/>
        </Link>)}</div>
      </section>

      <section className="student-dashboard-panel student-progress-panel">
        <div className="student-panel-heading"><div><Target size={21}/><h2>My Learning Progress</h2></div></div>
        <div className="student-progress-content">
          <div className="student-progress-ring" style={{'--progress':`${percent}%`}}><div><strong>{percent}%</strong><small>Completed</small></div></div>
          <div className="student-progress-breakdown">
            <div><span className="progress-dot done"/><span>Topics completed</span><strong>{completed}</strong></div>
            <div><span className="progress-dot todo"/><span>Topics remaining</span><strong>{topics.length-completed}</strong></div>
            <div><span className="progress-dot chapters"/><span>Total chapters</span><strong>{chapters.length}</strong></div>
          </div>
        </div>
        <div className="student-encouragement"><Trophy size={17}/><span>{percent===100?'Amazing! You completed this Foundation!':percent>=50?'Great progress! Keep going!':'Every lesson brings you closer to your goal. Keep exploring!'}</span></div>
      </section>
    </div>
    <div className="student-dashboard-footer-note"><Sparkles size={14}/> Keep learning a little every day. You're doing great!</div>
  </div>
}

function CalendarIcon(){ return <Clock3 size={21}/> }
