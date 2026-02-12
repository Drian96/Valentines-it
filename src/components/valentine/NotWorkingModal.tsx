type NotWorkingModalProps = {
  isOpen: boolean
  gifSrc: string
  onClose: () => void
}

function NotWorkingModal({ isOpen, gifSrc, onClose }: NotWorkingModalProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-label="No button modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" aria-label="Close modal" onClick={onClose}>
          X
        </button>
        <img className="modal-gif" src={gifSrc} alt="Funny duck animation" />
        <p className="modal-text">haha sorry this button is not working</p>
      </section>
    </div>
  )
}

export default NotWorkingModal
