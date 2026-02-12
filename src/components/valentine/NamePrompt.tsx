import type { FormEvent } from 'react'

type NamePromptProps = {
  value: string
  onChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

function NamePrompt({ value, onChange, onSubmit }: NamePromptProps) {
  return (
    <section className="prompt-card">
      <h1>Hi what&apos;s your name?</h1>
      <form className="name-form" onSubmit={onSubmit}>
        <input
          className="name-input"
          type="text"
          placeholder="Enter your name"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <button type="submit">Confirm</button>
      </form>
    </section>
  )
}

export default NamePrompt
