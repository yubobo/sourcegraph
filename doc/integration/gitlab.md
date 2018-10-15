# GitLab integration

<!-- TODO(sqs): add more -->

## GitLab configuration

Sourcegraph supports syncing repositories from GitLab.com, GitLab CE (v10.0+), and GitLab EE (v10.0+). To add repositories associated with a GitLab user:

1.  Go to the [site configuration editor](/admin/site_config).
2.  Press **Add GitLab projects**.
3.  Fill in the fields in the generated `gitlab` configuration option.

By default, it adds every GitLab project where the token's user is a member. To see other optional GitLab configuration settings, view [all settings](/admin/site_config) or press Ctrl+Space or Cmd+Space in the site configuration editor.

---

## Browser extension

The Sourcegraph browser extension adds **go-to-definition**,
**find-references**, **hover tooltips**, and **code search** to all GitLab files
and Merge Requests.
![Sourcegraph for
GitLab](https://cl.ly/7916fe1453a4/download/sourcegraph-for-gitLab.gif)
By default, the extension will add code intelligence and code search to public repositories. The extension can be configured to work on private code by connecting it to a Sourcegraph instance that has [code intelligence](/extensions/language_servers).

1. Install the Sourcegraph browser extension for [Chrome](https://chrome.google.com/webstore/detail/sourcegraph/dgjhfomjieaadpoljlnidmbgkdffpack) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/sourcegraph/)
1. Click the extension icon to connect the browser extension to your Sourcegraph
   instance. Then, fill in the Sourcegraph URL field with your Sourcegraph URL
   and hit save.
1. Visit your GitLab instance and right click the extension icon and select
   "Enable Sourcegraph on this domain".
1. [Update Sourcegraph site configuration](/admin/site_config) to allow the extension to communicate with your Sourcegraph instance:

   ```json
   {
     // ...
     "corsOrigin": "https://gitlab.com"
     // ...
   }
   ```

1. If you haven't already, follow the instructions above to configure GitLab integration on your Sourcegraph instance. <!-- TODO!(sqs): clean this up -->

You're done! You'll now get **code intelligence** and **code search** on GitLab for all private repositories that you've added to Sourcegraph.
