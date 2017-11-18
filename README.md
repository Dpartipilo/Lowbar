# Lowbar 

Lowbar is my own reimplementation of several JS library "_underscore" functions using Test Driven development. 

## General setup

1. In order to run this code you need to install nodeJS. To check if you have nodeJS installed open you terminal window and run/paste the following command:
``` 
node -v
```

If it is installed, it will show you the version of node you have installed. e.g.:
```v8.4.0.``` 
 If you do not have nodeJS installed, follow the installation instructions found [here](https://nodejs.org/en/download/package-manager/).

2. Make sure you have npm installed. Open a terminal window and run the following command:
``` 
npm -v 
```

If it's installed, it will show you the version of npm you have installed. e.g.: ```  5.5.1. ``` 
If you do not have npm installed, then run/paste the following command:
``` 
npm install npm 
```

## Installation
Please follow the instructions to clone this project and install all the necessary dependencies.

1. Open a terminal and navigate to the folder in which you wish to save the project. Run the following command:
``` 
git clone https://github.com/Dpartipilo/Lowbar.git
```
2. Navigate into the new created folder and run the following command:
```
npm install
```
3. To run tests, run the following command:
```
npm test
```

These are the core functions I will aim to get finished;

1. identity
2. first
3. last
4. each
5. indexOf
6. filter
7. reject
8. uniq
9. map
10. contains
11. pluck
12. reduce
13. every
14. some
15. extend
16. defaults
17. once
18. negate
19. shuffle
20. invoke
21. sortBy (NB the Underscore library uses the native JavaScript sort but feel free to use your sort algorithm!)
22. zip
23. sortedIndex
24. flatten
25. intersection
26. difference
27. memoize
28. delay
29. where
30. throttle
31. partial

## Dependencies

* [Mocha](https://mochajs.org/)
* [Chai](http://chaijs.com/)
* [Sinon Spy](http://sinonjs.org/)

## Author

Diego Partipilo

## Acknowledgments

This project was completed as part of [Northcoders](https://northcoders.com/) sprints, inspired by [Underscore js](http://underscorejs.org/) library.
