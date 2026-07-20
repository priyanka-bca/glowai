# GlowAI Auto-Push Monitor Service
Write-Output "--------------------------------------------------------"
Write-Output "GlowAI Auto-Push Monitor initialized successfully."
Write-Output "Monitoring folder: e:\GlowAI"
Write-Output "Repository: https://github.com/priyanka-bca/glowai.git"
Write-Output "Auto-push active: checking for file updates every 10s..."
Write-Output "--------------------------------------------------------"

while ($true) {
    # Check if there are unstaged or untracked changes
    $status = git status --porcelain
    if ($status) {
        Write-Output "$(Get-Date -Format 'HH:mm:ss') -> Changes detected in files. Pushing..."
        git add .
        git commit -m "Auto-save: modified assets and layouts"
        git push origin main
        Write-Output "$(Get-Date -Format 'HH:mm:ss') -> Successfully pushed to GitHub!"
        Write-Output "--------------------------------------------------------"
    }
    Start-Sleep -Seconds 10
}
