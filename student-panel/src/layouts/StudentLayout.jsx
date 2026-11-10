import { NavLink, Outlet } from 'react-router-dom'
import { useState } from 'react'
import { BookOpen, ClipboardCheck, FileText, GraduationCap, LayoutDashboard, Menu, TrendingUp, X, Bell, ChevronDown, Monitor, Sparkles } from 'lucide-react'

const navigation = [
  { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/student/learning', label: 'My Learning', icon: BookOpen },
  { to: '/student/exercises', label: 'Exercises', icon: ClipboardCheck },
  { to: '/student/periodic-tests', label: 'Periodic Tests', icon: FileText },
  { to: '/student/progress', label: 'Results & Progress', icon: TrendingUp },
  { to: '/student/study-materials', label: 'Study Materials', icon: GraduationCap },
]

export default function StudentLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [foundation, setFoundation] = useState(() => localStorage.getItem('SMART:selected-foundation') || 'Foundation 1')
  const classNumber = foundation.match(/\d+/)?.[0] || '1'
  const chooseFoundation = value => {
    setFoundation(value)
    localStorage.setItem('SMART:selected-foundation', value)
    window.dispatchEvent(new CustomEvent('SMART-foundation-change', { detail: value }))
  }
  return <div className="app-shell student-teacher-shell">
    {menuOpen && <button className="scrim" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
    <aside className={`sidebar student-purple-sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
      <div className="brand student-brand">
        <div className="brand-mark"><Monitor size={25}/></div>
        <div><strong>SMART</strong><span>Virtual Interactive<br/>Computer Education</span></div>
        <button className="icon-button mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={19}/></button>
      </div>
      <nav className="nav-list student-nav-list">{navigation.map(({to,label,icon:Icon})=><NavLink key={to} to={to} onClick={()=>setMenuOpen(false)} className={({isActive})=>`nav-link ${isActive?'active':''}`}><Icon size={20} strokeWidth={1.9}/><span>{label}</span></NavLink>)}</nav>
      <div className="sidebar-bottom student-sidebar-art">
        <img className="student-sidebar-buddy" src="/images/SMART-learning-buddy-sidebar.png" alt="SMART cartoon learning buddy" />
        <strong>Keep exploring!</strong>
        <p>Learn something new, one lesson at a time.</p>
        <div className="sidebar-version"><i/> Student workspace <span>v1.0</span></div>
      </div>
    </aside>
    <div className="main-area student-main-area">
      <header className="topbar student-topbar">
        <button className="icon-button mobile-menu" onClick={()=>setMenuOpen(true)} aria-label="Open menu"><Menu size={21}/></button>
        <div className="topbar-context">SMART <span>/</span> <b>Student Workspace</b></div>
        <div className="student-meta">
          <span className="topbar-label">Curriculum:</span>
          <label className="class-chip curriculum-top-select"><span>{foundation} · Class {classNumber}</span><select aria-label="Choose foundation" value={foundation} onChange={e=>chooseFoundation(e.target.value)}>{[1,2,3,4].map(n=><option key={n} value={`Foundation ${n}`}>Foundation {n} · Class {n}</option>)}</select><ChevronDown size={14}/></label>
          <button className="icon-button notification-button" aria-label="Notifications"><Bell size={19}/><i/></button>
          <div className="student-avatar">S</div><span className="student-name">Student<small>Learner</small></span><ChevronDown size={14}/>
        </div>
      </header>
      <main className="page-container"><Outlet /></main>
      <footer className="footer student-footer">© 2026 SMART · Virtual Interactive Computer Education <span>Made for curious minds</span></footer>
    </div>
  </div>
}
