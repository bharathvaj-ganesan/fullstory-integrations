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

    /**
     * Returns Trackjs's Error event URL
     * @returns string 
     */
    const getTrackjsUrl = (value) => `https://my.trackjs.com/metadata?key=${key}&value=${value}`;

    const onError = (payload): boolean => {
      const value = FullStory.getCurrentSessionURL(true) || 'current session URL API not ready';
      const trackjsUrl = getTrackjsUrl(value);

      payload.metadata.push({
        key,
        value
      })

      // FS.event is immediately ready even if FullStory isn't fully bootstrapped
      FullStory.event(fsEventName, {
        trackjsUrl,
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