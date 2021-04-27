import * as FullStory from '@fullstory/browser';
import { getOriginalExceptionProperties } from './utils';

/**
 * This integration creates a link from the Bugsnag Error to the FullStory replay.
 * It also creates a link from the FullStory event to the Bugsnag error.
 */

type Options = {
  fsEventName: string;
};

class AirbrakeFullStory {
  static init(client, options?: Options) {
    let fsEventName = options?.fsEventName || 'Airbrake Error';

    const originalNotify = client.notify;

    client.notify = (...args) => {

      // Add fullstory link to Airbrake
      client.addFilter((notice) => {
        notice.context.fullStoryLink = FullStory.getCurrentSessionURL(true) || 'current session URL API not ready';
        return notice;
      });

      return originalNotify.call(client, ...args).then(result => {
        if (result) {
          // Sending to FullStory
          FullStory.event(fsEventName, {
            airbrakeUrl: result.url || 'Could not retrieve url',
            ...getOriginalExceptionProperties(result.errors[0])
          });
        }

        return result;
      })
    }
  }

}

export default AirbrakeFullStory;