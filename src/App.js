import React, { useState } from 'react';
import { ChevronDown, Gift, Snowflake, Star, Shuffle } from 'lucide-react';

const XmasGamesSite = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [completedGames, setCompletedGames] = useState([]);

  const games = [
    {
      id: 1,
      title: "Ho Ho Blow",
      emoji: "🎈",
      gif: "https://i.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3MDh4MDM2bjRzMG5ucW1xMGd1cHVxd3I2d3VncnUwbTdzMWUzMWdzNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/PzqfjayDQj3zjTMaNv/giphy.gif",
      isTeam: false,
      objective: "Use a balloon to blow plastic cups off the table. This is a 1v1 battle — fastest person to clear all their cups wins.",
      materials: ["Balloons", "Plastic cups", "Table (split into two sides)"]
    },
    {
      id: 2,
      title: "Snowball Fight",
      emoji: "⛄",
      gif: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDc0eWFpYW9oMndhM25iM3dtcmtvdTNpeHltcGY3b2N3cnQ2dm93eiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xUySTqYAa9n6awCiSk/giphy.gif",
      isTeam: true,
      objective: "Wearing oven mitts, players throw cotton balls across the table trying to land them into the opponent's bucket. Most cotton balls in the bucket wins.",
      materials: ["Cotton balls", "2 buckets (one at each side of table)", "Oven mitts", "Table"]
    },
    {
      id: 3,
      title: "Jingle Balls",
      emoji: "🔔",
      gif: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHNha2t4ZzlxanNuYmlhbTZpNGkzemtqM3lvajIwenZrOGRkOXAweCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/jj7Kne9Rq6QQSWE4Hp/giphy.gif",
      isTeam: false,
      objective: "Swing a bauble attached to a string around your waist and get it into a cup tied at the front — no hands.",
      materials: ["Plastic cup", "Christmas bauble", "String or belt"]
    },
    {
      id: 4,
      title: "The Grinch Hates Balloons",
      emoji: "💚",
      gif: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnJqZXRjdmNoeWNra2lzbnF4YTdtZnY5eHQxdGh6dzd6NXZiMWlvcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/GepjBlRKsD1uM/giphy.gif",
      isTeam: false,
      objective: "Each player has a balloon attached to one of their legs. You must pop everyone else's balloons while protecting your own. Last person with at least one balloon wins.",
      materials: ["Balloons", "String / tape for attaching to legs", "Open space"]
    },
    {
      id: 5,
      title: "Elf Reflex Rumble",
      emoji: "🧝",
      gif: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmhjbWIwYXliMXBqbHQ1YTB5bGFtcnByMWZsYWdqZ2YzMmo0cHExdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/oBTCwXvs0SUNO/giphy.gif",
      isTeam: false,
      objective: "Everyone stands around a cup. The caller shouts: \"Head!\" \"Knees!\" \"Nose!\" etc. When they yell \"Cup!\" everyone tries to grab the cup. Slowest person is eliminated each round until two remain.",
      materials: ["1 cup", "Caller"]
    },
    {
      id: 6,
      title: "Rudolph's Antlers",
      emoji: "🦌",
      gif: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaG00OWszeW00NXc2cWsxOWkxeWJpOHYwZ2dicm93cnFwNjJ1azU2aCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/VNJTsJ859y7PG/giphy.gif",
      isTeam: true,
      objective: "Throw rings onto reindeer antlers (worn or mounted). Most rings landed wins.",
      materials: ["Antler headband", "Rings (glow sticks or rope)"]
    },
    {
      id: 7,
      title: "I Want a Teddy Bear for Christmas",
      emoji: "🧸",
      gif: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3Ayd295MGdmNHZtaW5xN3VjMG92b2JrOG9jNjdmazd6bXVvN3R3aCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/klT9OiYVe8QHPBRQkF/giphy.gif",
      isTeam: false,
      objective: "One person sits, eyes closed, in the middle. Everyone walks in a circle. A randomly chosen player says \"I'm a Teddy Bear!\" in a disguised voice. The middle person must guess who said it.",
      materials: ["Just people!"]
    },
    {
      id: 8,
      title: "White Elephant",
      emoji: "🎁",
      gif: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExOW1mb3djZWdicWYyaWc5OXZwam4zeWJ5bTV1YjQxdGxia3BhOGF3cSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/CnmuHjbn0U0tW8y0ur/giphy.gif",
      isTeam: false,
      isSpecial: true,
      customIcon: "🐘"
    }
  ];

  const selectRandomGame = () => {
    // Filter out White Elephant (id 8) and completed games
    const playableGames = games.filter(game => game.id !== 8 && !completedGames.includes(game.id));
    
    if (playableGames.length === 0) {
      alert("All games have been completed! 🎉");
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * playableGames.length);
    setSelectedGame(playableGames[randomIndex].id);
    setIsMenuOpen(false);
  };

  const toggleGameCompletion = (gameId) => {
    if (completedGames.includes(gameId)) {
      setCompletedGames(completedGames.filter(id => id !== gameId));
    } else {
      setCompletedGames([...completedGames, gameId]);
    }
  };

  const whiteElephantContent = (
    <div className="space-y-6">
      <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
        <h3 className="text-xl font-bold text-red-700 mb-2">🎁 Gift Rule</h3>
        <p className="text-gray-700">Each participant must bring one wrapped gift <strong>at least $50</strong>.</p>
        <p className="text-gray-700">Do not label the gift with your name.</p>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-green-700 mb-3">🎲 How to Play</h3>
        
        <div className="space-y-4">
          <div className="bg-white border-2 border-green-200 rounded-lg p-4">
            <h4 className="text-lg font-bold text-green-600 mb-2">1. Draw Numbers</h4>
            <p className="text-gray-700">Everyone draws a random number. This decides the order of turns (1 goes first, highest number goes last).</p>
          </div>

          <div className="bg-white border-2 border-blue-200 rounded-lg p-4">
            <h4 className="text-lg font-bold text-blue-600 mb-2">2. Player Turn Options</h4>
            <p className="text-gray-700 mb-2">On your turn, you may:</p>
            <div className="ml-4 space-y-2">
              <p className="text-gray-700"><strong>Option A — Pick a New Gift</strong><br/>Choose any unopened gift, unwrap it, and reveal it to the group.</p>
              <p className="text-center text-gray-500 font-bold">OR</p>
              <p className="text-gray-700"><strong>Option B — Steal a Gift</strong><br/>Take a gift that someone else has already opened.</p>
            </div>
          </div>

          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
            <h4 className="text-lg font-bold text-red-700 mb-3">🔄 Stealing Rules</h4>
            <div className="space-y-2">
              <p className="text-gray-700">✔ <strong>A gift can only be stolen once per turn</strong><br/>
              <span className="text-sm ml-4">Example: If Player 4 steals a gift, that stolen gift cannot be stolen again during Player 4's turn.</span></p>
              
              <p className="text-gray-700">✔ <strong>A gift can only be stolen 3 times total in the whole game</strong><br/>
              <span className="text-sm ml-4">After a gift has been stolen 3 times, it becomes "frozen" and can no longer be taken.</span></p>
              
              <p className="text-gray-700">✔ <strong>If your gift is stolen…</strong><br/>
              <span className="text-sm ml-4">You must immediately take another turn by doing one of the following:</span><br/>
              <span className="text-sm ml-6">• Choose and open a new gift</span><br/>
              <span className="text-sm ml-6">• Steal someone else's gift (Note: you cannot steal back the same gift from the person who just stole it from you)</span></p>
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
            <h4 className="text-lg font-bold text-yellow-700 mb-2">🧊 Turn-End Rule</h4>
            <p className="text-gray-700">If a turn reaches <strong>3 steals total</strong> during that turn, that turn immediately ends and moves to the next player number.</p>
          </div>

          <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4">
            <h4 className="text-lg font-bold text-purple-700 mb-2">🏁 Final Rule — Player #1's Bonus Turn</h4>
            <p className="text-gray-700 mb-2">At the end of the game, after everyone has had a turn:</p>
            <p className="text-gray-700">✨ <strong>Player #1 gets one final choice:</strong></p>
            <div className="ml-4 text-gray-700">
              <p>• Keep their current gift</p>
              <p className="text-center font-bold">OR</p>
              <p>• Steal any unfrozen gift from another player</p>
            </div>
            <p className="text-gray-700 mt-2 text-sm">If Player #1 steals, the person they stole from receives the last unopened gift (if one remains) or swaps with Player #1.</p>
          </div>
        </div>
      </div>

      <div className="bg-green-100 border-2 border-green-300 rounded-lg p-4 text-center">
        <h3 className="text-xl font-bold text-green-700 mb-2">🎉 End of Game</h3>
        <p className="text-gray-700">Everyone keeps the final gift they are holding.</p>
        <p className="text-gray-600 italic text-sm mt-2">Laughs, chaos, and arguments about who stole what are all included for free.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-white to-green-100">
      {/* Snowflakes decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <Snowflake
            key={i}
            className="absolute text-blue-200 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
              opacity: Math.random() * 0.5 + 0.3
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="text-yellow-400 fill-yellow-400" size={32} />
            <h1 className="text-5xl font-bold text-red-600" style={{ textShadow: '2px 2px 0px #fff, 4px 4px 0px rgba(0,0,0,0.1)' }}>
              🎄 🐵 Xmas Games 🎄
            </h1>
            <Star className="text-yellow-400 fill-yellow-400" size={32} />
          </div>
          <p className="text-xl text-green-700 font-semibold">Ho Ho Ho! Let the festive fun begin! 🎅</p>
        </div>

        {/* Random Game Button */}
        <div className="mb-4 flex gap-4">
          <button
            onClick={selectRandomGame}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 border-4 border-white hover:scale-105"
          >
            <Shuffle className="animate-bounce" size={28} />
            🎲 Pick a Random Game for Me!
          </button>
          
          <button
            onClick={() => setCompletedGames([])}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-4 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 border-4 border-white hover:scale-105"
            title="Clear all completed games"
          >
            🔄 Reset
          </button>
        </div>

        {/* Dropdown Menu */}
        <div className="mb-8">
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-full bg-gradient-to-r from-red-500 to-green-500 text-white px-6 py-4 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between border-4 border-white"
            >
              <span className="flex items-center gap-2">
                <Gift className="animate-pulse" />
                {selectedGame ? `${games[selectedGame - 1].emoji} ${games[selectedGame - 1].title} ${games[selectedGame - 1].customIcon || (games[selectedGame - 1].isTeam ? '👥' : '👤')}` : '🎮 Choose Your Game!'}
              </span>
              <ChevronDown className={`transform transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMenuOpen && (
              <div className="absolute w-full mt-2 bg-white rounded-xl shadow-2xl border-4 border-red-200 overflow-hidden z-20">
                {games.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => {
                      setSelectedGame(game.id);
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-6 py-4 text-left hover:bg-gradient-to-r hover:from-red-50 hover:to-green-50 transition-all duration-200 border-b-2 border-red-100 last:border-b-0 flex items-center gap-3 group"
                  >
                    <span className="text-3xl group-hover:scale-125 transition-transform">{game.emoji}</span>
                    <span className={`font-bold group-hover:text-red-600 transition-colors flex-1 ${completedGames.includes(game.id) ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                      {game.title}
                    </span>
                    <span className="text-2xl">{game.customIcon || (game.isTeam ? '👥' : '👤')}</span>
                    {game.id !== 8 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleGameCompletion(game.id);
                        }}
                        className={`ml-3 px-3 py-1 rounded-lg flex items-center justify-center gap-2 transition-all text-sm font-semibold ${
                          completedGames.includes(game.id)
                            ? 'bg-green-500 text-white border-2 border-green-700'
                            : 'bg-gray-100 text-gray-600 border-2 border-gray-300 hover:border-green-500 hover:bg-green-50'
                        }`}
                      >
                        {completedGames.includes(game.id) && (
                          <span className="w-4 h-4 rounded border-2 flex items-center justify-center bg-white border-white">
                            <span className="text-green-600 font-bold text-xs">✓</span>
                          </span>
                        )}
                        <span className="text-xs whitespace-nowrap">
                          {completedGames.includes(game.id) ? 'Completed' : 'Not Complete'}
                        </span>
                      </button>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Game Content */}
        {selectedGame && (
          <div className="bg-white rounded-xl shadow-2xl p-8 border-4 border-red-200">
            <div className="text-center mb-6">
              <div className="w-full max-w-md mx-auto mb-4">
                <img 
                  src={games[selectedGame - 1].gif} 
                  alt={games[selectedGame - 1].title}
                  className="w-full rounded-lg shadow-lg border-4 border-red-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-full h-64 bg-gradient-to-br from-red-200 to-green-200 rounded-lg shadow-lg border-4 border-red-300 flex items-center justify-center"
                  style={{ display: 'none' }}
                >
                  <span className="text-9xl">{games[selectedGame - 1].emoji}</span>
                </div>
              </div>
              <span className="text-6xl mb-3 block">{games[selectedGame - 1].emoji}</span>
              <h2 className="text-4xl font-bold text-red-600 mb-2 flex items-center justify-center gap-3">
                {games[selectedGame - 1].title}
                <span className="text-3xl">{games[selectedGame - 1].customIcon || (games[selectedGame - 1].isTeam ? '👥' : '👤')}</span>
              </h2>
              {selectedGame !== 8 && (
                <div className="flex justify-center">
                  <button
                    onClick={() => toggleGameCompletion(selectedGame)}
                    className={`mt-4 px-6 py-3 rounded-lg flex items-center justify-center gap-3 transition-all text-lg font-bold ${
                      completedGames.includes(selectedGame)
                        ? 'bg-green-500 text-white border-4 border-green-700 shadow-lg'
                        : 'bg-white text-gray-700 border-4 border-gray-300 hover:border-green-500 hover:bg-green-50 shadow-md'
                    }`}
                  >
                    {completedGames.includes(selectedGame) && (
                      <span className="w-6 h-6 rounded border-3 flex items-center justify-center bg-white border-white">
                        <span className="text-green-600 font-bold text-lg">✓</span>
                      </span>
                    )}
                    <span>
                      {completedGames.includes(selectedGame) ? 'Completed' : 'Not Complete'}
                    </span>
                  </button>
                </div>
              )}
            </div>

            {games[selectedGame - 1].isSpecial ? (
              whiteElephantContent
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-green-700 mb-3 flex items-center gap-2">
                    🎯 Objective
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {games[selectedGame - 1].objective}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2">
                    🧰 Materials
                  </h3>
                  <ul className="space-y-2">
                    {games[selectedGame - 1].materials.map((material, index) => (
                      <li key={index} className="text-lg text-gray-700 flex items-center gap-2">
                        <span className="text-red-500">★</span> {material}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        )}

        {!selectedGame && (
          <div className="text-center py-16">
            <Gift className="mx-auto text-red-400 mb-4" size={64} />
            <p className="text-2xl text-gray-600 font-semibold">
              Select a game from the menu above to get started! 🎊
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default XmasGamesSite;
