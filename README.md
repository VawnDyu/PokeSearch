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

- 🎮 **Authentic Pokédex Design** - Classic red Pokédex styling with animated elements
- 🔍 **Real-time Search** - Search Pokémon by name or National Pokédex number
- 📊 **Detailed Stats** - View base stats with color-coded visual bars
- 🎨 **Type Badges** - Color-coded type badges matching official Pokémon types
- 💫 **Smooth Animations** - Floating Pokémon sprites and interactive UI elements
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Lightning Fast** - Built with Vite for instant hot module replacement
- 🌙 **Modern UI** - Dark themed background with glassmorphism effects

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

- **Frontend Framework:** [React 18](https://reactjs.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **API:** [PokéAPI](https://pokeapi.co/)
- **Styling:** Custom CSS with Flexbox & Grid
- **Deployment:** GitHub Pages

## 🎨 Design Features

### Pokédex Interface
- Classic red Pokédex body with authentic styling
- Animated blue light indicator
- Functional D-pad and action buttons (decorative)
- Green screen display with scrollable content
- Speaker grille details

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

## 📖 Usage

1. **Search for a Pokémon:**
   - Type the Pokémon name (e.g., "pikachu")
   - Or enter the Pokédex number (e.g., "25")
   - Press Enter or click the search button

2. **View Details:**
   - Pokémon name and National Pokédex number
   - Official artwork with floating animation
   - Type(s) with color-coded badges
   - Height, Weight, and Base Experience
   - Base stats with visual bars
   - Abilities (including hidden abilities)

3. **Navigate:**
   - Search for different Pokémon anytime
   - Scroll through stats on smaller screens

## 🗂️ Project Structure

```
pokesearch-vite/
├── public/
│   └── favicon.ico
├── src/
│   ├── App.jsx           # Main component with Pokédex logic
│   ├── App.css           # Pokédex styling and animations
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── package.json          # Dependencies and scripts
└── README.md            # You are here!
```

## 🎮 API Reference

This project uses the [PokéAPI](https://pokeapi.co/) - a free RESTful Pokémon API.

**Endpoint Used:**
```
GET https://pokeapi.co/api/v2/pokemon/{id or name}
```

**Example Response:** Returns Pokémon data including stats, types, abilities, sprites, and more.

## 🐛 Known Issues

- None currently! If you find a bug, please [open an issue](https://github.com/VawnDyu/PokeSearch/issues).

## 🔮 Future Enhancements

- [ ] Add Pokémon evolution chain display
- [ ] Include move list and descriptions
- [ ] Add search filters (by type, generation, etc.)
- [ ] Implement favorites/bookmarks
- [ ] Add Pokémon comparison feature
- [ ] Include shiny sprite toggle
- [ ] Add sound effects and animations
- [ ] Multi-language support

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
- All the contributors who helped improve this project

<!-- ## 📬 Contact

**Your Name** - [@yourtwitter](https://twitter.com/yourtwitter) - your.email@example.com -->

Project Link: [https://github.com/VawnDyu/PokeSearch](https://github.com/VawnDyu/PokeSearch)

---