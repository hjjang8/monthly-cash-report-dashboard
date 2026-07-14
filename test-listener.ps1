try {
  $listener = New-Object System.Net.HttpListener
  $listener.Prefixes.Add("http://localhost:5173/")
  $listener.Start()
  Write-Output "STARTED OK"
  $listener.Stop()
} catch {
  Write-Output ("FAILED: " + $_.Exception.Message)
}
