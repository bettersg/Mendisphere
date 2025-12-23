import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyEmail, resendVerificationEmail } from '../../services/UserService';
import Container from '../../components/Container';

enum VerificationStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  INVALID = 'invalid'
}

const VerifyEmail: React.FC = () => {
  console.log('VerifyEmail component rendering');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<VerificationStatus>(VerificationStatus.LOADING);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isResending, setIsResending] = useState<boolean>(false);
  const [resendMessage, setResendMessage] = useState<string>('');

  console.log('Current status:', status);

  useEffect(() => {
    const tryVerifyEmail = async () => {
      console.log('Starting email verification process');

      // Get the action code from the URL
      const oobCode = searchParams.get('oobCode');
      const mode = searchParams.get('mode');

      console.log('VerifyEmail component mounted with:', { oobCode, mode });

      // Validate that this is an email verification action
      if (mode !== 'verifyEmail') {
        console.log('Mode is not verifyEmail, marking invalid');
        setStatus(VerificationStatus.INVALID);
        setErrorMessage('Invalid verification link. Please request a new one.');
        return;
      }

      if (!oobCode) {
        console.log('No oobCode provided, marking invalid');
        setStatus(VerificationStatus.INVALID);
        setErrorMessage('Verification code is missing. Please request a new link.');
        return;
      }

      try {
        console.log('Starting email verification with code:', oobCode);
        await verifyEmail(oobCode);
        console.log('Email verified successfully');
        setStatus(VerificationStatus.SUCCESS);

        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } catch (error: any) {
        console.error('Error verifying email:', error);
        setStatus(VerificationStatus.ERROR);
        setErrorMessage(error.message || 'An error occurred while verifying your email.');
      }
    };

    tryVerifyEmail();
  }, [searchParams, navigate]);

  const handleResendVerification = async () => {
    setIsResending(true);
    setResendMessage('');
    try {
      await resendVerificationEmail();
      setResendMessage('Verification email sent! Please check your inbox.');
    } catch (error: any) {
      setResendMessage(error.message || 'Failed to resend verification email. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  const renderContent = () => {
    switch (status) {
      case VerificationStatus.LOADING:
        return (
          <div className="verify-email-loading">
            <div className="spinner"></div>
            <h2>Verifying your email...</h2>
            <p>Please wait while we confirm your email address.</p>
          </div>
        );

      case VerificationStatus.SUCCESS:
        return (
          <div className="verify-email-success">
            <div className="success-icon">✓</div>
            <h2>Email Verified Successfully!</h2>
            <p>Your email has been verified. You will be redirected to your dashboard shortly.</p>
            <button onClick={() => navigate('/dashboard')}>
              Go to Dashboard Now
            </button>
          </div>
        );

      case VerificationStatus.ERROR:
      case VerificationStatus.INVALID:
        return (
          <div className="verify-email-error">
            <div className="error-icon">✕</div>
            <h2>Verification Failed</h2>
            <p>{errorMessage}</p>
            {resendMessage && (
              <p className={`resend-message ${resendMessage.includes('sent') ? 'success' : 'error'}`}>
                {resendMessage}
              </p>
            )}
            <div className="error-actions">
              <button onClick={() => navigate('/login')}>
                Back to Login
              </button>
              <button 
                onClick={handleResendVerification}
                disabled={isResending}
              >
                {isResending ? 'Sending...' : 'Request New Link'}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Container>
      <div className="verify-email-container">
        {renderContent()}
      </div>
    </Container>
  );
};

export default VerifyEmail;
