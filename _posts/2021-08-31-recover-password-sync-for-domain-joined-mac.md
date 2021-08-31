---
layout: post
title: "Recover Password Sync for a Domain Joined Mac"
date: 2021-08-31 -0800
comments: true
tags: [mac,network]
description: "Tips for trying to get your domain-joined Mac to get account passwords back in sync."
---

I have a Mac and my user account is attached to a Windows domain. The benefit of this is actually pretty minimal in that I can change my domain password and it propagates to the local Mac user account, but that's about it. It seems to cause more trouble than it's worth.

I recently had an issue where something got out of sync and I couldn't log into my Mac using my domain account. This is sort of a bunch of tips and things I did to recover that.

First, **have a separate local admin account.** Make it a super complex password and never use it for anything else. This is sort of your escape hatch to try to recover your regular user account. Even if you want to have a local admin account so your regular user account can stay a user and no admin... have a dedicated "escape hatch" admin account that's separate from the "I use this sometimes for `sudo` purposes" admin account. I have this, and if I hadn't, that'd have been the end of it.

It's good to remember for a domain-joined account there are **three security tokens** that all need to be kept in sync: Your domain user password, your local machine OS password, and your disk encryption token. When you reboot the computer, the first password you'll be asked for should unlock the disk encryption. _Usually_ the token for disk encryption is tied nicely to the machine account password so you enter the one password and it both unlocks the disk and logs you in. The problem I was running into was those got out of sync. For a domain-joined account, the domain password usually is also tied to these things.

Next, **keep your disk encryption recovery code handy.** Store it in a password manager or something. If things get out of sync, you can use the recovery code to unlock the disk and then your OS password to log in.

For me, I was able to log in as my separate local admin account but my machine password wasn't working unless I was connected to the domain. Only way to connect to the domain was over a VPN. That meant [I needed to **enable fast user switching**](https://support.apple.com/guide/mac-help/switch-quickly-between-users-mchlp2439/mac) so I could connect to the VPN under the separate local admin and then switch - without logging out - to my domain account.

Once I got to my own account I could **use the Users & groups app to change my domain password** and have the domain and machine accounts re-synchronized. **ALWAYS ALWAYS ALWAYS USE USERS & GROUPS TO CHANGE YOUR DOMAIN ACCOUNT PASSWORD.** I have not found a way otherwise to ensure everything is in sync. Don't change it from some other workstation, don't change it from Azure Active Directory. This is the road to ruin. Stay with Users & Groups.

The last step was that **my disk encryption token wasn't in sync** - OS and domain connection was good, but I couldn't log in after a reboot. I found the answer [in a Reddit thread](https://www.reddit.com/r/macsysadmin/comments/ahhpdd/password_mismatch/):

```sh
su local_admin
sysadminctl -secureTokenStatus domain_account_username
sysadminctl -secureTokenOff domain_account_username \
  -password domain_account_password \
  interactive
sysadminctl -secureTokenOn domain_account_username \
  -password domain_account_password \
  interactive
```

Basically, as the standalone local admin, turn off and back on again the connection to the drive encryption. This refreshes the token and gets it back in sync.

Reboot, and you should be able to log in with your domain account again.

To test it out, you may want to try changing your password from Users & Groups to see that the sync works. If you get a "password complexity" error, it could be the sign of an issue... or it could be the sign that your domain has a "you can't change the password more than once every X days" sort of policy and since you changed it earlier you are changing it again too soon. YMMV.

And, again, **always change your password from Users & Groups.**
