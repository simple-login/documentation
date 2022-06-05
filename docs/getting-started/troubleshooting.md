

## Email sent to an alias is not delivered

In the event that SimpleLogin can't deliver an email to your mailbox, we'll:

- create a [notification](https://app.simplelogin.io/dashboard/notifications) and
- send you an email to inform you about the issue


You can then download the email that can't be delivered.

Please note that an email sent from a mailbox to its own alias isn't delivered: the email is just *dropped* by SimpleLogin. The reason is that this could form a *loop* and have a side effect on the reverse alias system.

![](troubleshooting/loop.png)

## Emails end up in Spam

In the event that SimpleLogin emails are put into the Spam folder, you can create email filters to explicitly allow emails from SimpleLogin.

SimpleLogin **never** sends spam and no one can spoof SimpleLogin emails thanks to SPF, DKIM, and DMARC protection. We take it a step further by creating an [anti-phishing program](anti-phishing.md) to detect potential phishing attempts.

However, some email providers might mistakenly put SimpleLogin emails into Spam or Junk folders, especially when you start receiving emails from SimpleLogin. To mark SimpleLogin as a safe sender, please create a *filter* for emails sent from *simplelogin.io* or *simplelogin.co* domains.

And please do not put SimpleLogin emails into Spam, as this is harmful to our email delivery reputation. Instead, if you start receiving spam sent to your alias, you can either:

- disable the alias or
- block the sender

More info on [stop spams](block-sender.md).

### Create a Gmail filter

This video shows how to create a rule marking all emails from `@simplelogin.co` or `@simplelogin.io` domains as safe in Gmail:

[![How to set up filter in Gmail](https://img.youtube.com/vi/se-QIH-AmJc/0.jpg)](https://www.youtube.com/watch?v=se-QIH-AmJc)

### Create a Outlook/Hotmail filter

This video shows how to add `simplelogin.co` and `simplelogin.io` as safe senders in Outlook/Hotmail. Please note that the change in Outlook/Hotmail is not immediate. In our test, it took up to 6 hours ⌛️ for the change to be effective.

[![How to set up filter in Hotmail](https://img.youtube.com/vi/Qk2TZA-ORx0/0.jpg)](https://www.youtube.com/watch?v=Qk2TZA-ORx0)

### Create a ProtonMail filter

The below video shows how to create a rule in ProtonMail to mark all emails that end with `@simplelogin.co` or `@simplelogin.io` as safe.

[![How to set up filter in ProtonMail](https://img.youtube.com/vi/Ek28fFv8R3M/0.jpg)](https://www.youtube.com/watch?v=Ek28fFv8R3M)