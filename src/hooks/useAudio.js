// src/hooks/useAudio.js

import { useRef } from 'react';
import { AUDIO_CONFIG } from '../config';

/**
 * Custom hook for managing audio playback
 * Handles both UI sound effects and Pokemon cries
 *
 * @param {boolean} soundEnabled - Whether sound is enabled globally
 * @returns {object} Audio control functions
 * - playClickSound: Play UI click sound
 * - playCry: Play Pokemon cry
 * - playCryWithDelay: Play cry with delay
 * - stopAudio: Stop current audio
 */
export const useAudio = (soundEnabled) => {
  const audioRef = useRef(null);

  /**
   * Play a click sound effect for UI interactions
   */
  const playClickSound = () => {
    if (!soundEnabled) return;

    try {
      const audio = new Audio(AUDIO_CONFIG.CLICK_SOUND);
      audio.volume = AUDIO_CONFIG.CLICK_VOLUME;
      audio.play().catch((err) => {
        console.warn("Click sound failed to play:", err);
      });
    } catch (error) {
      console.error("Error playing click sound:", error);
    }
  };

  /**
   * Play Pokemon cry audio
   * @param {string} cryUrl - URL to the cry audio file from PokeAPI
   */
  const playCry = (cryUrl) => {
    if (!soundEnabled || !cryUrl) return;

    try {
      // Stop current audio if playing
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      // Create and play new audio
      audioRef.current = new Audio(cryUrl);
      audioRef.current.volume = AUDIO_CONFIG.CRY_VOLUME;
      audioRef.current.play().catch((err) => {
        console.warn("Pokemon cry failed to play:", err);
      });
    } catch (error) {
      console.error("Error playing cry:", error);
    }
  };

  /**
   * Play Pokemon cry with a delay
   * Useful for playing cry after Pokemon loads
   *
   * @param {string} cryUrl - URL to the cry audio file
   * @param {number} delay - Delay in milliseconds (optional, uses config default)
   */
  const playCryWithDelay = (cryUrl, delay = AUDIO_CONFIG.CRY_DELAY) => {
    if (!soundEnabled || !cryUrl) return;

    setTimeout(() => {
      playCry(cryUrl);
    }, delay);
  };

  /**
   * Stop current audio playback
   * Useful for cleanup or when switching Pokemon
   */
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  return {
    playClickSound,
    playCry,
    playCryWithDelay,
    stopAudio,
  };
};