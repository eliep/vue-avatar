#!/usr/bin/env bash

git stash save 'Before deploy' # Stash all changes before deploy
git checkout master
npm run build
cp dist/vue-avatar.min.js gh-pages/
git add gh-pages/vue-avatar.min.js
git commit -m "Deploy docs"
RESULT=$?
if [ $RESULT -eq 0 ]; then
  echo 'Changes Committed'
fi
git subtree push --prefix gh-pages origin gh-pages # Deploy gh-pages
git push origin master
git stash pop # And restore the changes
echo 'Deployed'