The Visual Studio 2012 solution is designed to run with IIS Express. To open it follow these steps:

1. Start Visual Studio 2012
2. Select File --> Open Website and select the AngularJSDemos folder
3. Right-click on the website project and select Use IIS Express from the menu

You should be all set.

If you don't want to use Visual Studio you can still run everything but you'd possibly need
to update the urlBase path in DemoList.html since it expects DemoPartials to be off the root
of whatever site you run.

NODE.JS OPTION:

If you want to run the site using Node.js (install it from http://nodejs.org) run the following 
at the command-prompt from within the AngularJSDemos folder:

node server.js

Now navigate to http://localhost:8080/DemoList.html or http://localhost:8080/CustomerManagementApp 
in your browser.
