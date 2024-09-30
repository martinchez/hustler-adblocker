import React, { useState, useEffect } from 'react'
import { chromeAPI } from './chromeAPI'
import './App.css'

function App() {
  const [isEnabled, setIsEnabled] = useState(false)

  useEffect(() => {
    chromeAPI.storage.sync.get(['adBlockerEnabled'], (result) => {
      setIsEnabled(result.adBlockerEnabled || false)
    })
  }, [])

  const toggleAdBlocker = () => {
    const newState = !isEnabled
    setIsEnabled(newState)
    chromeAPI.storage.sync.set({ adBlockerEnabled: newState })
    chromeAPI.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chromeAPI.tabs.sendMessage(tabs[0].id, {
        action: 'toggleAdBlocker',
        isEnabled: newState,
      })
    })
  }

  return (
    <div className="App">
      <h1>Simple Ad Blocker</h1>
      <button onClick={toggleAdBlocker}>
        {isEnabled ? 'Disable Ad Blocker' : 'Enable Ad Blocker'}
      </button>
      <p>Ad Blocker is currently {isEnabled ? 'enabled' : 'disabled'}.</p>
    </div>
  )
}

export default App
