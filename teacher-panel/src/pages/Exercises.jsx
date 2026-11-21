import React,{useEffect,useMemo,useState} from 'react';
import {ClipboardList,Plus,Search,Clock3,UsersRound,FileCheck2,ArrowRight,BookOpen,CheckCircle2,AlertCircle} from 'lucide-react';
import {PageShell,Metric,Section} from './PageUI.jsx';

const demoExercises=[
{id:'f2-01',foundation:'Foundation 2',classroom:'Class 2',title:'Getting to Know a Computer',chapter:'Chapter 1 — More About a Computer',description:'Computers, their types, parts and safe start-up and shut-down steps.',assigned:28,submitted:24,status:'Published',due:'Due tomorrow',tone:'purple',questions:[
{type:'Multiple choice',prompt:'What is a computer?',options:['An electronic machine','A kind of food','A water bottle','A toy car'],answer:'An electronic machine',marks:1},
{type:'Multiple choice',prompt:'Which of these is a portable computer?',options:['Desktop computer','Laptop computer','Mainframe computer','Supercomputer'],answer:'Laptop computer',marks:1},
{type:'True or false',prompt:'A computer can store information and process data.',options:['True','False'],answer:'True',marks:1},
{type:'Short answer',prompt:'Write any two tasks that a computer can help us perform.',answer:'Examples: typing, drawing, calculations or learning.',marks:2}]},
{id:'f2-02',foundation:'Foundation 2',classroom:'Class 2',title:'Applications of Computers',chapter:'Chapter 2 — Applications of Computers',description:'Uses of computers at school, home, hospitals, banks and other places.',assigned:26,submitted:26,status:'Published',due:'All submissions received',tone:'mint',questions:[
{type:'Multiple choice',prompt:'Where are computers used to maintain patient records?',options:['Hospital','Playground','Garden','Swimming pool'],answer:'Hospital',marks:1},
{type:'Fill in the blank',prompt:'Computers are used in banks to keep customer ________.',answer:'records / accounts',marks:1},
{type:'True or false',prompt:'Computers can help students learn and practise lessons.',options:['True','False'],answer:'True',marks:1},
{type:'Short answer',prompt:'Name two places where computers are used and give one use at each place.',answer:'Examples: school—teaching; bank—record keeping; hospital—patient records.',marks:2}]},
{id:'f2-03',foundation:'Foundation 2',classroom:'Class 2',title:'Keyboard and Mouse Basics',chapter:'Chapter 3 — Keyboard and Mouse',description:'Recognise common keyboard keys and practise pointing, clicking and selecting.',assigned:25,submitted:18,status:'Review',due:'Ready to evaluate',tone:'sky',questions:[
{type:'Multiple choice',prompt:'Which device is used to type letters and numbers?',options:['Monitor','Keyboard','Speaker','Printer'],answer:'Keyboard',marks:1},
{type:'Multiple choice',prompt:'Which mouse action is commonly used to select an item?',options:['Click','Print','Scan','Type'],answer:'Click',marks:1},
{type:'True or false',prompt:'The spacebar inserts a blank space between words.',options:['True','False'],answer:'True',marks:1},
{type:'Short answer',prompt:'Write one use of the mouse and one use of the keyboard.',answer:'Mouse: pointing/selecting. Keyboard: typing letters and numbers.',marks:2}]},
{id:'f2-04',foundation:'Foundation 2',classroom:'Class 2',title:'Input, Output and Storage Devices',chapter:'Chapter 4 — Parts of a Computer',description:'Sort familiar computer devices by their purpose: input, output or storage.',assigned:26,submitted:22,status:'Published',due:'Due in 2 days',tone:'peach',questions:[
{type:'Multiple choice',prompt:'Which of these is an input device?',options:['Keyboard','Monitor','Speaker','Printer'],answer:'Keyboard',marks:1},
{type:'Multiple choice',prompt:'Which device displays information from a computer?',options:['Mouse','Monitor','Microphone','Scanner'],answer:'Monitor',marks:1},
{type:'Matching',prompt:'Match each device to its main purpose.',pairs:[['Keyboard','Input'],['Monitor','Output'],['Pen drive','Storage']],answer:'Keyboard—Input; Monitor—Output; Pen drive—Storage',marks:3},
{type:'Short answer',prompt:'What is the purpose of a storage device?',answer:'A storage device keeps data and files for later use.',marks:2}]},
{id:'f2-05',foundation:'Foundation 2',classroom:'Class 2',title:'Understanding the IPO Cycle',chapter:'Chapter 5 — IPO Cycle',description:'Explore how machines and computers use input, process and output.',assigned:0,submitted:0,status:'Draft',due:'Not assigned',tone:'sky',questions:[
{type:'Multiple choice',prompt:'What does IPO stand for?',options:['Input, Process, Output','Internet, Program, Online','Inside, Print, Open','Input, Picture, Order'],answer:'Input, Process, Output',marks:1},
{type:'Multiple choice',prompt:'In a juice-making machine, the fruit supplied is the ________.',options:['Output','Input','Process','Storage'],answer:'Input',marks:1},
{type:'Short answer',prompt:'Write the three stages of the IPO cycle in the correct order.',answer:'Input → Process → Output.',marks:2}]},
{id:'f2-06',foundation:'Foundation 2',classroom:'Class 2',title:'Tux Paint Tools Practice',chapter:'Chapter 6 — Fun with Tux Paint',description:'Basic knowledge of the Tux Paint drawing area, tools and saving a picture.',assigned:28,submitted:17,status:'Published',due:'Due in 3 days',tone:'purple',questions:[
{type:'Multiple choice',prompt:'What is Tux Paint mainly used for?',options:['Drawing and painting','Sending emails','Calculating bills','Playing music'],answer:'Drawing and painting',marks:1},
{type:'Multiple choice',prompt:'Which tool can be used to draw freehand lines?',options:['Paint','Pencil','Text','Quit'],answer:'Pencil',marks:1},
{type:'True or false',prompt:'A drawing can be saved and opened later.',options:['True','False'],answer:'True',marks:1},
{type:'Short answer',prompt:'Write the names of any two tools available in Tux Paint.',answer:'Examples: Paint, Stamp, Lines, Shapes, Text, Magic or Eraser.',marks:2}]},
{id:'f2-07',foundation:'Foundation 2',classroom:'Class 2',title:'Sequencing, Patterns and Decoding',chapter:'Chapter 7 — Sequencing and Decoding',description:'Arrange steps, recognise repeating patterns and make simple decisions.',assigned:24,submitted:20,status:'Review',due:'Ready to evaluate',tone:'mint',questions:[
{type:'Multiple choice',prompt:'What is a sequence?',options:['Steps arranged in order','A random collection','A computer part','A drawing tool'],answer:'Steps arranged in order',marks:1},
{type:'Complete the pattern',prompt:'Complete: circle, square, circle, square, ______.',answer:'Circle',marks:1},
{type:'True or false',prompt:'A loop repeats a set of instructions.',options:['True','False'],answer:'True',marks:1},
{type:'Short answer',prompt:'Why should instructions be followed in the correct order?',answer:'The correct order helps a task or program work as expected.',marks:2}]},
{id:'f2-08',foundation:'Foundation 2',classroom:'Class 2',title:'Instructions and Direction Sense',chapter:'Chapter 8 — Instructions and Direction Sense',description:'Follow simple instructions and identify left, right, forward and backward.',assigned:0,submitted:0,status:'Draft',due:'Not assigned',tone:'peach',questions:[
{type:'Multiple choice',prompt:'Which direction is opposite to left?',options:['Right','Forward','Backward','Up'],answer:'Right',marks:1},
{type:'True or false',prompt:'Clear instructions help us complete a task in order.',options:['True','False'],answer:'True',marks:1},
{type:'Short answer',prompt:'Write two instructions to guide a friend to the classroom door.',answer:'Answers vary; steps should be clear and in a logical order.',marks:2}]},
{id:'f2-09',foundation:'Foundation 2',classroom:'Class 2',title:'Introduction to AI and Robotics',chapter:'Chapter 9 — AI and Robotics',description:'Simple ideas about artificial intelligence, robots and everyday examples.',assigned:27,submitted:20,status:'Published',due:'Due in 4 days',tone:'purple',questions:[
{type:'Multiple choice',prompt:'What is a robot?',options:['A machine programmed to do tasks','A kind of fruit','A paper notebook','A drawing colour'],answer:'A machine programmed to do tasks',marks:1},
{type:'Multiple choice',prompt:'Which is an example of an AI-enabled feature?',options:['Voice assistant','Plain pencil','Paper clip','Wooden ruler'],answer:'Voice assistant',marks:1},
{type:'True or false',prompt:'Robots need instructions or programming to perform tasks.',options:['True','False'],answer:'True',marks:1},
{type:'Short answer',prompt:'Name one robot or AI-enabled device used in everyday life.',answer:'Examples: robot vacuum, voice assistant, smart camera or educational robot.',marks:2}]},
];

