import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { fetchCats } from '../services/api';
import type { Cat } from '../types';
import './CardStack.css';

interface CardStackProps {
    onFinish: (likedCats: Cat[]) => void;
}

export const CardStack: React.FC<CardStackProps> = ({ onFinish }) => {
    const [cats, setCats] = useState<Cat[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [likedCats, setLikedCats] = useState<Cat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCats = async () => {
            const fetchedCats = await fetchCats(20);
            setCats(fetchedCats);
            setLoading(false);
        };
        loadCats();
    }, []);

    const handleSwipe = (direction: 'left' | 'right') => {
        const currentCat = cats[currentIndex];

        if (direction === 'right') {
            setLikedCats(prev => [...prev, currentCat]);
        }

        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);

        if (nextIndex >= cats.length) {
            onFinish(direction === 'right' ? [...likedCats, currentCat] : likedCats);
        }
    };

    if (loading) {
        return <div className="loading">Finding kitties...</div>;
    }

    if (cats.length === 0) {
        return <div className="error">No kitties found :(</div>;
    }

    // We only render the top few cards for performance and visual stacking effect
    // Logic: Render current card and maybe the next one behind it.
    const cardsToShow = cats.slice(currentIndex, currentIndex + 2).reverse();

    return (
        <div className="card-stack">
            {cardsToShow.map((cat, index) => {
                // Check if this is the top card (the last one in the reversed array is the current one)
                // Actually, because we reversed it, the last element is the currentIndex.
                // Let's rethink logic:
                // slice(0, 2) -> [0, 1]. Reverse -> [1, 0]. 
                // Render 1 (behind), then 0 (front). 
                // 0 is swipeable. 
                const isTop = index === cardsToShow.length - 1;
                return (
                    <div key={cat.id} className="card-wrapper" style={{ zIndex: index }}>
                        <Card
                            cat={cat}
                            onSwipe={isTop ? handleSwipe : () => { }}
                            style={{
                                scale: isTop ? 1 : 0.95,
                                marginTop: isTop ? 0 : -20
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};
