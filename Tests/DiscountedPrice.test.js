const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Read the HTML file
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

let dom;
let container;

beforeEach(() => {
  // Construct a new JSDOM instance with the HTML
  dom = new JSDOM(html);
  // Get the HTML element out of the JSDOM instance
  container = dom.window.document.body;
});

test('check if rabatt is lower than original', () => {
  const rabattElement = container.querySelector('.rabatt');
  const textMutedElement = container.querySelector('.text-muted.ml-2');

  const rabattValue = parseFloat(rabattElement.textContent.replace('kr', ''));
  const ordinaryValue = parseFloat(textMutedElement.textContent.replace('kr', ''));

  console.log('rabattValue:', rabattValue);
  console.log('textMutedValue:', ordinaryValue);

  expect(rabattValue).toBeLessThan(ordinaryValue);
});
