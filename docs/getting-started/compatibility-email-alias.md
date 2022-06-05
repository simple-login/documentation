Email aliases (or email forwarding) can be provided by multiple services, which are often incompatible. Some forwarding/alias email services also don't preserve email authentication such as SPF, DKIM, or DMARC, and their emails can be put into quarantine/spam or simply rejected.

Therefore, we recommend **not** using another email alias/forwarding service together with SimpleLogin. A SimpleLogin mailbox needs to be a *final* email address, i.e., where emails are effectively stored. A SimpleLogin alias should be used as a *normal* email address, i.e. to receive emails, and shouldn't be used for other purposes.

More concretely, we recommend:

##	Not using a forwarding email address as a SimpleLogin mailbox. 

![](anti-phishing/mailbox-is-alias.png)

This includes 

- using a SimpleLogin mailbox as an address that automatically forwards emails to another address.

- using another service alias (Apple Hide My Email, DuckDuckGo email, Firefox Relay, etc.) as a mailbox in SimpleLogin. 

Besides adding more forwarding steps in the email chain, you won't also be able to reply to forwarded emails or send emails from an alias.


## Not auto-forwarding your old mailbox to a SimpleLogin alias. 

![](anti-phishing/old-mailbox.png)

This setup is sometimes used when you want to automatically forward emails received by an old mailbox to a new mailbox via a SimpleLogin alias.

As some mailbox services rewrite the email headers when forwarding the email, which interferes with the SimpleLogin system, you won't be able to reply to a forwarded email or send emails from an alias.

We suggest in this case that you either 

- forward the emails to the new mailbox or
- create an additional mailbox just for the purpose of forwarding the email if you don’t want the old mailbox to “know” about the new one.


