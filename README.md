# Undercover - Secret Word Party Game 🕵️‍♂️

A sleek, modern, fully-functional web-based implementation of the popular party game **Undercover** (also known as **Mr. White**). Optimized for pass-and-play on a single device.

## 🚀 Play Now

**[Live Demo on GitHub Pages](https://sqiprasanna.github.io/mr-white-undercover/)**

## 📋 Features

### Game Mechanics
- **3-20 Player Support** - Perfect for any group size
- **Auto-Configuration** - Intelligently sets undercovers and Mr. Whites based on player count
- **Customizable Roles** - Easily adjust number of Undercovers and Mr. Whites
- **Random Role Distribution** - Ensures fair gameplay
- **Mr. White Guess System** - Win by correctly guessing the civilian word

### Timer System
- **Configurable Timers** - Set custom times for:
  - Clue giving (15-60 seconds)
  - Discussion rounds (1-5 minutes)
  - Mr. White guess (10-30 seconds)
- **Toggle Timers** - Disable any timer you don't need
- **Play/Pause/Reset Controls** - Full timer management

### Player Management
- **Player Persistence** - Previous players automatically saved to browser
- **Quick Load** - Reload your regular group with one click
- **Add/Remove Players** - Easily manage player list during setup
- **Visual Feedback** - See who's alive, who's eliminated, and turn order

### Scoring & Leaderboard
- **Points System:**
  - Civilians: 1 point per win
  - Undercovers: 2 points per win
  - Mr. White: 3 points for correct guess
- **All-Time Leaderboard** - Track scores across multiple games
- **Medals** - 🥇 🥈 🥉 for top 3 players

### UI/UX
- **Modern Dark Theme** - Cyberpunk/Spy Noir aesthetic
- **Fully Responsive** - Works on mobile, tablet, and desktop
- **Smooth Animations** - Interactive buttons with hover effects
- **Cross-Browser Compatible** - Chrome, Firefox, Safari, Edge
- **No Dependencies** - Pure HTML/CSS/JavaScript

## 🎮 How to Play

### Setup Phase
1. **Add Players** - Enter player names (3-20 players)
2. **Configure Game** - Auto-detects or manually set:
   - Number of Undercovers
   - Number of Mr. Whites
3. **Set Timers** (optional) - Customize or disable timers
4. **Start Game** - Begin the round

### Role Reveal Phase
1. Players go one by one
2. **Tap to Reveal** - See your secret role/word
3. **Hide Your Word** - Pass phone to next player
4. Two possible roles:
   - **Civilian**: Knows the main word (e.g., "Apple")
   - **Undercover**: Knows similar word (e.g., "Pear")
   - **Mr. White**: Knows nothing ("??")

### Game Play Phase
1. **Give Clues** - Click "Next Clue" to go through players sequentially
2. **Single Word Clues** - Each player gives one word hint
3. **Discussion** - Group discusses and debates who the imposters are
4. **Eliminate** - Vote to eliminate suspected Undercovers/Mr. White
5. **Mr. White Guess** - If Mr. White is eliminated, they get 20 seconds to guess the civilian word

### Win Conditions
- **Civilians Win** - Eliminate all Undercovers and Mr. Whites
- **Undercovers Win** - Equal or outnumber remaining Civilians
- **Mr. White Wins** - Survive to the end OR correctly guess the civilian word

## 🛠️ Configuration Options

### Auto-Detection by Player Count
- **3-4 players**: 1 Undercover, 1 Mr. White
- **5-8 players**: 2 Undercovers, 1 Mr. White
- **9-12 players**: 2 Undercovers, 2 Mr. Whites
- **13+ players**: 3 Undercovers, 2 Mr. Whites

### Timer Settings (Optional)
- **Clue Time**: 15-60 seconds (default: 30s)
- **Discussion Time**: 1-5 minutes (default: 2min)
- **Mr. White Guess**: 10-30 seconds (default: 20s)
- **Toggle Timers**: Enable/disable any timer

## 💾 Data Storage

- **Player Names** - Saved in browser localStorage
- **Leaderboard Points** - Persisted across games
- **Game Settings** - Remembered for next session
- **No Server** - All data stays on your device

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Full |
| Firefox | ✅ Full |
| Safari  | ✅ Full |
| Edge    | ✅ Full |
| Mobile  | ✅ Full |

## 🚀 Deployment

### GitHub Pages
Simply push to your repository's `main` branch and enable GitHub Pages:
1. Go to Settings → Pages
2. Select "Deploy from a branch"
3. Choose `main` branch
4. Your game is live at `https://yourusername.github.io/mr-white-undercover/`

### Self-Hosted
1. Download `index.html`
2. Upload to any web server
3. Access via browser
4. No build process required!

## 📊 Word Pairs

40+ built-in word pairs with close thematic matches:
- Apple/Pear
- Cat/Dog
- Laptop/Computer
- Coffee/Tea
- Piano/Guitar
- And 35+ more!

Easily add more words by editing the `WORD_PAIRS` array in the HTML.

## 🎨 Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Gradients, animations, flexbox, grid
- **Vanilla JavaScript** - No frameworks or dependencies
- **Google Fonts** - Poppins & Space Mono typography
- **FontAwesome 6** - Icon library

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

You are free to:
- ✅ Use commercially
- ✅ Modify and distribute
- ✅ Use privately
- ✅ Include in your own projects

With the requirement that you include a copy of the license and copyright notice.

## 👤 Author

Created by **[sqiprasanna](https://github.com/sqiprasanna)**

Feel free to:
- ⭐ Star the repository
- 🐛 Report issues
- 🔧 Submit pull requests
- 📝 Suggest improvements

## 🔗 Links

- **GitHub**: [mr-white-undercover](https://github.com/sqiprasanna/mr-white-undercover)
- **Live Demo**: [sqiprasanna.github.io/mr-white-undercover](https://sqiprasanna.github.io/mr-white-undercover/)
- **Issues**: [GitHub Issues](https://github.com/sqiprasanna/mr-white-undercover/issues)

## 📖 Game Rules Reference

### Civilian
- Knows the main word
- Tries to give clues that help civilians guess their identity
- Wins if all Undercovers and Mr. Whites are eliminated

### Undercover
- Knows a similar but different word
- Must blend in without revealing themselves
- Wins if they survive until they equal or outnumber civilians

### Mr. White
- Knows nothing about the word
- Listens carefully to clues to deduce the word
- Can guess the civilian word when eliminated
- Wins if they guess correctly OR survive to the end

---

**Enjoy the game! 🎉**

Made with ❤️ by sqiprasanna | MIT License © 2026
