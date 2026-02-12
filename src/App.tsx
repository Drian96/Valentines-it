import { useEffect, useState } from 'react'
import GreetingMessage from './components/valentine/GreetingMessage.tsx'
import NamePrompt from './components/valentine/NamePrompt.tsx'
import NotWorkingModal from './components/valentine/NotWorkingModal.tsx'
import FlowerGarden from './components/valentine/FlowerGarden.tsx'
import type { ValentinePhase } from './types/valentine.ts'
import askGif from './assets/1.gif'
import readyGif from './assets/2.gif'
import notWorkingGif from './assets/not_working.gif'

import './components/valentine/valentine.css'

function App() {
  const [phase, setPhase] = useState<ValentinePhase>('ask-valentine')
  const [isNoModalOpen, setIsNoModalOpen] = useState(false)

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

  return (
    <main className="app">
      {phase === 'ask-valentine' && (
        <NamePrompt
          title="Hi baby, can you be my Valentine?"
          gifSrc={askGif}
          gifAlt="Cute duck animation"
          onYes={() => setPhase('ask-ready')}
          onNo={() => setIsNoModalOpen(true)}
        />
      )}
      {phase === 'ask-ready' && (
        <NamePrompt
          title="Okay are you ready?"
          gifSrc={readyGif}
          gifAlt="Excited duck animation"
          onYes={() => setPhase('show-message')}
          onNo={() => setIsNoModalOpen(true)}
        />
      )}
      {phase === 'show-message' && <GreetingMessage />}
      {phase === 'show-flowers' && <FlowerGarden />}
      <NotWorkingModal
        isOpen={isNoModalOpen}
        gifSrc={notWorkingGif}
        onClose={() => setIsNoModalOpen(false)}
      />
    </main>
  )
}

export default App
