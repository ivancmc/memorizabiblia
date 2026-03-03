import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, ChevronDown, ArrowLeft } from 'lucide-react';
import { useStore } from '../store';

interface HistoryPageProps {
    onBack: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onBack }) => {
    const { history } = useStore();
    const [expandedVerse, setExpandedVerse] = useState<string | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col h-full w-full max-w-2xl mx-auto bg-slate-900/90 backdrop-blur-md rounded-3xl p-4 md:p-8 shadow-2xl border border-indigo-500/20"
        >
            {/* Header */}
            <div className="flex items-center gap-3 md:gap-4 mb-6">
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-white/10 rounded-full text-indigo-300 hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} className="md:w-6 md:h-6" />
                </button>
                <div className="flex items-center gap-2 md:gap-3 text-yellow-400">
                    <BookOpen size={20} className="md:w-6 md:h-6" />
                    <h2 className="text-xl md:text-2xl font-bold text-white">Meus Versículos</h2>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto pr-1 md:pr-2 custom-scrollbar">
                {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 md:py-24 text-indigo-300/50 text-center">
                        <Calendar size={48} className="mb-4 opacity-20 md:w-16 md:h-16" />
                        <p className="text-base md:text-lg md:text-xl">Você ainda não completou nenhum versículo.</p>
                        <p className="text-xs md:text-sm mt-3 opacity-70">Complete os 7 dias de desafios para salvar seus versículos aqui!</p>
                    </div>
                ) : (
                    <div className="space-y-3 md:space-y-4 pb-12">
                        <p className="text-[11px] md:text-sm text-indigo-400 font-medium mb-1">
                            {history.length} versículo{history.length !== 1 ? 's' : ''} completado{history.length !== 1 ? 's' : ''}
                        </p>
                        {history.map((verse, index) => {
                            const isExpanded = expandedVerse === verse.reference;
                            return (
                                <motion.div
                                    key={`${verse.reference}-${index}`}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.04, layout: { duration: 0.3 } }}
                                    className="bg-indigo-950/30 border border-indigo-500/20 rounded-2xl overflow-hidden hover:bg-indigo-950/50 hover:border-indigo-400/40 transition-all"
                                >
                                    <button
                                        className="w-full text-left px-4 py-4 md:px-6 md:py-5 flex justify-between items-center group cursor-pointer"
                                        onClick={() => setExpandedVerse(isExpanded ? null : verse.reference)}
                                    >
                                        <h3 className="text-base md:text-lg font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">
                                            {verse.reference}
                                        </h3>
                                        <motion.div
                                            animate={{ rotate: isExpanded ? 180 : 0 }}
                                            className="p-1 rounded-full group-hover:bg-white/5 transition-colors"
                                        >
                                            <ChevronDown size={18} className="text-indigo-400" />
                                        </motion.div>
                                    </button>
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="px-4 pb-4 md:px-6 md:pb-6 pt-0 border-t border-indigo-500/10 mt-1">
                                                    <p className="text-slate-200 mt-4 leading-relaxed font-serif text-base md:text-lg italic">"{verse.text}"</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </motion.div>
    );
};
