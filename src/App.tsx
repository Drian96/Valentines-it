import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import GreetingMessage from './components/valentine/GreetingMessage.tsx'
import NamePrompt from './components/valentine/NamePrompt.tsx'
import FlowerGarden from './components/valentine/FlowerGarden.tsx'
import type { ValentinePhase } from './types/valentine.ts'

import './components/valentine/valentine.css'

function App() {
  const [nameInput, setNameInput] = useState('')
  const [name, setName] = useState('')
  const [phase, setPhase] = useState<ValentinePhase>('ask-name')

  useEffect(() => {
    if (phase !== 'show-message') {
      return
    }

    const timer = window.setTimeout(() => {
      setPhase('show-flowers')
    }, 2200)

    return () => {
      window.clearTimeout(timer)
    }
  }, [phase])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedName = nameInput.trim()
    if (!trimmedName) {
      return
    }

    setName(trimmedName)
    setPhase('show-message')
  }

  return (
    <main className="app">
      {phase === 'ask-name' && (
        <NamePrompt
          value={nameInput}
          onChange={setNameInput}
          onSubmit={handleSubmit}
        />
      )}
      {phase === 'show-message' && <GreetingMessage name={name} />}
      {phase === 'show-flowers' && <FlowerGarden name={name} />}
    </main>
  )
}

export default App
