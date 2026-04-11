import { useState } from 'react'
import LandingPage from './LandingPage'
import DroneForce from './dronebridge-tactical'

export default function App() {
  const [page, setPage] = useState('landing')

  if (page === 'landing') {
    return <LandingPage onEnter={() => setPage('app')} />
  }

  return <DroneForce />
}
