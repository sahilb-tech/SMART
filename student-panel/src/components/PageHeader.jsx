export default function PageHeader({ eyebrow = 'YOUR SMART LEARNING SPACE', title, description, action }) {
  return (
    <div className="page-header">
      <div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>
      {action && <div className="header-action">{action}</div>}
    </div>
  )
}
