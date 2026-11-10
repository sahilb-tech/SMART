import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TeachingLearning from './pages/TeachingLearning.jsx';
import Exercises from './pages/Exercises.jsx';
import ResultsProgress from './pages/ResultsProgress.jsx';
import PeriodicTests from './pages/PeriodicTests.jsx';
import StudyMaterial from './pages/StudyMaterial.jsx';
import MyClasses from './pages/MyClasses.jsx';
import {
  LayoutDashboard, Presentation, BookOpen, ClipboardList, ChartNoAxesColumnIncreasing,
  CalendarDays, FolderOpen, UsersRound, Bell, ChevronDown, ChevronRight, Play,
  BookMarked, List, Zap, Monitor, CheckSquare, FileText, Clock3, CircleCheck,
  CirclePlay, Circle, Menu, X, Search, ArrowUpRight, GraduationCap, Plus, Upload,
  Video, Link as LinkIcon, ClipboardCheck
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Teaching & Learning', icon: Presentation },
  { label: 'Exercises', icon: ClipboardList },
  { label: 'Periodic Tests', icon: CalendarDays },
  { label: 'Results & Progress', icon: ChartNoAxesColumnIncreasing },
  { label: 'My Classes', icon: UsersRound },
  { label: 'Resource Library', icon: FolderOpen },
];
const classRows = [
  ['Foundation 1 – Section A', '28 Students', 'purple'],
  ['Foundation 2 – Section A', '26 Students', 'blue'],
  ['Foundation 3 – Section B', '24 Students', 'green'],
  ['Foundation 4 – Section A', '27 Students', 'orange'],
];

function Sidebar({ active, setActive, open, close }) {
  return <>
    {open && <button className="mobile-scrim" aria-label="Close navigation" onClick={close} />}
    <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><Monitor size={27}/><GraduationCap size={14} className="brand-cap"/></div><div><div className="brand-name">VICO</div><div className="brand-sub">Virtual Interactive<br/>Computer Education</div></div><button className="close-menu" onClick={close} aria-label="Close menu"><X size={20}/></button></div>
      <nav className="nav-list">{navItems.map(({label, icon: Icon}) => <button key={label} className={`nav-item ${active === label ? 'active' : ''}`} onClick={() => {setActive(label); close();}}><Icon size={22}/><span>{label}</span></button>)}</nav>
      <div className="sidebar-art"><div className="art-spark spark-one">✦</div><div className="art-spark spark-two">✧</div><div className="art-laptop"><Monitor size={64}/><span>&lt;/&gt;</span></div><div className="art-robot"><div className="robot-antenna"/><div className="robot-face"><i/><i/></div><div className="robot-body"/></div></div>
      <div className="sidebar-footer"><span className="status-dot"/> Teacher workspace <span className="version">v1.0</span></div>
    </aside>
  </>;
}

function Topbar({ foundation, setFoundation, setMenuOpen, onAddNew }) {
  const classByFoundation = { 'Foundation 1': 'Class 1', 'Foundation 2': 'Class 2', 'Foundation 3': 'Class 3', 'Foundation 4': 'Class 4' };
  const combinedValue = `${foundation} · ${classByFoundation[foundation] || 'Class not configured'}`;
  return <header className="topbar"><button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu/></button><div className="mobile-page-title">VICO</div><div className="top-controls"><button className="global-add-button" onClick={onAddNew}><Plus size={17}/> Add New</button><label className="select-label foundation-context"><span>Curriculum:</span><select aria-label="Select Foundation and Class" value={foundation} onChange={e => setFoundation(e.target.value)}>{['Foundation 1','Foundation 2','Foundation 3','Foundation 4'].map(x=><option key={x} value={x}>{x} · {classByFoundation[x]}</option>)}</select><ChevronDown size={17}/></label><button className="icon-button notification" aria-label="Notifications"><Bell size={22}/><i/></button><button className="profile"><div className="avatar">S</div><span><b>Mr. Sharma</b><small>Teacher</small></span><ChevronDown size={16}/></button></div></header>;
}

function StatCard({ icon: Icon, label, value, tone }) { return <div className={`stat-card ${tone}`}><div className="stat-icon"><Icon size={29}/></div><div><div className="stat-label">{label}</div><div className="stat-value">{value}</div></div></div>; }
function PanelTitle({ icon: Icon, children, action }) { return <div className="panel-title"><div><Icon size={23}/><h2>{children}</h2></div>{action && <button className="text-action">{action}<ArrowUpRight size={15}/></button>}</div>; }

