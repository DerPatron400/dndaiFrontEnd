"use client";
import React, { useRef, useState, useEffect } from "react";

export default function useAudio(url) {
  const [audio, setAudio] = useState(null);

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!audio) return;
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);
  useEffect(() => {
    setAudio(new Audio(url));
  }, []);
  useEffect(() => {
    if (!audio) return;
    const currentAudio = audio;
    currentAudio.addEventListener("ended", () => setPlaying(false));
    currentAudio.volume = 0.3;
    currentAudio.pause();

    return () => {
      currentAudio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  return [playing, setPlaying];
}
