type NamePromptProps = {
  title: string
  gifSrc: string
  gifAlt: string
  onYes: () => void
  onNo: () => void
}

function NamePrompt({ title, gifSrc, gifAlt, onYes, onNo }: NamePromptProps) {
  return (
    <section className="prompt-card">
      <img className="prompt-gif" src={gifSrc} alt={gifAlt} />
      <h1>{title}</h1>
      <div className="choice-actions">
        <button className="choice-button yes-button" type="button" onClick={onYes}>
          Yes
        </button>
        <button className="choice-button no-button" type="button" onClick={onNo}>
          No
        </button>
      </div>
    </section>
  )
}

export default NamePrompt
