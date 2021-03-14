import * as FullStory from '@fullstory/browser';
import { TrackJS } from 'trackjs';
import { getOriginalExceptionProperties } from './utils';

/**
 * This integration creates a link from the Trackjs Error to the FullStory replay.
 * It also creates a link from the FullStory event to the Trackjs error.
 */

type Options = {
  fsEventName: string;
};

class TrackJSFullStory {
  static init(options?: Options) {
    const fsEventName = options?.fsEventName || 'TrackJS Error';
    const key = 'fullstoryUrl';

    /**
     * Returns Trackjs's Error event URL
     * @returns string 
     */
    const getTrackjsUrl = () => `https://my.trackjs.com/metadata?key=${key}`;

    const onError = (payload): boolean => {

      payload.metadata.push({
        key,
        value: FullStory.getCurrentSessionURL(true) || 'current session URL API not ready'
      })

      // FS.event is immediately ready even if FullStory isn't fully bootstrapped
      FullStory.event(fsEventName, {
        trackjsUrl: getTrackjsUrl(),
        ...getOriginalExceptionProperties(event)
      });
      return true;
    }

    TrackJS.configure({
      onError
    })
  }

}

export default TrackJSFullStory;