function readExercises(){
 try{
  const saved=JSON.parse(localStorage.getItem('smart-teacher-exercises')||'null');
  return Array.isArray(saved)&&saved.length?saved:demoExercises;
 }catch{return demoExercises;}
}

export default function Exercises({foundation,classroom}){
 const [filter,setFilter]=useState('All');
 const [query,setQuery]=useState('');
 const [rows,setRows]=useState(readExercises);
 const [createOpen,setCreateOpen]=useState(false);
 const [draftTitle,setDraftTitle]=useState('');
 const [draftChapter,setDraftChapter]=useState('');
 const [selectedExercise,setSelectedExercise]=useState(null);

 useEffect(()=>{try{localStorage.setItem('smart-teacher-exercises',JSON.stringify(rows));}catch{}},[rows]);
 const classRows=useMemo(()=>rows.filter(r=>r.foundation===foundation&&r.classroom===classroom),[rows,foundation,classroom]);
 const filtered=useMemo(()=>classRows.filter(r=>(filter==='All'||r.status===filter)&&(r.title+' '+r.chapter).toLowerCase().includes(query.toLowerCase())),[classRows,filter,query]);
 const assignedTotal=classRows.reduce((sum,r)=>sum+(r.assigned||0),0);
 const submittedTotal=classRows.reduce((sum,r)=>sum+(r.submitted||0),0);
 const reviewTotal=classRows.filter(r=>r.status==='Review').reduce((sum,r)=>sum+(r.submitted||0),0);
 const completionRate=assignedTotal?Math.round(submittedTotal/assignedTotal*100):0;

 const saveDraft=e=>{
  e.preventDefault();
  if(!draftTitle.trim())return;
  setRows(prev=>[{id:'teacher-exercise-'+Date.now(),title:draftTitle.trim(),chapter:draftChapter.trim()||'Chapter not selected',description:'Teacher-created exercise draft.',foundation,classroom,questions:[],assigned:0,submitted:0,status:'Draft',due:'Not assigned',tone:'purple'},...prev]);
  setDraftTitle('');setDraftChapter('');setCreateOpen(false);setFilter('All');setQuery('');
 }

 const closePreview=()=>setSelectedExercise(null);

 return <PageShell icon={ClipboardList} title="Exercises" subtitle="Create textbook-aligned practice, assign work to classes, and review student submissions." foundation={foundation} classroom={classroom} action={{label:'Create Exercise',icon:<Plus size={17}/>,onClick:()=>setCreateOpen(true)}}>
  <div className="stats-grid">
   <Metric icon={ClipboardList} label="Exercises in library" value={classRows.length}/>
   <Metric icon={UsersRound} label="Student assignments" value={assignedTotal}/>
   <Metric icon={FileCheck2} label="Submissions to review" value={reviewTotal} tone="peach"/>
   <Metric icon={Clock3} label="Submission rate" value={completionRate+'%'} tone="mint"/>
  </div>
  {foundation==='Foundation 2'&&<div className="smart-inline-notice f2-demo-banner"><div className="smart-notice-icon peach"><BookOpen size={21}/></div><div><b>Foundation 2 · Class 2 demo exercises</b><p>Nine chapter-based sample exercises are loaded. These are demonstration questions and sample submission counts, not live student records.</p></div></div>}
  <Section icon={BookOpen} title="Exercise Library" action={{label:'Create exercise',onClick:()=>setCreateOpen(true)}}>
   <div className="card-toolbar">
    <label className="search-box"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search exercises or chapters..."/></label>
    <div className="filter-chips">{['All','Published','Review','Draft'].map(x=><button key={x} className={filter===x?'active':''} onClick={()=>setFilter(x)}>{x}</button>)}</div>
   </div>
   <div className="smart-card-grid">{filtered.map(r=>{
    const questionCount=r.questions?.length||0;
    const progress=r.assigned?Math.round(r.submitted/r.assigned*100):0;
    return <article className="smart-content-card" key={r.id||r.title}>
     <div className="smart-card-top"><div className={'smart-card-icon '+(r.tone||'purple')}><ClipboardList size={25}/></div><span className={'status-pill '+r.status.toLowerCase()}>{r.status}</span></div>
     <div className="smart-card-kicker">{r.foundation} · {r.classroom}</div><h3>{r.title}</h3><p className="smart-card-description">{r.chapter}</p>
     <div className="smart-card-meta"><span><FileCheck2 size={14}/>{questionCount} questions</span><span><UsersRound size={14}/>{r.assigned||0} assigned</span></div>
     <div className="smart-card-progress-label"><span>{r.submitted||0} of {r.assigned||0} submitted</span><b>{progress}%</b></div>
     <div className="progress-track"><span style={{width:progress+'%'}}/></div>
     <div className="smart-card-footer"><small>{r.due}</small><button className="primary-button small" type="button" onClick={()=>setSelectedExercise(r)}>{r.status==='Review'?'Review submissions':r.status==='Draft'?'View draft':'Open exercise'} <ArrowRight size={14}/></button></div>
    </article>;
   })}</div>
   {filtered.length===0&&<div className="resource-empty">{classRows.length===0?'No demo exercises are loaded for this class yet. The current sample set is for Foundation 2 · Class 2.':'No exercises match your search or filter.'}</div>}
  </Section>
  <Section icon={AlertCircle} title="Evaluation Queue">
   {reviewTotal>0?<div className="smart-inline-notice"><div className="smart-notice-icon peach"><Clock3 size={21}/></div><div><b>{reviewTotal} demo submissions are marked for review</b><p>These sample counts show how the teacher review queue will look when student submissions are connected.</p></div><button className="secondary-button" onClick={()=>setFilter('Review')}>Review queue <ArrowRight size={14}/></button></div>:<div className="resource-empty">There are no submissions awaiting review for this class.</div>}
  </Section>
  {createOpen&&<div className="modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setCreateOpen(false);}}><form className="add-modal" onSubmit={saveDraft}>
   <div className="modal-heading"><div><span className="eyebrow">EXERCISE WORKSPACE</span><h2>Create Exercise</h2><p>Start a textbook-aligned practice activity for {foundation} · {classroom}.</p></div><button type="button" className="modal-close" onClick={()=>setCreateOpen(false)}>×</button></div>
   <label className="form-field"><span>Exercise title *</span><input autoFocus required value={draftTitle} onChange={e=>setDraftTitle(e.target.value)} placeholder="e.g. Parts of a Computer Practice"/></label>
   <label className="form-field"><span>Chapter or topic</span><input value={draftChapter} onChange={e=>setDraftChapter(e.target.value)} placeholder="e.g. Chapter 1 — More About a Computer"/></label>
   <div className="smart-inline-notice"><div><b>Demo workspace</b><p>This creates a local draft for the selected class. Question authoring, publishing and Student Panel synchronisation are not connected yet.</p></div></div>
   <div className="modal-actions"><button type="button" className="secondary-button" onClick={()=>setCreateOpen(false)}>Cancel</button><button type="submit" className="primary-button"><Plus size={16}/> Create draft</button></div>
  </form></div>}
  {selectedExercise&&<div className="modal-backdrop exercise-preview-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)closePreview();}}>
   <section className="add-modal exercise-preview-modal" role="dialog" aria-modal="true" aria-labelledby="exercise-preview-title">
    <div className="modal-heading"><div><span className="eyebrow">{selectedExercise.foundation} · {selectedExercise.classroom} · {selectedExercise.status}</span><h2 id="exercise-preview-title">{selectedExercise.title}</h2><p>{selectedExercise.chapter}</p></div><button type="button" className="modal-close" onClick={closePreview}>×</button></div>
    <div className="exercise-preview-summary"><span><FileCheck2 size={15}/>{selectedExercise.questions?.length||0} sample questions</span><span><UsersRound size={15}/>{selectedExercise.assigned||0} assigned</span><span><CheckCircle2 size={15}/>{selectedExercise.submitted||0} submitted</span></div>
    {selectedExercise.description&&<p className="exercise-preview-description">{selectedExercise.description}</p>}
    {selectedExercise.questions?.length?<div className="exercise-preview-questions">{selectedExercise.questions.map((q,index)=><article className="exercise-preview-question" key={index}>
     <div className="exercise-preview-question-top"><span>Question {index+1}</span><span>{q.type} · {q.marks} mark{q.marks===1?'':'s'}</span></div><h3>{q.prompt}</h3>
     {q.options&&<ul>{q.options.map(option=><li key={option}>{option}</li>)}</ul>}
     {q.pairs&&<div className="exercise-preview-pairs">{q.pairs.map(([left,right])=><div key={left}><b>{left}</b><span>{right}</span></div>)}</div>}
     <div className="exercise-preview-answer"><b>Suggested answer:</b> {q.answer}</div>
    </article>)}</div>:<div className="resource-empty">This draft does not contain questions yet.</div>}
    <div className="exercise-demo-note"><CheckCircle2 size={16}/><span>Demo data only. Assignment and submission figures are sample values, not connected to live student records.</span></div>
    <div className="modal-actions"><button type="button" className="secondary-button" onClick={closePreview}>Close preview</button></div>
   </section>
  </div>}
 </PageShell>;
}
