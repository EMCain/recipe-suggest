# recipe-suggest

## GitHub Pages setup 

The site is live at https://emcain.github.io/recipe-suggest/#/

I used the [instructions here](https://learnvue.co/2020/09/how-to-deploy-your-vue-app-to-github-pages/#step-3-run-git-add-dist-git-commit-m-adding-dist-subtree) to publish it.

To publish updates to the site: 

```sh
npm run build
git subtree push --prefix dist origin gh-pages
```

This requires the "dist" folder to not be ignored in that subtree's .gitignore. However, it is ignored on main because it isn't needed for general use. It might need to be removed from the gitignore before adding commits for the subtree. 

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
