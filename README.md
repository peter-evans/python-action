# Python Action
[![Actions Status](https://github.com/peter-evans/python-action/workflows/Python%20Action/badge.svg)](https://github.com/peter-evans/python-action/actions)

A template to bootstrap the creation of a multi-platform Python GitHub action.

## Why is this Javascript?

This is actually a hybrid action that executes Python with a Javascript action wrapper.
The reason for this is that only [Javascript and Docker container actions are currently supported](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/about-actions#types-of-actions).

## Why not use a container action for Python?

- Currently container actions are not multi-platform. You can only run them on `linux` virtual machines.
- Container actions using `image: 'Dockerfile'` are slow because they need to build the image from scratch every time the workflow runs.
- Container actions using `image: 'docker://my-namespace/my-image:1.0.0'` cannot be forked easily because the reference to the public Docker image remains. Being able to fork GitHub actions is important for security conscious users.

## Actions using this template

- [Create Issue From File](https://github.com/peter-evans/create-issue-from-file)

## Usage

### Develop action

- Modify [`action.yml`](action.yml) to describe the action
- Modify [`index.js`](index.js) to pass action inputs to the Python script
- Set the version of Python required in [`index.js`](index.js)
    ```javascript
        // Setup Python from the tool cache
        setupPython("3.8.x", "x64");
    ```
    **Note**: The GitHub Actions tool cache only seems to keep the latest builds of `major.minor.build` tool versions. So it's best to follow the minor version rather than an explicit build. For example, use `3.8.x` instead of `3.8.1`.

- Add Python dependencies to [`requirements.txt`](src/requirements.txt)

### Install javascript dependencies

```
npm install
```

### Package for distribution

This will use [ncc](https://github.com/zeit/ncc) to compile the Node.js code and dependencies into a single file.
Python dependencies are vendored to the `dist/vendor` directory.

```
npm run package
```

**Note**: Packaging the action is necessary even when making changes to the Python source code in `src`. Changes made will be packaged into `dist`.

### Release

1. Commit the `dist` directory changes to `master`
2. Tag the commit or make a GitHub release

## License

[MIT](LICENSE)
