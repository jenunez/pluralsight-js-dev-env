// This file isn't transpiled, so must use CommonJS and ES5

//REgister babel to transpile befor our test run
require ('babel-register') ();

//Disable webpack features that doesn't understand
require.extensions['.css'] = function() {};
