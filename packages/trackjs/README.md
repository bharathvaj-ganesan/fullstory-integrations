# fullstory-trackjs

The FullStory-trackjs integration seamlessly integrates the FullStorys and trackjs platforms. When you look at a browser error in trackjs, you will see a link
to the FullStory session replay at that exact moment in time under meta data section. When you are watching a FullStory replay and your user experiences an
error, you will see a custom error with the basic error details and link to trackjs meta data.

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

For the FullStory-trackjs integration to work, you must have the [FullStory browser SDK package](https://www.npmjs.com/package/@fullstory/browser) and the
[TrackJS browser SDK package](https://www.npmjs.com/package/trackjs).

## Installation

To install the stable version:

with npm:

```
npm install --save @bharathvaj/fullstory-trackjs
```

with yarn:

```
yarn add @bharathvaj/fullstory-trackjs
```

## Setup

### Code Changes

To set up the integration, both FullStory and trackjs need to be initialized. Please add the following code:

```js
import { TrackJS } from 'trackjs';
import * as FullStory from '@fullstory/browser';
import TrackJSFullStory from '@bharathvaj/fullstory-trackjs';

FullStory.init({ orgId: '__FULLSTORY_ORG_ID__' });

TrackJS.install({
  token: '__YOUR_API_KEY__',
});

TrackJSFullStory.init(TrackJS, options);
```

Replace `__YOUR_API_KEY__` with the API found in Settings > Project Access Tokens.

You also need to replace `__FULLSTORY_ORG_ID__` with the value of `_fs_org` in the FullStory recording snippet on your
[FullStory settings page](https://help.fullstory.com/hc/en-us/articles/360020623514).

### Options (Optional)

You can also customize the error event name in FullStory by

```js
// ...
TrackJSFullStory.init(TrackJS, {
  fsEventName: 'Custom Error Name',
});

//...
```

# Caveats

Please note that this integration makes use of `onError` hook provided by the TrackJS library. So using this library will override if you have configured
`onError` while installing the TrackJS library.s

# Roadmap

[ ] - Support trackjs Error link in FullStory Custom Event.

[ ] - Add Unit test cases

## How it works

In Trackjs, you should see additional tab called `FULLSTORY` for the error event which will have `urlAtTime`.

![trackjs](https://i.imgur.com/m0Nu4Yg.png)

In FullStory, you should see an event called `trackjs Error` on the right sidebar.

![FullStory]()
