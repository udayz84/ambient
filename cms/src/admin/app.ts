import logo from './assets/logo.png';
import { setPluginConfig, defaultHtmlPreset } from '@_sh/strapi-plugin-ckeditor';
import { MediaEmbed } from 'ckeditor5';

export default {
  config: {
    locales: ['en'],
    mutations: {
      localize: false,
    },
    auth: {
      logo,
    },
    menu: {
      logo,
    },
  },
  bootstrap() {},
  register() {
    const defaultToolbar = defaultHtmlPreset.editorConfig.toolbar;
    const toolbarItems = Array.isArray(defaultToolbar)
      ? [...defaultToolbar, '|', 'mediaEmbed']
      : {
          ...defaultToolbar,
          items: [...(defaultToolbar?.items || []), '|', 'mediaEmbed'],
        };

    const customHtmlPreset = {
      ...defaultHtmlPreset,
      editorConfig: {
        ...defaultHtmlPreset.editorConfig,
        plugins: [
          ...(defaultHtmlPreset.editorConfig.plugins || []),
          MediaEmbed,
        ],
        toolbar: toolbarItems,
      },
    };

    setPluginConfig({
      presets: [customHtmlPreset],
    });
  },
};
