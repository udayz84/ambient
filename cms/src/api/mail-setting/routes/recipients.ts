/**
 * Public recipients endpoint for the Next.js server (used by
 * src/lib/notify-mail.ts). `auth: false` keeps the integration identical to
 * the submit routes; an optional shared secret (MAIL_SETTING_SECRET in the
 * CMS env + x-mail-secret header) can lock it down in production.
 */
export default {
  routes: [
    {
      method: 'GET',
      path: '/mail-settings/recipients',
      handler: 'mail-setting.recipients',
      config: {
        auth: false,
      },
    },
  ],
};
