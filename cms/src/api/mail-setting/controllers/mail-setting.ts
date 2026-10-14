import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::mail-setting.mail-setting', () => ({
  /**
   * Server-to-server endpoint consumed by the Next.js form API routes to
   * learn where submission notifications should be emailed. Returns ONLY the
   * recipients — no other CMS data. If MAIL_SETTING_SECRET is set in the
   * CMS env, the request must send header `x-mail-secret` with the same
   * value; when unset (local dev) the endpoint is open like the submit
   * routes.
   */
  async recipients(ctx: any) {
    const secret = process.env.MAIL_SETTING_SECRET;
    if (secret) {
      const provided = ctx.request.headers['x-mail-secret'];
      if (provided !== secret) {
        ctx.status = 403;
        return { error: 'Forbidden' };
      }
    }

    const entry = await strapi
      .documents('api::mail-setting.mail-setting')
      .findFirst();

    const parse = (raw: unknown): string[] =>
      String(raw ?? '')
        .split(/[,;\n]/)
        .map((e) => e.trim())
        .filter((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));

    return {
      to: parse(entry?.recipients),
      cc: parse(entry?.ccRecipients),
      enabled: entry ? entry.enabled !== false : false,
    };
  },
}));
