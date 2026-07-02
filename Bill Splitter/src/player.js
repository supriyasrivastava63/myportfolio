// Handles playback, lyrics sync, mic capture, and lightweight analysis

import { simpleAnalyzer } from './realtime.js';

export class KaraokePlayer {
  constructor({ onFinished }) {
    this.onFinished = onFinished;
    this.audioEl = document.getElementById('backing');
    this.lyricsEl = document.getElementById('lyrics');
    this.titleEl = document.getElementById('player-title');
    this.artistEl = document.getElementById('player-artist');

    this.btnPlay = document.getElementById('btn-play');
    this.btnPause = document.getElementById('btn-pause');
    this.btnRestart = document.getElementById('btn-restart');
    this.btnMic = document.getElementById('btn-mic');
    this.btnFinish = document.getElementById('btn-finish');

    this.statPitch = document.getElementById('stat-pitch');
    this.statBeat = document.getElementById('stat-beat');
    this.statPron = document.getElementById('stat-pron');

    this._bind();
  }

  _bind() {
    this.btnPlay?.addEventListener('click', () => this.audioEl.play());
    this.btnPause?.addEventListener('click', () => this.audioEl.pause());
    this.btnRestart?.addEventListener('click', () => { this.audioEl.currentTime = 0; this.audioEl.play(); });
    this.btnMic?.addEventListener('click', () => this.enableMic());
    this.btnFinish?.addEventListener('click', () => this.finish());

    this.audioEl?.addEventListener('timeupdate', () => this._tick());
    this.audioEl?.addEventListener('ended', () => this.finish());
  }

  loadSong(song) {
    this.song = song;
    this.titleEl.textContent = song.title;
    this.artistEl.textContent = song.artist;
    this.audioEl.src = song.audioUrl;
    this.audioEl.currentTime = 0;
    this.renderLyrics();
    this.resetAnalysis();
  }

  renderLyrics() {
    if (!this.song?.lyrics) return;
    this.lyricsEl.innerHTML = this.song.lyrics.map((l, i) => `<div data-i="${i}" class="transition text-gray-300">${l.line}</div>`).join('');
  }

  enableMic = async () => {
    if (this.stream) return;
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      this.audioCtx = audioCtx;
      const source = audioCtx.createMediaStreamSource(this.stream);
      this.analyzer = simpleAnalyzer(audioCtx, source);
      this.btnMic.textContent = 'Mic On';
      this.btnMic.disabled = true;
    } catch (err) {
      alert('Microphone permission denied');
    }
  }

  resetAnalysis() {
    this.samples = [];
    this.startTime = null;
  }

  _tick() {
    if (!this.song?.lyrics) return;
    const t = this.audioEl.currentTime;
    if (!this.startTime) this.startTime = performance.now();

    // Highlight current lyric
    let currentIndex = 0;
    for (let i = 0; i < this.song.lyrics.length; i++) {
      if (this.song.lyrics[i].t <= t) currentIndex = i; else break;
    }
    this.lyricsEl.querySelectorAll('div').forEach((el, i) => {
      el.classList.toggle('text-white', i === currentIndex);
      el.classList.toggle('text-gray-500', i < currentIndex);
      el.classList.toggle('text-gray-300', i > currentIndex);
      el.classList.toggle('text-2xl', i === currentIndex);
    });

    // Capture analysis frame if mic active
    if (this.analyzer) {
      const frame = this.analyzer.sample();
      this.samples.push({ t, ...frame });
      this.statPitch.textContent = isFinite(frame.pitchHz) ? Math.round(frame.pitchHz) + ' Hz' : '--';
      this.statBeat.textContent = Math.round(frame.onBeatProbability * 100) + '%';
      this.statPron.textContent = Math.round(frame.pronunciation * 100) + '%';
    }
  }

  finish() {
    this.audioEl.pause();
    const report = this.computeReport();
    this.teardown(false);
    this.onFinished && this.onFinished(report);
  }

  computeReport() {
    // Compare captured pitch with a naive target curve inferred from lyrics timing
    const duration = this.audioEl.duration || (this.song?.duration || 180);
    const target = (t) => 220 + 60 * Math.sin((t / duration) * Math.PI * 4);
    let mse = 0, count = 0, offBeat = 0;
    for (const s of this.samples) {
      if (isFinite(s.pitchHz)) {
        const diff = s.pitchHz - target(s.t);
        mse += diff * diff; count++;
      }
      if (s.onBeatProbability < 0.5) offBeat++;
    }
    const rmse = count ? Math.sqrt(mse / count) : 120;
    const pitchScore = Math.max(0, 100 - (rmse / 2));
    const rhythmScore = 100 - (offBeat / Math.max(1, this.samples.length)) * 100;
    const pronScore = this.samples.length ? (this.samples.reduce((a,b)=>a+b.pronunciation,0)/this.samples.length)*100 : 50;
    const overall = Math.round(0.5 * pitchScore + 0.3 * rhythmScore + 0.2 * pronScore);

    return {
      song: { id: this.song.id, title: this.song.title, artist: this.song.artist },
      overall,
      pitchSeries: this.samples.map(s => ({ x: s.t, y: s.pitchHz })),
      targetSeries: this.samples.map(s => ({ x: s.t, y: target(s.t) })),
      issues: [
        ...(pitchScore < 70 ? ['Pitch stability needs improvement'] : []),
        ...(rhythmScore < 70 ? ['Timing was off the beat in several sections'] : []),
        ...(pronScore < 70 ? ['Pronunciation clarity could be better'] : []),
      ]
    };
  }

  teardown(closeStream = true) {
    this.audioEl.pause();
    if (closeStream && this.stream) {
      this.stream.getTracks().forEach(t => t.stop());
      this.stream = null;
    }
    if (this.audioCtx) {
      this.audioCtx.close();
      this.audioCtx = null;
    }
    this.analyzer = null;
    this.statPitch.textContent = '--';
    this.statBeat.textContent = '--';
    this.statPron.textContent = '--';
  }
}


