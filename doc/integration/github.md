# GitHub integration

<!-- TODO(sqs): add more -->

## GitHub configuration

Sourcegraph supports syncing repositories from GitHub.com and GitHub Enterprise (version 2.10 and newer).

To add repositories associated with a GitHub user:

1.  Go to the [site configuration editor](/docs/config).
2.  Press **Add GitHub.com repositories** or **Add GitHub Enterprise repositories**.
3.  Fill in the fields in the generated `github` configuration option.

By default, it adds all repositories that are affiliated with the user whose token you provide. To see other optional GitHub configuration settings, view [`github` site config documentation](/docs/config/site#code-classlanguage-textgithubconnection-object) or press Ctrl+Space in the site configuration editor.

If you don't want to use an access token from your personal GitHub user account, generate a token for a [machine user](https://developer.github.com/v3/guides/managing-deploy-keys/#machine-users) affiliated with the organizations whose repositories you wish to make available.

**GitHub.com rate limits**

You should always include a token in a configuration for a GitHub.com URL to avoid being denied service by GitHub's [unauthenticated rate limits](https://developer.github.com/v3/#rate-limiting). If you don't want to automatically synchronize repositories from the account associated with your personal access token, you can create a token without a [repo scope](https://developer.github.com/apps/building-oauth-apps/scopes-for-oauth-apps/#available-scopes) for the purposes of bypassing rate limit restrictions only.
