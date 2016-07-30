electron practice
===

## Setup log

* Install nodejs
* npm init
* npm i electron-prebuilt --save

## How to build

```
$ node_modules/.bin/electron-packager ./ MyAPp --platform=darwin --arch=x64 --version=$(node_modules/.bin/electron -v | sed -e 's/v//g')
```
