$body = @{
    name = "Test User"
    email = "testuser@test.com"
    password = "test123"
    course = "BCA"
    skills = "JavaScript"
    role = "student"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/student/register" -Method POST -ContentType "application/json" -Body $body | ConvertTo-Json
