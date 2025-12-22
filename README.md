# ExamClock ⏰

![Header image](/assets/images/header.png)

---

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Electron](https://img.shields.io/badge/Electron-47848F?style=for-the-badge&logo=electron&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![JSON](https://img.shields.io/badge/JSON-000000?style=for-the-badge&logo=json&logoColor=white)

## 📖 Introduction

**ExamClock** is a desktop application for exam centers that simplifies exam time management by combining a countdown timer with a digital clock.

---

## ✨ Features

### 🕐 Two Working Modes

#### ⏱️ Timer
- Countdown from a preset duration
- Two configurable alarms at specified time intervals
- Pause and resume functionality
- Visual progress bar
- All parameters (time, alarms) are customizable

#### 🕑 Clock
- Display current time in 12h or 24h mode
- Continuous operation during exam
- Standard timekeeping

### 👤 Personalization

- Ability to enter **exam name** and **exam center number**
- Automatic loading of data from JSON configuration file (if values are not entered manually)
- **Customizable colors** for the application
- **Font selection**
- **Contrast mode** for enhanced accessibility

### 🎨 Dark Mode

- Toggle between light and dark mode
- Automatic adjustment to system preferences

### ⚙️ Configuration

- `config.json` configuration file for storing user data
- Variable settings saved locally

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
│   ├── fontawesome/            # Folder with icons for app to work offline
│   │   ├── ...
│   ├── images/                 # Folder with images for README and app icon
│   │   ├── ...
├── src/
│   ├── main.js                 # Electron main process
│   ├── index.html              # HTML template
│   ├── styles/
│   │   └── style.css           # Application styles
│   ├── js/
│   │   ├── timer.js            # Timer functions
│   │   ├── clock.js            # Clock functions
│   │   ├── renderer.js         # Renderer process (events)
│   │   └── settings_data.js    # Settings management
│   └── data/
│       └── config.json         # Configuration file
├── package.json
├── .gitignore
└── README.md
```

---

## 📝 Configuration File

The application uses the `data/config.json` file to store user settings:

```json
{
  "settings": {
    "exam_name": "Mathematics",
    "centre_number": "12345",
    "theme": "light",
    "hour_mode": 24
  }
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

- When exiting to the main menu during timer operation, an unnecessary popup appears to restart the timer

---

## 📋 Planned Features

- [ ] Code structure improvement
- [ ] Add reminders for timer
- [ ] Create history for timers

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---