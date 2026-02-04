import { useState } from 'react';
import { CardStack } from './components/CardStack';
import { Summary } from './components/Summary';
import type { Cat } from './types';
import './App.css'; // Add if we need app-specific styles, but root styles might be enough.

function App() {
  const [view, setView] = useState<'stack' | 'summary'>('stack');
  const [likedCats, setLikedCats] = useState<Cat[]>([]);

  const handleFinishStack = (liked: Cat[]) => {
    setLikedCats(liked);
    setView('summary');
  };

  const handleRestart = () => {
    setLikedCats([]);
    setView('stack');
  };

  return (
    <>
      <header className="app-header">
        <h1>Paws & Preferences 🐾</h1>
      </header>
      <main className="app-main">
        {view === 'stack' ? (
          <CardStack onFinish={handleFinishStack} />
        ) : (
          <Summary likedCats={likedCats} onRestart={handleRestart} />
        )}
      </main>
    </>
  );
}

export default App;
