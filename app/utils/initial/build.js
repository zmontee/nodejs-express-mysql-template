const fs = require('fs');

const cdnFolder = __dirname + '/../../cdn/';
const tmpFolder = cdnFolder + 'tmp/';
const filesFolder = cdnFolder + 'files/';
const imagesFolder = cdnFolder + 'images/';

if (!fs.existsSync(cdnFolder)) {
  fs.mkdirSync(cdnFolder);
  console.log('Create /cdn folder')
}
if (!fs.existsSync(tmpFolder)) {
  fs.mkdirSync(tmpFolder);
  console.log('Create /cdn/tmp folder')
}
if (!fs.existsSync(filesFolder)) {
  fs.mkdirSync(filesFolder);
  console.log('Create /cdn/files folder')
}
if (!fs.existsSync(imagesFolder)) {
  fs.mkdirSync(imagesFolder);
  console.log('Create /cdn/images folder')
}
