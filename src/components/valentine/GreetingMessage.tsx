type GreetingMessageProps = {
  name: string
}

function GreetingMessage({ name }: GreetingMessageProps) {
  return (
    <section className="message-screen">
      <h2 className="message">Happy Valentines, {name}!</h2>
    </section>
  )
}

export default GreetingMessage
