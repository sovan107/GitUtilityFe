import './App.css'
import CompareView from './CompareView'

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>GitHub Repository Comparison</h1>
      </header>
      <main>
        <CompareView />
      </main>
      <footer>
        <p>Compare branches and commits from GitHub repositories</p>
      </footer>
    </div>
  )
}

export default App
