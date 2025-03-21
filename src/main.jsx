import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { LanguageProvider } from './contexts/LanguageContext.jsx';

// Import CSS in the correct order
import './growthify-reset.css';  // Basic reset should be loaded first
import './index.css';            // File with Tailwind directives
import './App.css';              // App-specific styling

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-neutral-50 text-neutral-800">
          <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-elegant border border-neutral-200">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
            <p className="mb-4">We're sorry, an unexpected error has occurred. Please try refreshing the page.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 p-4 bg-neutral-100 rounded-md overflow-auto text-xs">
                <details>
                  <summary className="cursor-pointer font-medium mb-2">Error Details (Development Only)</summary>
                  <p className="text-red-600">{this.state.error && this.state.error.toString()}</p>
                  <p className="mt-2 whitespace-pre-wrap">{this.state.errorInfo && this.state.errorInfo.componentStack}</p>
                </details>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
// Fix main.jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <LanguageProvider>
 
            <BrowserRouter>
              <App />
            </BrowserRouter>

                </LanguageProvider>
    </ErrorBoundary>
  </React.StrictMode>
);