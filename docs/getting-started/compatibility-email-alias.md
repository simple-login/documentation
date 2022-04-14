Email aliases (or email forwarding) can be provided by multiple services which are often incompatible. Some forwarding/alias email service also don't preserve email authentication such as SPF, DKIM, DMARC and their emails can be put into quarantine/spam or simply rejected.

Therefore, we recommend to **not** use another email alias/forwarding service together with SimpleLogin. A SimpleLogin mailbox needs to be a *final* email address, i.e. where emails are effectively stored. A SimpleLogin alias should be used as a *normal* email address, i.e. to receive emails and shouldn't be used for other purposes.

More concretely, we recommend:

##	Not using a forwarding email address as SimpleLogin mailbox. 

![](anti-phishing/mailbox-is-alias.png)

This includes 

- using as SimpleLogin mailbox an address that automatically forwards emails to another address

- using another service alias (Apple Hide My Email, DuckDuckGo email, Firefox Relay, etc.) as mailbox in SimpleLogin. 

Besides adding more forwarding steps in the email chain, you won't also be able to reply to forwarded email or send emails from alias. 


## Not auto forwarding your old mailbox to a SimpleLogin alias. 

![](anti-phishing/old-mailbox.png)

This setup is sometimes used when you want to automatically forward emails received by an old mailbox to a new mailbox via a SimpleLogin alias.

As some mailbox services rewrite the email headers when forwarding the email which interfere with SimpleLogin system, you won't be able to reply to a forwarded email or send emails from alias. 

We suggest in this case to either 

- just forward the emails to the new mailbox 
- or if you don’t want the old mailbox to “know” about the new one, create an additional mailbox just for the purpose of forwarding the email.


