import React, { useState, useEffect } from 'react'

function App() {
  const [whitelist, setWhitelist] = useState([])
  const [currentSite, setCurrentSite] = useState('')

  // Get the current tab's domain
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = new URL(tabs[0].url)
      setCurrentSite(url.hostname)
    })

    // Load whitelist from Chrome storage
    chrome.storage.sync.get(['whitelist'], (result) => {
      if (result.whitelist) {
        setWhitelist(result.whitelist)
      }
    })
  }, [])

  // Add current site to whitelist
  const addToWhitelist = () => {
    const updatedWhitelist = [...whitelist, currentSite]
    setWhitelist(updatedWhitelist)
    chrome.storage.sync.set({ whitelist: updatedWhitelist })
  }

  // Remove site from whitelist
  const removeFromWhitelist = (site) => {
    const updatedWhitelist = whitelist.filter((s) => s !== site)
    setWhitelist(updatedWhitelist)
    chrome.storage.sync.set({ whitelist: updatedWhitelist })
  }

  return (
    <div className="App">
      <h2>Ad Blocker</h2>
      <p>Current Site: {currentSite}</p>
      <button onClick={addToWhitelist}>Whitelist this site</button>

      <h3>Whitelisted Sites</h3>
      <ul>
        {whitelist.map((site) => (
          <li key={site}>
            {site}{' '}
            <button onClick={() => removeFromWhitelist(site)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
