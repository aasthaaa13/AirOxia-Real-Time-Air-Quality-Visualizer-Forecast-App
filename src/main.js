// Entry point: main.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeProvider } from './components/ThemeProvider';

// Root rendering with dark mode as default and localStorage key for persistence
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="airoxia-ui-theme">
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
