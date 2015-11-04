/// <binding BeforeBuild='concat-definitions' />
var gulp = require('gulp');
var ts = require('gulp-typescript');
var removeLines = require('gulp-delete-lines');
var concat = require('gulp-concat');
var header = require('gulp-header');
var fs = require('fs');
var merge = require('merge2');
var Nuget = require('nuget-runner');
var args = require('yargs').argv;
var uglify = require('gulp-uglify');
var del = require('del');
var flatten = require('gulp-flatten');


var definitions = [
    "definitions/SP.Init.d.ts",
    "definitions/SP.RequestExecutor.d.ts",
    "definitions/mQuery.d.ts",
    "definitions/callout.d.ts",
    "definitions/clienttemplates.d.ts",
    "definitions/SPAnimation.d.ts",
    "definitions/SP.d.ts",
    "definitions/SP.Search.d.ts",
    "definitions/SP.BusinessData.d.ts",
    "definitions/SP.Sharing.d.ts",
    "definitions/SP.Social.d.ts",
    "definitions/SP.Taxonomy.d.ts",
    "definitions/SP.DocumentManagement.d.ts",
    "definitions/SP.UI.ApplicationPages.d.ts",
    "definitions/SP.UI.d.ts",
    "definitions/SP.Ribbon.d.ts",
    "definitions/SP.UI.Controls.d.ts",
    "definitions/SP.UserProfiles.d.ts",
    "definitions/SP.Utilities.d.ts",
    "definitions/SP.WebParts.d.ts",
    "definitions/SP.Workflow.d.ts",
    "definitions/SP.WorkflowServices.d.ts",
    "definitions/SP.Publishing.d.ts",
    "definitions/SP.Policy.d.ts",
    "definitions/autofill.d.ts",
    "definitions/clientpeoplepicker.d.ts",
    "definitions/reputation.d.ts",
    "definitions/SPO.d.ts",
    "definitions/SP.JSGrid.d.ts",
    "definitions/SPGantt.d.ts"

];


gulp.task('clean', function() {
    return del(['release', '*.nupkg']);
    
});

gulp.task('build-definitions', function () {
    return gulp.src(definitions)
        .pipe(ts({
            noImplicitAny: true
        }));
});

gulp.task('concat-definitions', ['build-definitions'], function () {
    return gulp.src(definitions)
        .pipe(removeLines({'filters': [
            /\/\/\/\s*\<reference/
        ]}))
        .pipe(concat("SharePoint.d.ts"))
        .pipe(header(fs.readFileSync('sharepoint.header', 'utf8')))
        .pipe(gulp.dest('SPTypeScript/Scripts/typings/sharepoint'));
});

gulp.task('build', ['concat-definitions'], function () {
    var tsProject = ts.createProject('tsconfig.json');
    var tsResult = tsProject.src().pipe(ts(tsProject));
    var hdr = ['/// <reference path="../sharepoint/sharepoint.d.ts" />\n',
               '/// <reference path="../angularjs/angular.d.ts" />\n',
               '/// <reference path="../knockout/knockout.d.ts" />\n',
               '\n'].join('');

    return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done. 
        tsResult.dts
            .pipe(flatten())
            .pipe(header(hdr))
            .pipe(gulp.dest('release')),
        tsResult.js
            .pipe(flatten())
            .pipe(uglify())
            .pipe(gulp.dest('release')),
            
    ]);
});

gulp.task('default', ['build']);



gulp.task('nuget', ['clean','build'], function() {
    var nuget = Nuget({ apiKey: args.nugetApiKey });

    return nuget
        .pack({
            spec: 'typescripttemplates.nuspec',
            version: args.buildVersion
        })
        .then(function() { return nuget.push('*.nupkg'); });
});