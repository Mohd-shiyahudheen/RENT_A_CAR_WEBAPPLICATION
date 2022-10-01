import React from 'react'
import { Alert } from 'react-bootstrap'

const Errormessage = ({ varient = 'danger', children }) => {
  return (
    <div>
          <Alert varient={varient} style={{ fontSize: 20 }}>
              <strong>{children}</strong>
          </Alert>
    </div>
  )
}

export default Errormessage