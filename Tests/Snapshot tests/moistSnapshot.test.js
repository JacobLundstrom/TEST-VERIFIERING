const fs = require('fs');
const path = require('path');

// HTML file path
const htmlFilePath = path.resolve(__dirname, '../../moist.html');

// Load HTML content
const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

// Jest snapshot test
describe('HTML Snapshot', () => {
  it('ska matcha snapshot', () => {
    // Set the HTML content as the snapshot
    expect(htmlContent).toMatchSnapshot();
  });
});
