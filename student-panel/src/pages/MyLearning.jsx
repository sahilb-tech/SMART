import { useEffect, useMemo, useState } from 'react'
import { BookOpen, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Clock3, Image as ImageIcon, Lightbulb, ListChecks, Search, Sparkles, StickyNote, Target, Trophy } from 'lucide-react'
import foundation1Class1 from '../curriculum/foundation1/class1.json'
import foundation2Class2 from '../curriculum/foundation2/class2.json'
import foundation3Class3 from '../curriculum/foundation3/class3.json'
import foundation4Class4 from '../curriculum/foundation4/class4.json'

const curriculumMap = {
  'Foundation 1': foundation1Class1,
  'Foundation 2': foundation2Class2,
  'Foundation 3': foundation3Class3,
  'Foundation 4': foundation4Class4,
}

const readStore = (key) => { try { return JSON.parse(localStorage.getItem(key) || '{}') } catch { return {} } }

const getChapterVisual = (title = '') => {
  const value = title.toLowerCase()
  const items = [
    [/mouse|pointing/, '🖱️', 'mouse'],
    [/keyboard|typing|key/, '⌨️', 'keyboard'],
    [/paint|drawing|art/, '🎨', 'paint'],
    [/internet|web|network|browser/, '🌐', 'internet'],
    [/robot|artificial intelligence|\bai\b/, '🤖', 'robot'],
    [/coding|scratch|program/, '🧩', 'coding'],
    [/powerpoint|presentation|slide/, '📊', 'presentation'],
    [/word|document|text/, '📝', 'document'],
    [/operating system|windows|desktop/, '🪟', 'windows'],
    [/history|beginning|abacus|pascaline|computer generation/, '🕰️', 'history'],
    [/file|folder|storage/, '📁', 'files'],
    [/safety|security|privacy/, '🔐', 'safety'],
    [/input/, '🎙️', 'input'],
    [/output|printer|monitor|display/, '🖨️', 'output'],
    [/hardware|parts|component|computer/, '💻', 'computer'],
    [/machine|etiquette|lab/, '🖥️', 'computer']
  ]
  const match = items.find(([pattern]) => pattern.test(value))
  return match ? { emoji: match[1], tone: match[2] } : { emoji: '📚', tone: 'general' }
}

