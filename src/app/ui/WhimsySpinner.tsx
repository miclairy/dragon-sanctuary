'use client';
import { motion } from 'framer-motion';

export default function WhimsySpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    const sizeClasses = {
        sm: 'w-16 h-16',
        md: 'w-24 h-24',
        lg: 'w-32 h-32',
    };

    const dotSize = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
    };

    return (
        <div className={`relative ${sizeClasses[size]}`} aria-label="Loading" role="status">
            {[...Array(8)].map((_, index) => (
                <motion.div
                    key={index}
                    className={`absolute ${dotSize[size]} rounded-full bg-gradient-to-r from-pink to-purple`}
                    initial={{ scale: 0 }}
                    animate={{
                        scale: [0, 1, 0],
                        rotate: [0, 0, 180, 180, 0],
                        borderRadius: ['0%', '0%', '50%', '50%', '0%'],
                    }}
                    transition={{
                        duration: 2,
                        ease: 'easeInOut',
                        times: [0, 0.2, 0.5, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: 1,
                    }}
                    style={{
                        top: `${50 - Math.cos((index * Math.PI) / 4) * 40}%`,
                        left: `${50 + Math.sin((index * Math.PI) / 4) * 40}%`,
                    }}
                />
            ))}
            <motion.div
                className={`absolute inset-0 rounded-full border-4 border-dashed border-purple-500 ${sizeClasses[size]}`}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
            />
        </div>
    );
}