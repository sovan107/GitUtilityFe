import './App.css'
import CompareView from './components/compareview/CompareView'
import PRComponent from './components/prview/pr'
import RepoBranch from './components/repobranchview/repobranch'

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>GitHub Repository Comparison</h1>
      </header>
      <main>
        <Router>
          <div>
            <nav className='navbar'>
              <ul>
                <li style={{ margin: '0 20px' }}>
                  <Link
                    to="/comparebranch"
                    style={{
                      color: '#fff',
                      textDecoration: 'none',
                      padding: '10px 20px',
                      borderRadius: '4px',
                    }}
                    activeStyle={{
                      backgroundColor: '#555',
                    }}
                  >
                    Develop - Release UAT Compare
                  </Link>
                </li>
                <li style={{ margin: '0 20px' }}>
                  <Link
                    to="/viewopenprs"
                    style={{
                      color: '#fff',
                      textDecoration: 'none',
                      padding: '10px 20px',
                      borderRadius: '4px',
                    }}
                    activeStyle={{
                      backgroundColor: '#555',
                    }}
                  >
                    View Open PRs
                  </Link>
                </li>
                <li style={{ margin: '0 20px' }}>
                  <Link
                    to="/repobranches"
                    style={{
                      color: '#fff',
                      textDecoration: 'none',
                      padding: '10px 20px',
                      borderRadius: '4px',
                    }}
                    activeStyle={{
                      backgroundColor: '#555',
                    }}
                  >
                    Repo - Branches
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Tab Content */}
            <div style={{ padding: '20px' }}>
              <Routes>
                <Route path="/comparebranch" element={<CompareView/>} />
                <Route path="/viewopenprs" element={<PRComponent/>} />
                <Route path="/repobranches" element={<RepoBranch/>} />
                <Route exact path="/" element={<CompareView/>} /> {/* Default Tab */}
              </Routes>
            </div>
          </div>
        </Router>
      </main>
      <footer>
        <p>Compare branches and commits from GitHub repositories</p>
      </footer>
    </div>
  )
}

export default App
