#!/usr/bin/env bash

git stash save 'Before deploy' # Stash all changes before deploy
git checkout master
npm run build
cp dist/vue-avatar.min.js gh-pages/
# npm run build # Generate the bundled Javascript and CSS
if $(git commit -am Deploy docs); then # Commit the changes, if any
  echo 'Changes Committed'
fi
#git push heroku deploy:master # Deploy to Heroku
#git checkout master # Checkout master again
git stash pop # And restore the changes