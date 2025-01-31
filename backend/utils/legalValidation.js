// Add country-specific legal disclaimer
export function generateDisclaimer(country) {
  return `
    Legal Notice for ${country}:
    This AI analysis does not constitute legal advice. 
    Always consult a licensed attorney in ${country} before taking legal action. 
    Laws current as of ${new Date().toISOString().split('T')[0]}.
  `;
} 