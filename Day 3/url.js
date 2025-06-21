// const url = require('url');

const parsedUrl = new URL('https://sidddev15.github.io/portfolio-frontend/#/projects');
console.log(parsedUrl.pathname);
console.log(parsedUrl.searchParams.get('name'));