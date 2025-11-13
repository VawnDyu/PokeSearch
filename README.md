# 🔍 PokéSearch

<div align="center">

![PokéSearch Banner](https://img.shields.io/badge/Pok%C3%A9Search-Gotta%20Search%20'Em%20All!-red?style=for-the-badge&logo=pokemon)

**A modern, responsive Pokédex application built with React and Vite**

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge&logo=github)](https://vawndyu.github.io/PokeSearch/)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![PokéAPI](https://img.shields.io/badge/Pok%C3%A9API-v2-EF5350?style=for-the-badge)](https://pokeapi.co/)

</div>

---

## ✨ Features

### 🎮 Core Features
- 🎮 **Authentic Pokédex Design** - Classic red Pokédex styling with animated elements
- 🔍 **Real-time Search** - Search Pokémon by name or National Pokédex number
- 📊 **Detailed Stats** - View base stats with color-coded visual bars
- 🎨 **Type Badges** - Color-coded type badges matching official Pokémon types
- 💫 **Smooth Animations** - Floating Pokémon sprites and interactive UI elements
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Lightning Fast** - Built with Vite for instant hot module replacement
- 🌙 **Modern UI** - Dark themed background with glassmorphism effects

### ✨ Enhanced Features
- ⭐ **Favorites System** - Save your favorite Pokémon with localStorage persistence
- 🔗 **Evolution Chain** - View and navigate complete evolution chains
- ⚔️ **Move List** - Display first 20 moves each Pokémon can learn
- ⚖️ **Compare Mode** - Compare up to 3 Pokémon side-by-side with stats
- ✨ **Shiny Sprites** - Toggle between normal and shiny forms
- 🔊 **Pokémon Cries** - Listen to authentic Pokémon cries from PokéAPI
- 🎵 **Sound Effects** - Interactive UI sounds with toggle control
- 🌐 **Multi-language** - English, Spanish (Español), and Japanese (日本語) support
- 📑 **Tabbed Interface** - Organized Info/Stats/More tabs for better UX

## 🎯 Demo

🔗 **[Live Demo](https://vawndyu.github.io/PokeSearch/)**

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VawnDyu/PokeSearch.git
   cd PokeSearch
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🔨 Build for Production

```bash
# Build the app
npm run build

# Preview production build
npm run preview
```

## 🌐 Deploy to GitHub Pages

```bash
# Deploy to gh-pages branch
npm run deploy
```

Your site will be live at: `https://yourusername.github.io/PokeSearch/`

## 📦 Tech Stack

- **Frontend Framework:** [React 18](https://reactjs.org/) with Hooks
- **Build Tool:** [Vite](https://vitejs.dev/)
- **API:** [PokéAPI](https://pokeapi.co/) (v2)
- **Styling:** Custom CSS with Flexbox & Grid
- **State Management:** React Hooks (useState, useEffect, useRef)
- **Data Persistence:** localStorage API
- **Deployment:** GitHub Pages
- **Architecture:** Component-based with custom hooks

## 🎨 Design Features

### Pokédex Interface
- Classic red Pokédex body with authentic styling
- Animated blue light indicator with pulse effect
- Functional D-pad and action buttons (decorative)
- Green screen display with scrollable content
- Speaker grille details
- Tab-based navigation system

### Responsive Design
- **Mobile** (≤480px): Compact layout optimized for touch
- **Tablet** (481px-1023px): Enhanced spacing and readability
- **Desktop** (≥1024px): Full-featured display with larger elements

### Color-Coded Types
Each Pokémon type has its official color:
- 🔴 Fire • 💧 Water • ⚡ Electric • 🌱 Grass
- 🧊 Ice • 🥊 Fighting • ☠️ Poison • 🌍 Ground
- 🕊️ Flying • 🔮 Psychic • 🐛 Bug • 🪨 Rock
- 👻 Ghost • 🐉 Dragon • 🌑 Dark • ⚙️ Steel • 🧚 Fairy

## 📖 Usage Guide

### 1. Search for a Pokémon
- Type the Pokémon name (e.g., "pikachu")
- Or enter the Pokédex number (e.g., "25")
- Press Enter or click the search button (→)

### 2. Language Selection
- Click **EN** for English
- Click **ES** for Spanish (Español)
- Click **日本** for Japanese (日本語)

### 3. Control Panel
- 🔊 **Sound Toggle** - Enable/disable all sounds
- ❤️ **Favorite** - Add to favorites list
- ⚖️ **Compare** - Add to comparison (max 3)
- ✨ **Shiny** - Toggle shiny sprite
- 🔊 **Play Cry** - Hear Pokémon's cry

### 4. Tab Navigation

#### Info Tab
- Official artwork (normal/shiny)
- Type badges
- Height and weight
- Abilities (including hidden)

#### Stats Tab
- Base stats with color-coded bars:
  - 🟢 Green (>100): Excellent
  - 🟡 Yellow (60-100): Good
  - 🔴 Red (<60): Below average
- HP, Attack, Defense, Sp. Atk, Sp. Def, Speed

#### More Tab
- **Evolution Chain**: Click to navigate between evolutions
- **Move List**: First 20 moves
- **Compare List**: View compared Pokémon stats

### 5. Favorites System
- Add Pokémon to favorites with ❤️ button
- Favorites persist across sessions
- View favorites on welcome screen
- Click favorite to search instantly

## 🗂️ Project Structure

```
pokesearch-vite/
├── public/
│   ├── pokeball.png          # Pokéball icon
│   └── favicon.ico            # Site favicon
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── PokedexHeader.jsx     # Top section with lights
│   │   ├── ControlPanel.jsx      # Language & sound controls
│   │   ├── SearchBar.jsx         # Search input
│   │   ├── ErrorMessage.jsx      # Error display
│   │   ├── LoadingScreen.jsx     # Loading state
│   │   ├── PokemonInfo.jsx       # Info tab content
│   │   ├── PokemonStats.jsx      # Stats tab content
│   │   ├── PokemonMore.jsx       # More tab content
│   │   └── WelcomeScreen.jsx     # Welcome & favorites
│   ├── hooks/                 # Custom React hooks
│   │   ├── usePokemonData.js     # Pokemon data fetching
│   │   └── useAudio.js           # Audio management
│   ├── App.jsx                # Main application component
│   ├── App.css                # Pokédex styling
│   ├── config.js              # Constants & configuration
│   ├── utils.js               # Helper functions
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles
├── index.html                 # HTML template
├── vite.config.js             # Vite configuration
├── package.json               # Dependencies
└── README.md                  # Documentation
```

## 🎮 API Reference

This project uses the [PokéAPI](https://pokeapi.co/) - a free RESTful Pokémon API.

**Main Endpoints Used:**
```
GET https://pokeapi.co/api/v2/pokemon/{id or name}
GET https://pokeapi.co/api/v2/pokemon-species/{id or name}
GET https://pokeapi.co/api/v2/evolution-chain/{id}
```

**Data Retrieved:**
- Pokémon stats, types, abilities, sprites
- Species information and flavor text
- Evolution chains
- Move lists
- Pokémon cries (audio)

## 🎵 Audio Features

### Pokémon Cries
- Authentic cries from PokéAPI
- Automatic playback on Pokémon load
- Manual playback with 🔊 button
- Adjustable volume (10% default)

### UI Sound Effects
- Click sounds for button interactions
- Toggle on/off with control panel
- Non-intrusive audio feedback

## 🌍 Internationalization

The app supports three languages with complete translations:

| Language | Code | Coverage |
|----------|------|----------|
| English | en | 100% |
| Español | es | 100% |
| 日本語 | ja | 100% |

All UI elements, labels, and messages are translated, including:
- Search prompts
- Tab names
- Stat labels
- Error messages
- Welcome text

### Code Architecture

The project follows modern React best practices:

- **Component-based**: Modular, reusable components
- **Custom Hooks**: Separated logic from UI
- **Configuration**: Centralized constants
- **Utilities**: Pure helper functions
- **Clean Code**: Well-documented and organized

### Key Technologies

- **React Hooks**: useState, useEffect, useRef
- **Async/Await**: Modern async handling
- **Fetch API**: HTTP requests
- **localStorage**: Data persistence
- **CSS3**: Advanced animations & transitions

## 🐛 Known Issues

- None currently! If you find a bug, please [open an issue](https://github.com/VawnDyu/PokeSearch/issues).

## ✅ Completed Enhancements

- [x] ✅ Add Pokémon evolution chain display
- [x] ✅ Include move list and descriptions
- [x] ✅ Implement favorites/bookmarks
- [x] ✅ Add Pokémon comparison feature
- [x] ✅ Include shiny sprite toggle
- [x] ✅ Add sound effects and Pokémon cries
- [x] ✅ Multi-language support (EN/ES/JA)

## 🔮 Future Enhancements

- [ ] Add more languages (French, German, Korean)
- [ ] Implement type effectiveness chart
- [ ] Add Pokémon locations data
- [ ] Include egg groups and breeding info
- [ ] Add nature and IV calculator
- [ ] Implement team builder feature
- [ ] Add Pokédex completion tracker
- [ ] Include generation filters in search
- [ ] Add dark/light theme toggle

## ⚠️ Disclaimer

This project is a **fan-made, non-commercial application** created for educational and portfolio purposes only.

**Pokémon and all related properties are:**
- © Nintendo / Creatures Inc. / GAME FREAK inc.
- Pokémon and Pokémon character names are trademarks of Nintendo.
- All Pokémon artwork, sprites, and data are obtained from [PokéAPI](https://pokeapi.co/), which aggregates data from various official sources.

**This project:**
- Is **NOT affiliated with, endorsed by, or connected to** Nintendo, The Pokémon Company, Game Freak, or Creatures Inc.
- Does **NOT claim ownership** of any Pokémon-related artwork, names, or intellectual property
- Is provided **"as is"** for educational purposes and personal use only
- Should **NOT be used for commercial purposes** without proper licensing from the trademark holders

All Pokémon-related content used in this application belongs to their respective copyright holders. If you are a copyright holder and believe your rights have been infringed, please contact me immediately.

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**Note:** The MIT License applies **only to the code** written for this project. It does **NOT** apply to any Pokémon-related intellectual property, artwork, or assets, which remain the property of their respective copyright holders.

## 🙏 Acknowledgments

- [PokéAPI](https://pokeapi.co/) for the comprehensive Pokémon data
- [The Pokémon Company](https://www.pokemon.com/) for the amazing franchise
- Nintendo, Game Freak, and Creatures Inc. for the original Pokémon games
- The React and Vite teams for excellent development tools
- All the contributors who helped improve this project

## 📊 Project Stats

- **Components**: 9 modular components
- **Custom Hooks**: 2 reusable hooks
- **Lines of Code**: ~2000+ lines
- **Languages Supported**: 3 (EN, ES, JA)
- **Pokémon Data**: Complete National Pokédex
- **Features**: 15+ interactive features

---

<div align="center">

**Made with ❤️ by PokéSearch Team**

[![GitHub](https://img.shields.io/badge/GitHub-VawnDyu-181717?style=for-the-badge&logo=github)](https://github.com/VawnDyu)

Project Link: [https://github.com/VawnDyu/PokeSearch](https://github.com/VawnDyu/PokeSearch)

⭐ Star this repo if you find it helpful!

</div>