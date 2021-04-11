import * as FullStory from '@fullstory/browser';
import { getOriginalExceptionProperties } from './utils';

/**
 * This integration creates a link from the Trackjs Error to the FullStory replay.
 * It also creates a link from the FullStory event to the Trackjs error.
 */

type Options = {
  fsEventName: string;
};

class TrackJSFullStory {
  static init(client, options?: Options) {

    const fsEventName = options?.fsEventName || 'TrackJS Error';
    const key = 'fullstoryUrl';
    const value = FullStory.getCurrentSessionURL(true) || 'current session URL API not ready';

    /**
     * Returns Trackjs's Error event URL
     * @returns string 
     */
    const getTrackjsUrl = () => `https://my.trackjs.com/metadata?key=${key}&value=${value}`;

    const onError = (payload): boolean => {

      payload.metadata.push({
        key,
        value
      })

      // FS.event is immediately ready even if FullStory isn't fully bootstrapped
      FullStory.event(fsEventName, {
        trackjsUrl: getTrackjsUrl(),
        ...getOriginalExceptionProperties(event)
      });
      return true;
    }

    // Check if TrackJS is installed and configure
    if (client.isInstalled()) {
      client.configure({
        onError
      })
    }
  }

}

export default TrackJSFullStory;