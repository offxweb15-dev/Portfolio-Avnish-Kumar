# Minify CSS files
$cssFiles = @(
    "css/style.css",
    "css/anime-theme.css"
)

foreach ($file in $cssFiles) {
    $minFile = $file -replace '\.css$', '.min.css'
    Write-Host "Minifying $file to $minFile"
    
    # Simple CSS minification (remove comments, extra spaces, etc.)
    $content = Get-Content -Path $file -Raw
    $minContent = $content -replace '\/\*[\s\S]*?\*\/|^\s*\/\/.*', ''  # Remove comments
    $minContent = $minContent -replace '\s*([{}:;,])\s*', '$1'  # Remove spaces around CSS selectors and properties
    $minContent = $minContent -replace ';\s*', ';'  # Remove spaces after semicolons
    $minContent = $minContent -replace '\s+', ' '  # Replace multiple spaces with a single space
    $minContent = $minContent -replace '([;{}])\s*', '$1'  # Remove spaces after ; and {
    $minContent = $minContent.Trim()  # Remove leading/trailing spaces
    
    # Save minified content
    $minContent | Out-File -FilePath $minFile -Encoding utf8 -NoNewline
}

# Minify JavaScript files
$jsFiles = @(
    "js/main.js",
    "js/anime-effects.js"
)

foreach ($file in $jsFiles) {
    $minFile = $file -replace '\.js$', '.min.js'
    Write-Host "Minifying $file to $minFile"
    
    # Simple JS minification (remove comments, extra spaces, etc.)
    $content = Get-Content -Path $file -Raw
    
    # Remove single-line comments that are on their own line
    $minContent = $content -replace '(?m)^\s*\/\/.*\n?', ''
    # Remove multi-line comments
    $minContent = $minContent -replace '\/\*[\s\S]*?\*\/', ''
    # Remove extra whitespace
    $minContent = $minContent -replace '\s+', ' '
    # Remove whitespace around operators
    $minContent = $minContent -replace '\s*([=+\-*/%&|^~!<>?:])\s*', '$1'
    # Remove whitespace after commas and semicolons
    $minContent = $minContent -replace '([,;])\s+', '$1'
    # Remove whitespace around brackets and parentheses
    $minContent = $minContent -replace '\s*([\[\](){}])\s*', '$1'
    # Remove whitespace at the beginning and end
    $minContent = $minContent.Trim()
    
    # Save minified content
    $minContent | Out-File -FilePath $minFile -Encoding utf8 -NoNewline
}

Write-Host "Minification complete!"
