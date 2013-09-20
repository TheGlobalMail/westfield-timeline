###Chart template

Template to automate some steps for making iframe charts for TGM stories.

1. `npm install`
2. `bower install` will do highcharts and jquery, or you can `bower install` other stuff (and update script tags in `index.html`)
3. `chart.js` provides some common TGM fonts and colors, title / dek / source credit in `index.html`
4. check what you're doing: `http-server` then http://localhost:8080
5. `grunt build` to minify/concatenate your css/js, and update html file accordingly