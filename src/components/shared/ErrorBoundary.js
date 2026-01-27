// Error Boundary für React Fehlerbehandlung
import React from 'react';
import styled from 'styled-components';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Hier könnte man Fehler an einen Service wie Sentry senden
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorWrapper>
          <ErrorContent>
            <Logo>S&I.</Logo>
            <Title>Oops! Etwas ist schiefgelaufen.</Title>
            <Description>
              Keine Sorge, das passiert manchmal. 
              Bitte lade die Seite neu oder versuche es später noch einmal.
            </Description>
            <ReloadButton onClick={this.handleReload}>
              Seite neu laden
            </ReloadButton>
          </ErrorContent>
        </ErrorWrapper>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

const ErrorWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
  padding: 20px;
`;

const ErrorContent = styled.div`
  text-align: center;
  max-width: 500px;
`;

const Logo = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.06em;
  background: #000000;
  color: #FFFFFF;
  padding: 10px 20px;
  display: inline-block;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 30px;
`;

const ReloadButton = styled.button`
  padding: 14px 32px;
  background: #FFFFFF;
  color: #0a0a0a;
  border: none;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
  }
`;
