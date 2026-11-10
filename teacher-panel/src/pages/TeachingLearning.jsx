import React,{useState,useEffect} from 'react';
import {BookOpen,MonitorPlay,FolderOpen,History} from 'lucide-react';
import MyLearning from './MyLearning.jsx';
import StudyMaterial from './StudyMaterial.jsx';
import {PageShell,Section} from './PageUI.jsx';

const tabs=[['Curriculum',BookOpen],['Teaching Mode',MonitorPlay],['Resources',FolderOpen],['Teaching History',History]];
export default function TeachingLearning({foundation,classroom,resources,onAddResource}){
 const [tab,setTab]=useState('Curriculum');
 const [history,setHistory]=useState([]);
 useEffect(()=>{try{setHistory(JSON.parse(localStorage.getItem(`vico-teaching-sessions-${foundation}`)||'[]').filter(x=>x.classroom===classroom));}catch{setHistory([])}},[foundation,classroom,tab]);
 return <div className="generic-page teaching-learning-page">
  <div className="page-heading"><div className="page-heading-icon"><BookOpen size={27}/></div><div className="page-heading-copy"><div className="eyebrow">VICO TEACHER WORKSPACE</div><h1>Teaching &amp; Learning</h1><p>Explore your curriculum, prepare lessons, teach your class, and review teaching activity.</p></div></div>
  <div className="context-strip"><span><BookOpen size={16}/>{foundation}</span><span>Class: {classroom}</span><span className="context-live"><i/> Curriculum workspace</span></div>
  <div className="workspace-tabs" role="tablist">{tabs.map(([name,Icon])=><button key={name} role="tab" aria-selected={tab===name} className={tab===name?'selected':''} onClick={()=>setTab(name)}><Icon size={17}/>{name}</button>)}</div>
  {tab==='Curriculum'&&<MyLearning foundation={foundation} classroom={classroom}/>}
  {tab==='Teaching Mode'&&<MyLearning foundation={foundation} classroom={classroom} mode="teaching"/>}
  {tab==='Resources'&&<StudyMaterial foundation={foundation} classroom={classroom} resources={resources} onAddResource={onAddResource} embedded/>}
  {tab==='Teaching History'&&<Section icon={History} title="Teaching History"><div className="history-list">{history.length?history.map((row,i)=><div className="history-row" key={`${row.endedAt}-${i}`}><span className="history-index">{String(i+1).padStart(2,'0')}</span><div><b>{row.topic||row.chapter||'Classroom session'}</b><small>{row.chapter} · {foundation} · {classroom}</small></div><span className="history-date">{new Date(row.endedAt).toLocaleString()}</span></div>):<div className="resource-empty"><b>No teaching sessions recorded yet.</b><p>Start a classroom session in Teaching Mode. Completed sessions will appear here on this device.</p></div>}</div></Section>}
 </div>
}
