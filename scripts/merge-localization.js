/* eslint-disable */
const fs = require('fs');
const path = require('path');
const async = require('async');

const encoding = 'utf8';

const i18nFilesPath = path.join(__dirname, '..', 'src/assets/i18n/');

function mergeLocalizations(path, originFileName = 'en.json') {
  const filesNames = receiveFileNames(path, originFileName);
  const localizationFilesPath = fillFilePaths(path, filesNames);
  let filesToSave = null;
  let localizationsFiles = null;

  const originFile = JSON.parse(fs.readFileSync(path + originFileName));

  async.map(localizationFilesPath, fs.readFile, (err, data) => {
    localizationsFiles = fillFiles(localizationFilesPath, data);
    filesToSave = mergeFileContents(originFile, localizationsFiles);

    saveChangedFiles(filesToSave, localizationsFiles);
  });
}

function receiveFileNames(path, originFileName) {
  return fs
    .readdirSync(path)
    .filter(name => name.endsWith('json') && name !== originFileName);
}

function fillFilePaths(path, fileNames) {
  return fileNames.map(fileName => path + fileName);
}

function mergeFileContents(origin, localizationFiles) {
  const fileNames = Object.keys(localizationFiles);
  const filesToSave = [];

  for (let i = 0; i < fileNames.length; i++) {
    const isNeedToRefreshFile = mergeFileContent(
      origin,
      localizationFiles[fileNames[i]]
    );

    if (isNeedToRefreshFile) {
      filesToSave.push(fileNames[i]);
    }
  }

  return filesToSave;
}

function fillFiles(paths, files) {
  const res = {};
  for (let i = 0; i < files.length; i++) {
    res[paths[i]] = JSON.parse(files[i]);
  }

  return res;
}

function mergeFileContent(baseFileContent, otherFileContent) {
  const toBeDefined = 'TBD ';
  let isNeedToRefreshFile = false;
  for (const key in baseFileContent) {
    if (!(key in otherFileContent)) {
      isNeedToRefreshFile = true;
      otherFileContent[key] = toBeDefined + baseFileContent[key];
    }
  }

  return isNeedToRefreshFile;
}

function saveChangedFiles(fileNames, filesContent) {
  for (let i = 0; i < fileNames.length; i++) {
    fs.writeFile(
      fileNames[i],
      JSON.stringify(filesContent[fileNames[i]], null, 4),
      encoding,
      err => console.log(err || 'Localization file has been updated.')
    );
  }
}

mergeLocalizations(i18nFilesPath);
