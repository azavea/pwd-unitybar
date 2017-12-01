var importResolve = require('import-resolve');

importResolve({
    ext: 'scss',
    pathToMain: 'app/sass/_pwd-unity-bar.scss',
    output: 'app/sass/pwd-unity-bar.scss'
});
