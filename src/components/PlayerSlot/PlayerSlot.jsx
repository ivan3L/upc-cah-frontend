import React from 'react'
import './PlayerSlot.scss'
import imagen from '../../assets/logo.png'

export const PlayerSlot = () => {
  return (
    <div className='slot-player'>
        <img src={imagen} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Felipe</h5>
          <p className="card-text">Kcomt Martinez</p>
          <p className="card-text">
            <small className="text-muted">Edad: 24</small>
          </p>


        </div>
    </div>
  )
}
