import { useEffect, useState } from "react";
import "./pr.css";

const fetchAllRepos = async () => {
  // const response = await fetch('/data/repo-list-data.json');
  const response = await fetch('http://localhost:8080/api/github/repos');

  if (!response.ok) {
    throw new Error(`Failed to load Repo Lists data with status ${response.status}`);
  }
  const data = await response.json();
  return data;
};

const fetchRepoOpenPRs = async (repoName) => {
  console.log(repoName);
  // const response = await fetch('/data/open-pr-repo-data.json');
  let url = "http://localhost:8080/api/github/repos/sovan107/"+ repoName +"/pulls"
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load Repo PR data with status ${response.status}`)
  }

  const openRepoPRdata = await response.json();

  return openRepoPRdata;
};

const fetchAllRepoOpenPRs = async () => {

  // const response = await fetch('/data/all-open-pr-data.json');
  const response = await fetch('http://localhost:8080/api/github/repos/sovan107/pulls');

  if (!response.ok) {
    throw new Error(`Failed to load All Repo Open PRs with status ${response.status}`);
  }

  const allRepoOpenPRs = await response.json();

  return allRepoOpenPRs;
};


const PRComponent = () => {

  const [repos, setRepos] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState('');
  const [allReposChecked, setAllReposChecked] = useState(false);
  const [prs, setPrs] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredPr, setFilteredPr] = useState(null);

  // Fetch All repos when the component loads to set in the dropdown

  useEffect(() => {
    const loadRepos = async () => {
      const allRepos = await fetchAllRepos();
      setRepos(allRepos);
    }

    loadRepos();
  }, []);

  // Handle the allRepos CheckBox
  const handleAllReposChange = (e) => {
    setAllReposChecked(e.target.checked);
    setSelectedRepo(''); // Reset the Dropdown
  };

  //Handle DropDown Change
  const handleRepoChange = (e) => {
    setSelectedRepo(e.target.value);
  };

  //Handle Go Button Click
  const handleGoClick = async () => {
    setLoading(true);
    try {
      let openPrs;
      if (allReposChecked) {
        let openPrsRaw = await fetchAllRepoOpenPRs();
        openPrs = openPrsRaw.filter(arr => arr.length > 0).flat();
      } else if (selectedRepo) {
        openPrs = await fetchRepoOpenPRs(selectedRepo);
      }
      setPrs(openPrs);
    } catch (error) {
      console.error("Error Fetching data:" + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginButtom: '20px' }}>
        <label>
          <input type="checkbox" checked={allReposChecked} onChange={handleAllReposChange} />
          All Repos
        </label>
        <select value={selectedRepo}
          onChange={handleRepoChange}
          disabled={allReposChecked}
          style={{ marginLeft: '10px' }}>
          <option value="">Select a Repo</option>
          {
          repos?.map((repo, index) => (
            <option key={index} value={repo.name}>
              {repo.name}
            </option>
          ))}
        </select>
        <button onClick={handleGoClick} style={{ marginLeft: '10px' }}>
          Go
        </button>
      </div>
      {loading && <p>Loading...</p>}
      <div style={{ marginTop: '20px' }}>
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Repo Name</th>
              <th>Title</th>
              <th>Number</th>
              <th>Status</th>
              <th>Head (from)</th>
              <th>Base (to)</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Author</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {prs && prs.length > 0 ? (
                prs.map((pr, index) => (
                  <tr key={index}>
                    <td>{pr?.repo}</td>
                    <td>{pr?.title}</td>
                    <td>{pr?.number}</td>
                    <td>{pr?.state}</td>
                    <td>{pr?.head?.ref}</td>
                    <td>{pr?.base?.ref}</td>
                    <td>{new Date(pr?.created_at).toLocaleString()}</td>
                    <td>{new Date(pr?.updated_at).toLocaleString()}</td>
                    <td>{pr?.user?.login}</td>
                    <td>
                      <a href={pr?.html_url} target="_blank" rel="noopener noreferrer">
                        View Repo
                      </a>
                    </td>
                  </tr>
                ))
          
            ) : (
              <tr>
                <td colSpan="10">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
    </div>
  )
};

export default PRComponent;
