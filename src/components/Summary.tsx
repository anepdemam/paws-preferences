import React from 'react';
import { getCatImageUrl } from '../services/api';
import type { Cat } from '../types';
import './Summary.css';

interface SummaryProps {
    likedCats: Cat[];
    onRestart: () => void;
}

export const Summary: React.FC<SummaryProps> = ({ likedCats, onRestart }) => {
    return (
        <div className="summary-container">
            <h2 className="summary-title">Purr-fect Matches! 😻</h2>
            <p className="summary-subtitle">You liked {likedCats.length} {likedCats.length === 1 ? 'kitty' : 'kitties'}!</p>

            {likedCats.length > 0 ? (
                <div className="marquee-container">
                    <div className="marquee-track">
                        {/* Render twice for seamless loop */}
                        {[...likedCats, ...likedCats].map((cat, index) => (
                            <div key={`${cat.id}-${index}`} className="marquee-item">
                                <img src={getCatImageUrl(cat)} alt="Liked Cat" loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="no-likes">
                    <p>You didn't like any cats... Are you a dog person? 🐶</p>
                </div>
            )}

            <button className="restart-btn" onClick={onRestart}>
                Start Over
            </button>
        </div>
    );
};
