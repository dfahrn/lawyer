import { useState } from 'react';
import countries from 'country-list';

function CountryLegalAssistant() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [userQuestion, setUserQuestion] = useState('');
  const [response, setResponse] = useState('');
  
  // Get sorted country list
  const countryList = countries.getNames().sort();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/legal-ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: selectedCountry, question: userQuestion })
    });
    const data = await response.json();
    setResponse(data.answer);
  };

  return (
    <div className="legal-assistant">
      <form onSubmit={handleSubmit}>
        <select 
          value={selectedCountry} 
          onChange={(e) => setSelectedCountry(e.target.value)}
          required
        >
          <option value="">Select your country</option>
          {countryList.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        
        <textarea
          value={userQuestion}
          onChange={(e) => setUserQuestion(e.target.value)}
          placeholder="Describe your legal situation..."
          required
        />
        
        <button type="submit">Get Legal Analysis</button>
      </form>
      
      {response && (
        <div className="legal-response">
          <h3>Legal Analysis for {selectedCountry}:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default CountryLegalAssistant; 