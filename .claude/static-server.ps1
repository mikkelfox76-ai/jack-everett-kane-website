param(
  [int]$Port = 4321,
  [string]$Root = (Split-Path -Parent $PSScriptRoot)
)

Add-Type -AssemblyName System.Net.HttpListener -ErrorAction SilentlyContinue

$mime = @{
  ".html"=" text/html; charset=utf-8"; ".htm"="text/html; charset=utf-8"
  ".css"="text/css"; ".js"="application/javascript"; ".json"="application/json"
  ".webmanifest"="application/manifest+json"
  ".webp"="image/webp"; ".png"="image/png"; ".jpg"="image/jpeg"; ".jpeg"="image/jpeg"
  ".svg"="image/svg+xml"; ".ico"="image/x-icon"; ".xml"="application/xml"; ".txt"="text/plain"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $Root on http://localhost:$Port/"

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $req = $context.Request
    $res = $context.Response
    try {
      $path = [Uri]::UnescapeDataString($req.Url.AbsolutePath)
      if ($path -eq "/") { $path = "/index.html" }
      $filePath = Join-Path $Root ($path.TrimStart("/"))
      if (Test-Path $filePath -PathType Leaf) {
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $ct = $mime[$ext]
        if (-not $ct) { $ct = "application/octet-stream" }
        $res.ContentType = $ct
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $res.ContentLength64 = $bytes.Length
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
      } else {
        $res.StatusCode = 404
        $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
        $res.OutputStream.Write($msg, 0, $msg.Length)
      }
    } catch {
      $res.StatusCode = 500
    } finally {
      $res.OutputStream.Close()
    }
  }
} finally {
  $listener.Stop()
}
