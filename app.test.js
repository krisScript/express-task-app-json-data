const puppeteer = require('puppeteer');

const fs = require('fs');

describe('app', () => {
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      args: ['--windows-size=1920,1080']
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
  });
  afterAll(() => {
    browser.close();
  });
  it(`should have title "Tasks"`, async () => {
    const title = await page.title();
    expect(title).toMatch('Tasks');
  });
  it(`a tag with className "has-text-primary" and href "http://localhost:3000/" should exist `, async () => {
    const selector = 'navbar-item';
    const links = await page.evaluate(selector => {
      return Array.from(document.getElementsByClassName(selector)).map(
        node => node.href
      );
    }, 'has-text-primary');
    expect(links).toEqual(['http://localhost:3000/']);
    expect(links).toBeTruthy();
  });
  it(`going to Add Task Page with title 'Add Task'`, async () => {
    await page.$eval('#add-task-link', link => link.click());
    const title = await page.title();
    expect(title).toMatch('Add Task');
  });
  describe('adding task', () => {
    const task = {
      title: 'Stando Powehhh',
      description: 'Za warudo'
    };
    beforeAll(async () => {
      await page.$eval('#add-task-link', link => link.click());
      await page.type('input[name=title]', task.title);
      await page.type('textarea[name=description]', task.description);
      await page.$eval('#submit-button', btn => btn.click());
    });
    it(`after submitting task page should have title 'Tasks'`, async () => {
      const title = await page.title();
      expect(title).toMatch('Tasks');
    });
  });
});
