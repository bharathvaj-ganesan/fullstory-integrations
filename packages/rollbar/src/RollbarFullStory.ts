import * as FullStory from '@fullstory/browser';
import { getOriginalExceptionProperties } from './utils';

/**
 * This integration creates a link from the Rollbar Error to the FullStory replay.
 * It also creates a link from the FullStory event to the Rollbar error.
 */

type Options = {
  fsEventName: string;
};

class RollbarFullStory {
  static init(client, options?: Options) {
    let fsEventName = options?.fsEventName || 'Rollbar Error';

    /**
     * Returns Rollbar's Error event URL
     * @returns string 
     */
    const getRollbarUrl = () => `Could not retrieve url`;

    const transformer = (payload) => {
      payload.custom = payload.custom || {};
      payload.custom.fullstoryUrl = FullStory.getCurrentSessionURL(true) || 'current session URL API not ready';

      // FS.event is immediately ready even if FullStory isn't fully bootstrapped
      FullStory.event(fsEventName, {
        rollbarUrl: getRollbarUrl(),
        ...getOriginalExceptionProperties(event)
      });
    }

    /**
     * If there is another transformer configured, combine them
     */
    const isTransformerConfigured = Boolean(client.options.transform);
    if (isTransformerConfigured) {
      const _transform = client.options.transform;
      client.configure({
        transform: (payload) => {
          // Run consumer's tranformer first and then ours
          _transform(payload);
          transformer(payload);
        }
      });
      return;
    }

    client.configure({ transform: transformer });
  }

}

export default RollbarFullStory;