const cartoonLibrary = {
  computer: [
    {id:'monitor',emoji:'🖥️',name:'Monitor',detail:'The monitor is the screen. It displays text, pictures, videos and other information from the computer.'},
    {id:'cpu',emoji:'🧠',name:'CPU',detail:'The CPU processes instructions and helps the computer perform tasks.'},
    {id:'keyboard',emoji:'⌨️',name:'Keyboard',detail:'The keyboard is an input device used to type letters, numbers and commands.'},
    {id:'mouse',emoji:'🖱️',name:'Mouse',detail:'A mouse is a pointing device. Move it to control the pointer and click to select items.'},
    {id:'printer',emoji:'🖨️',name:'Printer',detail:'A printer produces a paper copy of information, such as a document or picture.'},
    {id:'speaker',emoji:'🔊',name:'Speaker',detail:'Speakers are output devices that play sound from a computer.'}
  ],
  machines: [
    {id:'washing',emoji:'🫧',name:'Washing machine',detail:'A washing machine helps wash clothes and makes this task easier.'},
    {id:'iron',emoji:'👔',name:'Electric iron',detail:'An electric iron is used to press clothes and remove wrinkles.'},
    {id:'ac',emoji:'❄️',name:'Air conditioner',detail:'An air conditioner cools the air inside a room.'},
    {id:'fridge',emoji:'🧊',name:'Refrigerator',detail:'A refrigerator keeps food and drinks cool and helps keep them fresh.'}
  ],
  mouse: [
    {id:'mouse',emoji:'🖱️',name:'Computer mouse',detail:'Move the mouse on a flat surface to move the pointer on the screen.'},
    {id:'left',emoji:'👆',name:'Left button',detail:'The left button is commonly used to select an item or open it with a double-click.'},
    {id:'right',emoji:'☝️',name:'Right button',detail:'The right button commonly opens a shortcut menu with more options.'},
    {id:'scroll',emoji:'🔄',name:'Scroll wheel',detail:'The scroll wheel helps move up and down through a page.'}
  ],
  keyboard: [
    {id:'letters',emoji:'🔤',name:'Alphabet keys',detail:'Alphabet keys are used to type letters from A to Z.'},
    {id:'numbers',emoji:'🔢',name:'Number keys',detail:'Number keys are used to type digits from 0 to 9.'},
    {id:'enter',emoji:'↵',name:'Enter key',detail:'The Enter key can start a new line or confirm a command.'},
    {id:'space',emoji:'␣',name:'Spacebar',detail:'The spacebar inserts a blank space between words.'},
    {id:'backspace',emoji:'⌫',name:'Backspace',detail:'Backspace removes the character to the left of the cursor.'}
  ],
  paint: [
    {id:'brush',emoji:'🖌️',name:'Brush',detail:'A brush tool lets you draw freehand lines and strokes.'},
    {id:'pencil',emoji:'✏️',name:'Pencil',detail:'The pencil tool is used to draw thin freehand lines.'},
    {id:'fill',emoji:'🪣',name:'Fill with colour',detail:'The fill tool colours an enclosed area with the selected colour.'},
    {id:'shapes',emoji:'🔷',name:'Shapes',detail:'Shape tools help draw circles, rectangles, lines and other shapes.'},
    {id:'eraser',emoji:'🧽',name:'Eraser',detail:'The eraser removes parts of a drawing.'}
  ],
  robotics: [
    {id:'robot',emoji:'🤖',name:'Robot',detail:'A robot is a machine that can be programmed to carry out tasks.'},
    {id:'sensor',emoji:'👁️',name:'Sensor',detail:'A sensor detects information from the surroundings, such as light or distance.'},
    {id:'controller',emoji:'🎛️',name:'Controller',detail:'A controller processes instructions and helps coordinate a robot’s actions.'},
    {id:'motor',emoji:'⚙️',name:'Motor',detail:'A motor helps a robot or machine move parts.'}
  ],
  internet: [
    {id:'computer',emoji:'💻',name:'Computer',detail:'A computer can connect to the internet to access online information and services.'},
    {id:'router',emoji:'📡',name:'Wi-Fi router',detail:'A router helps devices connect to a network and, when configured, the internet.'},
    {id:'browser',emoji:'🌐',name:'Web browser',detail:'A web browser is an application used to open and view websites.'},
    {id:'lock',emoji:'🔒',name:'Online safety',detail:'Keep personal information private and ask a trusted adult if something online feels unsafe.'}
  ],
  input: [
    {id:'keyboard',emoji:'⌨️',name:'Keyboard',detail:'An input device used to enter letters, numbers and instructions.'},
    {id:'mouse',emoji:'🖱️',name:'Mouse',detail:'An input device used to point, click, select and drag items.'},
    {id:'microphone',emoji:'🎙️',name:'Microphone',detail:'An input device that sends sound into a computer.'},
    {id:'scanner',emoji:'📷',name:'Scanner',detail:'A scanner reads a paper document or picture and sends a digital copy to a computer.'}
  ],
  output: [
    {id:'monitor',emoji:'🖥️',name:'Monitor',detail:'An output device that displays information on a screen.'},
    {id:'printer',emoji:'🖨️',name:'Printer',detail:'An output device that prints information on paper.'},
    {id:'speaker',emoji:'🔊',name:'Speakers',detail:'Output devices that let us hear sounds from a computer.'},
    {id:'headphones',emoji:'🎧',name:'Headphones',detail:'An output device for listening to computer audio privately.'}
  ]
}
const getCartoonObjects = (topic, chapter) => {
  const text = `${topic?.title || ''} ${chapter?.title || ''}`.toLowerCase()
  if (/mouse|click|pointer/.test(text)) return cartoonLibrary.mouse
  if (/keyboard|key|typing/.test(text)) return cartoonLibrary.keyboard
  if (/paint|drawing|art|tux/.test(text)) return cartoonLibrary.paint
  if (/robot|artificial intelligence|\\bai\\b|smart gadget/.test(text)) return cartoonLibrary.robotics
  if (/internet|browser|web|network/.test(text)) return cartoonLibrary.internet
  if (/input device|input devices/.test(text)) return cartoonLibrary.input
  if (/output device|output devices/.test(text)) return cartoonLibrary.output
  if (/machine|washing|iron|refrigerator|air conditioner/.test(text)) return cartoonLibrary.machines
  return cartoonLibrary.computer
}

