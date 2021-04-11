# fullstory-rollbar

The FullStory-rollbar integration seamlessly integrates the FullStorys and rollbar platforms. When you look at a browser error in rollbar, you will see a link
to the FullStory session replay at that exact moment in time. When you are watching a FullStory replay and your user experiences an error, you will see a custom
error with the basic error details.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of content**

  - [Pre-Requisites](#pre-requisites)
  - [Installation](#installation)
  - [Setup](#setup)
    - [Code Changes](#code-changes)
    - [Options](#options)
- [Roadmap](#roadmap)
  - [How it works](#how-it-works)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Pre-Requisites

For the FullStory-rollbar integration to work, you must have the [FullStory browser SDK package](https://www.npmjs.com/package/@fullstory/browser) and the
[rollbar browser SDK package](https://www.npmjs.com/package/rollbar).

## Installation

To install the stable version:

with npm:

```
npm install --save @bharathvaj/fullstory-rollbar
```

with yarn:

```
yarn add @bharathvaj/fullstory-rollbar
```

## Setup

### Code Changes

To set up the integration, both FullStory and rollbar need to be initialized. Please add the following code:

```js
import Rollbar from 'rollbar';
import * as FullStory from '@fullstory/browser';
import RollbarFullStory from '@bharathvaj/fullstory-rollbar';

FullStory.init({ orgId: '__FULLSTORY_ORG_ID__' });

const rollbar = new rollbar({
  accessToken: '__YOUR_API_KEY__',
});

RollbarFullStory.init(rollbar, options);
```

Replace `__YOUR_API_KEY__` with the API found in Settings > Project Access Tokens.

You also need to replace `__FULLSTORY_ORG_ID__` with the value of `_fs_org` in the FullStory recording snippet on your
[FullStory settings page](https://help.fullstory.com/hc/en-us/articles/360020623514).

### Options

You can also customize the error event name in FullStory by

```js
// ...
RollbarFullStory.init(rollbar, {
  fsEventName: 'Custom Error Name',
});

//...
```

# Roadmap

[ ] - Support rollbar Error link in FullStory Custom Event.

[ ] - Add Unit test cases

## How it works

In Rollbar, you should see additional tab called `FULLSTORY` for the error event which will have `urlAtTime`.

![rollbar](https://i.imgur.com/agEgd5a.png)

In FullStory, you should see an event called `rollbar Error` on the right sidebar.

![FullStory](https://i.imgur.com/a26RBtf.png)
