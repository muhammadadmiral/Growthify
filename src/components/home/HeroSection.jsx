// src/components/Home/HeroSection.jsx
import { Link } from 'react-router-dom';

export default function HeroSection() {
  // Styles untuk komponen
  const styles = {
    heroSection: {
      position: 'relative',
      padding: '80px 20px',
      textAlign: 'center',
      overflow: 'hidden',
    },
    heroBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #E6F6EF, #FFFFFF, #E6F1FB)',
      transform: 'skewY(-6deg) translateY(-36px)',
      transformOrigin: 'top right',
      zIndex: 0,
    },
    heroContent: {
      position: 'relative',
      maxWidth: '1100px',
      margin: '0 auto',
      zIndex: 2,
    },
    heroTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      color: '#1A202C',
      lineHeight: 1.2,
      fontFamily: "'Poppins', system-ui, sans-serif",
    },
    gradientText: {
      background: 'linear-gradient(90deg, #38A169, #3182CE)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    heroSubtitle: {
      fontSize: '1.25rem',
      color: '#4A5568',
      maxWidth: '800px',
      margin: '0 auto 2rem auto',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '3rem',
    },
    primaryButton: {
      padding: '0.75rem 2rem',
      backgroundColor: '#38A169',
      color: 'white',
      borderRadius: '0.375rem',
      fontWeight: '500',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
    },
    secondaryButton: {
      padding: '0.75rem 2rem',
      backgroundColor: 'white',
      color: '#4A5568',
      borderRadius: '0.375rem',
      fontWeight: '500',
      border: '1px solid #E2E8F0',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-block',
    },
    featureList: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      flexWrap: 'wrap',
      fontSize: '0.875rem',
      color: '#718096',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
    },
    checkMark: {
      color: '#38A169',
      marginRight: '0.25rem',
    },
  };

  // Media query untuk responsive styles
  const isSmallScreen = window.innerWidth < 640;
  
  if (isSmallScreen) {
    styles.buttonContainer.flexDirection = 'column';
    styles.featureList.flexDirection = 'column';
    styles.heroTitle.fontSize = '2rem';
  } else {
    styles.buttonContainer.flexDirection = 'row';
  }

  return (
    <div style={styles.heroSection}>
      <div style={styles.heroBackground}></div>
      <div style={styles.heroContent}>
        <h1 style={styles.heroTitle}>
          Transform Your <span style={styles.gradientText}>Life</span> With Growthify
        </h1>
        <p style={styles.heroSubtitle}>
          Your personal development companion for mindset, habits, and body transformation. 
          Expert guidance tailored to your unique journey.
        </p>
        <div style={styles.buttonContainer}>
          <Link to="/register" style={styles.primaryButton}>
            Start Your Journey
          </Link>
          <Link to="/features" style={styles.secondaryButton}>
            Explore Features
          </Link>
        </div>
        <div style={styles.featureList}>
          <div style={styles.featureItem}>
            <span style={styles.checkMark}>✓</span>
            <span>Personalized Plans</span>
          </div>
          <div style={styles.featureItem}>
            <span style={styles.checkMark}>✓</span>
            <span>Expert Guidance</span>
          </div>
          <div style={styles.featureItem}>
            <span style={styles.checkMark}>✓</span>
            <span>Progress Tracking</span>
          </div>
        </div>
      </div>
    </div>
  );
}