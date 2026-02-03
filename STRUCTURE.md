# Junior Math - Code Structure Documentation

## Project Overview
Junior Math is an educational math learning application with a restructured, modular, and scalable architecture. It supports multiple mathematical operations (addition, subtraction, multiplication, division, remainder, and between) with future support for authentication, local storage tracking, and user profiles.

## Directory Structure

```
Junior-Math/
├── pages/                  # HTML game pages (one per operation)
│   ├── add.html
│   ├── subtract.html
│   ├── multiply.html
│   ├── divide.html
│   ├── remainder.html
│   └── between.html
│
├── js/                     # JavaScript modules and core logic
│   ├── core/
│   │   └── game.js        # Core game engine (question generation, validation, scoring)
│   │
│   ├── modules/           # Game-specific implementations
│   │   ├── addition.js
│   │   ├── subtraction.js
│   │   ├── multiply.js
│   │   ├── division.js
│   │   ├── remainder.js
│   │   └── between.js
│   │
│   └── utils/             # Utility modules for reusable functionality
│       ├── config.js      # Configuration and settings
│       ├── storage.js     # LocalStorage management
│       ├── auth.js        # Authentication system
│       └── utils.js       # General utility functions
│
├── css/                   # Modular CSS architecture
│   ├── style.css         # Main stylesheet (imports all modules)
│   ├── variables.css     # CSS variables and root styles
│   ├── header.css        # Header and navigation styles
│   └── game.css          # Game components and interactions
│
├── assets/                # Audio files
│   ├── Correct.mp3
│   └── wrong.mp3
│
├── assets/               # (Future) Images, icons, and other media
│
├── styles/               # (Old - can be removed) Original CSS
│   └── style.css
│
├── scripts/              # (Old - can be removed) Original JS files
│   ├── add.js
│   ├── subtract.js
│   ├── multiply.js
│   ├── divide.js
│   ├── remainder.js
│   └── between.js
│
├── index.html           # Main landing page
└── README.md            # Project documentation
```

## Module Descriptions

### Core Modules

#### `js/core/game.js`
The **GameEngine** class handles all core game logic:
- Question generation based on operation type
- Answer option shuffling
- Answer validation and scoring
- Audio playback
- Statistics tracking
- Game state management

**Key Methods:**
- `generateQuestion(operationType, minNum, maxNum)` - Creates a new question
- `generateAnswerOptions(count, minNum, maxNum)` - Generates multiple choice options
- `checkAnswer(userAnswer)` - Validates user answer and updates stats
- `playCorrectSound()` / `playWrongSound()` - Audio feedback
- `getStats()` - Returns current game statistics

### Utility Modules

#### `js/utils/config.js`
Global configuration settings for the entire application:
- Game parameters (number ranges, delays)
- Audio settings
- UI preferences
- Feature flags (authentication, local storage, etc.)
- Game operations definitions
- Storage keys
- Route definitions

**Use Case:** Centralized settings that can be modified without changing game logic.

#### `js/utils/storage.js`
**StorageManager** - Wrapper for localStorage with error handling:
- Save/retrieve data with JSON serialization
- User statistics tracking
- User profile management
- Preferences storage
- Data validation and fallbacks

**Key Methods:**
- `setItem(key, value)` - Save data
- `getItem(key, parseJson)` - Retrieve data
- `updateStats(operationType, isCorrect)` - Track game performance
- `getStats(operationType)` - Get statistics
- `getProfile()` / `setProfile(profile)` - User profile management

#### `js/utils/auth.js`
**AuthManager** - Authentication and user session management:
- User registration
- Login/logout
- Session management
- Password hashing (basic implementation - use bcrypt in production)
- User profile updates

**Key Methods:**
- `register(name, email, password)` - Create new user
- `login(email, password)` - Authenticate user
- `logout()` - End session
- `isAuthenticated()` - Check if user is logged in
- `getCurrentUser()` - Get current user data

