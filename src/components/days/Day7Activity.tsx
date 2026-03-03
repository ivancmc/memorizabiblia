import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, CheckCircle, Star } from 'lucide-react';
import { Verse } from '@/src/store';

interface Day7ActivityProps {
  verse: Verse;
  onComplete: () => void;
}

const Day7Activity: React.FC<Day7ActivityProps> = ({ verse, onComplete }) => {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="text-center space-y-6">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Dia 7: Grande desafio!</h2>

      <div className="bg-yellow-500/20 p-8 rounded-full w-32 h-32 mx-auto flex items-center justify-center mb-4 border border-yellow-500/50">
        <Star size={48} className="text-yellow-400 animate-pulse" fill="currentColor" />
      </div>

      <p className="text-xl text-indigo-100">
        Você consegue recitar o versículo inteiro e a referência sem olhar?
      </p>

      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-950/50 p-4 rounded-xl shadow-sm border border-indigo-500/30 mt-4"
        >
          <p className="text-indigo-200 italic">"{verse.text}"</p>
          <p className="text-yellow-400 font-semibold mt-2">{verse.reference}</p>
        </motion.div>
      )}

      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowHint(!showHint)}
          className="flex-1 flex items-center justify-center gap-2 bg-indigo-800/50 text-indigo-300 px-6 py-3.5 rounded-2xl font-bold hover:bg-indigo-700/60 transition-all border border-indigo-500/30 text-sm md:text-base"
        >
          <HelpCircle size={20} />
          <span>{showHint ? 'Esconder' : 'Espiar'}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onComplete}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-indigo-950 px-6 py-3.5 rounded-2xl font-black shadow-xl shadow-yellow-500/10 hover:from-yellow-300 hover:to-orange-400 transition-all text-sm md:text-base"
        >
          <CheckCircle size={20} />
          <span>Memorizei!</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Day7Activity;
