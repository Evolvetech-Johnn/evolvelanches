import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React Error Boundary Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          color: '#fff', 
          background: '#000', 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <h1>Algo deu errado. 🍗</h1>
          <p style={{ color: '#aaa', marginBottom: '1rem' }}>Desculpe pelo inconveniente. Tente recarregar a página.</p>
          <pre style={{ color: '#f00', background: '#222', padding: '1rem', borderRadius: '0.5rem', maxWidth: '800px', overflow: 'auto' }}>
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => {
                localStorage.removeItem('theRoosterCart');
                window.location.reload();
            }}
            style={{
                marginTop: '1rem',
                padding: '0.75rem 1.5rem',
                background: '#FF6600',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: 'bold'
            }}
          >
            Limpar Dados e Recarregar
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
