function Card({ title, subtitle, body }) {
    return (
        <div className="card" style={{ width: '18rem' }}>
        <div className="card-body">
          {/* <h5 className="card-title">Card title</h5> */}
          <h5 className="card-title">{title}</h5>
          {/* <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6> */}
          <h6 className="card-subtitle mb-2 text-body-secondary">{subtitle}</h6>
          {/* <p className="card-text">This is some text on the card body.</p> */}
          <p className="card-text">{body}</p>
          <a href="#" className="card-link">Card link</a>
          <a href="#" className="card-link">Another link</a>
        </div>
      </div>
    )
}

export default Card