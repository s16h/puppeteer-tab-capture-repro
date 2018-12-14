This is a minimal repository to help with debugging [this](https://github.com/GoogleChrome/puppeteer/issues/3651) issue.

## How to reproduce the issue?

1. `git clone https://github.com/s16h/puppeteer-tab-capture-repro.git`
2. `npm install` - the only direct dependency is puppeteer 1.11.0.
3. `node test.js`

After running it for the first time, you'll likely get a `TypeError: Cannot read property 'page' of undefined` error from line 22. That's because of the ID of the extension. While Chromium is open, from `chrome://extensions`, get the ID of the extension and replace it on line 5 of `test.js`. Then, run `node test.js` again.

You should see the following in stdout:

```
0: JSHandle:Starting to record.
0: JSHandle:Last Error: Requested device not found
```
