function Get-Status {
    param ($Status)

    $fromattedStatus

    switch ($Status) {
        0 {$fromattedStatus = "Not Started"}
        1 {$fromattedStatus = "In Progress"}
        2 {$fromattedStatus = "Complete"}
        3 {$fromattedStatus = "Error"}
    }

    return $fromattedStatus
}

dotnet tool restore --add-source https://sitecore.myget.org/F/sc-packages/api/v3/index.json

dotnet sitecore cloud login --client-credentials --client-id n5CfboqJd0m9qOO5rWhtlmbZGSX8iRKt --client-secret 5WZfiD3gyr07qYGybmPxSOM8LrYTemZs1S1GJs2hEl2lJuTM21g1-oGMRAgY9NXA
$deployment = (dotnet sitecore cloud deployment create --working-dir . --upload --environment-id 6yYSL0g2oUgiBqV5EuS2WB --no-watch --json) | Out-String

#Sitecore is not always sending valid JSON back, so needed to wrap it in brackets so ConvertFrom-Json works
$deploymentFormatted = "[$deployment]"

$deploymentFormattedJson = $deploymentFormatted | ConvertFrom-Json

$deploymentId = $deploymentFormattedJson.id
Write-Host "Deployment Id: $deploymentId"

$deploymentStart = dotnet sitecore cloud deployment start --deployment-id $deploymentId --no-watch

Do {
    $deployInfo = (dotnet sitecore cloud deployment info --deployment-id $deploymentId --json) | Out-String

    #Sitecore is not always sending valid JSON back, so needed to wrap it in brackets so ConvertFrom-Json works
    $deployInfoFormatted = "[$deployInfo]"
    $deployInforFormattedJson = $deployInfoFormatted | ConvertFrom-Json
    
    Write-Host "Deployment In Progress - Status: $((Get-Status -Status $deployInforFormattedJson.calculatedStatus))"
    Start-Sleep 10
} While (($deployInforFormattedJson.calculatedStatus -ne 2) -and ($deployInforFormattedJson.calculatedStatus -ne 3))

Write-Host "Deployment Complete - Status: $((Get-Status -Status $deployInforFormattedJson.calculatedStatus))"

if($deployInforFormattedJson.postActionStatus -eq 3){
    Write-Host "Post Action Error: $($deployInforFormattedJson.postActionLastFailureMessage)"
}

if($deployInforFormattedJson.calculatedStatus -eq 3){

    if($deployInforFormattedJson.provisioningStatus -eq 3){
        Write-Host "Provision Error: $($deployInforFormattedJson.provisioningLastFailureMessage)"
    }

    if($deployInforFormattedJson.deploymentStatus -eq 3){
        Write-Host "Deployment Error: $($deployInforFormattedJson.deploymentLastFailureMessage)"
    }

    throw "Error - Deployment Failed"
}

#======================
#OLD:

#dotnet tool restore --add-source https://sitecore.myget.org/F/sc-packages/api/v3/index.json
#dotnet sitecore cloud login --client-credentials --client-id $env:XMCloud_ClientID --client-secret $env:XMCloud_ClientSecret
#dotnet sitecore cloud deployment create --working-dir . --upload --environment-id $env:XMCloud_EnvironmentID