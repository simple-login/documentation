## SimpleLogin new anti-phishing feature

Most emails on the internet are spam and phishing attempts. To not forward unwanted and illegitimate emails, SimpleLogin automatically checks the sender authenticity before forwarding the email to your mailbox.

The authentication check is currently based on [DMARC](https://en.wikipedia.org/wiki/DMARC), which is then based on [SPF](https://en.wikipedia.org/wiki/Sender_Policy_Framework) and [DKIM](https://en.wikipedia.org/wiki/DomainKeys_Identified_Mail), the two most popular email authentication methods out there.

When the authenticity check fails, depending on the policy set by the sender, an email can either:

- Be put into **quarantine**. This happens when the sender explicitly states in their DMARC policy that the emails which violate the policy should be quarantined or rejected. In this case, SimpleLogin will inform you through an email notification and will then allow you to download the quarantined email. Unfortunately, the only solution in this case is for the sender to fix their DMARC policy as their emails are most likely being refused or put into a spam folder somewhere else as well.

- Have a **warning added**. This happens when the check fails, but when the sender hasn’t set any specific action in their policy yet. The email can be spam or a phishing attempt, and it’s important for SimpleLogin to inform you about the potential risks. Unfortunately, false positives do happen, especially when the sender incorrectly sets up their policy. It would be beneficial to inform the sender in this case, so they can fix the issue as soon as possible.

![](anti-phishing/section.png)

## Email forwarding and DMARC policy

Email authentication checks fail when an email is forwarded in a “classic” way (e.g. automatic forwarding from one mailbox to another). So when an email is forwarded, its sender isn't the original sender, and the IP address that sends the email is now the forwarder's IP address.

SimpleLogin uses our own forwarding techniques to respect email authentication checks. SimpleLogin forwarding isn't compatible with the old forwarding method, and mixing them will cause unwanted issues. 

We therefore recommend:

-	Not using a forwarding email address as a SimpleLogin mailbox. This includes using other aliasing services as a mailbox in SimpleLogin. This will add additional forwarding steps in the email chain. As different email alias services aren't compatible, you won't also be able to reply to forwarded emails nor send emails from the alias. 

![](anti-phishing/mailbox-is-alias.png)

-	Not auto-forwarding your old mailbox to a SimpleLogin alias. Some mailbox services rewrite the email headers when forwarding the email, which interferes with the SimpleLogin's alias system. This setup is often used when you want to automatically forward emails received by an old mailbox to a new mailbox. We suggest just forwarding the emails to the new mailbox in this case, or if you don’t want the old mailbox to know about the new one, create an additional mailbox just for this purpose then.

![](anti-phishing/old-mailbox.png)
