const DEFAULT_SONGS = [
  {
    id: 'billie',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    duration: 294,
    difficulty: 'easy',
    audioUrl: 'https://cdn.jsdelivr.net/gh/terkelg/experiments-assets@master/audio/karaoke_sample.mp3',
    lyrics: [
      { t: 0, line: "She was more like a beauty queen" },
      { t: 6, line: "from a movie scene" },
      { t: 12, line: "I said don't mind, but what do you mean" },
      { t: 18, line: "I am the one" },
      { t: 24, line: "Who will dance on the floor in the round" }
    ]
  },
  {
    id: 'rolling',
    title: 'Rolling in the Deep',
    artist: 'Adele',
    duration: 228,
    difficulty: 'medium',
    audioUrl: 'https://cdn.jsdelivr.net/gh/terkelg/experiments-assets@master/audio/karaoke_sample.mp3',
    lyrics: [
      { t: 0, line: 'There’s a fire starting in my heart' },
      { t: 7, line: 'Reaching a fever pitch' },
      { t: 12, line: 'And it’s bringing me out the dark' }
    ]
  },
  {
    id: 'sweet',
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    duration: 356,
    difficulty: 'hard',
    audioUrl: 'https://cdn.jsdelivr.net/gh/terkelg/experiments-assets@master/audio/karaoke_sample.mp3',
    lyrics: [
      { t: 0, line: 'She’s got a smile that it seems to me' },
      { t: 6, line: 'Reminds me of childhood memories' }
    ]
  }
];

const DIFF_COLOR = { easy: 'bg-green-500', medium: 'bg-amber-500', hard: 'bg-red-500' };

export class SongLibrary {
  constructor(gridEl) {
    this.gridEl = gridEl;
    const saved = JSON.parse(localStorage.getItem('sinq.songs') || '[]');
    this.songs = [...DEFAULT_SONGS, ...saved];
    this.onSelect = null;
    this.render();
  }

  getAll() { return this.songs; }

  addCustom(song) {
    this.songs.unshift(song);
    const customs = this.songs.filter(s => s.id.startsWith('custom-'));
    localStorage.setItem('sinq.songs', JSON.stringify(customs));
    this.render();
  }

  render() {
    if (!this.gridEl) return;
    this.gridEl.innerHTML = '';
    this.songs.forEach(song => {
      const card = document.createElement('button');
      card.className = 'group relative rounded-2xl overflow-hidden bg-gradient-to-b from-violet-500 to-indigo-600 text-left shadow-card hover:translate-y-[-2px] transition';
      card.innerHTML = `
        <span class="absolute top-3 right-3 text-xs text-white rounded-full px-3 py-1 ${DIFF_COLOR[song.difficulty] || 'bg-gray-500'}">${song.difficulty || 'easy'}</span>
        <div class="h-56 w-full flex items-center justify-center opacity-60">🎵</div>
        <div class="p-4 bg-black/60">
          <div class="font-bold text-lg">${song.title}</div>
          <div class="text-sm text-gray-300">${song.artist}</div>
          <div class="mt-1 text-xs text-gray-400">⏱ ${(song.duration||180)/60|0}:${((song.duration||180)%60).toString().padStart(2,'0')}</div>
        </div>`;
      card.addEventListener('click', () => this.onSelect && this.onSelect(song));
      this.gridEl.appendChild(card);
    });
  }
}


