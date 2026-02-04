import React from 'react';
import { motion, type PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { getCatImageUrl } from '../services/api';
import type { Cat } from '../types';
import './Card.css'; // We'll create this locally for specific card styles if needed or use inline/global

interface CardProps {
    cat: Cat;
    onSwipe: (direction: 'left' | 'right') => void;
    style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ cat, onSwipe, style }) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

    // Background color indicators
    const likeOpacity = useTransform(x, [0, 150], [0, 1]);
    const dislikeOpacity = useTransform(x, [0, -150], [0, 1]);

    const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x > 100) {
            onSwipe('right');
        } else if (info.offset.x < -100) {
            onSwipe('left');
        }
    };

    return (
        <motion.div
            className="card-container"
            style={{ x, rotate, opacity, ...style }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            whileTap={{ scale: 1.05 }}
        >
            <div className="card-image-wrapper">
                <img
                    src={getCatImageUrl(cat)}
                    alt="Cat"
                    draggable={false}
                    className="card-image"
                />

                {/* Overlays for feedback */}
                <motion.div className="overlay overlay-like" style={{ opacity: likeOpacity }}>
                    LIKE
                </motion.div>
                <motion.div className="overlay overlay-dislike" style={{ opacity: dislikeOpacity }}>
                    NOPE
                </motion.div>
            </div>
        </motion.div>
    );
};
