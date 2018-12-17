FROM metaview/puppeteer

ADD test-extension /test-extension
ADD test.js /

CMD xvfb-run node test.js