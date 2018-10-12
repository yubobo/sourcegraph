# Add repositories (from code hosts) to Sourcegraph

<!-- TODO(sqs): add more -->

- [Add repositories from GitHub or GitHub Enterprise](../../integration/github)
- [Add repositories from GitLab](../../integration/gitlab)
- [Add repositories from Bitbucket Server](../../integration/bitbucket_server)
- [Add repositories from AWS CodeCommit](../../integration/aws_code_commit)
- [Add repositories from any Git host](./add_from_git_repository)
- [Add repositories from the local disk](./add_from_local_disk)

## Troubleshooting

If your repositories are not showing up:

- On Sourcegraph, check the logs from the Docker container for error messages related to communication with your code host's API.
- On Sourcegraph Data Center, check the logs from the `repo-updater` pod.
- Check the site admin **Repositories** page on Sourcegraph (and ensure you're logged in as an admin).

If your repositories are showing up but are not cloning or updating from the original Git repository:

- Go to the repository's **Mirroring** settings page and inspect the **Check connection** logs.

---

## Example configuration

Here is an example configuration of a Sourcegraph that is integrated with both GitHub Enterprise and GitHub.com, and has repositories added from gitolite:

```json
# Replace 🔒 with a personal access token generated at https://GITHUB_URL/settings/tokens

{
    // ...
    "github": [
        {
            "url": "GITHUB_ENTERPRISE_URL",
            "token": "🔒"
        },
        {
            "url": "https://github.com",
            "token": "🔒",
            "repos": ["facebook/react","golang/go"],
        }
    ],
    "gitlab": [
        {
            "url": "GITLAB_URL",
            "token": "🔒"
        },
    ],
    "repos.list": [
        {
            "url": "https://gitolite.example.com/my/repo.git",
            "path": "gitolite/my/repo"
        }
    ]
    // ...
}
```
