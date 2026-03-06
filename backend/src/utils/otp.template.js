const otpTamplate = (otp) => {
    return `<div style="max-width: 32rem; margin: 2.5rem auto; 
  background-color: white; padding: 1.5rem; border-radius: 0.5rem; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center;">
  <h2 style="font-size: 1.5rem; font-weight: bold; 
  color: #2d3748;">Email Verification by apexresume</h2>
  <p style="color: #4a5568; margin-top: 0.5rem;">Use the OTP below to verify your email:</p>
  <div style="margin-top: 1rem; font-size: 1.875rem; font-family: monospace; 
  font-weight: bold; color: #2563eb; letter-spacing: 0.1em;">${otp}</div>
  <p style="color: #718096; margin-top: 1rem;">
  This OTP is valid for only 10 minutes. Do not share it with anyone.</p>
  <div style="margin-top: 1.5rem;">
      <a href="#" style="background-color: #2563eb; 
      color: white; padding: 0.5rem 1.5rem; border-radius: 0.375rem; font-size: 1.125rem; 
      font-weight: 600; text-decoration: none; display: inline-block;">Verify Email</a>
  </div>
  <p style="color: #a0aec0; margin-top: 1.5rem; font-size: 0.875rem;">If you did not request this, please ignore this email.</p>
</div>`
}

export default otpTamplate
