var gulp = require('gulp');
var Nuget = require('nuget-runner');
var args = require('yargs').argv;
var del = require('del');

gulp.task('clean', function() {
    return del(['release', '*.nupkg']);
    
});

gulp.task('nuget', ['clean'], function() {
    var nuget = Nuget({ apiKey: args.nugetApiKey });

    return nuget
        .pack({
            spec: 'typescripttemplates.nuspec',
            version: args.buildVersion
        })
        //.then(function() { return nuget.push('*.nupkg'); })
        ;
});