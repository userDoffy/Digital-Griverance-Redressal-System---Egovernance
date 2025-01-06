import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
      <div className="container mt-5">
        <div className="text-center">
          <h1 className="display-4 fw-bold text-primary">Welcome to the Digital Griverance System</h1>
          <p className="lead text-secondary mt-3">
            Our Digital Griverance System helps common citizens to submit their complaints where our authorities will look and them and provide you with appropriate response and take necessary actions.
          </p>
        </div>
        <div className="row mt-5">
          <div className="col-md-4">
            <h3 className="fw-bold text-success">Submit Your Complaint</h3>
            <p className="text-muted">
              Easiest way to submit your griverances to the authoritites
            </p>
          </div>
          <div className="col-md-4">
            <h3 className="fw-bold text-success">24 hour service</h3>
            <p className="text-muted">
              24 hour running server. We accept your complaints any time.
            </p>
          </div>
          <div className="col-md-4">
            <h3 className="fw-bold text-success">Quick Reply</h3>
            <p className="text-muted">
              Administrators are constantly responsing and resolving your complains.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
