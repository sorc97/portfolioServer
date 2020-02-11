const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

app.use(bodyParser.json());


// Calculating paths
const getStaticFolder = folder => path.join(__dirname, `../${folder}`);
const getAppStaticFolder = (folder, dir) => path.join(__dirname, `../${folder}/${dir}`);
const getHtmlFile = folder => pah.join(folder, 'index.html');

// Initial path
app.use(`/`, express.static(getAppStaticFolder('Portfolio', 'build')));

app.get(`/`, (req, res) => {
  const responseFile = getHtmlFile(getAppStaticFolder('Portfolio', 'build'));
  res.sendFile(responseFile);
})

// Response with project that have a simple project structure
const responseWithSimpleProject = projectName => {
  app.use(`/${projectName}`, express.static(getStaticFolder(projectName)));

  app.get(`/${projectName}`, (req, res) => {
    const responseFile = getHtmlFile(getStaticFolder(projectName));
    res.sendFile(responseFile);
  })
}

// Response with webpack project structure
const responseWithApp = (projectName, dir) => {
  app.use(`/${projectName}`, express.static(getAppStaticFolder(projectName, dir)));

  app.get(`/${projectName}`, (req, res) => {
    const responseFile = getHtmlFile(getAppStaticFolder(projectName, dir));
    res.sendFile(responseFile);
  })
}

responseWithSimpleProject('Lawyer');
responseWithSimpleProject('ShelterLayout');
responseWithSimpleProject('ImageGenerator');

responseWithApp('ZeroLayout', 'dist');
responseWithApp('trelloClone', 'dist');
responseWithApp('Dictionary', 'build');
responseWithApp('MusicShop', 'dist');

app.listen(
  PORT,
  () => console.log('server is running', PORT)
);
