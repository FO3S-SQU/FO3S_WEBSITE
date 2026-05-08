# FO3S Website

Official website for the **Free and Open Source Software Society (FO3S)** at Sultan Qaboos University, Oman.

## About

FO3S is a student community founded in 2010 under the supervision of the Communication and Information Research Center at SQU. The society promotes FOSS culture through workshops, events, and member projects.

## Tech Stack

- Vanilla HTML5, CSS3, JavaScript
- [Font Awesome 6](https://fontawesome.com/) — icons
- Google Apps Script — form submissions and project gallery backend

## Project Structure

```
FO3S_WEBSITE/
├── assets/
│   ├── css/
│   │   └── style.css       # All styles
│   ├── js/
│   │   └── script.js       # Slideshow, counters, language toggle, modals, forms
│   └── images/
│       ├── fo3s_logo-removebg-preview.png
│       ├── fo3s_logo.png
│       ├── wkshp1.jpg
│       └── wkshp2.jpg
├── index.html              # Home page
├── about.html              # About page (bilingual EN/AR)
└── README.md
```

## Running Locally

No build step required. Open `index.html` directly in a browser, or serve with any static file server:

```bash
# Python
python -m http.server 8080

# Node (npx)
npx serve .
```

Then visit `http://localhost:8080`.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes and open a pull request against `main`

## Contact

- Instagram: [@fo3s_squ](https://www.instagram.com/fo3s_squ)
- GitHub: [FO3S-SQU](https://github.com/FO3S-SQU)
- Email: fo3s@squ.edu.om
