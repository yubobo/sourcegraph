# Sourcegraph Phabricator integration

Sourcegraph's Phabricator integration adds Sourcegraph code intelligence and search to Phabricator diffs and code files, so you get go-to-definition, find-references, hover tooltips, and code search embedded natively into Phabricator.

There are two ways to install it:

- For a single user, using a browser extension (recommended for initial testing)
- For all users of the Phabricator instance (recommended for production usage)

## Single-user installation (using a browser extension)

You can use a browser extension to try the Phabricator integration for yourself.

1.  Install the Sourcegraph browser extension for [Chrome](https://chrome.google.com/webstore/detail/sourcegraph/dgjhfomjieaadpoljlnidmbgkdffpack) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/sourcegraph/).
2.  Add your Sourcegraph URL and Phabricator URL to the options menu as shown below.

    <img src="./images/PhabricatorURL.png" style="border: 1px solid red"/>

3.  [Update Sourcegraph site configuration](/admin/site_config) to allow scripts on your Phabricator instance to communicate with your Sourcegraph instance:

    ```json
    {
      // ...
      "corsOrigin": "$PHABRICATOR_URL"
      // ...
    }
    ```

You're done! You'll now get go-to-definition, find-references, hover tooltips, and code search on Phabricator. Proceed to the production installation when you're ready to roll it out to all users.

## Production installation (for all users of the Phabricator instance)

For production usage, we strongly recommend installing the Sourcegraph integration for all users (so that each user doesn't need to install the browser extension individually). This involves adding the Phabricator integration to the extension directory of your Phabricator instance.

See the [phabricator-extension](https://github.com/sourcegraph/phabricator-extension) repository for installation instructions and configuration settings.

# Integrate with Phabricator TODO(sqs)

If you mirror your source repositories on Phabricator, Sourcegraph can provide users with links to various Phabricator pages.

The `phabricator` configuration option takes in an array of Phabricator configurations. A Phabricator configuration consists of the following fields:

- `url` field that maps to the url of the Phabricator host
- `token` an optional Conduit API token, which you may generate from the Phabricator web interface. The token is used to fetch the list of repos available on the Phabricator installation
- `repos` if your Phabricator installation mirrors repositories from a different origin than Sourcegraph, you must specify a list of repository `path`s (as displayed on Sourcegraph) and their corresponding Phabricator `callsign`s. For example: `[{ path: 'gitolite.example.org/foobar', callsign: 'FOO'}]`. _Note that the `callsign` is case sensitive._

At least one of token and repos should be provided.

For example:

```json
{
  // ...
  "phabricator": [
    {
      "url": "https://phabricator.example.com",
      "token": "api-abcdefghijklmnop",
      "repos": [{ "path": "gitolite.example.com/mux", "callsign": "MUX" }]
    }
  ]
  // ...
}
```

### Troubleshooting

If your outbound links to Phabricator are not present or not working, verify your Sourcegraph repository path matches the "normalized" URI output by Phabricator's `diffusion.repository.search` conduit API.

For example, if you have a repository on Sourcegraph whose URL is `https://sourcegraph.example.com/path/to/repo` then you should see a URI returned from `diffusion.repository.search` whose `normalized` field is `path/to/repo`. Check this by navigating to `$PHABRICATOR_URL/conduit/method/diffusion.repository.search/` and use the "Call Method" form with `attachments` field set to `{ "uris": true }` and `constraints` field set to `{ "callsigns": ["$CALLSIGN_FOR_REPO_ON_SOURCEGRAPH"]}`. In the generated output, verify that the first URI has a normalized path equal to `path/to/repo`.
