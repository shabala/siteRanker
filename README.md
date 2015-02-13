# siteRanker

a [Sails](http://sailsjs.org) application

Issues to be fixed post first commit:
  1. After inserting a new site (ie making a new entry), refresh is required before navigation to comments page can occur. Same applies for comments page. Persistence to MOngoDB does not occur prior to a refresh. Works fine for all previously listed elements.
  2. Issues with CSS: glyphicon class does not render at times.
  3. Path definition for angular-ui-router and bootstrap.min.css says undefined. Hence had to resort to using it directly from the web. (Directory specification for /bower_components -> duplication??)
  
