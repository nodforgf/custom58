"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function LetterSection({ onNext }: { onNext: () => void }) {
    const [phase, setPhase] = useState<'closed' | 'opening' | 'open'>('closed');

    const handleOpen = () => {
        if (phase !== 'closed') return;
        setPhase('opening');
        setTimeout(() => setPhase('open'), 1200);
    };

    return (
        <section className="min-h-screen w-full bg-[#f5f0ff] flex flex-col items-center justify-center p-6 font-sans overflow-hidden relative">

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#c084fc 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            <header className="mb-10 text-center z-10">
                <h2 className="text-[#9333ea] text-3xl font-black italic uppercase tracking-tighter">Final Note</h2>
                <p className="text-[#c084fc]/50 text-[9px] tracking-[0.4em] mt-2">FOR YOUR EYES ONLY</p>
            </header>

            <div className="w-full max-w-sm z-10">
                <AnimatePresence mode="wait">

                    {/* ===== ซองจดหมายตอนปิด/กำลังเปิด ===== */}
                    {phase !== 'open' && (
                        <motion.div
                            key="envelope"
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.25 } }}
                            className="select-none relative w-full"
                            style={{ 
                                cursor: phase === 'closed' ? 'pointer' : 'default', 
                                height: '220px',
                            }}
                            onClick={handleOpen}
                        >
                            
                            {/* ===== 1. ตัวซองด้านหลังสุด ===== */}
                            <div className="absolute inset-0 bg-[#fdf4ff] rounded-xl border-2 border-[#e879f9]/60 shadow-[0_12px_32px_rgba(192,132,252,0.15)]" style={{ zIndex: 1 }} />

                            {/* ===== 2. ฝาซองจดหมาย ===== */}
                            <motion.div
                                className="absolute top-0 left-0 w-full"
                                style={{
                                    height: '110px',
                                    transformOrigin: 'top center',
                                    zIndex: 30
                                }}
                                initial={{ scaleY: 1 }}
                                animate={phase === 'opening' ? { scaleY: -1 } : { scaleY: 1 }}
                                transition={{ duration: 0.45, ease: "easeInOut" }}
                            >
                                <svg viewBox="0 0 340 110" className="w-full h-full" preserveAspectRatio="none">
                                    <path d="M 0,0 L 340,0 L 170,110 Z" fill="#e879f9" stroke="#c084fc" strokeWidth="1.5" />
                                </svg>
                            </motion.div>

                            {/* ===== 3. ตัวบอดี้ซองด้านหน้า ===== */}
                            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none" style={{ zIndex: 20 }}>
                                <div className="absolute bottom-0 left-0 right-0 h-full"
                                    style={{
                                        background: 'linear-gradient(135deg, #f5f0ff 50%, transparent 50%), linear-gradient(225deg, #ede9fe 50%, transparent 50%)',
                                    }}
                                />
                                <svg viewBox="0 0 340 220" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                                    <path d="M 0,220 L 170,120 L 340,220" fill="none" stroke="#e879f9" strokeWidth="1.5" />
                                    <path d="M 0,0 L 0,220 L 170,120" fill="#f5f0ff" stroke="#e879f9" strokeWidth="1" />
                                    <path d="M 340,0 L 340,220 L 170,120" fill="#ede9fe" stroke="#e879f9" strokeWidth="1" />
                                </svg>
                            </div>

                            {/* ===== 4. ตราประทับหัวใจ ===== */}
                            <motion.div
                                className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#c084fc] rounded-full border-[4px] border-white flex items-center justify-center shadow-[0_6px_16px_rgba(147,51,234,0.4)]"
                                style={{ zIndex: 40, pointerEvents: phase === 'closed' ? 'auto' : 'none' }}
                                animate={phase !== 'closed' ? { opacity: 0, scale: 0.3, y: -20 } : { opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.25 }}
                            >
                                <span className="text-white text-2xl">♥</span>
                            </motion.div>

                            {/* hint */}
                            {phase === 'closed' && (
                                <motion.p
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="text-center absolute w-full left-0 -bottom-10 text-[10px] font-black uppercase tracking-[0.4em] text-[#c084fc]/60"
                                >
                                    tap to open ♥
                                </motion.p>
                            )}
                        </motion.div>
                    )}

                    {/* ===== หน้าเนื้อความจดหมาย ===== */}
                    {phase === 'open' && (
                        <motion.div
                            key="letter"
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
                        >
                            <div className="bg-[#fdf4ff] rounded-2xl shadow-[0_20px_50px_rgba(192,132,252,0.25)] border border-[#e879f9]/40 overflow-hidden">
                                <div className="bg-[#e879f9]/25 px-6 py-3 border-b border-[#e879f9]/30 flex items-center gap-2">
                                    <span className="text-[#c084fc]">♥</span>
                                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#9333ea]/60">Final Note</span>
                                </div>
                                <div className="px-7 py-6 text-[#9333ea] space-y-4">
                                    <h3 className="text-base font-black italic border-b border-[#c084fc]/20 pb-3">
                                        ถึง... เธอ
                                    </h3>
                                    <div className="text-xs leading-7 space-y-3 italic text-[#9333ea]/75">
                                        <p>เราเจอกันที่เฟสบุ๊ค ก็ไม่คิดว่าจะจริงจังหรอก
แต่พอได้เห็นหน้าก็รู้สึกว่า อยากคุยด้วยแต่ไม่ได้หวังได้ไปมากกว่าเพื่อนคุยกัน แต่ก็ไม่คิดไม่ฝันเหมือนกันมาเราจะมากันถึงจุดนี้ได้แบบไวมาก รู้ไหมเค้าชอบเธอตั้งแต่ที่เธอรอเค้าตอบแชท เค้าแค่รู้สึกว่าเธอนี่แหละ ที่เค้าล็อคมง
พิมพ์ ขำๆว่า"อย่าเพิ่งหายไปไหนนะ อยู่คุยด้วยนานๆก่อน" เค้าก็ไม่คิดว่าเธอจะรอเค้า เค้าเลยชอบ แต่ไม่รุ้ว่าใครจีบใครก่อนเหมือนกัน แต่ขอบคุณที่อยุ่คุยด้วยวันนั้นนะ ฮิลใจมากๆเลย
ไม่เคยมีใครทำให้เค้ารู้สึกอบอุ่นได้เท่านี้ จนถึงเวลานี้ 1 ปีแล้วนะ ที่ยังมั่นคงเสมอ อาจจะมีทะเลาะกันบ้าง ให้คิดว่ามันคือสีสันของคู่ชีวิตแล้วกัน ได้หัวเราะ  ร้องไห้บ้าง แต่ยังไม่ทิ้งกันไปไหน เค้ารู้ว่าเธอไม่ชอบที่เค้าเป็นคนร้องไห้เก่ง งอแง งี่เง้า แต่เค้าอยากให้เธอรุ้ว่า เค้ารักเธอ เป็นห่วงเธอ เค้ารุ้เธอเจอเรื่องแย่ๆมามากมายไม่ต่างไรกัน เค้าก็พยายามปรับปรุงตัวอยากให้เธอมีความสุขทุกครั้งที่อยู่กับเค้านะ เธออาจจะไม่เคยเจอ แต่สิ่งที่เธอทำมาทั้งหมด ไม่ว่ากับใคร ทำดีกับใครก็ผิดหวังใช่ไหม แต่ต่อจากนี้ไป เค้าจะไม่มีวันทำให้เธอผิดหวังนะ รักเธอเสมอ และรักนานๆไปตลอดนะ 💜</p>
                                    </div>
                                    <div className="text-right font-black italic text-sm pt-2 border-t border-[#c084fc]/10">
                                        — รักนะ
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                whileHover={{ scale: 1.04, backgroundColor: '#9333ea' }}
                                whileTap={{ scale: 0.96 }}
                                onClick={onNext}
                                className="mt-6 w-full py-4 bg-[#c084fc] text-white font-black rounded-2xl text-xs uppercase tracking-[0.3em] shadow-[0_8px_24px_rgba(192,132,252,0.4)] transition-colors"
                            >
                                Our Soundtrack →
                            </motion.button>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </section>
    );
}
