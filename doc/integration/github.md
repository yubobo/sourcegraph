# GitHub integration

<!-- TODO(sqs): add more -->

## GitHub configuration

Sourcegraph supports syncing repositories from GitHub.com and GitHub Enterprise (version 2.10 and newer).

To add repositories associated with a GitHub user:

1.  Go to the [site configuration editor](/admin/site_config).
2.  Press **Add GitHub.com repositories** or **Add GitHub Enterprise repositories**.
3.  Fill in the fields in the generated `github` configuration option.

By default, it adds all repositories that are affiliated with the user whose token you provide. To see other optional GitHub configuration settings, view [`github` site config documentation](/admin/site_config#code-classlanguage-textgithubconnection-object) or press Ctrl+Space in the site configuration editor.

If you don't want to use an access token from your personal GitHub user account, generate a token for a [machine user](https://developer.github.com/v3/guides/managing-deploy-keys/#machine-users) affiliated with the organizations whose repositories you wish to make available.

**GitHub.com rate limits**

You should always include a token in a configuration for a GitHub.com URL to avoid being denied service by GitHub's [unauthenticated rate limits](https://developer.github.com/v3/#rate-limiting). If you don't want to automatically synchronize repositories from the account associated with your personal access token, you can create a token without a [repo scope](https://developer.github.com/apps/building-oauth-apps/scopes-for-oauth-apps/#available-scopes) for the purposes of bypassing rate limit restrictions only.

---

The Sourcegraph browser extension adds **go-to-definition**, **find-references**, **hover tooltips**, and **code search** to all GitHub files and Pull Requests.

By default, the extension will add code intelligence and code search to public repositories. The extension can be configured to work on private code by connecting it to a Sourcegraph instance that has [code intelligence](/extensions/language_servers).

1.  Install the Sourcegraph browser extension for [Chrome](https://chrome.google.com/webstore/detail/sourcegraph/dgjhfomjieaadpoljlnidmbgkdffpack) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/sourcegraph/)
2.  Click the extension icon to connect the browser extension to your Sourcegraph instance. Then, fill in the Sourcegraph URL field with your Sourcegraph URL and hit save.

<img src="./images/SourcegraphURL.png" style="border: 1px solid red"/>

3.  [Update Sourcegraph site configuration](/admin/site_config) to allow the extension to communicate with your Sourcegraph instance:

    ```json
    {
      // ...
      "corsOrigin": "https://github.com"
      // ...
    }
    ```

You're done! You'll now get **code intelligence** and **code search** on GitHub for all private repositories that you've added to Sourcegraph.
