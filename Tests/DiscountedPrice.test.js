const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

let dom;
let container;

beforeEach(() => {

  dom = new JSDOM(html);

  container = dom.window.document.body;
});

test('check if rabatt is lower than original', () => {
  const rabattElement = container.querySelector('.rabatt');
  const textMutedElement = container.querySelector('.text-muted.ml-2');

  const rabattValue = parseFloat(rabattElement.textContent.replace('kr', ''));
  const ordinaryValue = parseFloat(textMutedElement.textContent.replace('kr', ''));

  console.log('rabattValue:', rabattValue);
  console.log('ordinaryValue:', ordinaryValue);

  expect(rabattValue).toBeLessThan(ordinaryValue);
});
