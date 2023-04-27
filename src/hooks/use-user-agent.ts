import { UAParser } from 'ua-parser-js';

export default function useUserAgent() {
  const userAgent = new UAParser();

  const isMobile = userAgent.getDevice().type === 'mobile';

  return {
    isMobile
  };
}