function Dashboard({ foundation, classroom, setActive }) {
  const [taught, setTaught] = useState(false);
  const foundationNum = Number((foundation.match(/\d+/) || ['1'])[0]);
  const chapter = foundationNum === 1 ? 'Chapter 1: The Super Machine: Computer' : foundationNum === 2 ? 'Chapter 1: More About a Computer' : `Chapter 1: ${foundation} textbook`;
  const topic = foundationNum === 1 ? 'What is a Machine?' : foundationNum === 2 ? 'What is a computer?' : 'Curriculum not added yet';
  return <div className="dashboard-content">
    <section className="welcome-banner"><div className="welcome-copy"><div className="eyebrow">YOUR TEACHING SPACE</div><h1>Good morning, Mr. Sharma! <span className="wave">👋</span></h1><p>Continue teaching, assign activities, and track your students’ progress with VICO.</p></div><div className="welcome-illustration"><div className="plant plant-one"/><div className="plant plant-two"/><div className="screen-art"><Monitor size={52}/><div className="chip-art">▦</div><div className="code-art">&lt;/&gt;</div></div><div className="teacher-art"><div className="teacher-hair"/><div className="teacher-head"><span/><i/><i/></div><div className="teacher-shirt"/><div className="teacher-arm"/></div><div className="book-stack"><span/><span/><span/></div></div></section>
    <section className="stats-grid"><StatCard icon={UsersRound} label="My Classes" value="4" tone="lavender"/><StatCard icon={BookOpen} label="Chapters" value={foundationNum <= 2 ? '9' : '—'} tone="mint"/><StatCard icon={CirclePlay} label="Topics Taught" value={taught ? '17' : '16'} tone="sky"/><StatCard icon={CheckSquare} label="Pending Evaluation" value="7" tone="peach"/></section>
    <section className="main-panels"><div className="panel today-panel"><PanelTitle icon={CalendarDays}>Today’s Teaching</PanelTitle><div className="lesson-content"><div className="book-cover"><div className="cover-label">{foundation}</div><strong>{foundationNum === 1 ? <>The Super<br/>Machine</> : foundationNum === 2 ? <>Mastering<br/>Coding</> : <>Foundation<br/>Content</>}</strong><small>{foundationNum === 1 ? 'Computer' : foundationNum === 2 ? 'AI and Robotics' : 'To be added'}</small><div className="mini-robot">●<span>●</span></div></div><div className="lesson-info"><span className="pill">{foundation} <b>•</b> {classroom}</span><h3>{chapter}</h3><p>Next Topic: {topic}</p><div className="lesson-progress-label"><span>{taught ? '1' : '0'} of 4 topics taught</span><b>{taught ? '25%' : '0%'}</b></div><div className="progress-track"><span style={{width: taught ? '25%' : '0%'}}/></div></div></div><div className="lesson-actions"><button className="primary-button" onClick={() => {setTaught(true); setActive('Teaching & Learning')}}><Play size={17} fill="currentColor"/>Start Teaching</button><button className="secondary-button" onClick={() => setActive('Teaching & Learning')}><BookOpen size={18}/>Open Chapter</button><button className="secondary-button view-topics" onClick={() => setActive('Teaching & Learning')}><List size={19}/>View Topics</button></div></div>
    <div className="panel quick-panel"><PanelTitle icon={Zap}>Quick Actions</PanelTitle><div className="quick-grid"><button onClick={() => setActive('Teaching & Learning')}><Monitor className="q-purple" size={29}/><span>Teach a Lesson</span></button><button onClick={() => setActive('Exercises')}><CheckSquare className="q-green" size={29}/><span>Assign Exercise</span></button><button onClick={() => setActive('Periodic Tests')}><ClipboardList className="q-blue" size={29}/><span>Create Test</span></button><button onClick={() => setActive('Resource Library')}><FolderOpen className="q-orange" size={29}/><span>Add Study Material</span></button></div></div></section>
    <section className="bottom-grid"><div className="panel classes-panel"><PanelTitle icon={UsersRound} action="View All →">My Classes</PanelTitle><div className="class-list">{classRows.map(([name,count,tone])=><button className="class-row" key={name} onClick={() => setActive('My Classes')}><span className={`class-icon ${tone}`}><Monitor size={19}/></span><strong>{name}</strong><small>{count}</small><ChevronRight size={17}/></button>)}</div></div><div className="panel tests-panel"><PanelTitle icon={CalendarDays} action="View All →">Upcoming Tests</PanelTitle><button className="test-row" onClick={() => setActive('Periodic Tests')}><span className="test-icon"><ClipboardList size={22}/></span><span className="test-details"><b>Periodic Test 1</b><small>{foundation} • {classroom}</small></span><span className="date-badge red">In 3 days</span></button><button className="test-row" onClick={() => setActive('Periodic Tests')}><span className="test-icon"><ClipboardList size={22}/></span><span className="test-details"><b>Periodic Test 2</b><small>Foundation 2 • Section A</small></span><span className="date-badge blue">In 7 days</span></button></div><div className="panel progress-panel"><PanelTitle icon={ChartNoAxesColumnIncreasing}>Class Progress <small>({foundation} – {classroom})</small></PanelTitle><div className="progress-summary"><div className="donut"><div><strong>72%</strong><span>Overall<br/>Progress</span></div></div><div className="progress-legend"><div><CircleCheck size={19}/><span>Topics Completed</span><b>26</b></div><div><CirclePlay size={19}/><span>Topics In Progress</span><b>6</b></div><div><Circle size={19}/><span>Topics Not Started</span><b>4</b></div></div></div></div></section>
    <section className="dashboard-followup-grid">
      <div className="panel followup-panel"><PanelTitle icon={Clock3} action="Open Exercises →">Pending Work</PanelTitle>
        <button className="followup-row" onClick={()=>setActive('Exercises')}><span className="followup-icon peach"><ClipboardCheck size={18}/></span><span><b>Exercise submissions to review</b><small>7 student submissions are awaiting evaluation</small></span><strong>7</strong></button>
        <button className="followup-row" onClick={()=>setActive('Periodic Tests')}><span className="followup-icon sky"><FileText size={18}/></span><span><b>Periodic test preparation</b><small>Review the upcoming question paper</small></span><ChevronRight size={17}/></button>
      </div>
      <div className="panel followup-panel"><PanelTitle icon={Zap}>Recent Activity</PanelTitle>
        <div className="activity-row"><span className="activity-dot purple-dot"/><span><b>Teaching workspace ready</b><small>{foundation} · {classroom} curriculum selected</small></span><time>Now</time></div>
        <div className="activity-row"><span className="activity-dot green-dot"/><span><b>Lesson progress saved locally</b><small>Completed topics are reflected in this browser</small></span><time>Recent</time></div>
        <div className="activity-row"><span className="activity-dot blue-dot"/><span><b>Resource library available</b><small>Browse textbook and supplementary materials</small></span><time>Recent</time></div>
      </div>
    </section>
  </div>;
}

