

const fs = require('fs-extra');
const path = require('path');
const cwd = process.cwd();
const glob = require('glob');

function buildCopy(){

  const distPath = path.join(cwd, 'src/assets');
  const tempPath = path.join(cwd, 'dist/assets');
  fs.emptyDirSync(tempPath);
  
  const relativePaths = glob.sync('**/*.*', { cwd: distPath });
  relativePaths.forEach(relaticePath => {
    var ignoreStr = "source-maps";
    // console.log(relaticePath,relaticePath.indexOf(ignoreStr))
    if (relaticePath.indexOf(ignoreStr) > -1) {
      return false;
    }
    const content = fs.readFileSync(path.join(distPath, relaticePath), 'utf8');
    fs.outputFileSync(path.join(tempPath, relaticePath), content);

  });

}

buildCopy()