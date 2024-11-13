// Theme switcher logic
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

// Check localStorage for the theme preference
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
  body.classList.add('dark-mode');
  themeSwitch.textContent = "Switch to Light Mode";
} else {
  themeSwitch.textContent = "Switch to Dark Mode";
}

themeSwitch.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  themeSwitch.textContent = theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode";
});


export async function fetchGitHubRepos(username) {
  const repoContainer = document.getElementById('github-repos');
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
  const repos = await response.json();

  repos.forEach(repo => {
      const repoDiv = document.createElement('div');
      repoDiv.classList.add('repo');
      repoDiv.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || 'No description available'}</p>
          <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;
      repoContainer.appendChild(repoDiv);
  });
}

fetchGitHubRepos('Jakee4488');
