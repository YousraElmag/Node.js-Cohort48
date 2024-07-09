// jest.config.js
module.exports = {
  // ...other configurations,
  transform: {
    '^.+\\.js$': 'babel-jest', // Add this to use Babel to transform JavaScript files
  },
  transformIgnorePatterns: ['/node_modules/'], // Ensure node_modules are ignored by transformers
};
