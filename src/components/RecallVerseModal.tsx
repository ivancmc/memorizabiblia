import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Eye, CheckCircle2 } from 'lucide-react';
import { Verse } from '../store';

interface RecallVerseModalProps {
    verse: Verse | null;
    onClose: () => void;
}

export const RecallVerseModal: React.FC<RecallVerseModalProps> = ({ verse, onClose }) => {
    const [isTextVisible, setIsTextVisible] = useState(false);

    // Reset visibility when modal closes or verse changes
    useEffect(() => {
        if (!verse) {
            setIsTextVisible(false);
        }
    }, [verse]);

    return (
        <AnimatePresence>
            {verse && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-slate-900 border-2 border-yellow-400/40 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-yellow-400/20 bg-yellow-950/20">
                            <div className="flex items-center gap-3 text-yellow-400">
                                <Sparkles size={24} className="animate-pulse" />
                                <h2 className="text-xl font-bold text-white tracking-tight">Desafio do Relembre</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-yellow-300 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 md:p-12 text-center flex flex-col items-center">
                            <div className="mb-8">
                                <span className="text-xs font-bold text-yellow-400/60 uppercase tracking-[0.2em] mb-2 block">Referência</span>
                                <p className="text-3xl md:text-4xl font-black text-white tracking-tight">{verse.reference}</p>
                            </div>

                            <AnimatePresence mode="wait">
                                {!isTextVisible ? (
                                    <motion.button
                                        key="reveal-btn"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        onClick={() => setIsTextVisible(true)}
                                        className="group flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all shadow-xl shadow-indigo-600/20 active:scale-95 border border-indigo-400/30"
                                    >
                                        <Eye size={22} className="group-hover:animate-bounce" />
                                        <span>Revelar Texto</span>
                                    </motion.button>
                                ) : (
                                    <motion.div
                                        key="verse-text"
                                        initial={{ opacity: 0, y: 20, height: 0 }}
                                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                                        className="w-full"
                                    >
                                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 relative mt-4">
                                            <p className="text-xl md:text-2xl font-serif text-slate-100 leading-relaxed italic">
                                                "{verse.text}"
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer */}
                        <div className="p-6 bg-slate-950/40 border-t border-white/5 text-center">
                            {isTextVisible ? (
                                <button
                                    onClick={onClose}
                                    className="flex items-center gap-2 mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-indigo-950 px-10 py-3.5 rounded-full font-black hover:from-yellow-300 hover:to-orange-400 transition-all shadow-lg shadow-yellow-500/20 active:scale-95"
                                >
                                    <CheckCircle2 size={20} />
                                    Lembrei!
                                </button>
                            ) : (
                                <p className="text-sm text-indigo-400/70 font-medium italic">
                                    Tente lembrar as palavras antes de revelar o texto...
                                </p>
                            )}
                        </div>

                        {/* Decorative progress-like bar */}
                        <div className="h-1.5 w-full bg-gradient-to-r from-yellow-400 via-pink-500 to-indigo-500" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
