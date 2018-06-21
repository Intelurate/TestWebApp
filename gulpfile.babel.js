import path from 'path';
import gulp from 'gulp';
import run from 'gulp-run';
import webpack from 'webpack';
import gutil from "gulp-util";
import gls from 'gulp-live-server';
import env from 'gulp-env';
import _ from 'underscore';
import mocha from 'gulp-mocha';
import through from "through2";
import yaml from 'gulp-yaml';
import log from 'fancy-log';
import babel from 'gulp-babel';
import addVersion from './modules/add-version.js';
import { Config } from "./server/modules/database/config";
import jestCreateConfig from './modules/jest-create-config.js';
import runImports from "./modules/rebuild-collections";

var jest = require('gulp-jest').default;

const { spawn } = require('child_process');
    
gulp.task('jest', (done)=>{

    process.env.CONFIG = "test";
        
    let testPath = 'test';
    let match = "**/test/**/*test.js?(x)";
    let jestConfig = "jest.config.json";

    if(process.argv[2] === "test" && process.argv[3] !== undefined){
        //testPath = "test/" + process.argv[3].replace('--', '');
        let arg = process.argv[3].replace('--', '');        
        if(arg.indexOf('=') != -1){
            let paths = arg.split("=");
            match = `**/test/${paths[0]}/${paths[1]}.test.js?(x)`;
        }else{
            match = `**/test/${arg}/*test.js?(x)`;
        }
    }

    jestCreateConfig({
        "rootDir" : testPath,
        "testMatch" : [match]
    }, jestConfig, ()=>{ 
    
        const im = spawn('mongo', [Config[process.env.CONFIG].db, '--eval', 'db.dropDatabase()' ]);
        im.on('close', (exitCode) => {

            gulp.src(testPath)
            .pipe(jest({
                "automock": false,
                "runInBand" : true,
                "config" : jestConfig
            }));  
            
        });                          
    })
});
 
gulp.task('add-version', () => {
    if(!process.env.ENV_VERSION){
        process.env.ENV_VERSION = 'testing'
    }
    addVersion('./html/login.set.html', process.env.ENV_VERSION);
    addVersion('./html/index.set.html', process.env.ENV_VERSION);
});

let buildPath = 'bin';
let srcPath = 'server';

gulp.task('webpack:build-jsx', ['transpile-watch'], (callback) => {

    var webpackConfig = require('./webpack.config');

    // add minification if using minified environment
    // if (minifiedEnvironments.indexOf(gutil.env.node_env) !== -1)

    //webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin());

    return webpack(webpackConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            chunks: false,
            colors: true
        }));
        callback();
    });
});


gulp.task('watch:client', ['webpack:build-jsx'], () => {
    var server = gls.static('public', 3008); 
    server.start();
    server.start.apply(server);
    gulp.watch('./reactApp/**/*', ['webpack:build-jsx']);
    gulp.watch('./loginApp/**/*', ['webpack:build-jsx']);
    gulp.watch('./modules/**/*', ['webpack:build-jsx']);
});


var watchServer = (server) => {
    gulp.watch([`${buildPath}/**/*.js`], (data) => {
        server.start.apply(server);
    });
};

gulp.task('server-start', ['watch:client'], async () =>{
           
    process.env.CONFIG = "development";

    await runImports([
        'users',
        'eventRequests'
    ], "JestDb/Imports/", Config[process.env.CONFIG].db);

    var server = gls([`${buildPath}/server.js`],  { env: { CONFIG : 'development' } });
    server.start();
    watchServer(server);
});

gulp.task('transpile-watch', ['transpile'], () => {
    gulp.watch([`${srcPath}/**/*.js`], (data) => {
        let path = `${buildPath}${data.path.split(srcPath)[1]}`;
        let folderpath = [];
        if(process.platform === 'win32'){
            path = path.split('\\');    
        }else{
            path = path.split('/');            
        }
        path.forEach((v,i) => {
            if( i < path.length-1 ) {
                if(process.platform === 'win32'){
                    folderpath.push(v+"\\");       
                }else{
                    folderpath.push(v+"/");       
                }
            }
        });

        folderpath = folderpath.join('');

        gulp.src([data.path])
        .pipe(babel())
        .pipe(gulp.dest(folderpath));
    })
});

gulp.task('transpile', (done) => {
        gulp.src([`${srcPath}/**/*.js`])
        .pipe(babel())
        .pipe(gulp.dest(buildPath))
        .on('end', done);
});

gulp.task('test', [ 'jest' ]);

gulp.task('default', [ 'transpile', 'transpile-watch', 'add-version', 'webpack:build-jsx', 'watch:client', 'server-start' ]);//
