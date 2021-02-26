import app from './app';

const port = process.env.PORT || 5000;

app.locals.vulcan.selectStudent().then(() => {
  app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
  });
})
.catch((e: Error) => console.error(e));