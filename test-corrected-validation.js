// Test the corrected Deriv API token validation
const derivTokenPattern = /^[a-zA-Z0-9]{15,20}$/;

// Test tokens
const testCases = [
  // Valid tokens (based on actual format)
  { token: 'UhbS0Rzgia3U7fT', expected: true, description: 'Actual user token' },
  { token: 'DemoT0k3n987654', expected: true, description: 'Demo token (15 chars)' },
  { token: 'AdminT0k3n123456', expected: true, description: 'Admin token (16 chars)' },
  { token: 'ValidToken12345678', expected: true, description: 'Valid 18-char token' },
  { token: 'MaxLength1234567890', expected: true, description: 'Max length (20 chars)' },
  
  // Invalid tokens
  { token: 'Short123', expected: false, description: 'Too short (8 chars)' },
  { token: 'TooLongToken123456789012345', expected: false, description: 'Too long (27 chars)' },
  { token: 'Invalid-Token123', expected: false, description: 'Contains hyphen' },
  { token: 'Invalid@Token123', expected: false, description: 'Contains special char' },
  { token: 'a1-f7pnteezo4jzhpxclctizt27hyeot', expected: false, description: 'OAuth session token format' },
  { token: '', expected: false, description: 'Empty token' },
  { token: '   ', expected: false, description: 'Whitespace only' }
];

console.log('=== Corrected Deriv API Token Validation Test ===\n');

testCases.forEach(({ token, expected, description }) => {
  const isValid = derivTokenPattern.test(token);
  const result = isValid === expected ? '✅ PASS' : '❌ FAIL';
  console.log(`${result} ${description}`);
  console.log(`  Token: "${token}" (${token.length} chars)`);
  console.log(`  Expected: ${expected}, Got: ${isValid}\n`);
});

console.log('Pattern used:', derivTokenPattern);

// Additional validation function for use in the app
function validateDerivToken(token) {
  if (typeof token !== 'string') {
    return { isValid: false, error: 'Token must be a string' };
  }
  
  const trimmedToken = token.trim();
  
  if (trimmedToken.length === 0) {
    return { isValid: false, error: 'Token cannot be empty' };
  }
  
  if (trimmedToken.length < 15) {
    return { isValid: false, error: 'Token too short (minimum 15 characters)' };
  }
  
  if (trimmedToken.length > 20) {
    return { isValid: false, error: 'Token too long (maximum 20 characters)' };
  }
  
  if (!derivTokenPattern.test(trimmedToken)) {
    return { isValid: false, error: 'Token contains invalid characters (only alphanumeric allowed)' };
  }
  
  return { isValid: true, error: null };
}

// Test the validation function
console.log('\n=== Validation Function Test ===\n');
testCases.forEach(({ token, expected, description }) => {
  const validation = validateDerivToken(token);
  const result = validation.isValid === expected ? '✅ PASS' : '❌ FAIL';
  console.log(`${result} ${description}`);
  console.log(`  Result: ${validation.isValid ? 'Valid' : `Invalid - ${validation.error}`}\n`);
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { validateDerivToken, derivTokenPattern };
}
