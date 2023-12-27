const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Function to extract text content from an HTML string based on a selector
const extractValueFromHTML = (html, selector) => {
  const dom = new JSDOM(html);
  const element = dom.window.document.querySelector(selector);
  return element ? element.textContent.trim() : null;
};

describe('HTML Value Tests', () => {
  test('Check if specific values match on different HTML pages', () => {
    // Replace these paths with your actual HTML file paths
    const pathToPage1 = path.resolve(__dirname, '../Index.html');
    const pathToPage2 = path.resolve(__dirname, '../Products/Kamera.html');

    // Load HTML content from files
    const htmlPage1 = fs.readFileSync(pathToPage1, 'utf-8');
    const htmlPage2 = fs.readFileSync(pathToPage2, 'utf-8');

    // Verify that the HTML content is loaded successfully
    expect(htmlPage1).toBeTruthy();
    expect(htmlPage2).toBeTruthy();

    // Replace '.599' with the actual selector for the element containing the value
    const valuePage1 = extractValueFromHTML(htmlPage1, '.value'); // Update the selector accordingly
    const valuePage2 = extractValueFromHTML(htmlPage2, '.value'); // Update the selector accordingly

    // Assert that the values match
    expect(valuePage1).toEqual(valuePage2);
  });
});
