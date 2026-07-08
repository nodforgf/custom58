"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const CARD_IMAGES = [
    "/images/7.jpg",
    "/images/8.jpg",
    "/images/9.jpg",
    "/images/10.jpg",
    "/images/11.jpg",
    "/images/12.jpg",
];

export default function GiftQuestSection({ onBack, onFinish }: { onBack: () => void, onFinish: () => void }) {
    const [cards, setCards] = useState(() =>
        [...CARD_IMAGES, ...CARD_IMAGES]
            .sort(() => Math.random() - 0.5)
            .map((img, index) => ({ id: index, img, flipped: false, matched: false }))
    );

    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [isWon, setIsWon] = useState(false);
    const [showWheel, setShowWheel] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState<string | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);

    const GIFTS = [
        "ไม่บ่น1วัน 💞", "ไม่ชวนทะเลาะ1วัน 😍", "นั่งเงียบๆข้างๆ2ชม. 😚", "ทำงานบ้านให้ 💞",
        "ตามใจ1วัน 🤟", "ซักผ้าตากผ้าให้ 😗", "เมนูพิเศษ1วัน 🍲", "ให้นอนเต็มที่ไม่ไปไหน 😘"
    ];

    const fireConfetti = () => {
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#fdf4ff', '#c084fc', '#e879f9']
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#fdf4ff', '#c084fc', '#e879f9']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    const handleCardClick = (id: number) => {
        if (flippedCards.length >= 2 || cards[id].flipped || cards[id].matched) return;
        const newCards = [...cards];
        newCards[id].flipped = true;
        setCards(newCards);
        const newFlipped = [...flippedCards, id];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            const [first, second] = newFlipped;
            if (cards[first].img === cards[second].img) {
                newCards[first].matched = true;
                newCards[second].matched = true;
                setCards(newCards);
                setFlippedCards([]);
            } else {
                setTimeout(() => {
                    newCards[first].flipped = false;
                    newCards[second].flipped = false;
                    setCards(newCards);
                    setFlippedCards([]);
                }, 600);
            }
        }
    };

    useEffect(() => {
        if (cards.length > 0 && cards.every(card => card.matched)) {
            setIsWon(true);
            fireConfetti();
        }
    }, [cards]);

    const spinWheel = () => {
        if (isSpinning) return;
        const newRotation = rotation + 1800 + Math.random() * 360;
        setRotation(newRotation);
        setIsSpinning(true);
        setTimeout(() => {
            const index = Math.floor((360 - (newRotation % 360)) / (360 / GIFTS.length)) % GIFTS.length;
            setResult(GIFTS[index]);
            setIsSpinning(false);
            fireConfetti();
        }, 4000);
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-screen w-full bg-[#f5f0ff] flex flex-col items-center justify-center p-6 font-sans text-[#9333ea] relative z-50 overflow-hidden"
        >
            <button onClick={onBack} className="absolute top-6 left-6 z-[60] text-[10px] uppercase tracking-widest text-[#9333ea]/40 hover:text-[#9333ea] p-2">
                ← Back
            </button>

            {!showWheel ? (
                <div className="max-w-md w-full flex flex-col items-center z-50">
                    <motion.h2
                        animate={isWon ? { scale: [1, 1.1, 1], rotate: [-2, 2, -2] } : {}}
                        className="text-4xl font-black uppercase italic mb-8 tracking-tighter text-[#9333ea]"
                    >
                        {isWon ? "✨ YOU DID IT! ✨" : "Memory Quest"}
                    </motion.h2>

                    <motion.div
                        animate={isWon ? { y: [0, -10, 0] } : {}}
                        className="grid grid-cols-3 gap-3 w-full relative"
                    >
                        {cards.map((card) => (
                            <div key={card.id} onClick={() => handleCardClick(card.id)} className="aspect-square cursor-pointer relative z-50" style={{ perspective: '1000px' }}>
                                <motion.div animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }} transition={{ duration: 0.4 }} className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
                                    <div className="absolute inset-0 bg-[#fdf4ff] border border-[#e879f9]/50 rounded-xl flex items-center justify-center text-3xl font-black text-[#c084fc] shadow-inner" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>?</div>
                                    <div className="absolute inset-0 bg-[#fdf4ff] rounded-xl overflow-hidden shadow-2xl" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                        <img src={card.img} alt="couple" className="w-full h-full object-cover" />
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </motion.div>

                    <AnimatePresence>
                        {isWon && (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center"
                            >
                                <motion.p
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="mt-6 text-xs font-black uppercase tracking-[0.4em] text-[#c084fc]"
                                >
                                    Master of Memory!
                                </motion.p>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setShowWheel(true)}
                                    className="mt-8 bg-[#c084fc] text-white px-12 py-5 rounded-full font-black uppercase shadow-[0_10px_40px_rgba(192,132,252,0.4)] z-[70] text-lg"
                                >
                                    Go to Lucky Wheel 🎡
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center z-50 w-full max-w-sm px-4"
                >
                    <h2 className="text-4xl font-black italic uppercase mb-8 text-[#9333ea]">Lucky Wheel</h2>

                    <div className="relative w-72 h-72 md:w-80 md:h-80">
                        {/* ลูกศรชี้ */}
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-[100] drop-shadow-lg">
                            <svg viewBox="0 0 28 28" className="w-7 h-7">
                                <polygon points="14,28 0,4 28,4" fill="#9333ea" />
                                <polygon points="14,24 3,6 25,6" fill="#c084fc" />
                            </svg>
                        </div>

                        <motion.svg
                            viewBox="0 0 200 200"
                            className="w-full h-full drop-shadow-2xl"
                            animate={{ rotate: rotation }}
                            transition={{ duration: 4, ease: [0.45, 0.05, 0.55, 0.95] }}
                            style={{ transformOrigin: 'center' }}
                        >
                            {/* พื้นหลัง */}
                            <circle cx="100" cy="100" r="98" fill="#fdf4ff" stroke="#c084fc" strokeWidth="3" />

                            {GIFTS.map((gift, i) => {
                                const total = GIFTS.length;
                                const angleDeg = 360 / total;
                                const startDeg = angleDeg * i - 90;
                                const endDeg   = angleDeg * (i + 1) - 90;
                                const s = startDeg * Math.PI / 180;
                                const e = endDeg   * Math.PI / 180;
                                const r = 96, cx = 100, cy = 100;
                                const x1 = cx + r * Math.cos(s);
                                const y1 = cy + r * Math.sin(s);
                                const x2 = cx + r * Math.cos(e);
                                const y2 = cy + r * Math.sin(e);

                                const colors = ['#f5f0ff','#ede9fe','#fdf4ff','#fae8ff'];
                                const fill = colors[i % colors.length];

                                // กึ่งกลาง wedge
                                const midDeg = startDeg + angleDeg / 2;
                                const midRad = midDeg * Math.PI / 180;

                                // emoji ที่ r=62 กลาง wedge
                                const er = 62;
                                const ex = cx + er * Math.cos(midRad);
                                const ey = cy + er * Math.sin(midRad);

                                const emojiMatch = gift.match(/\p{Emoji_Presentation}/u);
                                const emoji = emojiMatch ? emojiMatch[0] : '';

                                return (
                                    <g key={i}>
                                        {/* wedge */}
                                        <path
                                            d={`M ${cx},${cy} L ${x1},${y1} A ${r},${r} 0 0,1 ${x2},${y2} Z`}
                                            fill={fill}
                                            stroke="#e879f9"
                                            strokeWidth="1.5"
                                        />
                                        {/* emoji อย่างเดียว */}
                                        <text x={ex} y={ey} textAnchor="middle" dominantBaseline="middle" fontSize="16">
                                            {emoji}
                                        </text>
                                    </g>
                                );
                            })}

                            {/* วงขอบนอก */}
                            <circle cx="100" cy="100" r="96" fill="none" stroke="#c084fc" strokeWidth="2" />
                            {/* วงกลมกลาง */}
                            <circle cx="100" cy="100" r="14" fill="#c084fc" stroke="#fdf4ff" strokeWidth="3" />
                            <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="white">♥</text>
                        </motion.svg>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={spinWheel}
                        disabled={isSpinning}
                        className={`mt-10 px-14 py-4 rounded-full font-black uppercase tracking-widest transition-all shadow-[0_8px_30px_rgba(192,132,252,0.4)] text-sm ${
                            isSpinning
                                ? 'bg-[#e879f9] text-white opacity-50 cursor-not-allowed'
                                : 'bg-[#c084fc] text-white hover:bg-[#9333ea]'
                        }`}
                    >
                        {isSpinning ? '🍀 Good Luck...' : '✨ Spin Now!'}
                    </motion.button>
                </motion.div>
            )}

            {/* Result Modal */}
            <AnimatePresence>
              {result && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="fixed inset-0 z-[200] flex items-center justify-center bg-[#f5f0ff]/95 p-6 backdrop-blur-xl"
                >
                  <motion.div 
                    initial={{ scale: 0.5, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="bg-[#fdf4ff] p-8 md:p-12 rounded-[40px] text-center w-full max-w-sm shadow-[0_20px_80px_rgba(192,132,252,0.3)] border-8 border-[#e879f9]"
                  >
                    <motion.span 
                      animate={{ y: [0, -15, 0] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="text-6xl block mb-4"
                    >
                      🎁
                    </motion.span>
                    <p className="text-[#c084fc]/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">Congratulations!</p>
                    
                    <h3 className="text-[#9333ea] font-black text-2xl uppercase italic mb-6 leading-snug px-2 break-words">
                      {result}
                    </h3>
                    
                    <div className="w-full h-px bg-[#c084fc]/10 mb-6" />
                    
                    <button 
                      onClick={() => {
                        setResult(null);
                        onFinish();
                      }} 
                      className="w-full py-4 bg-[#c084fc] text-white font-black rounded-2xl hover:bg-[#9333ea] transition-colors uppercase tracking-widest text-sm"
                    >
                      Keep it Forever
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
        </motion.section>
    );
}
