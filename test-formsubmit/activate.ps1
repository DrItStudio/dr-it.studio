$email = "support@dr-it.studio"
$name = "Activation Request"
$message = "This is an activation request for FormSubmit service"

$body = @{
    email = $email
    name = $name
    message = $message
    _subject = "FormSubmit Activation Request"
} | ConvertTo-Json

$headers = @{
    "Content-Type" = "application/json"
}

try {
    Invoke-RestMethod -Uri "https://formsubmit.co/$email" -Method Post -Body $body -Headers $headers
    Write-Host "Activation request sent successfully. Check $email inbox for confirmation email from FormSubmit."
}
catch {
    Write-Host "Error sending activation request: $_"
}
