cp -r ~/higsch/projects/jfc/jinq/app/src/* ~/higsch/projects/jfc/jinq/public/src/
cd ~/higsch/projects/jfc/jinq/public
npm run build
cd public
git add .
git commit -m "build"
git push origin main
