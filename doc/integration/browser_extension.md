# Browser extension

The [open-source](https://github.com/sourcegraph/browser-extensions) Sourcegraph
browser extension adds code intelligence to files and diffs on GitHub, GitHub
Enterprise, GitLab, Phabricator, and Bitbucket Server.

1.  Install the browser extension to automatically get code intelligence on public repositories:

    <div id="integrations-btns" class="btn-group">

    <a target="_blank" href="https://chrome.google.com/webstore/detail/sourcegraph/dgjhfomjieaadpoljlnidmbgkdffpack">
    <button class="btn btn-outline-primary align-items-center">
        <img src="/integrations/chrome.svg"/>Chrome
    </button>
    </a>
    <span>&nbsp;</span>
    <a target="_blank" href="https://addons.mozilla.org/en-US/firefox/addon/sourcegraph/">
    <button class="btn btn-outline-primary align-items-center">
        <img src="/integrations/firefox.svg"/>Firefox
    </button>
    </a>

    </div>

2.  To get code intelligence on private repositories:

    1.  [Set up a Sourcegraph instance](/admin/install).

    2.  Configure the extension (see below) to connect to your Sourcegraph instance and code hosts. <!-- TODO!(sqs): clean this up -->

<img src="../server/code-intelligence/images/GitHubCodeReview.gif" style="margin-left:0;margin-right:0;"/>

## Features

### Code intelligence

When you hover your mouse over code in files, diffs, pull requests, etc., the Sourcegraph extension displays a tooltip with:

- documentation
- type signatures
- "Go to definition" button
- "Find references" button

### Code search

The Sourcegraph extension makes it easy to search on your primary Sourcegraph instance. After you've installed it (see above), use the search shortcut it provides to perform a search:

1.  In the Chrome or Firefox address bar, type <kbd>src</kbd>.
2.  Press <kbd>Tab</kbd> (Chrome) or <kbd>Space</kbd> (Firefox).
3.  Start typing your search query. Select an instant search suggestion or press <kbd>Enter</kbd> or <kbd>Return</kbd> to see all results.

## Configuration for private code

Requirements:

- You must have a [Sourcegraph instance installed](/admin/install) with [access to your private repositories](/admin/repo/add).

Browser extension configuration:

1.  Click the Sourcegraph extension icon to open the settings panel. Then, fill in the Sourcegraph Server URL field with your Sourcegraph URL and hit **+ Add**, and fill in the Code Host URL field with your private code host's URL and hit **+ Add**.

<img src="./images/SourcegraphExtensionConfiguration.png" style="border: 1px solid red"/>

2.  [Update your Sourcegraph instance's site configuration](/admin/site_config) to allow the extension to communicate with it:

    ```json
    {
      // ...
      "corsOrigin": "https://github.example.com https://gitlab.example.com https://bitbucket.example.org https://phabricator.example.com"
      // ...
    }
    ```

<br />

You're done! You'll now get **code intelligence** in your code hosts for all private repositories that you've added to Sourcegraph.

<br />

### Additional Configuration

There are two ways to view and update the Sourcegraph browser extension's configuration.

#### 1. Extension Icon

Click the Sourcegraph extension icon in your browser's toolbar to open the extension's settings panel.

#### 2. Browser address bar

1.  In the Chrome or Firefox address bar, type <kbd>src</kbd>.
2.  Press <kbd>Tab</kbd> (Chrome) or <kbd>Space</kbd> (Firefox).
3.  Type <kbd>:</kbd> as the first letter of your search query and follow the prompts in the search suggestions.

<img src="./images/AddressBarConfiguration.png" style="border: 1px solid red"/>
