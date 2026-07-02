export class Leaderboard {
  constructor() {
    this.tbody = document.getElementById('leaderboard-body');
  }

  render() {
    const list = JSON.parse(localStorage.getItem('sinq.results') || '[]');
    this.tbody.innerHTML = '';
    list.slice(0, 50).forEach((row, idx) => {
      const tr = document.createElement('tr');
      tr.className = 'border-t border-white/10';
      tr.innerHTML = `
        <td class="py-2 text-gray-400">${idx + 1}</td>
        <td>Guest</td>
        <td>${row.song?.title || '-'}</td>
        <td class="font-semibold">${row.score}%</td>
        <td class="text-gray-400">${new Date(row.when).toLocaleString()}</td>`;
      this.tbody.appendChild(tr);
    });
    if (!list.length) {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td colspan="5" class="py-6 text-center text-gray-400">No scores yet. Sing a song!</td>`;
      this.tbody.appendChild(tr);
    }
  }
}


