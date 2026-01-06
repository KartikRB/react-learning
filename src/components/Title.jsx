function Title({ title, tagline }) {

  return (
    <div className="text-center mb-5">
        <h1 className="fw-bold">{title}</h1>
        <p className="text-muted mt-3">
            {tagline}
        </p>
    </div>
  )
}

export default Title

