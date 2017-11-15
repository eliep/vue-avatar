#!/usr/bin/env bash

git stash save 'Before deploy' # Stash all changes before deploy
git checkout master
yarn docs
git commit -m "Deploy docs"
RESULT=$?
if [ $RESULT -eq 0 ]; then
  echo ' >> Changes Committed << '
fi
git subtree push --prefix docs origin gh-pages # Deploy gh-pages
git push origin master
git stash pop # And restore the changes
echo ' >> Deployed << '