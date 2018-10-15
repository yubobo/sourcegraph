# Bitbucket Server integration

<!-- TODO(sqs): add more -->

## Bitbucket Server configuration

Sourcegraph supports automatically syncing repositories from [Bitbucket Server](https://www.atlassian.com/software/bitbucket/server). To add repositories associated with a Bitbucket Server user:

1.  Go to the [site configuration editor](/admin/site_config).
2.  Press **Add Bitbucket Server projects**.
3.  Fill in the fields in the generated `bitbucketServer` configuration option.

Note: Bitbucket Server versions older than v5.5 will require specifying a less secure username+password combination, as those versions of Bitbucket Server do not support [personal access tokens](https://confluence.atlassian.com/bitbucketserver/personal-access-tokens-939515499.html).

#### Excluding personal repositories

Sourcegraph will be able to view and clone the repositories that the account you provide has access to. For example, if you provide a personal access token or username/password of an administrator Bitbucket Server account, Sourcegraph will be able to view and clone all repositories -- even personal ones.

We recommend that you create a new Bitbucket user account specifically for Sourcegraph (e.g. a "Sourcegraph Bot" account) and only give that account access to the repositories you wish to be viewable on Sourcegraph.

(Sourcegraph 2.12+, coming ~Oct 1. 2018) If you don't wish to create a separate Bitbucket user account just for Sourcegraph, you can specify the `"excludePersonalRepositories": true` option in the site config in the `bitbucketServer` object. With this enabled, Sourcegraph will exclude any personal repositories from being imported -- even if it has access to them.

#### How cloning works

Sourcegraph by default clones repositories from your Bitbucket Server via HTTP(s), using the access token or account credentials you provide in the configuration. SSH cloning is not used by default and as such you do not need to configure SSH cloning.

---

## Browser extension

The Sourcegraph browser extension will add **go-to-definition**, **find-references**, **hover tooltips**, and **code search** to all Bitbucket Server files and Pull Requests.

1.  Install the Sourcegraph browser extension for [Chrome](https://chrome.google.com/webstore/detail/sourcegraph/dgjhfomjieaadpoljlnidmbgkdffpack) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/sourcegraph/).
2.  Add your Sourcegraph URL and Bitbucket Server URL to the options menu as shown below.

    <img src="./img/BitbucketURL.png" style="border: 1px solid red"/>

3.  [Update Sourcegraph site configuration](/admin/site_config) to allow scripts on your Bitbucket Server instance to communicate with your Sourcegraph instance:

    ```json
    {
      // ...
      "corsOrigin": "$BITBUCKET_URL"
      // ...
    }
    ```

You're done! You'll now get go-to-definition, find-references, hover tooltips, and code search on Bitbucket Server. Proceed to [install with G Suite](/integration/browser_extension#automatically-install-with-g-suite) when you're ready to roll it out to all users.
