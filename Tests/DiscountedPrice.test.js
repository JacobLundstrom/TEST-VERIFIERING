const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Read the HTML file
const html = fs.readFileSync(path.resolve(__dirname, '../Webbshop/index.html'), 'utf8');

let dom;
let container;

beforeEach(() => {
  // Construct a new JSDOM instance with the HTML
  dom = new JSDOM(html);
  // Get the HTML element out of the JSDOM instance
  container = dom.window.document.body;
});

test('check if "rabatt" class number is lower than the "text-muted ml-2" class', () => {
  // Get the elements by their class names
  const rabattElement = container.querySelector('.rabatt');
  const textMutedElement = container.querySelector('.text-muted.ml-2');

  // Extract the numerical values from the elements' text content
  const rabattValue = parseFloat(rabattElement.textContent.replace('kr', ''));
  const textMutedValue = parseFloat(textMutedElement.textContent.replace('kr', ''));

  // Check if the "rabatt" class number is lower than the "text-muted ml-2" class
  expect(rabattValue).toBeLessThan(textMutedValue);
});
