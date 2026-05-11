# Product Methodology AI Agent Skills Collection - Documentation Site

This directory contains the documentation website for the Product Methodology AI Agent Skills Collection.

## Features

- **Bilingual Support**: Click the language switch button to toggle between Chinese and English
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient design with smooth transitions

## GitHub Pages Deployment

This site is deployed using GitHub Pages. To enable it:

1. Go to your GitHub repository: https://github.com/LuckyOneTwoThree/pm-skill
2. Click on **Settings** tab
3. Scroll down to **GitHub Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Select the **master** branch and **/docs** folder
6. Click **Save**

Your site will be available at: https://LuckyOneTwoThree.github.io/pm-skill

## Local Development

To view the site locally:

1. Open `index.html` in your web browser
2. Or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Or using Node.js
   npx http-server -p 8000
   ```
3. Open http://localhost:8000 in your browser

## File Structure

```
docs/
├── index.html      # Main documentation page
├── style.css      # Stylesheet
├── script.js      # Language switching logic
└── .nojekyll      # Prevents GitHub from processing with Jekyll
```

## Customization

- **Colors**: Modify the gradient colors in `style.css` (currently #667eea and #764ba2)
- **Content**: Edit `index.html` - all bilingual content is marked with `data-lang="zh"` or `data-lang="en"`
- **Language Logic**: Adjust `script.js` for custom language switching behavior

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Same as the main repository.