export default function MyLearning() {
  const [foundationName, setFoundationName] = useState(() => localStorage.getItem('vico:selected-foundation') || 'Foundation 1')
  const curriculum = curriculumMap[foundationName] || foundation1Class1
  const progressKey = `vico:student-progress:${foundationName.toLowerCase().replace(' ','-')}`
  const notesKey = `vico:student-notes:${foundationName.toLowerCase().replace(' ','-')}`
  const chapters = curriculum.chapters || []
  const allTopics = useMemo(() => chapters.flatMap((chapter, ci) => chapter.topics.map((topic, ti) => ({ chapter, topic, ci, ti }))), [chapters])
  const [chapterIndex, setChapterIndex] = useState(0)
  const [topicIndex, setTopicIndex] = useState(0)
  const [lessonOpen, setLessonOpen] = useState(false)
  const [chapterOpen, setChapterOpen] = useState(false)
  const [expandedChapter, setExpandedChapter] = useState(0)
  const [previewByChapter, setPreviewByChapter] = useState({})
  const [search, setSearch] = useState('')
  const [progress, setProgress] = useState(() => readStore(progressKey))
  const [notes, setNotes] = useState(() => readStore(notesKey))
  const [showTip, setShowTip] = useState(false)
  const [selectedObject, setSelectedObject] = useState(null)
  const [gameAnswer, setGameAnswer] = useState(null)
  const [gameFeedback, setGameFeedback] = useState('')
  const [tab, setTab] = useState('curriculum')
  const chapter = chapters[chapterIndex]
  const topic = chapter?.topics?.[topicIndex]
  const completed = allTopics.filter(({ topic }) => progress[topic.id] === 'completed').length
  const percent = allTopics.length ? Math.round(completed / allTopics.length * 100) : 0
  const filtered = chapters.map((item, index) => ({ item, index })).filter(({ item }) => `${item.title} ${item.topics.map(t => t.title).join(' ')}`.toLowerCase().includes(search.toLowerCase()))
  const status = topic ? progress[topic.id] || 'not_started' : 'not_started'

  useEffect(() => {
    const syncFoundation = (event) => setFoundationName(event.detail)
    window.addEventListener('vico-foundation-change', syncFoundation)
    return () => window.removeEventListener('vico-foundation-change', syncFoundation)
  }, [])
  useEffect(() => {
    localStorage.setItem('vico:selected-foundation', foundationName)
    setChapterIndex(0); setTopicIndex(0); setChapterOpen(false); setLessonOpen(false); setTab('curriculum')
    setProgress(readStore(`vico:student-progress:${foundationName.toLowerCase().replace(' ','-')}`))
    setNotes(readStore(`vico:student-notes:${foundationName.toLowerCase().replace(' ','-')}`))
  }, [foundationName])
  useEffect(() => { try { localStorage.setItem(progressKey, JSON.stringify(progress)); window.dispatchEvent(new CustomEvent('vico-progress-change',{detail:progress})) } catch {} }, [progress, progressKey])
  useEffect(() => { try { localStorage.setItem(notesKey, JSON.stringify(notes)) } catch {} }, [notes, notesKey])

  const selectChapter = (ci) => { setChapterIndex(ci); setTopicIndex(0); setChapterOpen(true); setLessonOpen(false); setTab('curriculum'); }
  const selectTopic = (ci, ti) => { setChapterIndex(ci); setTopicIndex(ti); setSelectedObject(null); setGameAnswer(null); setGameFeedback(''); setLessonOpen(true); setShowTip(false); setTab('curriculum'); }
  const move = (direction) => {
    const at = allTopics.findIndex(x => x.ci === chapterIndex && x.ti === topicIndex)
    const next = allTopics[at + direction]
    if (next) selectTopic(next.ci, next.ti)
  }
  const markComplete = () => { if (topic) setProgress(old => ({ ...old, [topic.id]: old[topic.id] === 'completed' ? 'in_progress' : 'completed' })) }
  const currentNote = topic ? notes[topic.id] || '' : ''
  const cartoonObjects = getCartoonObjects(topic, chapter)
  const activeCartoon = cartoonObjects.find(item => item.id === selectedObject) || cartoonObjects[0]
  const gameCorrectId = /mouse|click|pointer/.test(`${topic?.title||''} ${chapter?.title||''}`.toLowerCase()) ? 'mouse' : /keyboard|key|typing/.test(`${topic?.title||''} ${chapter?.title||''}`.toLowerCase()) ? 'keyboard' : /paint|drawing|art|tux/.test(`${topic?.title||''} ${chapter?.title||''}`.toLowerCase()) ? 'brush' : /robot|artificial intelligence|\\bai\\b|smart gadget/.test(`${topic?.title||''} ${chapter?.title||''}`.toLowerCase()) ? 'robot' : /internet|browser|web|network/.test(`${topic?.title||''} ${chapter?.title||''}`.toLowerCase()) ? 'browser' : /input device|input devices/.test(`${topic?.title||''} ${chapter?.title||''}`.toLowerCase()) ? 'keyboard' : /output device|output devices/.test(`${topic?.title||''} ${chapter?.title||''}`.toLowerCase()) ? 'monitor' : /machine|washing|iron|refrigerator|air conditioner/.test(`${topic?.title||''} ${chapter?.title||''}`.toLowerCase()) ? 'washing' : 'monitor'
  const gameOptions = [...cartoonObjects].sort((a,b)=>a.id===gameCorrectId?-1:b.id===gameCorrectId?1:0).slice(0,4)
  const gameCorrect = gameOptions.find(item=>item.id===gameCorrectId) || cartoonObjects[0]
  const gamePrompt = ({mouse:'Which object helps you point and click on the screen?',keyboard:'Which device is used to type letters and numbers?',brush:'Which tool helps you paint freehand strokes?',robot:'Which machine can be programmed to perform tasks?',browser:'Which application helps you open websites?',washing:'Which machine helps wash clothes?',keyboardInput:'Which device sends typed information into a computer?',monitor:'Which device displays information on a screen?'})[gameCorrectId] || 'Which object matches the lesson?'

  return <div className="learning-page teacher-learning-ui student-learning-ui">
    <div className="page-header"><div><span className="eyebrow">VICO STUDENT WORKSPACE</span><h1>My Learning</h1><p>Explore your textbook, understand each topic, and track your learning journey.</p></div><label className="class-chip curriculum-switcher"><BookOpen size={14}/><select value={foundationName} onChange={e=>{setFoundationName(e.target.value);localStorage.setItem('vico:selected-foundation',e.target.value);window.dispatchEvent(new CustomEvent('vico-foundation-change',{detail:e.target.value}))}}>{Object.keys(curriculumMap).map(name=><option key={name}>{name}</option>)}</select></label></div>
    <div className="student-curriculum-strip"><span className="curriculum-pill"><BookOpen size={14}/> {curriculum.foundation}</span><span className="curriculum-pill">Class: {curriculum.class_name}</span><span className="curriculum-progress-label"><Trophy size={15}/> {completed} of {allTopics.length} topics completed</span></div>
    <div className="student-learning-tabs"><button className={tab==='curriculum'?'active':''} onClick={()=>setTab('curriculum')}><BookOpen size={15}/> Curriculum</button><button className={tab==='progress'?'active':''} onClick={()=>setTab('progress')}><Target size={15}/> My Progress</button><button className={tab==='notes'?'active':''} onClick={()=>setTab('notes')}><StickyNote size={15}/> My Notes</button></div>
    <section className="student-book-card"><div className="student-book-icon"><BookOpen size={27}/></div><div><span className="eyebrow">YOUR SELECTED TEXTBOOK · {curriculum.foundation.toUpperCase()}</span><h2>{curriculum.textbook_title}</h2><p>{curriculum.foundation} · {curriculum.class_name} · {chapters.length} chapters · {allTopics.length} topics</p></div><div className="student-book-progress"><strong>{percent}%</strong><span>Overall completion</span><div className="learning-progress-track"><span style={{width:`${percent}%`}}/></div></div></section>

    {tab === 'progress' ? <section className="student-tab-panel"><div className="student-tab-heading"><div><h2><Target size={19}/> My learning progress</h2><p>See how much of your textbook you have completed.</p></div><strong>{percent}%</strong></div><div className="student-big-progress"><div className="student-big-progress-fill" style={{width:`${percent}%`}}/></div><div className="student-progress-stats"><div><CheckCircle2/><strong>{completed}</strong><span>Topics completed</span></div><div><BookOpen/><strong>{allTopics.length-completed}</strong><span>Topics to explore</span></div><div><Trophy/><strong>{chapters.length}</strong><span>Chapters</span></div></div>{chapters.map((ch,ci)=><div className="student-progress-chapter" key={ch.chapter_number}><div><b>Chapter {ch.chapter_number}: {ch.title}</b><span>{ch.topics.filter(t=>progress[t.id]==='completed').length}/{ch.topics.length} topics completed</span></div><div className="learning-progress-track"><span style={{width:`${ch.topics.filter(t=>progress[t.id]==='completed').length/ch.topics.length*100}%`}}/></div></div>)}</section> : tab === 'notes' ? <section className="student-tab-panel"><div className="student-tab-heading"><div><h2><StickyNote size={19}/> My lesson notes</h2><p>Write down important things you want to remember.</p></div></div><div className="student-notes-list">{allTopics.map(({chapter:ch,topic:t,ci,ti})=><label key={t.id}><span>Chapter {ch.chapter_number} · {t.title}</span><textarea value={notes[t.id]||''} onChange={e=>setNotes(old=>({...old,[t.id]:e.target.value}))} placeholder="Write your notes for this topic..."/><button onClick={()=>selectTopic(ci,ti)}>Open lesson <ChevronRight size={14}/></button></label>)}</div><p className="learning-footnote">Your notes are saved in this browser on this device.</p></section> : lessonOpen ? <div className="learning-layout teacher-learning-layout student-lesson-layout">
      <section className="lesson-panel student-lesson-panel"><div className="lesson-panel-toolbar"><button className="student-back-button" onClick={()=>setLessonOpen(false)}><ChevronLeft size={15}/> Back to topics</button><span className="eyebrow">CHAPTER {chapter?.chapter_number} — {chapter?.title}</span><span className="student-source-chip"><BookOpen size={13}/> Textbook lesson</span></div>
        <div className="lesson-heading student-lesson-heading"><div><span className="eyebrow">{curriculum.foundation.toUpperCase()} · CHAPTER {chapter?.chapter_number} · TOPIC {topicIndex+1}</span><h2>{topic?.title}</h2></div><span className={`topic-status status-${status}`}>{status==='completed'?'Completed':status==='in_progress'?'In progress':'Not started'}</span></div>
        <p className="lesson-description">{chapter?.description}</p>
        <div className="student-lesson-columns"><div className="student-lesson-main">
          <article className="student-content-card"><h3><BookOpen size={17}/> Let's learn</h3><p>{topic?.content}</p>{topic?.content_source==='supplementary_explanation'&&<div className="student-content-origin-note"><strong>Supplementary explanation</strong><span>{topic.study_note}</span></div>}</article>
          <article className="student-cartoon-card">
            <div className="student-cartoon-heading"><div><span className="eyebrow">INTERACTIVE LEARNING</span><h3>Explore the computer objects</h3><p>Tap a cartoon to discover its name and what it does.</p></div><span className="student-cartoon-sparkle">✦</span></div>
            <div className="student-cartoon-grid">{cartoonObjects.map(item=><button type="button" key={item.id} className={`student-cartoon-object ${activeCartoon?.id===item.id?'active':''}`} onClick={()=>setSelectedObject(item.id)} aria-pressed={activeCartoon?.id===item.id}><span className="student-cartoon-emoji" aria-hidden="true">{item.emoji}</span><strong>{item.name}</strong><small>Tap to explore</small></button>)}</div>
            {activeCartoon&&<div className="student-cartoon-explanation"><span className="student-cartoon-large" aria-hidden="true">{activeCartoon.emoji}</span><div><span className="eyebrow">YOU SELECTED</span><h4>{activeCartoon.name}</h4><p>{activeCartoon.detail}</p></div></div>}
            <p className="student-cartoon-disclaimer">Interactive illustrations are supplementary learning aids. Your textbook lesson remains the source for chapter-specific content.</p>
          </article>
          <article className="student-mini-game-card">
            <div className="student-game-header"><div><span className="eyebrow">QUICK LEARNING GAME</span><h3>Find the right object!</h3><p>{gamePrompt}</p></div><span className="student-game-trophy">🏆</span></div>
            <div className="student-game-options">{gameOptions.map(item=><button type="button" key={item.id} className={`student-game-option ${gameAnswer===item.id?(item.id===gameCorrect?.id?'correct':'wrong'):''}`} onClick={()=>{setGameAnswer(item.id);setGameFeedback(item.id===gameCorrect?.id?'Correct! Great job.':'Not quite. Try another object!')}} disabled={gameAnswer===gameCorrect?.id}><span>{item.emoji}</span><b>{item.name}</b></button>)}</div>
            {gameFeedback&&<div className={`student-game-feedback ${gameAnswer===gameCorrect?.id?'success':'try-again'}`}>{gameFeedback}</div>}
            {gameAnswer===gameCorrect?.id&&<button className="student-game-retry" onClick={()=>{setGameAnswer(null);setGameFeedback('')}}>Play again</button>}
          </article>
          {topic?.learning_points?.length>0&&<article className="student-content-card student-points-card"><h3><Sparkles size={17}/> Remember these points</h3><ul>{topic.learning_points.map((point,i)=><li key={i}>{point}</li>)}</ul></article>}
          {topic?.examples?.length>0&&<article className="student-content-card"><h3><Lightbulb size={17}/> Examples</h3><ul>{topic.examples.map((example,i)=><li key={i}>{typeof example==='string'?example:example.title||example.text}</li>)}</ul></article>}
          {topic?.activity_text&&<article className="student-activity-card"><h3><Lightbulb size={17}/> Activity corner</h3><p>{topic.activity_text}</p><button onClick={()=>setShowTip(!showTip)}><Sparkles size={14}/>{showTip?'Hide activity hint':'Show activity hint'}</button>{showTip&&<p className="student-activity-hint">Try the activity step by step. Think about the examples in the lesson and explain your answer in your own words.</p>}</article>}
          <div className="student-source-note">{curriculum.foundation==='Foundation 1'?'Lesson summary adapted from the supplied Foundation 1 textbook.':curriculum.foundation==='Foundation 2'?'Lesson summary adapted from the supplied Foundation 2 teaching content; use the PDF for full textbook context.':'Supplementary study guide for this topic. Refer to the supplied textbook for its exact lesson wording, diagrams and activities.'} {topic?.source_pages?.length?`Reference pages ${topic.source_pages.join(', ')}`:chapter?.source_pages?.length?`Chapter reference pages ${chapter.source_pages.join(', ')}`:''}</div>
        </div><aside className="student-learning-rail"><div className="student-help-card"><span className="eyebrow">LEARNING TIP</span><h3>Learn step by step</h3><ol><li>Read the lesson carefully.</li><li>Read the extracted textbook text and examples.</li><li>Remember the important points.</li><li>Try the activity before moving on.</li></ol></div><div className="student-help-card"><h3><ListChecks size={16}/> Lesson checklist</h3><p>Before you finish, make sure you can explain the topic in your own words.</p><div className="student-check-row"><CheckCircle2 size={15}/> I read the lesson</div><div className="student-check-row"><CheckCircle2 size={15}/> I reviewed the examples</div><div className="student-check-row"><CheckCircle2 size={15}/> I tried the activity</div></div><div className="student-help-card student-note-card"><h3><StickyNote size={16}/> My quick note</h3><textarea value={currentNote} onChange={e=>setNotes(old=>({...old,[topic.id]:e.target.value}))} placeholder="Write something you want to remember..."/><small>Saved automatically in this browser.</small></div></aside></div>
        <div className="student-lesson-controls"><button className="student-outline-button" disabled={chapterIndex===0&&topicIndex===0} onClick={()=>move(-1)}><ChevronLeft size={15}/> Previous topic</button><button className="student-complete-button" onClick={markComplete}>{status==='completed'?<><CheckCircle2 size={16}/> Completed · Undo</>:<><CheckCircle2 size={16}/> Mark as completed</>}</button><button className="student-outline-button" disabled={chapterIndex===chapters.length-1&&topicIndex===(chapter?.topics?.length||1)-1} onClick={()=>move(1)}>Next topic <ChevronRight size={15}/></button></div>
      </section></div> : <div className="student-curriculum-browser student-teacher-chapter-browser">
      <div className="student-browser-searchbar">
        <Search size={19}/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search chapters or topics..."/>
      </div>
      <div className="student-chapter-grid teacher-style-chapter-grid">
        {filtered.map(({item,index})=>{
          const done=item.topics.filter(t=>progress[t.id]==='completed').length
          const expanded=expandedChapter===index
          const selectedTopicIndex=previewByChapter[index] ?? 0
          const previewTopic=item.topics[selectedTopicIndex] || item.topics[0]
          return <article className={`student-chapter-card teacher-style-chapter-card ${expanded?'is-expanded':''}`} key={item.chapter_number}>
            <div className="teacher-chapter-card-main">
              <div className={`teacher-chapter-icon chapter-visual-${getChapterVisual(item.title).tone}`}><span>{String(item.chapter_number).padStart(2,'0')}</span><b className="chapter-visual-emoji" aria-hidden="true">{getChapterVisual(item.title).emoji}</b></div>
              <div className="teacher-chapter-card-content">
                <div className="teacher-chapter-card-topline"><span className="eyebrow">CHAPTER {item.chapter_number} · {curriculum.foundation.toUpperCase()}</span><span className="topic-status">{done===item.topics.length?'Completed':done?'In progress':'Not started'}</span></div>
                <h3>{item.title}</h3>
                <p className="teacher-chapter-count">{item.topics.length} topics · {done} topics completed</p>
                <div className="teacher-chapter-progress-label"><span>{done} of {item.topics.length} topics taught</span><b>{item.topics.length?Math.round(done/item.topics.length*100):0}%</b></div>
                <div className="learning-progress-track"><span style={{width:`${item.topics.length?done/item.topics.length*100:0}%`}}/></div>
                <div className="teacher-chapter-actions">
                  <button className="student-complete-button" onClick={()=>selectTopic(index,0)}>Start learning <ChevronRight size={15}/></button>
                  <button className="student-outline-button" onClick={()=>setExpandedChapter(expanded?-1:index)}>{expanded?'Hide topics':'View topics'} <ChevronDown size={15}/></button>
                </div>
              </div>
            </div>
            {expanded&&<div className="teacher-chapter-expanded">
              <div className="teacher-chapter-expanded-heading"><strong>Chapter content & learning materials</strong><span>{done} of {item.topics.length} topics completed</span></div>
              <div className="teacher-chapter-expanded-columns">
                <section className="teacher-topic-picker">
                  <span className="eyebrow">TOPICS IN THIS CHAPTER</span>
                  <div className="teacher-topic-picker-list">{item.topics.map((t,ti)=><button key={t.id} className={selectedTopicIndex===ti?'active':''} onClick={()=>setPreviewByChapter(old=>({...old,[index]:ti}))}><span className="topic-visual-emoji" aria-hidden="true">{getChapterVisual(t.title).emoji}</span><span><b>{t.title}</b><small>{progress[t.id]==='completed'?'Completed':'Select to preview lesson'}</small></span><ChevronRight size={15}/></button>)}</div>
                </section>
                <section className="teacher-topic-preview">
                  <span className="eyebrow">LESSON PREVIEW</span>
                  <div className="teacher-preview-title"><span className="teacher-preview-icon chapter-preview-visual">{getChapterVisual(item.title).emoji}</span><div><span className="eyebrow">CHAPTER {item.chapter_number} · TOPIC {selectedTopicIndex+1}</span><h3>{previewTopic?.title}</h3></div></div>
                  <p>{previewTopic?.content}</p>
                  {previewTopic?.learning_points?.length>0&&<div className="teacher-preview-points"><b>Key learning points</b><ul>{previewTopic.learning_points.slice(0,4).map((point,pi)=><li key={pi}>{point}</li>)}</ul></div>}
                  <div className="teacher-preview-actions"><button className="student-outline-button" onClick={()=>selectTopic(index,selectedTopicIndex)}><BookOpen size={16}/> Open full lesson</button></div>
                </section>
              </div>
            </div>}
          </article>
        })}
        {filtered.length===0&&<p className="learning-no-results">No matching chapters or topics.</p>}
      </div>
    </div>
    }
    <p className="learning-footnote">Your learning progress and notes are saved in this browser on this device. They are not synced between devices.</p>
  </div>
}
