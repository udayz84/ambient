export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEEIBanner: env.bool('FLAG_PROMOTE_EEI_BANNER', false),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [
        env('CLIENT_URL', 'http://rfbqyi8mhatyr94xgys2wnpf.178.236.185.20.sslip.io'),
        'http://localhost:3000'
      ],
      async handler(uid, { documentId, locale, status }) {
        const baseUrl = env('CLIENT_URL', 'http://rfbqyi8mhatyr94xgys2wnpf.178.236.185.20.sslip.io');
        const paths = {
          'api::home-page.home-page': '/',
          'api::company-page.company-page': '/company',
          'api::contact-page.contact-page': '/contact',
          'api::products-page.products-page': '/products',
          'api::som-page.som-page': '/SOM',
          'api::technology-page.technology-page': '/technology',
          'api::developer-page.developer-page': '/developer',
          'api::resources-page.resources-page': '/resources',
          'api::careers-page.careers-page': '/careers',
          'api::dvk-page.dvk-page': '/dvk',
          'api::news-listing-page.news-listing-page': '/news-listing',
        };
        
        let path = paths[uid] || '/';
        
        if (uid === 'api::application-page.application-page') {
          try {
            const entry = await strapi.documents(uid).findOne({ documentId });
            if (entry?.slug) path = `/applications/${entry.slug}`;
          } catch(e) {}
        }
        
        if (uid === 'api::article.article') {
          try {
            const entry = await strapi.documents(uid).findOne({ documentId });
            if (entry?.slug) path = `/resources/${entry.slug}`;
          } catch(e) {}
        }

        return `${baseUrl}${path}`;
      },
    },
  },
});
