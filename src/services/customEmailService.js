// Custom Email Service for MovieGPT
// This would require a backend service to send emails

export const sendCustomPasswordResetEmail = async (email, resetLink) => {
  const emailTemplate = {
    to: email,
    subject: "Reset Your MovieGPT Password 🎬",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your MovieGPT Password</title>
          <style>
              body {
                  margin: 0;
                  padding: 0;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
                  color: #ffffff;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 40px 20px;
              }
              .header {
                  text-align: center;
                  margin-bottom: 40px;
              }
              .logo {
                  font-size: 32px;
                  font-weight: 900;
                  background: linear-gradient(135deg, #ef4444 0%, #a855f7 50%, #3b82f6 100%);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  margin-bottom: 10px;
              }
              .card {
                  background: rgba(31, 41, 55, 0.8);
                  backdrop-filter: blur(20px);
                  border-radius: 24px;
                  padding: 40px;
                  border: 1px solid rgba(75, 85, 99, 0.5);
                  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
              }
              .title {
                  font-size: 28px;
                  font-weight: bold;
                  text-align: center;
                  margin-bottom: 16px;
                  color: #ffffff;
              }
              .subtitle {
                  font-size: 16px;
                  color: #9ca3af;
                  text-align: center;
                  margin-bottom: 32px;
                  line-height: 1.6;
              }
              .button {
                  display: inline-block;
                  background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%);
                  color: white !important;
                  text-decoration: none;
                  padding: 16px 32px;
                  border-radius: 12px;
                  font-weight: 600;
                  font-size: 16px;
                  text-align: center;
                  width: 100%;
                  box-sizing: border-box;
                  margin: 20px 0;
                  transition: all 0.3s ease;
              }
              .button:hover {
                  transform: translateY(-2px);
                  box-shadow: 0 10px 25px rgba(124, 58, 237, 0.3);
              }
              .footer {
                  text-align: center;
                  margin-top: 32px;
                  padding-top: 24px;
                  border-top: 1px solid rgba(75, 85, 99, 0.3);
                  color: #6b7280;
                  font-size: 14px;
              }
              .warning {
                  background: rgba(239, 68, 68, 0.1);
                  border: 1px solid rgba(239, 68, 68, 0.3);
                  border-radius: 12px;
                  padding: 16px;
                  margin: 24px 0;
                  color: #fca5a5;
                  font-size: 14px;
              }
              .features {
                  display: flex;
                  justify-content: space-around;
                  margin: 32px 0;
                  flex-wrap: wrap;
              }
              .feature {
                  text-align: center;
                  flex: 1;
                  min-width: 150px;
                  margin: 10px;
              }
              .feature-icon {
                  font-size: 24px;
                  margin-bottom: 8px;
              }
              .feature-text {
                  font-size: 12px;
                  color: #9ca3af;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <div class="logo">🎬 MovieGPT</div>
                  <p style="color: #9ca3af; margin: 0;">AI-Powered Movie Discovery</p>
              </div>
              
              <div class="card">
                  <h1 class="title">Reset Your Password</h1>
                  <p class="subtitle">
                      We received a request to reset your MovieGPT account password. 
                      Click the button below to create a new password and get back to discovering amazing movies!
                  </p>
                  
                  <div style="text-align: center;">
                      <a href="${resetLink}" class="button">
                          🔐 Reset My Password
                      </a>
                  </div>
                  
                  <div class="features">
                      <div class="feature">
                          <div class="feature-icon">🤖</div>
                          <div class="feature-text">AI Recommendations</div>
                      </div>
                      <div class="feature">
                          <div class="feature-icon">📋</div>
                          <div class="feature-text">Personal Watchlist</div>
                      </div>
                      <div class="feature">
                          <div class="feature-icon">🔍</div>
                          <div class="feature-text">Smart Search</div>
                      </div>
                  </div>
                  
                  <div class="warning">
                      <strong>🛡️ Security Notice:</strong> This link will expire in 1 hour for your security. 
                      If you didn't request this reset, please ignore this email and your password will remain unchanged.
                  </div>
                  
                  <div class="footer">
                      <p><strong>Sent to:</strong> ${email}</p>
                      <p>© 2024 MovieGPT. All rights reserved.</p>
                      <p style="margin-top: 16px; font-size: 12px;">
                          Having trouble with the button? Copy and paste this link:
                      </p>
                      <p style="word-break: break-all; color: #7c3aed; font-size: 12px; margin-top: 8px;">
                          ${resetLink}
                      </p>
                      <p style="margin-top: 16px; font-size: 12px; color: #6b7280;">
                          This email was automatically generated. Please do not reply to this email.
                      </p>
                  </div>
              </div>
          </div>
      </body>
      </html>
    `,
  };

  // This would be sent to your backend API
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailTemplate),
    });

    return response.ok;
  } catch (error) {
    console.error("Failed to send custom email:", error);
    return false;
  }
};

// Email template for welcome emails
export const sendWelcomeEmail = async (email, displayName) => {
  const emailTemplate = {
    to: email,
    subject: "Welcome to MovieGPT! 🎬✨",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to MovieGPT</title>
          <style>
              /* Same styles as above */
              body {
                  margin: 0;
                  padding: 0;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
                  color: #ffffff;
              }
              /* ... rest of styles ... */
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <div class="logo">🎬 MovieGPT</div>
              </div>
              
              <div class="card">
                  <h1 class="title">Welcome, ${displayName}! 🎉</h1>
                  <p class="subtitle">
                      You've successfully joined MovieGPT! Get ready to discover your next favorite movie with the power of AI.
                  </p>
                  
                  <div style="text-align: center;">
                      <a href="${window.location.origin}/browse" class="button">
                          🚀 Start Exploring Movies
                      </a>
                  </div>
                  
                  <div class="features">
                      <div class="feature">
                          <div class="feature-icon">🤖</div>
                          <div class="feature-text">Get AI-powered movie recommendations</div>
                      </div>
                      <div class="feature">
                          <div class="feature-icon">📋</div>
                          <div class="feature-text">Create your personal watchlist</div>
                      </div>
                      <div class="feature">
                          <div class="feature-icon">🔍</div>
                          <div class="feature-text">Search with natural language</div>
                      </div>
                  </div>
                  
                  <div class="footer">
                      <p>Happy movie hunting! 🍿</p>
                      <p>© 2024 MovieGPT. All rights reserved.</p>
                  </div>
              </div>
          </div>
      </body>
      </html>
    `,
  };

  // Send welcome email
  try {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailTemplate),
    });

    return response.ok;
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return false;
  }
};
