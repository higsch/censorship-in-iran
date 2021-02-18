cp -r ~/higsch/projects/jfc/jinq/app/src/* ~/higsch/projects/jfc/jinq/public/src/
cp -r ~/higsch/projects/jfc/jinq/app/public/data/* ~/higsch/projects/jfc/jinq/public/public/data/
cd ~/higsch/projects/jfc/jinq/public
npm run build
cd public
git add .
git commit -m "build"
git push origin main
