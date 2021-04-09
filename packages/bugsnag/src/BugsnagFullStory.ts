import Bugsnag from '@bugsnag/browser';
import * as FullStory from '@fullstory/browser';
import { getOriginalExceptionProperties } from './utils';

/**
 * This integration creates a link from the Bugsnag Error to the FullStory replay.
 * It also creates a link from the FullStory event to the Bugsnag error.
 */

type Options = {};

class BugsnagFullStory {
  constructor() { }
  setupOnce() {

    /**
     * Returns Bugsnag's Error event URL
     * @returns string 
     */
    const getBugsnagUrl = () => `Could not retrieve url`;

    const cb = (event) => {
      event.addMetadata('FullStory', {
        urlAtTime: FullStory.getCurrentSessionURL(true) || 'current session URL API not ready',
      });
      // FS.event is immediately ready even if FullStory isn't fully bootstrapped
      FullStory.event('Bugsnag Error', {
        bugsnagUrl: getBugsnagUrl(),
        ...getOriginalExceptionProperties(event)
      });
    }

    Bugsnag.addOnError(cb);
  }

}

export default BugsnagFullStory;