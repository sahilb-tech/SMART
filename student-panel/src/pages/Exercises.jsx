import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  FileText,
  Layers,
  Lightbulb,
  ListChecks,
  Printer,
  Search,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react'
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

const foundationNames = Object.keys(curriculumMap)

const readSelectedFoundation = () => {
  const saved = localStorage.getItem('smart:selected-foundation') || localStorage.getItem('SMART:selected-foundation')
  return curriculumMap[saved] ? saved : 'Foundation 1'
}

const readAnswerBank = () => {
  const bank = {}
  foundationNames.forEach((name) => {
    try {
      bank[name] = JSON.parse(localStorage.getItem('smart-exercise-answers-' + name) || '{}')
    } catch {
      bank[name] = {}
    }
  })
  return bank
}

const getChapterVisual = (title = '') => {
  const value = title.toLowerCase()
  const items = [
    [/history|generation|abacus|pascaline/, '🕰️', 'history'],
    [/paint|drawing|art|tux/, '🎨', 'paint'],
    [/internet|web|network|browser/, '🌐', 'internet'],
    [/robot|artificial intelligence|artificially intelligent/, '🤖', 'robot'],
    [/coding|scratch|sequence|decoding|pattern/, '🧩', 'coding'],
    [/word|document|formatting|typing/, '📝', 'document'],
    [/powerpoint|presentation|slide/, '📊', 'presentation'],
    [/mouse|keyboard|pointing/, '⌨️', 'input'],
    [/file|folder|storage|management/, '📁', 'files'],
    [/operating system|windows|desktop|gui/, '🪟', 'windows'],
    [/hardware|software|computer|machine|ipo/, '💻', 'computer'],
    [/etiquette|safety|direction|instruction/, '💡', 'skills'],
  ]
  const match = items.find(([pattern]) => pattern.test(value))
  return match ? { emoji: match[1], tone: match[2] } : { emoji: '📚', tone: 'general' }
}

const makeQuestions = (topics = []) => topics.flatMap((topic) => [
  {
    id: topic.id + '-q1',
    topic: topic.title,
    prompt: 'Explain ' + topic.title.toLowerCase() + ' in your own words.',
  },
  {
    id: topic.id + '-q2',
    topic: topic.title,
    prompt: 'Write two important points about ' + topic.title.toLowerCase() + '.',
  },
])

const getAnsweredCount = (questions, answers) => questions.filter((question) => (answers[question.id] || '').trim().length > 0).length

