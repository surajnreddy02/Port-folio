# Portfolio - Suraj N Reddy

A modern, responsive portfolio website showcasing my projects, skills, and experience as a Full Stack Developer and AI enthusiast.

## 🚀 Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Optimized for all devices and screen sizes
- **Interactive Sections**:
  - Hero section with dynamic animations
  - About section with personal introduction
  - Skills showcase with technology icons
  - Projects gallery with detailed modals
  - Contact form with email integration
  - AI-generated assessment section
- **Smooth Scrolling**: Seamless navigation between sections
- **PDF Resume Viewer**: Integrated resume viewing functionality
- **Contact Form**: Functional contact form with email notifications
- **Loading Screen**: Elegant loading animation on page load

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **GSAP** - High-performance animations with ScrollTrigger
- **Lucide React** - Beautiful, customizable icons

### Backend & Deployment

- **Netlify Functions** - Serverless backend for contact form
- **Nodemailer** - Email service for contact form
- **Vite** - Fast build tool and development server
- **Netlify** - Hosting and deployment platform

### Additional Libraries

- **React Hook Form** - Form handling and validation
- **React Intersection Observer** - Scroll-based animations
- **React PDF** - PDF document rendering
- **PDF.js** - PDF parsing and display

## 📁 Project Structure

```txt
├── public/
│   ├── _headers              # Security headers
│   ├── _redirects           # Netlify redirects
│   ├── *.pdf               # Resume files
│   └── *.png               # Project images
├── src/
│   ├── components/
│   │   ├── About.tsx        # About section
│   │   ├── ChatGPT.tsx      # AI assessment section
│   │   ├── Contact.tsx      # Contact form
│   │   ├── ContactModal.tsx # Contact modal
│   │   ├── Hero.tsx         # Hero section
│   │   ├── LoadingScreen.tsx # Loading animation
│   │   ├── Modal.tsx        # Base modal component
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── PdfViewer.tsx    # Resume viewer
│   │   ├── ProjectModal.tsx # Project details modal
│   │   ├── Projects.tsx     # Projects gallery
│   │   ├── ResumeModal.tsx  # Resume modal
│   │   ├── ScrollProgress.tsx # Scroll progress bar
│   │   ├── SectionIndicators.tsx # Section navigation
│   │   └── Skills.tsx       # Skills showcase
│   ├── App.tsx              # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── netlify/
│   └── functions/
│       └── sendContactEmail.cjs # Contact form handler
├── netlify.toml            # Netlify configuration
└── package.json            # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:

   ```env
   SMTP_HOST=your-smtp-host
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@domain.com
   SMTP_PASS=your-email-password
   CONTACT_RECEIVER_EMAIL=your-email@domain.com
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

This project is configured for deployment on Netlify:

1. **Build Command**: `npm run build`
2. **Publish Directory**: `dist`
3. **Functions Directory**: `netlify/functions`

### Environment Variables (Production)

Set these in your Netlify dashboard:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_RECEIVER_EMAIL`

## ✨ Key Features Explained

### Contact Form

- Serverless function handles form submissions
- Email notifications via Nodemailer
- Form validation with React Hook Form
- Success/error feedback to users

### Smooth Scrolling & Animations

- GSAP ScrollTrigger for scroll-based animations
- Framer Motion for component transitions
- Intersection Observer for performance optimization

### PDF Resume Viewer

- Integrated PDF.js for resume viewing
- Downloadable resume functionality
- Responsive PDF display

### Project Showcase

- Interactive project cards
- Detailed project modals
- Technology stack highlighting
- GitHub and live demo links

## 🎨 Customization

### Colors & Themes

Customize the color scheme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-primary-color',
      secondary: '#your-secondary-color',
      accent: '#your-accent-color',
    }
  }
}
```

### Adding Projects

Edit the projects array in `src/components/Projects.tsx`:

```typescript
const projects: Project[] = [
  {
    id: 1,
    title: "Your Project",
    description: "Brief description",
    longDescription: "Detailed description",
    technologies: ["React", "TypeScript"],
    github: "https://github.com/username/repo",
    live: "https://your-demo.com",
    features: ["Feature 1", "Feature 2"],
    highlights: ["Achievement 1", "Achievement 2"],
    challenges: ["Challenge 1", "Challenge 2"]
  }
];
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

Suraj N Reddy

- GitHub: [@surajnreddy](https://github.com/surajnreddy02)
- LinkedIn: [Suraj N Reddy](https://linkedin.com/in/surajnreddy02)
- Email: <surajnreddy02pro@gamil.com>

## 🙏 Acknowledgments

- Thanks to the React and TypeScript communities
- Inspiration from modern portfolio designs
- Icons provided by Lucide React
- Animations powered by Framer Motion and GSAP

---

⭐ Star this repository if you found it helpful!