import React from 'react';

const ForgotPasswordPage = () => {
  const handleResetPassword = () => {
    // Handle password reset logic
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <p>Enter your email address to reset your password.</p>
      <form>
        {/* Form fields */}
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" />
        </div>

        {/* Reset Password button */}
        <div>
          <button type="button" onClick={handleResetPassword}>
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
