import React, { useEffect, useState } from 'react';

function GitHubStats() {
  const [stats, setStats] = useState({ stars: 0, forks: 0, watchers: 0 });

  useEffect(() => {
    async function fetchStats() {
      const response = await fetch('https://api.github.com/users/shliamin/repos');
      const repos = await response.json();
      let stars = 0, forks = 0, watchers = 0;
      repos.forEach(repo => {
        stars += repo.stargazers_count;
        forks += repo.forks_count;
        watchers += repo.watchers_count;
      });
      setStats({ stars, forks, watchers });
    }

    fetchStats();
  }, []);

  return (
    <div className="github-stats">
      <div className="github-stats-item">
        <p>Stars: {stats.stars}</p>
        <p>Forks: {stats.forks}</p>
        <p>Watchers: {stats.watchers}</p>
      </div>
    </div>
  );
}

export default GitHubStats;
