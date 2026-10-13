"use client";
import { useEffect, useRef, useState } from "react";
const wishes =  [
 "Mẹ yêu dấu! Con chúc mẹ luôn mạnh khỏe, bình an và hạnh phúc. Con yêu mẹ rất nhiều! ❤️",
  "Cảm ơn mẹ đã luôn yêu thương, chăm sóc và hy sinh cho gia đình. Chúc mẹ ngày 20/10 thật vui vẻ! 💐",
  "Mẹ là món quà quý giá nhất cuộc đời con. Mong mẹ luôn khỏe mạnh và mãi ở bên gia đình mình. 🌷",
  "Con có thể không nói lời yêu thương mỗi ngày, nhưng con luôn biết ơn mẹ vì tất cả. ❤️",
  "Chúc mẹ luôn nở nụ cười, có thật nhiều niềm vui và không còn phải lo lắng nhiều. 💖",
  "Con sẽ cố gắng học tập và trưởng thành để mẹ luôn tự hào về con. Con yêu mẹ! 🌸",
  "Chúc mẹ có thật nhiều sức khỏe, bình an và những ngày tháng thật hạnh phúc bên gia đình. 💕",
];
const heartIcons = ["❤️", "💗", "💖", "💕", "💓", "✨"];
const flowerIcons = ["🌸", "🌺", "🌷", "🌹", "🌼"];
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [wish, setWish] = useState("");
  const [effects, setEffects] = useState([]);
  const lastWish = useRef(-1);
  const audioRef = useRef(null);
  const timers = useRef([]);
  function getRandomWish() {
    let index;
    do {
      index = Math.floor(Math.random() * wishes.length);
    } while (index === lastWish.current && wishes.length > 1);
    lastWish.current = index;
    return wishes[index];
  }
  function createEffects(type, number) {
    const now = Date.now();
    const newEffects = Array.from({ length: number }, (_, i) => ({
      id: `${now}-${type}-${i}-${Math.random()}`,
      type,
      icon:
        type === "heart"
          ? heartIcons[Math.floor(Math.random() * heartIcons.length)]
          : flowerIcons[Math.floor(Math.random() * flowerIcons.length)],
      left: Math.random() * 100,
      size: 15 + Math.random() * (type === "heart" ? 25 : 20),
      duration:
        type === "heart"
          ? 4 + Math.random() * 5
          : 5 + Math.random() * 6,
    }));
    setEffects((current) => [...current, ...newEffects]);
    const timeout = setTimeout(() => {
      const ids = new Set(newEffects.map((item) => item.id));
      setEffects((current) => current.filter((item) => !ids.has(item.id)));
    }, 12000);
    timers.current.push(timeout);
  }
  async function openGift() {
    if (isOpen) return;
    setIsOpen(true);
    setWish(getRandomWish());
    createEffects("heart", 25);
    // Trình duyệt có thể chặn phát nhạc nếu chưa có file nhạc.
    if (audioRef.current) {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.info("Không thể tự phát nhạc:", error);
      }
    }
    const timeout = setTimeout(() => {
      setShowMessage(true);
    }, 700);
    timers.current.push(timeout);
  }
  function closeMessage() {
    setShowMessage(false);
    setIsOpen(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }
  function changeWish() {
    setWish(getRandomWish());
    createEffects("heart", 15);
  }
  useEffect(() => {
    const interval = setInterval(() => {
      createEffects("flower", 1);
    }, 1000);
    return () => {
      clearInterval(interval);
      timers.current.forEach(clearTimeout);
    };
  }, []);
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") closeMessage();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <>
      <div className="background" />
      <div id="effects" aria-hidden="true">
        {effects.map((effect) => (
          <div
            key={effect.id}
            className={
              effect.type === "heart" ? "heart" : "falling-flower"
            }
            style={{
              left: `${effect.left}vw`,
              fontSize: `${effect.size}px`,
              animationDuration: `${effect.duration}s`,
            }}
          >
            {effect.icon}
          </div>
        ))}
      </div>
      <main className="container">
        <div className="flower">💐</div>
        <p className="small-title">
          Gửi người phụ nữ con yêu nhất
        </p>
        <h1>Chúc Mừng<span>Ngày 20/10</span></h1>
        <div className="line" />
        <p className="description">
          Tặng mẹ yêu của con, người luôn dành cho con tình yêu thương ấm áp nhất trên đời.
        </p>
        <section className="gift-area">
          <button
            type="button"
            className={`gift ${isOpen ? "open" : ""}`}
            id="gift"
            onClick={openGift}
            aria-label="Mở hộp quà 20 tháng 10"
            disabled={isOpen}
          >
            <span className="gift-lid">
              <span className="ribbon" />
            </span>
            <span className="gift-box">
              <span className="ribbon" />
            </span>
            <span className="bow bow-left" />
            <span className="bow bow-right" />
          </button>
          <p className="click-text">
            🎁 Nhấn vào hộp quà để nhận lời chúc
          </p>
        </section>
      </main>
      <section
        className={`message ${showMessage ? "show" : ""}`}
        id="message"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeMessage();
          }
        }}
        aria-hidden={!showMessage}
      >
        <div
          className="message-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="message-title"
        >
          <button
            type="button"
            className="close"
            id="close"
            onClick={closeMessage}
            aria-label="Đóng lời chúc"
            tabIndex={showMessage ? 0 : -1}
          >
            ×
          </button>
          <div className="message-icon">💖</div>
          <h2 id="message-title">Gửi mẹ của con</h2>
          <p className="wish">{wish}</p>
          <div className="message-buttons">
            <button
              type="button"
              id="newWish"
              className="btn-primary"
              onClick={changeWish}
              tabIndex={showMessage ? 0 : -1}
            >
              🎁 Lời chúc khác
            </button>
          </div>
        </div>
      </section>
      <audio ref={audioRef} id="bgMusic" loop preload="none">
        <source src="/music/Loibaihat1.m4a" type="audio/mpeg" />
      </audio>
      <footer>Được làm bằng tất cả tình yêu dành cho mẹ ❤️</footer>
    </>
  );
}