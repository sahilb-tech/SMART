import { useEffect, useMemo, useState } from 'react'
import { BookOpen, Download, ExternalLink, FileText, Search } from 'lucide-react'
import PageHeader from '../components/PageHeader.jsx'
import foundation1 from '../curriculum/foundation1/class1.json'
import foundation2 from '../curriculum/foundation2/class2.json'
import foundation3 from '../curriculum/foundation3/class3.json'
import foundation4 from '../curriculum/foundation4/class4.json'

const textbookMap = {
  'Foundation 1': { curriculum: foundation1, path: '/textbooks/foundation1/foundation-1-textbook.pdf' },
  'Foundation 2': { curriculum: foundation2, path: '/textbooks/foundation2/foundation-2-textbook.pdf' },
  'Foundation 3': { curriculum: foundation3, path: '/textbooks/foundation3/foundation-3-textbook.pdf' },
  'Foundation 4': { curriculum: foundation4, path: '/textbooks/foundation4/foundation-4-textbook.pdf' },
}

function getSelectedFoundation() {
  const saved = localStorage.getItem('vico:selected-foundation') || 'Foundation 1'
  return textbookMap[saved] ? saved : 'Foundation 1'
}

export default function StudyMaterials() {
  const [foundation, setFoundation] = useState(getSelectedFoundation)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const syncFoundation = (event) => {
      const next = typeof event?.detail === 'string' ? event.detail : getSelectedFoundation()
      if (textbookMap[next]) setFoundation(next)
    }
    window.addEventListener('vico-foundation-change', syncFoundation)
    window.addEventListener('storage', syncFoundation)
    return () => {
      window.removeEventListener('vico-foundation-change', syncFoundation)
      window.removeEventListener('storage', syncFoundation)
    }
  }, [])

  const selectedBook = textbookMap[foundation]
  const curriculum = selectedBook.curriculum
  const title = curriculum.textbook_title || curriculum.source?.title || `${foundation} Textbook`
  const className = curriculum.class_name || ''
  const chapterCount = curriculum.chapters?.length || 0
  const matches = useMemo(() => `${foundation} ${className} ${title}`.toLowerCase().includes(query.trim().toLowerCase()), [foundation, className, title, query])

  return <div className="study-materials-page">
    <PageHeader title="Study Materials" description={`Textbook and learning resources assigned to ${foundation} · ${className}.`}/>
    <div className="resource-toolbar study-materials-toolbar">
      <label className="study-material-search"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search this foundation's textbook..."/></label>
      <div className="study-material-filter study-material-current-foundation">{foundation} · {className}</div>
    </div>
    {matches ? <div className="study-textbook-grid study-textbook-grid-single">
      <article className="study-textbook-card" key={foundation}>
        <div className="study-textbook-icon"><FileText size={25}/></div>
        <div className="study-textbook-tag">ASSIGNED TEXTBOOK · {foundation.toUpperCase()}</div>
        <h2>{title}</h2>
        <p>{foundation} · {className} · {chapterCount} chapters</p>
        <div className="study-textbook-actions">
          <a href={selectedBook.path} target="_blank" rel="noreferrer"><BookOpen size={15}/> Open textbook <ExternalLink size={13}/></a>
          <a href={selectedBook.path} download><Download size={15}/> Download PDF</a>
        </div>
      </article>
    </div> : <div className="empty-panel"><div className="empty-icon"><Search size={25}/></div><h3>No matching textbook</h3><p>Try another search term.</p></div>}
    <p className="study-materials-footnote">Only the textbook assigned to the currently selected Foundation is shown here. My Learning uses the matching curriculum JSON for that same Foundation; other Foundations' content is kept separate.</p>
  </div>
}
