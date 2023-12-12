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

describe('Navbar Links', () => {
  test('Home link should have the correct href attribute', () => {
    const homeLink = container.querySelector('.navbar-nav .nav-item.active');

    expect(homeLink.getAttribute('href')).toBe('index.html');
  });

});
