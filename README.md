# 🐾 Pawamor - Pet Lovers Community Website

A modern, responsive, and beautifully animated pet community platform built with HTML, CSS, and JavaScript. Features a complete dark/light theme system, GSAP animations, and comprehensive pet care resources.

![Pawamor](https://img.shields.io/badge/Status-Production%20Ready-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### 🎨 Design & UI

- **Modern Design**: Cute, lovable aesthetic with soft pastels and rounded corners
- **Dark/Light Theme**: Smooth theme toggle with localStorage persistence
- **Fully Responsive**: Mobile-first design that works on all devices
- **Glass Morphism**: Beautiful translucent effects throughout
- **Smooth Animations**: GSAP-powered scroll animations and transitions

### 📄 Pages

1. **Homepage** - Hero section with animated background, featured articles, community stats
2. **Blog/Guides** - 7+ detailed pet care guides with filtering and search
3. **Community Stories** - Heartwarming user experiences with pets
4. **Resources** - Essential pet care tips, first aid, emergency contacts
5. **Contact** - Form with EmailJS integration
6. **About Us** - Mission, values, team information

### 🚀 Functionality

- **Theme Toggle**: Persistent dark/light mode with smooth transitions
- **Scroll Animations**: Elements fade in and animate as you scroll
- **Filtering System**: Filter blog posts by category (dogs, cats, health, etc.)
- **Search Functionality**: Real-time article search
- **Mobile Menu**: Responsive hamburger navigation
- **Back to Top Button**: Smooth scroll to top
- **Form Validation**: Client-side validation with error messages
- **Newsletter Signup**: Email subscription form
- **Stats Counter**: Animated counting statistics

## 📁 Project Structure

```
pet-community-website/
├── index.html              # Homepage
├── styles/
│   ├── themes.css         # Dark/light theme variables
│   ├── main.css           # Main styles
│   └── animations.css     # Animation classes and keyframes
├── scripts/
│   ├── theme.js           # Theme toggle functionality
│   ├── animations.js      # GSAP animations
│   └── main.js            # Main JavaScript (navigation, forms, etc.)
├── pages/
│   ├── blog.html          # Pet care guides
│   ├── stories.html       # Community stories
│   ├── resources.html     # Pet care resources
│   ├── contact.html       # Contact form
│   └── about.html         # About us page
├── images/                # Image assets (placeholder)
└── README.md
```

## 🎯 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, but recommended)

### Installation

1. **Clone or download** this repository to your local machine

2. **Open the project**:

   - Option A: Simply open `index.html` in your browser
   - Option B: Use a local server (recommended):

     ```bash
     # Using Python
     python -m http.server 8000

     # Using Node.js
     npx serve

     # Using PHP
     php -S localhost:8000
     ```

3. **Navigate to** `http://localhost:8000` in your browser

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `styles/themes.css`:

```css
:root {
  --color-brand: #ff69b4; /* Primary brand color */
  --color-brand-dark: #e94560; /* Darker shade */
  --color-brand-light: #ffb6d9; /* Lighter shade */
  /* ... more variables */
}
```

### Adding EmailJS Integration

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. In `pages/contact.html`, replace the placeholder:
   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY");
   ```
4. Add the send function:
   ```javascript
   emailjs
     .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData)
     .then(() => showSuccess())
     .catch(() => showError());
   ```

### Modifying Animations

GSAP animations are controlled in `scripts/animations.js`. Adjust timing, easing, and effects:

```javascript
gsap.to(".hero-title", {
  opacity: 1,
  y: 0,
  duration: 1, // Animation duration
  delay: 0.3, // Start delay
  ease: "power3.out", // Easing function
});
```

## 🔧 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid, Flexbox, and CSS Variables
- **JavaScript (ES6+)** - Vanilla JS for interactions
- **GSAP 3.12** - Professional-grade animations
- **ScrollTrigger** - Scroll-based animations
- **EmailJS** - Email form integration
- **Font Awesome 6.4** - Icons
- **Google Fonts** - Comic Neue & Nunito fonts

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎓 Key Features Explained

### Theme System

The theme toggle uses CSS variables for instant color switching. The user's preference is saved to localStorage and restored on page load.

### Animations

GSAP ScrollTrigger creates smooth scroll-based animations. Elements fade in and move as they enter the viewport, creating an engaging user experience.

### Responsive Design

Mobile-first approach with breakpoints at:

- 640px (mobile)
- 768px (tablet)
- 968px (desktop)

### Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states
- Alt text on images
- Color contrast compliance

## 📝 Content Guidelines

### Adding New Blog Articles

1. Open `pages/blog.html`
2. Copy an existing article structure
3. Update the content:
   ```html
   <article
     class="blog-article filter-item"
     data-category="YOUR_CATEGORY"
     id="unique-id"
   >
     <!-- Your content -->
   </article>
   ```
4. Add the category to filter buttons if new

### Adding Community Stories

1. Open `pages/stories.html`
2. Copy a story template
3. Fill in with user's experience
4. Include pet type and adoption date

## 🚀 Deployment

### GitHub Pages

1. Push to GitHub repository
2. Go to Settings → Pages
3. Select main branch
4. Your site will be live at `username.github.io/repo-name`

### Netlify

1. Drag and drop the folder to Netlify
2. Site goes live instantly
3. Get free HTTPS and custom domain support

### Vercel

1. Import GitHub repository
2. Deploy with one click
3. Automatic deployments on push

## 🤝 Contributing

This is a community project! Ways to contribute:

- Submit pet care articles
- Share community stories
- Report bugs or issues
- Suggest new features
- Improve documentation

## 📄 License

This project is open source and available under the MIT License.

## 💖 Acknowledgments

- **Unsplash** - Pet images
- **Font Awesome** - Icons
- **Google Fonts** - Typography
- **GSAP** - Animation library
- **Pet Community** - Inspiration and content

## 📞 Support

Need help or have questions?

- Open an issue on GitHub
- Email: hello@petpalshaven.com
- Join our community discussions

## 🎯 Roadmap

Future enhancements planned:

- [ ] User authentication system
- [ ] Pet profiles and galleries
- [ ] Forum/discussion boards
- [ ] Pet event calendar
- [ ] Marketplace for pet supplies
- [ ] Mobile app version
- [ ] Multi-language support

## 🌟 Star This Project

If you find this project useful, please consider giving it a ⭐ on GitHub!

---

**Built with ❤️ for pets and their humans by the Pawamor team**

_Remember: Every pet deserves love, and every pet parent deserves support!_ 🐾