const routeMap = {
  'Dashboard': '/', 'Teaching & Learning': '/teaching-learning', 'Exercises': '/exercises',
  'Periodic Tests': '/periodic-tests', 'Results & Progress': '/results-progress',
  'My Classes': '/my-classes', 'Resource Library': '/resource-library'
};
function PageRouter({active, foundation, classroom, setActive, resources, onAddResource}) {
  const props = {foundation, classroom};
  switch(active) {
    case 'Teaching & Learning': return <TeachingLearning {...props} resources={resources} onAddResource={onAddResource}/>;
    case 'Exercises': return <Exercises {...props}/>;
    case 'Results & Progress': return <ResultsProgress {...props}/>;
    case 'Periodic Tests': return <PeriodicTests {...props}/>;
    case 'Resource Library': return <StudyMaterial {...props} resources={resources} onAddResource={onAddResource}/>;
    case 'My Classes': return <MyClasses {...props}/>;
    default: return <Dashboard {...props} setActive={setActive}/>;
  }
}
function AddNewModal({open,onClose,onSave,foundation,classroom}) {
 const [kind,setKind]=useState('Study material'); const [title,setTitle]=useState(''); const [description,setDescription]=useState(''); const [chapter,setChapter]=useState(''); const [topic,setTopic]=useState(''); const [visibility,setVisibility]=useState('Selected class'); const [file,setFile]=useState(null); const [url,setUrl]=useState('');
 React.useEffect(()=>{if(open){setKind('Study material');setTitle('');setDescription('');setChapter('');setTopic('');setVisibility('Selected class');setFile(null);setUrl('');}},[open]);
 if(!open)return null;
 const submit=e=>{e.preventDefault();if(!title.trim())return;onSave({kind,title:title.trim(),description,chapter,topic,visibility,foundation,classroom,fileName:file?.name||'',type:kind==='Study material'?(file?.type?.includes('video')?'Video':file?.type?.includes('image')?'Image':file?'PDF Document':url?'External Link':'Document'):kind==='PPT presentation'?'PowerPoint presentation':kind,url,createdAt:new Date().toISOString(),meta:`${foundation} · ${classroom}${chapter?' · '+chapter:''}`,tone:'purple',status:'Draft'});onClose();};
 return <div className="modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><form className="add-modal" onSubmit={submit}><div className="modal-heading"><div><span className="eyebrow">VICO CONTENT WORKSPACE</span><h2>Add New Content</h2><p>Create content and associate it with the selected class and curriculum.</p></div><button type="button" className="modal-close" onClick={onClose}><X size={20}/></button></div><label className="form-field"><span>Content type</span><select value={kind} onChange={e=>setKind(e.target.value)}><option>Study material</option><option>PPT presentation</option><option>Lesson note</option><option>Exercise</option><option>Periodic test</option><option>Question bank item</option></select></label><label className="form-field"><span>Title *</span><input required value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Introduction to Machines"/></label><label className="form-field"><span>Description</span><textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Add a short description..." rows="2"/></label><div className="form-two"><label className="form-field"><span>Foundation</span><input value={foundation} readOnly/></label><label className="form-field"><span>Class / Section</span><input value={classroom} readOnly/></label></div><div className="form-two"><label className="form-field"><span>Chapter (optional)</span><input value={chapter} onChange={e=>setChapter(e.target.value)} placeholder="Chapter 1"/></label><label className="form-field"><span>Topic (optional)</span><input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="What is a Machine?"/></label></div>{kind==='Study material'||kind==='PPT presentation'?<><label className="form-field"><span>Attach a file</span><input type="file" accept={kind==='PPT presentation'?'.ppt,.pptx,.pdf':'.pdf,.doc,.docx,.ppt,.pptx,.png,.jpg,.jpeg,.mp4,.webm'} onChange={e=>setFile(e.target.files?.[0]||null)}/><small>Frontend demo only: the selected filename is recorded; no file is uploaded to a server.</small></label><label className="form-field"><span>Or resource URL</span><input type="url" value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://..."/></label></>:null}<label className="form-field"><span>Visibility</span><select value={visibility} onChange={e=>setVisibility(e.target.value)}><option>Private</option><option>Selected class</option><option>Selected students</option></select></label><div className="modal-actions"><button type="button" className="secondary-button" onClick={onClose}>Cancel</button><button type="submit" className="primary-button"><Plus size={16}/> Save as draft</button></div></form></div>;
}
export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const active = Object.entries(routeMap).find(([,path]) => path === location.pathname)?.[0] || 'Dashboard';
  const setActive = (label) => navigate(routeMap[label] || '/');
  const [foundation, setFoundation] = useState('Foundation 1');
  const [classroom, setClassroom] = useState('Class 1');
  const [menuOpen, setMenuOpen] = useState(false);
  const [addOpen,setAddOpen]=useState(false);
  const [resources,setResources]=useState(()=>{try{return JSON.parse(localStorage.getItem('vico-teacher-resources')||'[]')}catch{return []}});
  const saveContent=item=>{if(item.kind==='Study material'||item.kind==='PPT presentation'){const next=[{...item,kind:item.kind==='PPT presentation'?'image':'file',tag:item.kind==='PPT presentation'?'Presentation':'Resource'} ,...resources];setResources(next);try{localStorage.setItem('vico-teacher-resources',JSON.stringify(next))}catch{}}else{try{const current=JSON.parse(localStorage.getItem('vico-teacher-created-content')||'[]');localStorage.setItem('vico-teacher-created-content',JSON.stringify([item,...current]));}catch{}}};
  return <div className="app-shell"><Sidebar active={active} setActive={setActive} open={menuOpen} close={() => setMenuOpen(false)}/><main className="main-area"><Topbar foundation={foundation} setFoundation={(value)=>{setFoundation(value);setClassroom({'Foundation 1':'Class 1','Foundation 2':'Class 2','Foundation 3':'Class 3','Foundation 4':'Class 4'}[value] || 'Class not configured');}} setMenuOpen={setMenuOpen} onAddNew={()=>setAddOpen(true)}/><PageRouter active={active} foundation={foundation} classroom={classroom} setActive={setActive} resources={resources} onAddResource={()=>setAddOpen(true)}/><footer className="app-footer">© 2026 VICO · Virtual Interactive Computer Education <span>Made for better teaching</span></footer></main><AddNewModal open={addOpen} onClose={()=>setAddOpen(false)} onSave={saveContent} foundation={foundation} classroom={classroom}/></div>;
}
