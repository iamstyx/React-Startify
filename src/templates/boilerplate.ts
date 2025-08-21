export function getMainContent(language: "typescript" | "javascript"): string {
  if (language === "typescript") {
    return `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`;
  } else {
    return `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
`;
  }
}

export function getCustomStyles(): string {
  return `/* React-Startify Custom Styles */

* {
  box-sizing: border-box;
}

.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  width: 100%;
}

.welcome-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
}

.welcome-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 1200px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.welcome-title {
  font-size: 2.5rem;
  margin-bottom: 16px;
  color: #2d3748;
  font-weight: bold;
}

.brand {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.welcome-subtitle {
  font-size: 1.2rem;
  color: #718096;
  margin-bottom: 32px;
  line-height: 1.6;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
  color: #4a5568;
}

.feature-icon {
  font-size: 1.2rem;
}

.next-steps {
  text-align: left;
  background: #f7fafc;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 24px;
}

.next-steps h3 {
  margin: 0 0 16px 0;
  color: #2d3748;
}

.next-steps ul {
  margin: 0;
  padding-left: 20px;
}

.next-steps li {
  margin-bottom: 8px;
  color: #4a5568;
  line-height: 1.5;
}

.next-steps code {
  background: #e2e8f0;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  color: #2d3748;
}

.footer {
  font-size: 1.1rem;
  color: #667eea;
  font-weight: 600;
  margin: 0;
}

@media (max-width: 768px) {
  .welcome-container {
    padding: 10px;
  }
  
  .welcome-card {
    padding: 24px;
    border-radius: 16px;
  }

  .welcome-title {
    font-size: 2rem;
  }

  .features {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .welcome-container {
    padding: 8px;
  }
  
  .welcome-card {
    padding: 20px;
    border-radius: 12px;
  }

  .welcome-title {
    font-size: 1.8rem;
  }
  
  .welcome-subtitle {
    font-size: 1rem;
  }
}
`;
}

export function getDefaultAppContent(language: "typescript" | "javascript"): string {
  if (language === "typescript") {
    return `import React from 'react';

const App: React.FC = () => {
  return (
    <div className="app">
      <div className="welcome-container">
        <div className="welcome-card">
          <h1 className="welcome-title">
            🚀 Welcome to <span className="brand">React-Startify</span>
          </h1>
          <p className="welcome-subtitle">
            Your React project is ready to go with a clean, organized structure!
          </p>
          
          <div className="features">
            <div className="feature">
              <span className="feature-icon">📁</span>
              <span>Organized folder structure</span>
            </div>
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <span>Powered by Vite</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🔷</span>
              <span>TypeScript ready</span>
            </div>
            <div className="feature">
              <span className="feature-icon">✨</span>
              <span>Clean boilerplate</span>
            </div>
          </div>

          <div className="next-steps">
            <h3>🎯 Next Steps:</h3>
            <ul>
              <li>Start building in the <code>src/components</code> folder</li>
              <li>Add your pages to <code>src/pages</code></li>
              <li>Create custom hooks in <code>src/hooks</code></li>
              <li>Manage state in <code>src/store</code></li>
              <li>Add utilities to <code>src/utils</code></li>
            </ul>
          </div>

          <p className="footer">
            Happy coding! 🎉
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
`;
  } else {
    return `import React from 'react';

const App = () => {
  return (
    <div className="app">
      <div className="welcome-container">
        <div className="welcome-card">
          <h1 className="welcome-title">
            🚀 Welcome to <span className="brand">React-Startify</span>
          </h1>
          <p className="welcome-subtitle">
            Your React project is ready to go with a clean, organized structure!
          </p>
          
          <div className="features">
            <div className="feature">
              <span className="feature-icon">📁</span>
              <span>Organized folder structure</span>
            </div>
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <span>Powered by Vite</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🟨</span>
              <span>JavaScript ready</span>
            </div>
            <div className="feature">
              <span className="feature-icon">✨</span>
              <span>Clean boilerplate</span>
            </div>
          </div>

          <div className="next-steps">
            <h3>🎯 Next Steps:</h3>
            <ul>
              <li>Start building in the <code>src/components</code> folder</li>
              <li>Add your pages to <code>src/pages</code></li>
              <li>Create custom hooks in <code>src/hooks</code></li>
              <li>Manage state in <code>src/store</code></li>
              <li>Add utilities to <code>src/utils</code></li>
            </ul>
          </div>

          <p className="footer">
            Happy coding! 🎉
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
`;
  }
}
