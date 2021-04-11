# fullstory-raygun

The FullStory-raygun integration seamlessly integrates the FullStorys and raygun platforms. When you look at a browser error in raygun, you will see a link to
the FullStory session replay at that exact moment in time under meta data section. When you are watching a FullStory replay and your user experiences an error,
you will see a custom error with the basic error details and link to raygun meta data.

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

For the FullStory-raygun integration to work, you must have the [FullStory browser SDK package](https://www.npmjs.com/package/@fullstory/browser) and the
[Raygun browser SDK package](https://www.npmjs.com/package/raygun4js).

## Installation

To install the stable version:

with npm:

```
npm install --save @bharathvaj/fullstory-raygun
```

with yarn:

```
yarn add @bharathvaj/fullstory-raygun
```

## Setup

### Code Changes

To set up the integration, both FullStory and raygun need to be initialized. Please add the following code:

```js
import rg4js from 'raygun4js';
import * as FullStory from '@fullstory/browser';
import RaygunFullStory from '@bharathvaj/fullstory-raygun';

FullStory.init({ orgId: '__FULLSTORY_ORG_ID__' });

rg4js('enableCrashReporting', true);
rg4js('apiKey', '__YOUR_API_KEY__');

RaygunFullStory.init(rg4js);
```

Replace `__YOUR_API_KEY__` with the API found in Settings > Project Access Tokens.

You also need to replace `__FULLSTORY_ORG_ID__` with the value of `_fs_org` in the FullStory recording snippet on your
[FullStory settings page](https://help.fullstory.com/hc/en-us/articles/360020623514).

### Options (Optional)

You can also customize the error event name in FullStory by

```js
// ...
RaygunFullStory.init(rg4js, {
  fsEventName: 'Custom Error Name',
});

//...
```

# Roadmap

[ ] - Support Raygun Error link in FullStory Custom Event.

[ ] - Add Unit test cases

## How it works

In Raygun, you should see additional tab called `FULLSTORY` for the error event which will have `urlAtTime`.

![Raygun](https://i.imgur.com/XnEyRPv.png)

In FullStory, you should see an event called `Raygun Error` on the right sidebar.

![FullStory](https://i.imgur.com/a26RBtf.png)
