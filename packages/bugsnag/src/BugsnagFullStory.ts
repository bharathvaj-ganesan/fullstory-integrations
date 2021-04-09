import * as FullStory from '@fullstory/browser';
import { getOriginalExceptionProperties } from './utils';

/**
 * This integration creates a link from the Bugsnag Error to the FullStory replay.
 * It also creates a link from the FullStory event to the Bugsnag error.
 */

type Options = {
  fsEventName: string;
};

class BugsnagFullStory {
  private fsEventName = 'Bugsnag Error';
  private name;

  constructor(options?: Options) {
    this.name = 'FullStory'
    this.fsEventName = options?.fsEventName || this.fsEventName;
  }

  load(client) {

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
      FullStory.event(this.fsEventName, {
        bugsnagUrl: getBugsnagUrl(),
        ...getOriginalExceptionProperties(event)
      });
    }

    client.addOnError(cb);
  }

}

export default BugsnagFullStory;