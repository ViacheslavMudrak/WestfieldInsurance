# XM Cloud Starter Kit (Next JS)

## QUICK START

0. Take the .env.sample file and copy to a .env file.

1. In an ADMIN terminal:

    ```ps1
    .\init.ps1 -InitEnv -LicenseXmlPath "C:\[path]\Westfield\docker\license\license.xml" -AdminPassword "b"
    ```

    Run setx NODE_EXTRA_CA_CERTS as prompted after the init command

2. Restart your terminal and run:

    ```ps1
    .\up.ps1
    ```

3. Browse to the src/app folder
    Ensure Node version 16.20.2
    `npm install`
    `npm run start`

4. Browse back to /Westfield directory and run the following to push all serialized Sitecore items out to local
    dotnet tool restore
    dotnet sitecore cloud login
    dotnet sitecore ser push

    To serialize your changes into the solution run:
    dotnet sitecore ser pull

5. Update your WestfieldInsurance site grouping. Field: Predefined application rendering host
/sitecore/content/WestfieldInsurance/Sites/WestfieldInsurance/Settings/Site Grouping/WestfieldInsurance > Predefined application rendering host > choose `Local`

*** 

## About this Solution
This solution is designed to help developers learn and get started quickly
with XMCLoud + SXA.


