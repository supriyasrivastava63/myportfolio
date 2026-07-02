export class ResultsView {
  constructor() {
    this.canvas = document.getElementById('chart-pitch');
    this.accEl = document.getElementById('overall-accuracy');
    this.issuesEl = document.getElementById('issue-list');
    this.btnSave = document.getElementById('btn-save');
    this.btnShare = document.getElementById('btn-share');
    this.chart = null;
    this._bind();
  }

  _bind() {
    this.btnSave?.addEventListener('click', () => this.save());
    this.btnShare?.addEventListener('click', async () => {
      const shareData = { title: 'Sinq Performance', text: `I scored ${this.last?.overall}% on ${this.last?.song?.title}!` };
      if (navigator.share) {
        await navigator.share(shareData).catch(()=>{});
      } else {
        navigator.clipboard.writeText(shareData.text);
        alert('Copied share text to clipboard');
      }
    });
  }

  load(report) {
    this.last = report;
    this.accEl.textContent = report.overall + '%';
    this.issuesEl.innerHTML = report.issues.map(i => `<li>${i}</li>`).join('') || '<li>Great job! 🎉</li>';

    const labels = report.pitchSeries.map(p => p.x.toFixed(1));
    const user = report.pitchSeries.map(p => (isFinite(p.y) ? p.y : null));
    const target = report.targetSeries.map(p => p.y);

    if (this.chart) this.chart.destroy();
    this.chart = new Chart(this.canvas.getContext('2d'), {
      type: 'line',
      data: {
        labels,
        datasets: [
          { label: 'Your Pitch (Hz)', data: user, borderColor: '#34d399', tension: 0.2, spanGaps: true },
          { label: 'Target (Hz)', data: target, borderColor: '#60a5fa', tension: 0.2 }
        ]
      },
      options: {
        plugins: { legend: { labels: { color: '#e5e7eb' } } },
        scales: {
          x: { ticks: { color: '#9ca3af' }, grid: { color: 'rgba(255,255,255,0.06)' } },
          y: { ticks: { color: '#9ca3af' }, grid: { color: 'rgba(255,255,255,0.06)' } }
        }
      }
    });
  }

  save() {
    const entry = {
      id: 'res-' + Date.now(),
      when: new Date().toISOString(),
      song: this.last.song,
      score: this.last.overall
    };
    const list = JSON.parse(localStorage.getItem('sinq.results') || '[]');
    list.unshift(entry);
    localStorage.setItem('sinq.results', JSON.stringify(list));
    alert('Saved to leaderboard');
  }
}