#### `js/utils/utils.js`
General-purpose utility functions:
- DOM element selection
- Event listener helpers
- Random number generation
- Array shuffling
- Debounce/throttle functions
- Device detection
- Formatting utilities

### Game Modules

Each game operation has a dedicated module in `js/modules/`:
- **addition.js** - Addition game logic
- **subtraction.js** - Subtraction game logic
- **multiply.js** - Multiplication game logic
- **division.js** - Division game logic
- **remainder.js** - Remainder/modulo game logic
- **between.js** - "Find the number between" game logic

All modules follow the same pattern:
1. Extend GameEngine for core functionality
2. Initialize DOM elements
3. Setup event listeners
4. Generate and display questions
5. Handle user answers with feedback

## HTML Structure

All game HTML files follow a consistent template:
- Standard metadata and SEO tags
- Audio elements for feedback sounds
- Header with navigation (dynamically sets "current" page)
- Main game wrapper with question display
- Answer options container
- Module script import (using ES6 modules)

**Note:** The main `index.html` serves as a landing page with game selection.

## CSS Architecture

### Variables (`variables.css`)
Defines CSS custom properties for:
- Color palette
- Spacing scale
- Typography
- Shadows and transitions
- Z-index management
- Utility classes

### Header (`header.css`)
Styles for:
- Navigation bar
- Logo
- Active page indicators
- Responsive navigation

### Game (`game.css`)
Styles for:
- Question display
- Answer options
- Interactive states (hover, active, correct, incorrect)
- Animations (bounce, shake)
- Responsive layouts

## Features Ready for Implementation

### 1. Authentication System
The `AuthManager` is ready to use:
```javascript
import AuthManager from './js/utils/auth.js';

// Register a user
AuthManager.register('John', 'john@example.com', 'password123');

// Login
const result = AuthManager.login('john@example.com', 'password123');

// Check if authenticated
if (AuthManager.isAuthenticated()) {
  const user = AuthManager.getCurrentUser();
}
```

### 2. Local Storage
The `StorageManager` handles all persistence:
```javascript
import StorageManager from './js/utils/storage.js';

// Save user stats automatically (handled by GameEngine)
// Retrieve stats
const stats = StorageManager.getStats('add');

// Save preferences
StorageManager.updatePreferences({ darkMode: true });
```

### 3. Configuration Management
Modify settings in `config.js`:
```javascript
import CONFIG from './js/utils/config.js';

// Access settings
console.log(CONFIG.game.maxNumber); // 15
console.log(CONFIG.features.localStorageEnabled); // true

// Use in game
const gameEngine = new GameEngine(CONFIG.game);
```

## Future Enhancements

1. **User Dashboard** - Display user stats and progress
2. **Leaderboard** - Track top performers
3. **Dark Mode** - Implement theme switching
4. **Progress Tracking** - Visual progress indicators
5. **Difficulty Levels** - Adjustable number ranges
6. **Achievements** - Badge system for milestones
7. **Multiplayer** - Compete with other users
8. **Offline Support** - Service workers for offline play
9. **Backend Integration** - Connect to server for cloud sync
10. **Analytics** - Track user behavior and learning patterns

## Development Notes

### Adding New Game Operations
1. Create operation in `js/core/game.js` switch statement
2. Create module in `js/modules/[operation].js`
3. Create HTML page in `pages/[operation].html`
4. Add navigation link in header
5. Add operation definition in `config.js`

### Modifying Game Behavior
- Game logic: Edit `js/core/game.js`
- Audio/UI settings: Edit `js/utils/config.js`
- Styling: Edit respective CSS files in `css/`

### Adding Global Features
- Authentication flows: Extend `js/utils/auth.js`
- Storage operations: Extend `js/utils/storage.js`
- Utility functions: Add to `js/utils/utils.js`

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires ES6 module support
- LocalStorage support recommended
- Audio element support for feedback

## Version History
- **v2.0** - Complete restructuring with modular architecture
- **v1.0** - Original monolithic structure
