import { useRef, useEffect, useState, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * BackgroundMusic — Nhạc nền với auto-play qua user gesture và lặp vô tận (cắt 5s cuối)
 * 
 * Luồng hoạt động:
 * 1. Mount → nếu user chưa tắt (localStorage !== 'false') → attempt auto play
 * 2. Cắt 5 giây cuối của file audio: khi currentTime >= duration - 5s, tự động seek về 0s
 *    và tiếp tục phát ngay lập tức, loại bỏ đoạn lặng cuối bài để lặp vô tận liền mạch.
 * 3. Browser chặn autoplay ban đầu → lắng nghe user gesture đầu tiên (click, touch, keydown, scroll) để unlock
 * 4. User bấm nút bật/tắt → lưu trạng thái vào localStorage
 * 5. Unmount (đổi tab) → pause ngay
 */
export default function BackgroundMusic({
  src = '/audio/dawn_over_citadel.mp3',
  volume = 0.3,
  trimEndSeconds = 5,
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasUnlocked, setHasUnlocked] = useState(false);

  // Đọc preference — mặc định TRUE để auto play (nếu user chưa từng bấm tắt)
  const [userPreference, setUserPreference] = useState(() => {
    try {
      const saved = localStorage.getItem('su_bg_music_enabled');
      return saved === null ? true : saved === 'true';
    } catch {
      return true;
    }
  });

  // Setup audio, volume và cơ chế cắt 5s cuối để loop vô tận mượt mà
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;

    // Khi phát đến (thời lượng - trimEndSeconds), tự động quay về 0s tiếp tục phát
    const handleTimeUpdate = () => {
      if (trimEndSeconds > 0 && audio.duration && !isNaN(audio.duration) && audio.duration > trimEndSeconds + 2) {
        if (audio.currentTime >= audio.duration - trimEndSeconds) {
          audio.currentTime = 0;
          if (audio.paused) {
            audio.play().catch(() => {});
          }
        }
      }
    };

    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [volume, trimEndSeconds]);

  // Attempt play khi mount hoặc khi userPreference thay đổi
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !userPreference) return;

    audio.play()
      .then(() => {
        setIsPlaying(true);
        setHasUnlocked(true);
      })
      .catch(() => {
        // Browser chặn khi chưa có gesture → sẽ kích hoạt ngay ở gesture đầu tiên
        setIsPlaying(false);
      });
  }, [userPreference, src]);

  // Unlock qua user gesture đầu tiên trên toàn trang
  useEffect(() => {
    if (hasUnlocked) return;

    const tryUnlock = () => {
      const audio = audioRef.current;
      if (!audio || !userPreference) return;

      audio.play()
        .then(() => {
          setIsPlaying(true);
          setHasUnlocked(true);
          window.removeEventListener('click', tryUnlock);
          window.removeEventListener('keydown', tryUnlock);
          window.removeEventListener('scroll', tryUnlock);
          window.removeEventListener('touchstart', tryUnlock);
        })
        .catch(() => {});
    };

    window.addEventListener('click', tryUnlock, { passive: true });
    window.addEventListener('keydown', tryUnlock, { passive: true });
    window.addEventListener('scroll', tryUnlock, { passive: true });
    window.addEventListener('touchstart', tryUnlock, { passive: true });

    return () => {
      window.removeEventListener('click', tryUnlock);
      window.removeEventListener('keydown', tryUnlock);
      window.removeEventListener('scroll', tryUnlock);
      window.removeEventListener('touchstart', tryUnlock);
    };
  }, [hasUnlocked, userPreference]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      try { localStorage.setItem('su_bg_music_enabled', 'false'); } catch {}
      setUserPreference(false);
    } else {
      audio.volume = volume;
      audio.play()
        .then(() => {
          setIsPlaying(true);
          setHasUnlocked(true);
          try { localStorage.setItem('su_bg_music_enabled', 'true'); } catch {}
          setUserPreference(true);
        })
        .catch((err) => {
          console.warn('[BackgroundMusic] Play failed:', err);
        });
    }
  }, [isPlaying, volume]);

  // Phím tắt M bật/tắt nhanh
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.key === 'm' || e.key === 'M') && !e.target.matches('input, textarea')) {
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [togglePlay]);

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" aria-hidden="true" />
      <button
        type="button"
        className={`bg-music-toggle ${isPlaying ? 'is-playing' : ''}`}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
        aria-pressed={isPlaying}
        title={isPlaying ? 'Tắt nhạc nền (M)' : 'Bật nhạc nền (M)'}
      >
        {isPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
        <span className="bg-music-toggle-label">
          {isPlaying ? 'Nhạc nền: Bật' : 'Nhạc nền: Tắt'}
        </span>
      </button>
    </>
  );
}
