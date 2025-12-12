# Restore an alias

When an alias is deleted, it is often moved to a trash folder rather than being immediately permanently destroyed, depending on your settings.

There are two different methods for restoring an alias, depending on whether it was created with a generic SimpleLogin domain or your own custom domain/subdomain.

## Restoring standard aliases

For aliases created with SimpleLogin domains (e.g., `@aleeas.com`, `@simplelogin.com`), deleted aliases are sent to the global alias trash.

To restore these:

1.  Go to **Settings** on the SimpleLogin dashboard.
1.  Scroll down to the **Alias delete action** section.
1.  Click **See alias trash**.
1.  From here, you can choose to **Restore** specific aliases or **Restore all alias from trash**.

## Recreating custom domain & subdomain aliases

If the alias belongs to your **custom domain** or a **SimpleLogin subdomain** (e.g., `@myname.simplelogin.com`), it is moved to a specific _Domain Trash_.

> **Important:** For custom domains, you are technically **recreating** the alias. While you can get the email address back, historic records (such as contacts and specific settings associated with that alias) are deleted when the alias is initially deleted.

To recover these aliases, you must first remove them from the trash to free up the name, and then create them again.

1.  Navigate to the **Domains** or **Subdomains** page.
1.  Click on **Details** next to the specific domain or subdomain where the alias belonged.
1.  On the sidebar, click **Deleted Alias**.

### How to safely recreate the alias

We recommend against clicking **Empty Trash** immediately, as this will delete the list of aliases you need to recreate. Instead, follow this process:

1.  Keep the **Deleted Alias** page open to view your list of blocked addresses.
1.  Copy the address of the alias you wish to restore.
1.  Click **Remove from trash** next to that alias. This frees up the address.
1.  Navigate to **New Custom Alias** (or the custom alias page).
1.  Paste the address you just copied and click **Create**.

> **Note:** SimpleLogin applies rate limits to alias creation to prevent abuse. If you are restoring many aliases at once, you may need to wait a few minutes between batches if you encounter errors.

## Troubleshooting

### Rate Limits (Error 429)

When recreating multiple aliases manually, you may encounter a _429_ rate limit error. This is a security measure to prevent spam and abuse of the system.

If you see this error:

1. Pause creation, and stop adding aliases immediately.
1. Wait a few minutes for the rate limit window to clear.
1. Continue the process of removing from trash and recreating one-by-one.

### "You have deleted this alias before" Error

If you try to create an alias and receive an error stating "_You have deleted this alias before_", the alias is likely still sitting in the specific domain trash. Navigate to the specific [Deleted Alias](#recreating-custom-domain-subdomain-aliases) page for that domain or subdomain and remove the alias from the list before you can reuse the name.