export default function Exercises() {
  const [foundationName, setFoundationName] = useState(readSelectedFoundation)
  const [activeTab, setActiveTab] = useState('chapters')
  const [selectedChapterNumber, setSelectedChapterNumber] = useState(null)
  const [selectedTopicId, setSelectedTopicId] = useState(null)
  const [search, setSearch] = useState('')
  const [answerBank, setAnswerBank] = useState(readAnswerBank)

  const curriculum = curriculumMap[foundationName] || foundation1Class1
  const chapters = curriculum.chapters || []
  const activeAnswers = answerBank[foundationName] || {}

  const allTopics = useMemo(
    () => chapters.flatMap((chapter) => chapter.topics.map((topic) => ({ chapter, topic }))),
    [chapters],
  )

  const selectedChapter = chapters.find((chapter) => chapter.chapter_number === selectedChapterNumber) || null
  const selectedTopicEntry = selectedTopicId
    ? allTopics.find(({ topic }) => topic.id === selectedTopicId) || null
    : null

  const totalTopics = allTopics.length
  const totalQuestions = totalTopics * 2
  const answeredTotal = Object.values(activeAnswers).filter((answer) => typeof answer === 'string' && answer.trim()).length
  const chapterQuestions = selectedTopicEntry
    ? makeQuestions([selectedTopicEntry.topic])
    : makeQuestions(selectedChapter?.topics || [])
  const filteredQuestions = chapterQuestions.filter((question) =>
    (question.topic + ' ' + question.prompt).toLowerCase().includes(search.toLowerCase()),
  )

  useEffect(() => {
    const syncFoundation = (event) => {
      const next = event?.detail || localStorage.getItem('smart:selected-foundation') || localStorage.getItem('SMART:selected-foundation')
      if (!curriculumMap[next]) return
      setFoundationName((current) => current === next ? current : next)
    }

    window.addEventListener('smart-foundation-change', syncFoundation)
    window.addEventListener('storage', syncFoundation)
    return () => {
      window.removeEventListener('smart-foundation-change', syncFoundation)
      window.removeEventListener('storage', syncFoundation)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('smart:selected-foundation', foundationName)
    window.dispatchEvent(new CustomEvent('smart-foundation-change', { detail: foundationName }))
    setSelectedChapterNumber(null)
    setSelectedTopicId(null)
    setActiveTab('chapters')
    setSearch('')
  }, [foundationName])

  useEffect(() => {
    foundationNames.forEach((name) => {
      try {
        localStorage.setItem('smart-exercise-answers-' + name, JSON.stringify(answerBank[name] || {}))
      } catch {
        // Keep the exercise page usable if browser storage is unavailable.
      }
    })
  }, [answerBank])

  const filteredChapters = chapters.filter((chapter) =>
    (chapter.title + ' ' + chapter.topics.map((topic) => topic.title).join(' '))
      .toLowerCase()
      .includes(search.toLowerCase()),
  )

  const filteredTopics = allTopics.filter(({ chapter, topic }) =>
    (chapter.title + ' ' + topic.title).toLowerCase().includes(search.toLowerCase()),
  )

  const openChapter = (chapterNumber) => {
    setSelectedChapterNumber(chapterNumber)
    setSelectedTopicId(null)
    setSearch('')
  }

  const openTopic = (chapter, topic) => {
    setSelectedChapterNumber(chapter.chapter_number)
    setSelectedTopicId(topic.id)
    setSearch('')
  }

  const returnToLibrary = () => {
    setSelectedChapterNumber(null)
    setSelectedTopicId(null)
    setSearch('')
  }

  const updateAnswer = (questionId, value) => {
    setAnswerBank((current) => ({
      ...current,
      [foundationName]: {
        ...(current[foundationName] || {}),
        [questionId]: value,
      },
    }))
  }

  const renderTopicPracticeCard = ({ chapter, topic }) => {
    const questions = makeQuestions([topic])
    const answered = getAnsweredCount(questions, activeAnswers)
    return (
      <article className="exercise-topic-card" key={topic.id}>
        <div className="exercise-topic-meta">
          <span>Chapter {chapter.chapter_number}</span>
          <span>{answered}/2 answered</span>
        </div>
        <h3>{topic.title}</h3>
        <p>{chapter.title}</p>
        <button type="button" onClick={() => openTopic(chapter, topic)}>
          Practise topic <ChevronRight size={15} />
        </button>
      </article>
    )
  }

  if (selectedChapter) {
    const visual = getChapterVisual(selectedChapter.title)
    const answeredInChapter = getAnsweredCount(chapterQuestions, activeAnswers)
    return (
      <div className="student-exercises-page">
        <div className="page-header">
          <div>
            <span className="eyebrow">SMART STUDENT WORKSPACE</span>
            <h1>Exercises</h1>
            <p>Practise one step at a time and build confidence with every answer.</p>
          </div>
          <label className="class-chip exercise-foundation-switcher">
            <Layers size={15} />
            <select value={foundationName} onChange={(event) => setFoundationName(event.target.value)}>
              {foundationNames.map((name) => <option key={name} value={name}>{name} – {curriculumMap[name].class_name}</option>)}
            </select>
          </label>
        </div>

        <button type="button" className="exercise-back-button" onClick={returnToLibrary}>
          <ArrowLeft size={16} /> All exercises
        </button>

        <section className="exercise-detail-banner">
          <div className="exercise-detail-icon">{visual.emoji}</div>
          <div className="exercise-detail-copy">
            <span className="eyebrow">{curriculum.foundation} · Chapter {selectedChapter.chapter_number}</span>
            <h2>{selectedTopicEntry ? selectedTopicEntry.topic.title : selectedChapter.title}</h2>
            <p>{selectedTopicEntry ? selectedChapter.title + ' · Topic-wise practice' : (selectedChapter.description || 'Complete the questions from this chapter to strengthen your understanding.')}</p>
            <div className="exercise-detail-stats">
              <span><BookOpen size={14} /> {selectedTopicEntry ? 1 : selectedChapter.topics.length} {selectedTopicEntry ? 'Topic' : 'Topics'}</span>
              <span><FileText size={14} /> {chapterQuestions.length} Questions</span>
              <span><CheckCircle2 size={14} /> {answeredInChapter} Answered</span>
            </div>
          </div>
        </section>

        {!selectedTopicEntry && (
          <div className="exercise-detail-toolbar">
            <div>
              <strong>Chapter practice</strong>
              <span>Questions are grouped by topic.</span>
            </div>
            <label className="exercise-search">
              <Search size={16} />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search questions or topics..." />
            </label>
          </div>
        )}

        <div className="student-exercise-list">
          {filteredQuestions.map((question, index) => (
            <article className="student-exercise-card" key={question.id}>
              <div className="student-exercise-card-heading">
                <span>Question {index + 1}</span>
                <small>{question.topic}</small>
              </div>
              <h3>{question.prompt}</h3>
              <textarea
                value={activeAnswers[question.id] || ''}
                onChange={(event) => updateAnswer(question.id, event.target.value)}
                placeholder="Type your answer here..."
                aria-label={'Answer to ' + question.prompt}
              />
              <div className="student-exercise-footer">
                <span><Lightbulb size={14} /> Use your lesson notes to help you answer.</span>
                <span>{(activeAnswers[question.id] || '').trim().length} characters</span>
              </div>
            </article>
          ))}
          {filteredQuestions.length === 0 && (
            <div className="empty-panel">
              <h3>No questions match your search</h3>
              <p>Try another topic or question keyword.</p>
            </div>
          )}
        </div>

        <div className="student-exercise-submit">
          <div><CheckCircle2 size={18} /><span>Your answers are saved automatically in this browser.</span></div>
          <button className="student-complete-button" type="button" onClick={() => window.print()}>
            <Printer size={16} /> Print practice sheet
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="student-exercises-page">
      <div className="page-header">
        <div>
          <span className="eyebrow">SMART STUDENT WORKSPACE</span>
          <h1>Exercises</h1>
          <p>Practise topic-wise and chapter-wise exercises to strengthen your learning.</p>
        </div>
        <label className="class-chip exercise-foundation-switcher">
          <Layers size={15} />
          <select value={foundationName} onChange={(event) => setFoundationName(event.target.value)}>
            {foundationNames.map((name) => <option key={name} value={name}>{name} – {curriculumMap[name].class_name}</option>)}
          </select>
        </label>
      </div>

      <section className="exercise-hero">
        <div className="exercise-hero-copy">
          <span className="exercise-hero-kicker"><Sparkles size={15} /> LEARN · PRACTISE · GROW</span>
          <h2>Chapter-wise <span>Exercises</span></h2>
          <p>Choose a chapter and practise questions from its topics. Your answers are saved as you learn.</p>
          <div className="exercise-hero-facts">
            <span><BookOpen size={15} /> {chapters.length} Chapters</span>
            <span><Target size={15} /> {totalTopics} Topics</span>
            <span><ListChecks size={15} /> {totalQuestions} Questions</span>
          </div>
        </div>
        <div className="exercise-hero-art" aria-hidden="true">
          <span className="exercise-art-book">📚</span>
          <span className="exercise-art-student">🧑‍🎓</span>
          <span className="exercise-art-board">✅</span>
          <span className="exercise-art-spark">✦</span>
        </div>
      </section>

      <div className="exercise-tabs" role="tablist" aria-label="Exercise views">
        <button type="button" role="tab" aria-selected={activeTab === 'chapters'} className={activeTab === 'chapters' ? 'active' : ''} onClick={() => { setActiveTab('chapters'); setSearch('') }}>
          <BookOpen size={17} /> Chapter-wise Exercises
        </button>
        <button type="button" role="tab" aria-selected={activeTab === 'topics'} className={activeTab === 'topics' ? 'active' : ''} onClick={() => { setActiveTab('topics'); setSearch('') }}>
          <Target size={17} /> Topic-wise Practice
        </button>
        <button type="button" role="tab" aria-selected={activeTab === 'all'} className={activeTab === 'all' ? 'active' : ''} onClick={() => { setActiveTab('all'); setSearch('') }}>
          <Layers size={17} /> All Exercises
        </button>
      </div>

      <div className="exercise-library-toolbar">
        <div>
          <strong>{activeTab === 'chapters' ? 'Choose a chapter' : activeTab === 'topics' ? 'Explore topics' : 'Complete exercise library'}</strong>
          <span>{activeTab === 'chapters' ? 'Each chapter contains practice for all its topics.' : activeTab === 'topics' ? 'Open any topic to practise its questions.' : 'Browse every topic in your selected foundation.'}</span>
        </div>
        <label className="exercise-search">
          <Search size={16} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search chapters or topics..." />
        </label>
      </div>

      {activeTab === 'chapters' && (
        <div className="exercise-chapter-grid">
          {filteredChapters.map((chapter, index) => {
            const questions = makeQuestions(chapter.topics)
            const answered = getAnsweredCount(questions, activeAnswers)
            const percent = questions.length ? Math.round((answered / questions.length) * 100) : 0
            const visual = getChapterVisual(chapter.title)
            return (
              <article className={'exercise-chapter-card tone-' + (index % 8)} key={chapter.chapter_number}>
                <div className="exercise-card-topline">
                  <span className="exercise-chapter-label">Chapter {chapter.chapter_number}</span>
                  <span className="exercise-card-illustration" aria-hidden="true">{visual.emoji}</span>
                </div>
                <h3>{chapter.title}</h3>
                <div className="exercise-card-counts">
                  <span><BookOpen size={15} /> {chapter.topics.length} Topics</span>
                  <i />
                  <span><FileText size={15} /> {questions.length} Questions</span>
                </div>
                <div className="exercise-card-progress">
                  <div><span>{answered} of {questions.length} answered</span><strong>{percent}%</strong></div>
                  <span className="exercise-progress-track"><i style={{ width: percent + '%' }} /></span>
                </div>
                <button type="button" onClick={() => openChapter(chapter.chapter_number)}>
                  {answered > 0 ? 'Continue Practice' : 'Start Exercise'} <ChevronRight size={16} />
                </button>
              </article>
            )
          })}
          {filteredChapters.length === 0 && <div className="empty-panel"><h3>No chapters found</h3><p>Try a different chapter or topic name.</p></div>}
        </div>
      )}

      {activeTab === 'topics' && (
        <div className="exercise-topic-grid">
          {filteredTopics.map(renderTopicPracticeCard)}
          {filteredTopics.length === 0 && <div className="empty-panel"><h3>No topics found</h3><p>Try a different search term.</p></div>}
        </div>
      )}

      {activeTab === 'all' && (
        <div className="exercise-all-chapters">
          {filteredChapters.map((chapter) => {
            const visibleTopics = chapter.topics.filter((topic) =>
              (chapter.title + ' ' + topic.title).toLowerCase().includes(search.toLowerCase()),
            )
            return (
              <details className="exercise-all-chapter" key={chapter.chapter_number}>
                <summary>
                  <span className="exercise-all-number">Chapter {chapter.chapter_number}</span>
                  <strong>{chapter.title}</strong>
                  <span className="exercise-all-count">{chapter.topics.length} Topics · {chapter.topics.length * 2} Questions</span>
                  <ChevronRight size={17} />
                </summary>
                <div className="exercise-all-topic-list">
                  {visibleTopics.map((topic) => renderTopicPracticeCard({ chapter, topic }))}
                </div>
              </details>
            )
          })}
          {filteredChapters.length === 0 && <div className="empty-panel"><h3>No exercises found</h3><p>Try a different search term.</p></div>}
        </div>
      )}

      <div className="exercise-library-footer">
        <div><Trophy size={19} /><span><strong>{answeredTotal} / {totalQuestions}</strong> questions answered in {curriculum.foundation}</span></div>
        <span>Keep practising — every answer is a step forward!</span>
      </div>
    </div>
  )
}
