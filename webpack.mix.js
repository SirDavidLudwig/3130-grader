const mix = require("laravel-mix");

mix.ts("src/ui/index.ts", "dist/ui/index.js")
   .sass("src/ui/sass/index.scss", "dist/ui/index.css")
   .copy("src/ui/views/*.html", "dist/ui");
