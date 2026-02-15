#!/bin/bash
# Push reports.json to GitHub after alpha scan

cd /root/.openclaw/workspace/alpha-dashboard

git add reports.json
git commit -m "Update reports $(date -u +"%Y-%m-%d %H:%M UTC")" 2>/dev/null
git push origin master 2>/dev/null

echo "Pushed to GitHub"
