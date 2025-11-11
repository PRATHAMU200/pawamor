# 🚀 Quick Setup Guide - PetPals Haven

## Get Started in 3 Minutes!

### Step 1: Open the Website

Simply open `index.html` in your web browser. That's it! The website is ready to use.

### Step 2: Try the Features

#### Theme Toggle

- Click the sun/moon icon in the navigation bar
- Watch the smooth transition between light and dark modes
- Your preference is automatically saved

#### Navigate Pages

- **Home** - Main landing page with featured content
- **Guides** - Detailed pet care articles (use filters!)
- **Stories** - Community experiences
- **Resources** - Emergency info and care tips
- **About** - Learn about our mission
- **Contact** - Get in touch (form ready for EmailJS)

#### Test Animations

- Scroll down on any page to see elements fade in
- Hover over cards to see lift effects
- Watch the hero section animations on page load

### Step 3: Customize (Optional)

#### Change Brand Colors

Edit `styles/themes.css`:

```css
--color-brand: #ff69b4; /* Change to your color */
```

#### Add Your Logo

Replace the paw icon in navigation:

```html
<div class="logo">
  <img src="your-logo.png" alt="Logo" />
  <span>Your Name</span>
</div>
```

#### Update Content

- Edit HTML files directly
- Images are using Unsplash placeholders
- Replace with your own images

## 📧 EmailJS Setup (Optional)

1. Go to [emailjs.com](https://www.emailjs.com) and sign up
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Get your Public Key, Service ID, and Template ID
5. In `pages/contact.html`, find this line:
   ```javascript
   // emailjs.init("YOUR_PUBLIC_KEY");
   ```
6. Uncomment and add your key:
   ```javascript
   emailjs.init("your_actual_public_key");
   ```
7. Add the send function:
   ```javascript
   emailjs.send("service_id", "template_id", formData);
   ```

## 🎨 Using a Local Server (Recommended)

### Why?

- Better performance
- Proper module loading
- Mimics production environment

### How?

**Option 1: Python** (Built-in on Mac/Linux)

```bash
cd pet-community-website
python -m http.server 8000
# Open http://localhost:8000
```

**Option 2: Node.js**

```bash
npx serve
# Open the URL shown
```

**Option 3: VS Code**

- Install "Live Server" extension
- Right-click `index.html`
- Click "Open with Live Server"

## 🐛 Troubleshooting

### Animations Not Working?

- Check browser console for errors
- Ensure GSAP CDN links are loading
- Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Theme Toggle Not Saving?

- Check if localStorage is enabled
- Try in non-incognito/private window
- Check browser console for errors

### Mobile Menu Not Opening?

- Check JavaScript console for errors
- Ensure main.js is loaded
- Verify the script paths are correct

### Images Not Loading?

- Using Unsplash URLs requires internet
- Replace with local images if working offline
- Check image paths are correct

## 📱 Testing Responsive Design

### In Browser

1. Open DevTools (F12)
2. Click device toolbar icon
3. Select different devices to test

### Recommended Test Sizes

- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1920px (Full HD)

## 🎯 Next Steps

1. ✅ Website is running
2. 📝 Add your own content
3. 🎨 Customize colors/fonts
4. 📧 Set up EmailJS (optional)
5. 🚀 Deploy to web hosting

## 🌐 Deployment Options

### Free Hosting Options:

**GitHub Pages** (Easiest)

- Push to GitHub
- Enable Pages in Settings
- Free HTTPS + custom domain

**Netlify**

- Drag and drop folder
- Instant deployment
- Continuous deployment from Git

**Vercel**

- Connect GitHub repo
- Auto-deploy on push
- Excellent performance

## 💡 Tips & Tricks

- **Performance**: The site loads fast thanks to CDN libraries
- **SEO**: Meta tags are included, customize for your content
- **Accessibility**: ARIA labels and semantic HTML included
- **Browser Support**: Works on all modern browsers
- **Mobile**: Fully responsive, test on real devices

## 📚 Learn More

- Check `README.md` for detailed documentation
- Explore the code - it's well commented!
- Customize animations in `scripts/animations.js`
- Modify styles in `styles/` folder

## 🆘 Need Help?

- Check browser console for errors
- Review commented code in files
- Test one feature at a time
- Use browser DevTools to debug

## 🎉 You're All Set!

Your PetPals Haven website is ready to go. Enjoy building your pet community! 🐾

---

**Questions?** Open an issue or reach out to the community!
