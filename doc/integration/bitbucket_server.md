# Bitbucket Server integration

<!-- TODO(sqs): add more -->

## Bitbucket Server configuration

Sourcegraph supports automatically syncing repositories from [Bitbucket Server](https://www.atlassian.com/software/bitbucket/server). To add repositories associated with a Bitbucket Server user:

1.  Go to the [site configuration editor](/docs/config).
2.  Press **Add Bitbucket Server projects**.
3.  Fill in the fields in the generated `bitbucketServer` configuration option.

Note: Bitbucket Server versions older than v5.5 will require specifying a less secure username+password combination, as those versions of Bitbucket Server do not support [personal access tokens](https://confluence.atlassian.com/bitbucketserver/personal-access-tokens-939515499.html).

#### Excluding personal repositories

Sourcegraph will be able to view and clone the repositories that the account you provide has access to. For example, if you provide a personal access token or username/password of an administrator Bitbucket Server account, Sourcegraph will be able to view and clone all repositories -- even personal ones.

We recommend that you create a new Bitbucket user account specifically for Sourcegraph (e.g. a "Sourcegraph Bot" account) and only give that account access to the repositories you wish to be viewable on Sourcegraph.

(Sourcegraph 2.12+, coming ~Oct 1. 2018) If you don't wish to create a separate Bitbucket user account just for Sourcegraph, you can specify the `"excludePersonalRepositories": true` option in the site config in the `bitbucketServer` object. With this enabled, Sourcegraph will exclude any personal repositories from being imported -- even if it has access to them.

#### How cloning works

Sourcegraph by default clones repositories from your Bitbucket Server via HTTP(s), using the access token or account credentials you provide in the configuration. SSH cloning is not used by default and as such you do not need to configure SSH cloning.

#### Known bugs

When using [Bitbucket Server integration](/docs/features/bitbucket-server-extension/) with older Bitbucket Server versions, you must select your own Sourcegraph instance as the `primary` URL [as shown in this image](../../integrations/images/BitbucketURL.png), or else the extension will incorrectly link you to Sourcegraph.com for your Bitbucket repositories. We are actively working to resolve this.
