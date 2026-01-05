import React from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';

interface SoundToggleProps {
    isMuted: boolean;
    onToggle: () => void;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({ isMuted, onToggle }) => {
    return (
        <motion.button
            onClick={onToggle}
            className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
        >
            <div className="relative w-5 h-5">
                {/* Volume On Icon */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={false}
                    animate={{
                        scale: isMuted ? 0 : 1,
                        opacity: isMuted ? 0 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <Volume2 className="w-5 h-5 text-green-400" />
                </motion.div>

                {/* Volume Off Icon */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={false}
                    animate={{
                        scale: isMuted ? 1 : 0,
                        opacity: isMuted ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <VolumeX className="w-5 h-5 text-gray-500" />
                </motion.div>
            </div>
        </motion.button>
    );
};
