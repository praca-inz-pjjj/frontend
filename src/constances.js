export const BACKEND_ADDRESS = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000'
export const REACT_APP_BASENAME = process.env.REACT_APP_BASENAME

console.log('Backend API URL:', BACKEND_ADDRESS);
console.log('Basename:', REACT_APP_BASENAME);