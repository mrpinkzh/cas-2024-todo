import app from './source/app.js'

const port = 3000;


app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Todo app listening at http://localhost:${port}`);
});
