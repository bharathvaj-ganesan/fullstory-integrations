import * as FullStory from '@fullstory/browser';
import { getOriginalExceptionProperties } from './utils';

/**
 * This integration creates a link from the Raygun Error to the FullStory replay.
 * It also creates a link from the FullStory event to the Raygun error.
 */

type Options = {
  fsEventName: string;
};

class RaygunFullStory {
  static init(client, options?: Options) {

    const fsEventName = options?.fsEventName || 'Raygun Error';

    /**
     * Returns Raygun's Error event URL
     * @returns string 
     */
    const getRaygunUrl = () => `Could not retrieve url`;

    client('', () => {
      // FS.event is immediately ready even if FullStory isn't fully bootstrapped
      FullStory.event(fsEventName, {
        trackjsUrl: getRaygunUrl(),
        ...getOriginalExceptionProperties(event)
      });
      return {
        fullstoryUrl: FullStory.getCurrentSessionURL(true) || 'current session URL API not ready'
      }
    });
  }

}

export default RaygunFullStory;