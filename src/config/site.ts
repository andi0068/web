import { env } from '@/utils/generic-utils';

const { AUTHOR_USERNAME } = env();

export const siteConfig = {
  name: AUTHOR_USERNAME,
  description: `${AUTHOR_USERNAME} profile.`,
};
