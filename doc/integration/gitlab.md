# GitLab integration

<!-- TODO(sqs): add more -->

## GitLab configuration

Sourcegraph supports syncing repositories from GitLab.com, GitLab CE (v10.0+), and GitLab EE (v10.0+). To add repositories associated with a GitLab user:

1.  Go to the [site configuration editor](/docs/config).
2.  Press **Add GitLab projects**.
3.  Fill in the fields in the generated `gitlab` configuration option.

By default, it adds every GitLab project where the token's user is a member. To see other optional GitLab configuration settings, view [all settings](/docs/config/site) or press Ctrl+Space or Cmd+Space in the site configuration editor.
