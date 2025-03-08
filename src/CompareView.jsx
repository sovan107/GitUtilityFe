import { useState, useEffect } from 'react';
import './CompareView.css';

const CompareView = () => {
  const [compareData, setCompareData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompareData = async () => {
      try {
        setLoading(true);
        // Use the local JSON file instead of making an API call
        const response = await fetch('/data/compare-data.json');
        
        if (!response.ok) {
          throw new Error(`Failed to load data with status ${response.status}`);
        }
        
        const data = await response.json();
        setCompareData(data);
        setError(null);
      } catch (err) {
        setError(
          err.message || 
          'Failed to fetch comparison data. Please try again later.'
        );
        console.error('Error fetching comparison data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompareData();
  }, []);

  if (loading) {
    return (
      <div className="compare-container loading">
        <h2>Loading comparison data...</h2>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="compare-container error">
        <h2>Error</h2>
        <p className="error-message">{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="compare-container">
      <h1>GitHub Branch Comparison</h1>
      <div className="compare-header">
        <div className="branch-info">
          <h2>Comparing</h2>
          <div className="branches">
            <span className="base-branch">develop</span>
            <span className="separator">→</span>
            <span className="compare-branch">release-uat</span>
          </div>
        </div>
      </div>

      {compareData && (
        <div className="repo-list">
          {Object.entries(compareData).map(([repoName, repoData]) => (
            <div key={repoName} className="repo-item">
              <div className="repo-header">
                <h3 className="repo-name">{repoName}</h3>
                <div className={`repo-status ${repoData.status}`}>
                  {repoData.status.charAt(0).toUpperCase() + repoData.status.slice(1)}
                </div>
              </div>
              
              <div className="stats-container">
                <div className="stat-item">
                  <span className="stat-label">Ahead by:</span>
                  <span className="stat-value">{repoData.ahead_by}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Behind by:</span>
                  <span className="stat-value">{repoData.behind_by}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Total Commits:</span>
                  <span className="stat-value">{repoData.total_commits}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompareView;
