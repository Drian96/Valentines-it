import { useEffect, useState } from 'react'
import GreetingMessage from './components/valentine/GreetingMessage.tsx'
import NamePrompt from './components/valentine/NamePrompt.tsx'
import NotWorkingModal from './components/valentine/NotWorkingModal.tsx'
import FlowerGarden from './components/valentine/FlowerGarden.tsx'
import type { ValentinePhase } from './types/valentine.ts'
import askGif from './assets/1.gif'
import readyGif from './assets/2.gif'
import notWorkingGif from './assets/not_working.gif'
import songFile from './assets/song.mp3'

import './components/valentine/valentine.css'

function App() {
  const [phase, setPhase] = useState<ValentinePhase>('ask-valentine')
  const [isNoModalOpen, setIsNoModalOpen] = useState(false)
  const [isAssetsReady, setIsAssetsReady] = useState(false)
  const [hasLoadingError, setHasLoadingError] = useState(false)
  const [loadingKey, setLoadingKey] = useState(0)

  useEffect(() => {
    let isCancelled = false

    const loadImage = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const image = new Image()
        image.onload = () => resolve()
        image.onerror = () => reject(new Error(`Failed to load image: ${src}`))
        image.src = src
      })

    const loadAudio = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const audio = new Audio()
        const handleReady = () => {
          cleanup()
          resolve()
        }
        const handleError = () => {
          cleanup()
          reject(new Error(`Failed to load audio: ${src}`))
        }
        const cleanup = () => {
          audio.removeEventListener('canplaythrough', handleReady)
          audio.removeEventListener('error', handleError)
        }

        if (audio.readyState >= 4) {
          resolve()
          return
        }

        audio.preload = 'auto'
        audio.src = src
        audio.addEventListener('canplaythrough', handleReady, { once: true })
        audio.addEventListener('error', handleError, { once: true })
        audio.load()
      })

    setIsAssetsReady(false)
    setHasLoadingError(false)

    Promise.all([
      loadImage(askGif),
      loadImage(readyGif),
      loadImage(notWorkingGif),
      loadAudio(songFile),
    ])
      .then(() => {
        if (!isCancelled) {
          setIsAssetsReady(true)
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setHasLoadingError(true)
        }
      })

    return () => {
      isCancelled = true
    }
  }, [loadingKey])

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

  if (!isAssetsReady) {
    return (
      <main className="app">
        <section className="loading-card">
          <span className="loading-spinner" aria-hidden="true" />
          <p className="loading-text">
            {hasLoadingError ? 'Loading failed. Please retry.' : 'Loading something special...'}
          </p>
          {hasLoadingError && (
            <button
              className="choice-button yes-button"
              type="button"
              onClick={() => setLoadingKey((current) => current + 1)}
            >
              Retry
            </button>
          )}
        </section>
      </main>
    )
  }

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
