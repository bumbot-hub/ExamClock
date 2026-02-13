![Header image](/assets/images/header.png)


<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=electron&logoColor=white" alt="Electron">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white" alt="JSON">
</p>

---
## 📖 Introduction

**ExamClock** is a desktop application for exam centers that simplifies exam time management by combining a countdown timer with a digital clock.

---

## ✨ Features

### 🕐 Two Working Modes

#### ⏱️ Timer
- Countdown from a preset duration
- Two configurable alarms at specified time intervals
- Visual progress bar

#### 🕑 Clock
- Display current time in 12h or 24h mode
- Continuous operation during exam

### 👤 Personalization

- Ability to enter **exam name** and **examination center number**
- Automatic loading of data from JSON configuration file (if values are not entered manually)
- **Customizable colors** for the application
- **Contrast and dark mode** for enhanced accessibility

### ⚙️ Configuration

- `config.json` configuration file for storing user data
- Variable settings saved locally

### 📷 Screenshots
![Screens of app](/assets/images/ss.png)
---

## 🚀 Installation

### Requirements
- Node.js (version 14 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/bumbot-hub/ExamClock.git
cd ExamClock
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the application**
```bash
npm start
```

---

## 🛠️ Building

To build the application for distribution:

```bash
npm run build
```

The application will be compiled to `.exe` (Windows), `.dmg` (macOS), or `.AppImage` (Linux).

---

## 📁 Project Structure

```
examclock/
├── assets/
│   ├── fontawesome/            # Icons files so the app works offline
│   │   ├── ...
│   ├── images/                 # Images for the README and app UI
│   │   ├── ...
├── src/
│   └── data/
│       └── config.json         # Configuration file
│   ├── js/
│   │   ├── app.js              # Renderer logic and UI event wiring
│   │   ├── clock.js            # Clock display and update logic
│   │   ├── settings_data.js    # Loading and saving settings
│   │   ├── timer.js            # Timer logic
│   │   ├── timerUI.js          # Timer-related UI interactions
│   │   └── utils.js            # Shared helper functions
│   ├── styles/
│   │   └── style.css
│   ├── index.html
│   └── main.js                 # Electron main process
├── .gitignore
├── package.json
└── README.md
```

---

## 📝 Configuration File

The application uses the `data/config.json` file to store user settings.

**Example file content:**

```json
{
   "settings": {
      "exam-name": "C1 Advanced",
      "centre-number": "PL006",
      "1st-reminder": "30",
      "2nd-reminder": "10"
   },
   "accessibility": {
      "hour-mode": false,
      "dark-mode": false,
      "accent-color": "#3691f2"
   },
   "timers": []
}
```

---

## 🎮 Usage

1. **Launch the application**
2. **Select a mode:**
   - Click **Clock** to display the current time
   - Click **Timer** to set up a timer
3. **For the timer:**
   - Enter the duration (format: HH:MM)
   - Optionally enter the exam component name
   - Click **Start**
   - Use **Play/Pause** to resume/pause
   - Click **Reset** to reset the timer

4. **Adjust settings:**
   - Click the **Settings** icon to change color or contrast or exam data (center number, name)
   - Use **Dark mode** for eye comfort

---

## 🔧 Available Commands

```bash
npm start        # Runs the application in dev mode
npm run build    # Builds the application for distribution
```

---

## 🐛 Known Issues

- *Nothing here ;)*
---

## 📋 Planned Features

- [x] Improve UX by adding keyboard interactions with timer
- [x] More settings remembered in file 
- [x] Code structure improvement
- [x] Add reminders for timer
- [ ] Create history for timers

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---