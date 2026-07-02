// Lightweight real-time analysis without heavy ML models

export function simpleAnalyzer(audioCtx, sourceNode) {
  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;
  const bufferLength = analyser.fftSize;
  const timeDomain = new Float32Array(bufferLength);
  const freqData = new Float32Array(analyser.frequencyBinCount);
  sourceNode.connect(analyser);

  // Estimate pitch via autocorrelation
  function estimatePitchHz() {
    analyser.getFloatTimeDomainData(timeDomain);
    // Autocorrelation
    const SIZE = timeDomain.length;
    const maxLag = Math.floor(audioCtx.sampleRate / 80); // min 80 Hz
    const minLag = Math.floor(audioCtx.sampleRate / 600); // max 600 Hz
    let bestLag = -1, bestCorr = 0;
    for (let lag = minLag; lag < maxLag; lag++) {
      let corr = 0;
      for (let i = 0; i < SIZE - lag; i++) {
        corr += timeDomain[i] * timeDomain[i + lag];
      }
      if (corr > bestCorr) { bestCorr = corr; bestLag = lag; }
    }
    if (bestLag <= 0 || bestCorr < 0.01) return NaN;
    return audioCtx.sampleRate / bestLag;
  }

  // On-beat proxy using energy peaks
  let lastEnergy = 0;
  let ema = 0;
  function onBeatProbability() {
    analyser.getFloatFrequencyData(freqData);
    let energy = 0;
    for (let i = 0; i < freqData.length; i++) {
      energy += Math.pow(10, freqData[i] / 10);
    }
    energy /= freqData.length;
    ema = 0.9 * ema + 0.1 * energy;
    const spike = Math.max(0, Math.min(1, (energy - ema) / (ema + 1e-6)));
    lastEnergy = energy;
    return spike;
  }

  // Pronunciation proxy: spectral flatness
  function pronunciationScore() {
    analyser.getFloatFrequencyData(freqData);
    let geo = 0, ar = 0;
    const eps = 1e-6;
    for (let i = 0; i < freqData.length; i++) {
      const p = Math.max(eps, Math.pow(10, freqData[i] / 10));
      geo += Math.log(p);
      ar += p;
    }
    geo = Math.exp(geo / freqData.length);
    ar = ar / freqData.length;
    const flatness = geo / (ar + eps); // 0..1
    // Assume clearer pronunciation -> less flat (more formants), invert
    return Math.max(0, Math.min(1, 1 - flatness));
  }

  return {
    sample() {
      return {
        pitchHz: estimatePitchHz(),
        onBeatProbability: onBeatProbability(),
        pronunciation: pronunciationScore(),
      };
    }
  };
}


