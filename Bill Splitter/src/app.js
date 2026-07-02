// Basic SPA router and karaoke logic

import { SongLibrary } from './library.js';
import { KaraokePlayer } from './player.js';
import { ResultsView } from './results.js';
import { Leaderboard } from './leaderboard.js';

const views = {
  home: document.getElementById('view-home'),
  player: document.getElementById('view-player'),
  results: document.getElementById('view-results'),
  leaderboard: document.getElementById('view-leaderboard'),
};

function showView(name) {
  Object.entries(views).forEach(([key, el]) => {
    if (!el) return;
    el.classList.toggle('hidden', key !== name);
    el.classList.toggle('block', key === name);
  });
}

// Navigation
document.querySelectorAll('[data-route]')?.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const route = e.currentTarget.getAttribute('data-route');
    if (route === 'leaderboard') {
      leaderboard.render();
    }
    showView(route);
  });
});

// Upload modal controls
const modal = document.getElementById('upload-modal');
document.getElementById('open-upload')?.addEventListener('click', () => modal.classList.remove('hidden'));
document.getElementById('close-upload')?.addEventListener('click', () => modal.classList.add('hidden'));

// Initialize modules
const grid = document.getElementById('song-grid');
const library = new SongLibrary(grid);
const player = new KaraokePlayer({
  onFinished: (report) => {
    resultsView.load(report);
    showView('results');
  }
});
const resultsView = new ResultsView();
const leaderboard = new Leaderboard();

// Wire library -> player
library.onSelect = (song) => {
  player.loadSong(song);
  showView('player');
};

// CTA Start -> first song
document.getElementById('cta-start')?.addEventListener('click', () => {
  const first = library.getAll()[0];
  if (first) {
    library.onSelect(first);
  }
});

// Upload form handler
document.getElementById('upload-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const title = form.get('title');
  const artist = form.get('artist');
  const audioFile = form.get('audio');
  const lyricsFile = form.get('lyrics');

  const audioUrl = URL.createObjectURL(audioFile);
  const lyricsText = await lyricsFile.text();
  let lyrics;
  try {
    lyrics = JSON.parse(lyricsText);
  } catch (err) {
    alert('Invalid lyrics JSON');
    return;
  }
  library.addCustom({ id: 'custom-' + Date.now(), title, artist, audioUrl, lyrics });
  modal.classList.add('hidden');
});

// Exit player button
document.getElementById('btn-exit-player')?.addEventListener('click', () => {
  player.teardown();
  showView('home');
});


