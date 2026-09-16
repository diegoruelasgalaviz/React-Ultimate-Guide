export default function DocBody({ blocks }) {
  return (
    <div className="prose-doc">
      {blocks.map((block, i) => {
        if (block.type === 'p') return <p key={i}>{block.text}</p>
        if (block.type === 'h3') return <h3 key={i}>{block.text}</h3>
        if (block.type === 'ul')
          return (
            <ul key={i}>
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          )
        if (block.type === 'code')
          return (
            <pre key={i}>
              <code>{block.text}</code>
            </pre>
          )
        return null
      })}
    </div>
  )
}
