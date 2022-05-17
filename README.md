# recipe-suggest

## GitHub Pages setup 

The site is live at https://emcain.github.io/recipe-suggest/#/

I used the [instructions here](https://learnvue.co/2020/09/how-to-deploy-your-vue-app-to-github-pages/#step-3-run-git-add-dist-git-commit-m-adding-dist-subtree) to publish it.

To publish updates to the site (see [gist](https://gist.github.com/tduarte/eac064b4778711b116bb827f8c9bef7b))

```sh
# IMPORTANT: first commit latest code changes and push to the main branch
npm run build
# while this is running, remove "dist" from .gitignore 
git checkout main # you can avoid this line if you are in main...
git subtree split --prefix dist -b gh-pages # create a local gh-pages branch containing the splitted output folder
git push -f origin gh-pages:gh-pages # force the push of the gh-pages branch to the remote gh-pages branch at origin
git branch -D gh-pages # delete the local gh-pages because you will need it: ref
git reset --hard origin/main  # reset main to where it was before
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
