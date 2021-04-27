# fullstory-airbrake

The FullStory-Airbrake integration seamlessly integrates the FullStorys and Airbrake platforms. When you look at a browser error in Airbrake, you will see a
link to the FullStory session replay at that exact moment in time. When you are watching a FullStory replay and your user experiences an error, you will see a
custom error with the basic error details.

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

For the FullStory-Airbrake integration to work, you must have the [FullStory browser SDK package](https://www.npmjs.com/package/@fullstory/browser) and the
[Airbrake browser SDK package](https://github.com/airbrake/airbrake-js/tree/master/packages/browser).

## Installation

To install the stable version:

with npm:

```
npm install --save @bharathvaj/fullstory-airbrake
```

with yarn:

```
yarn add @bharathvaj/fullstory-airbrake
```

## Setup

### Code Changes

To set up the integration, both FullStory and Airbrake need to be initialized. Please add the following code:

```js
import { Notifier } from '@airbrake/browser';
import * as FullStory from '@fullstory/browser';
import AirbrakeFullStory from '@bharathvaj/fullstory-airbrake';

FullStory.init({ orgId: '__FULLSTORY_ORG_ID__' });

const airbrakeNotifier = new Notifier({
  projectId: __YOUR_PROJECT_ID__,
  projectKey: __YOUR_API_KEY__,
  environment: 'production',
});

AirbrakeFullStory.init(airbrakeNotifier, options);
```

Replace `__YOUR_API_KEY__` and `__YOUR_PROJECT_ID__` with your site credentials.

You also need to replace `__FULLSTORY_ORG_ID__` with the value of `_fs_org` in the FullStory recording snippet on your
[FullStory settings page](https://help.fullstory.com/hc/en-us/articles/360020623514).

### Options

You can also customize the error event name in FullStory by

```js
// ...
// ...
AirbrakeFullStory.init(airbrakeNotifier, {
  fsEventName: 'Custom Error Name',
});

//...
```

# Roadmap

[ ] - Add Unit test cases

## How it works

In Airbrake, you should see the `fullstoryUrl` in the context tab under occurences of an Error.

![Airbrake](https://i.imgur.com/bwMMLFA.png)

In FullStory, you should see an event called `Airbrake Error` on the right sidebar along with the Airbrake'e error URL.

![FullStory](https://i.imgur.com/emqBOm3.png)
