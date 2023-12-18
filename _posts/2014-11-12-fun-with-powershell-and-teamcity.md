---
layout: post
title: "Fun with PowerShell and TeamCity"
date: 2014-11-12 -0800
comments: true
tags: [powershell,teamcity]
---
We have a nice [TeamCity](https://www.jetbrains.com/teamcity/) build server at work and we somewhat-recently updated it to use a MySQL database instead of XML for the data storage (like for the VCS roots).

We have a number of service accounts we use for interacting with the version control systems and they periodically need their passwords changed. It used to be that we could modify the XML document search-and-replace style, but now it's hidden in the database somewhere and is less straightforward to update.

Thankfully, TeamCity offers [a REST API](http://confluence.jetbrains.com/display/TCD8/REST+API) you can work with, so I decided to play with PowerShell and the `Invoke-RestMethod` command to automate the drudgery of going through the something-like-50 VCS roots we have defined and updating the passwords for selected accounts.

Here's the code for a small one-function module:

```powershell
<#
.Synopsis
   Updates the password for a user account in TeamCity associated with VCS root entries.
.DESCRIPTION
   Iterates through the VCS roots defined in TeamCity and updates the password associated with the specified user for all VCS roots.
.EXAMPLE
   $credential = Get-Credential
   Update-TeamCityVcsAccount -TeamCityUrl "http://your-teamcity-dash/" -TeamCityCredential $credential -VcsUserName "serviceaccount" -VcsPassword "TheNewPassword"
.NOTES
   This command uses the TeamCity REST API to iterate through the VCS roots and update the password for matching accounts.
#>
function Update-TeamCityVcsAccount
{
    [CmdletBinding()]
    Param
    (
        # The URL to the TeamCity dashboard.
        [Parameter(Mandatory=$true,
                   ValueFromPipeline=$false)]
        [ValidateNotNull()]
        [ValidateNotNullOrEmpty()]
        [Uri]
        $TeamCityUrl,

        # The credentials of the TeamCity administrator account to make changes.
        [Parameter(Mandatory=$true,
                   ValueFromPipeline=$false)]
        [ValidateNotNull()]
        [ValidateNotNullOrEmpty()]
        [PSCredential]
        $TeamCityCredential,

        # The username of the VCS user that should be updated.
        [Parameter(Mandatory=$true,
                   ValueFromPipeline=$false)]
        [ValidateNotNull()]
        [ValidateNotNullOrEmpty()]
        [String]
        $VcsUserName,

        # The new password for the VCS user.
        [Parameter(Mandatory=$true,
                   ValueFromPipeline=$false)]
        [ValidateNotNull()]
        [ValidateNotNullOrEmpty()]
        [String]
        $VcsPassword
    )

    Begin
    {
        $updated = @()
        $progressActivity = "Updating VCS root passwords for $VcsUserName..."
    }
    Process
    {
        $vcsRootsUri = New-Object -TypeName System.Uri -ArgumentList $TeamCityUrl, "/httpAuth/app/rest/vcs-roots"
        $allRoots = Invoke-RestMethod -Uri $vcsRootsUri -Method Get -Credential $credential
        foreach($href in $allRoots.'vcs-roots'.'vcs-root'.href)
        {
            $rootHref = New-Object -TypeName System.Uri -ArgumentList $TeamCityUrl, $href
            $vcsRoot = Invoke-RestMethod -Uri $rootHref -Method Get -Credential $credential
            $currentVcsUserName = $vcsRoot.'vcs-root'.properties.property | Where-Object { $_.name -eq "user" } | Select-Object -ExpandProperty "value"
            if($currentVcsUserName -ne $VcsUserName)
            {
                continue;
            }

            # secure:svn-password == Subversion Repo
            # secure:tfs-password == TFS Repo
            # Making the assumption all the password fields have this
            # name format...
            $propToChange = $vcsRoot.'vcs-root'.properties.property  | Where-Object { ($_.name -like 'secure:*') -and ($_.name -like '*-password') }  | Select-Object -ExpandProperty "name"
            $propHref = New-Object -TypeName System.Uri -ArgumentList $rootHref, "$href/properties/$propToChange"

            Write-Progress -Activity $progressActivity -Status "VCS root: $href"
            Invoke-RestMethod -Uri $propHref -Method Put -Credential $credential -Body $VcsPassword | Out-Null
            $updated += $propHref;
        }
    }
    End
    {
        Write-Progress -Activity $progressActivity -Completed -Status "VCS roots updated."
        return $updated
    }
}

Export-ModuleMember -Function Update-TeamCityVcsAccount
```

Save that as `TeamCity.psm1` and then you can do this:

```powershell
Import-Module .\TeamCity.psm1
$credential = Get-Credential
Update-TeamCityVcsAccount -TeamCityUrl "http://your-teamcity-dash/" -TeamCityCredential $credential -VcsUserName "serviceaccount" -VcsPassword "TheNewPassword"
```

When you run `Get-Credential` you'll be prompted for some credentials. Enter your TeamCity username and password. Fill in the appropriate values for the parameters and you'll see progress rolling by for the password updates. The return value is the list of VCS root URLs that got updated.

Now that I have a reasonably-working pattern for this, it should be easy enough to use the REST API on TeamCity to automate other common admin tasks we do. Neat!
