daily-dataviz
=============

I try to learn by doing

Set up the ENV
--------------

I use [bower](http://bower.io/) to handle dependencies

In order to set up the ENV correctly, you need to install the bower, 
after clone the repo, you need to: 
    
    bower install


Run the code
------------

You can use python or ruby server to run the project, but I prefer node.js:

    http-server . -p 3333


ScreenCapture
-------------

I write a simple script to capture the dataviz I create, make sure that you install `phantomjs`

    phantomjs html_to_png.js http://x:8080/ ./pic/color


Streak
------

1. Agricultural production 2004

![Agricultural](https://raw.githubusercontent.com/Daniel-Xu/daily-dataviz/master/pic/color.png)

![Wiht population](https://raw.githubusercontent.com/Daniel-Xu/daily-dataviz/master/pic/color_with_popu.png)


