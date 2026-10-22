# ResumeCraft AI

## Overview
ResumeCraft AI is a **complete, responsive web application** that lets users build professional resumes directly in their browser. It runs **entirely client‑side**—no backend, no API keys, and no paid services. All data is stored in **LocalStorage**, so users can save, edit, and download their resumes at any time.

## Features
1. **Modern landing page** with clear branding.
2. **Interactive resume creation form** covering:
   - Full name & contact information
   - Professional summary
   - Education (multiple entries)
   - Technical skills (comma‑separated)
   - Work experience (multiple entries)
   - Projects (multiple entries, optional links)
   - Certifications (multiple entries)
3. **Live preview** of the resume as you type.
4. **Three professional templates** (Classic, Modern, Creative) selectable via a dropdown.
5. **Download/Print**: Uses the browser’s built‑in **Print‑to‑PDF** feature.
6. **Responsive design** for mobile and desktop.
7. **LocalStorage persistence** – your data is saved automatically and re‑loaded on page refresh.
8. **Form validation** with helpful error alerts.
9. **Sample data** button to instantly populate the form with realistic content.
10. **Clean UI** with subtle animations and a professional color palette.

## Tech Stack
- **HTML5** – structure
- **CSS3** – styling, responsive layout, animations
- **JavaScript** – dynamic form handling, preview rendering, LocalStorage, template switching, PDF download
- **Browser LocalStorage** – client‑side data persistence

## Project Structure
```
project/
├─ index.html      # Main page, form + preview
├─ styles.css      # Styling and responsive layout
├─ script.js       # Interactivity and data handling
└─ README.md       # This file
```

## Getting Started (Local Development)
1. **Clone / copy** the project folder to your machine.
2. Open a terminal (PowerShell) and navigate to the project directory:
   ```powershell
   cd "C:\Users\hp\OneDrive\Desktop\project"
   ```
3. **Optional**: start a simple HTTP server (requires Python). This allows you to view the app at `http://localhost:8000`:
   ```powershell
   python -m http.server 8000
   ```
   Then open a browser and go to `http://localhost:8000`.
   > If you don’t have Python, you can also open `index.html` directly in a browser.
4. Interact with the form, switch templates, load sample data, and click **Download PDF** to print to a PDF file.

## Future Enhancements (AI integration)
- The UI includes a **“Load Sample Data”** button that currently uses hard‑coded example data. In the future this could be replaced with an AI‑generated résumé based on a short user description (requires an external API key).
- All AI‑related placeholders are clearly labeled in the source code (`// TODO: integrate AI` comments could be added if needed).

## License
This project is **open‑source** and free to use. Feel free to modify or extend it.

---
*Built with ❤️ by RaghuPlaysCode*
