import type { Schema, Struct } from '@strapi/strapi';

export interface AppsArticleCard extends Struct.ComponentSchema {
  collectionName: 'components_apps_article_cards';
  info: {
    description: 'Applications article card';
    displayName: 'Article Card';
  };
  attributes: {
    alt: Schema.Attribute.String;
    body: Schema.Attribute.Text;
    cta_href: Schema.Attribute.String;
    cta_label: Schema.Attribute.String;
    date: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AppsArticles extends Struct.ComponentSchema {
  collectionName: 'components_apps_articles';
  info: {
    description: 'Applications articles section';
    displayName: 'Articles';
  };
  attributes: {
    articles: Schema.Attribute.Component<'apps.article-card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AppsContinuum extends Struct.ComponentSchema {
  collectionName: 'components_apps_continua';
  info: {
    description: 'Applications continuum section';
    displayName: 'Continuum';
  };
  attributes: {
    cards: Schema.Attribute.Component<'apps.continuum-card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface AppsContinuumCard extends Struct.ComponentSchema {
  collectionName: 'components_apps_continuum_cards';
  info: {
    description: 'Ambient continuum card';
    displayName: 'Continuum Card';
  };
  attributes: {
    body: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    image_alt: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AppsDeathOfHardwareTradeoffs extends Struct.ComponentSchema {
  collectionName: 'components_apps_death_of_hardware_tradeoffs';
  info: {
    description: 'The death of hardware tradeoffs section';
    displayName: 'Death Of Hardware Tradeoffs';
  };
  attributes: {
    carousel_images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    features: Schema.Attribute.Component<'apps.feature', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface AppsFeature extends Struct.ComponentSchema {
  collectionName: 'components_apps_features';
  info: {
    description: 'Death of hardware tradeoffs feature card';
    displayName: 'Feature';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AppsHero extends Struct.ComponentSchema {
  collectionName: 'components_apps_heroes';
  info: {
    description: 'Applications hero section';
    displayName: 'Hero';
  };
  attributes: {
    alt: Schema.Attribute.String;
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    subtitle: Schema.Attribute.Text;
    tag: Schema.Attribute.Component<'shared.tag', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AppsSom extends Struct.ComponentSchema {
  collectionName: 'components_apps_soms';
  info: {
    description: 'Applications SOM section';
    displayName: 'SOM Section';
  };
  attributes: {
    cards: Schema.Attribute.Component<'apps.som-card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    primary_button: Schema.Attribute.Component<'shared.button', false>;
    secondary_button: Schema.Attribute.Component<'shared.button', false>;
    status_pill: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
  };
}

export interface AppsSomCard extends Struct.ComponentSchema {
  collectionName: 'components_apps_som_cards';
  info: {
    description: 'A single card for the SOM Section';
    displayName: 'SOM Card';
  };
  attributes: {
    image_a: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image_a_alt: Schema.Attribute.String;
    image_b: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image_b_alt: Schema.Attribute.String;
    is_upcoming: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    sublabel: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
    visual_style: Schema.Attribute.Enumeration<['sharp', 'blurry', 'layered']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'sharp'>;
  };
}

export interface AppsSomDataLabel extends Struct.ComponentSchema {
  collectionName: 'components_apps_som_data_labels';
  info: {
    description: 'SOM data label';
    displayName: 'SOM Data Label';
  };
  attributes: {
    label: Schema.Attribute.String;
    sublabel: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface AppsWinCard extends Struct.ComponentSchema {
  collectionName: 'components_apps_win_cards';
  info: {
    description: 'Empirical advantage win card';
    displayName: 'Win Card';
  };
  attributes: {
    alt: Schema.Attribute.String;
    body: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    stat: Schema.Attribute.String;
    stat_label: Schema.Attribute.String;
  };
}

export interface AppsWins extends Struct.ComponentSchema {
  collectionName: 'components_apps_wins';
  info: {
    description: 'Applications wins section';
    displayName: 'Wins';
  };
  attributes: {
    body: Schema.Attribute.Text;
    cards: Schema.Attribute.Component<'apps.win-card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CareersBenefitCard extends Struct.ComponentSchema {
  collectionName: 'components_careers_benefit_cards';
  info: {
    description: 'Careers benefit card';
    displayName: 'Benefit Card';
  };
  attributes: {
    alt: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CareersBenefits extends Struct.ComponentSchema {
  collectionName: 'components_careers_benefits';
  info: {
    description: 'Careers benefits section';
    displayName: 'Benefits';
  };
  attributes: {
    cards: Schema.Attribute.Component<'careers.benefit-card', true>;
    heading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Benefits & Perks'>;
  };
}

export interface CareersBestWork extends Struct.ComponentSchema {
  collectionName: 'components_careers_best_works';
  info: {
    description: 'Careers best work section';
    displayName: 'Best Work';
  };
  attributes: {
    cards: Schema.Attribute.Component<'careers.work-card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CareersBottomCta extends Struct.ComponentSchema {
  collectionName: 'components_careers_bottom_ctas';
  info: {
    description: 'Careers bottom CTA section';
    displayName: 'Bottom CTA';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'shared.button', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CareersDna extends Struct.ComponentSchema {
  collectionName: 'components_careers_dnas';
  info: {
    description: 'Careers DNA section';
    displayName: 'DNA';
  };
  attributes: {
    chip_object: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    chip_object_alt: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    mobile_chip_object: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    mobile_chip_object_alt: Schema.Attribute.String;
    panels: Schema.Attribute.Component<'careers.dna-panel', true>;
    subtitle: Schema.Attribute.Text;
  };
}

export interface CareersDnaPanel extends Struct.ComponentSchema {
  collectionName: 'components_careers_dna_panels';
  info: {
    description: 'Careers DNA panel';
    displayName: 'DNA Panel';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CareersHero extends Struct.ComponentSchema {
  collectionName: 'components_careers_heroes';
  info: {
    description: 'Careers hero section';
    displayName: 'Hero';
  };
  attributes: {
    alt: Schema.Attribute.String;
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    cta_href: Schema.Attribute.String;
    cta_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'VIEW OPEN ROLES'>;
    scroll_text: Schema.Attribute.String & Schema.Attribute.DefaultTo<'SCROLL'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CareersOpenRoles extends Struct.ComponentSchema {
  collectionName: 'components_careers_open_roles';
  info: {
    description: 'Careers open roles section';
    displayName: 'Open Roles';
  };
  attributes: {
    apply_button_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'APPLY NOW'>;
    general_app_cta_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'SHARE YOUR PROFILE'>;
    general_app_subtitle: Schema.Attribute.Text;
    general_app_title: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Open Roles'>;
  };
}

export interface CareersWorkCard extends Struct.ComponentSchema {
  collectionName: 'components_careers_work_cards';
  info: {
    description: 'Best work card';
    displayName: 'Work Card';
  };
  attributes: {
    alt: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CompanyArticles extends Struct.ComponentSchema {
  collectionName: 'components_company_articles';
  info: {
    description: 'Company articles section';
    displayName: 'Articles';
  };
  attributes: {
    compact_articles: Schema.Attribute.Component<
      'company.compact-article',
      true
    >;
    featured_article: Schema.Attribute.Component<
      'company.featured-article',
      false
    >;
  };
}

export interface CompanyCompactArticle extends Struct.ComponentSchema {
  collectionName: 'components_company_compact_articles';
  info: {
    description: 'Company compact article';
    displayName: 'Compact Article';
  };
  attributes: {
    alt: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CompanyDna extends Struct.ComponentSchema {
  collectionName: 'components_company_dnas';
  info: {
    description: 'Company DNA section';
    displayName: 'DNA';
  };
  attributes: {
    alt: Schema.Attribute.String;
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
    value_cards: Schema.Attribute.Component<'company.dna-value', true>;
  };
}

export interface CompanyDnaValue extends Struct.ComponentSchema {
  collectionName: 'components_company_dna_values';
  info: {
    description: 'Company DNA value card';
    displayName: 'DNA Value';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CompanyEcosystem extends Struct.ComponentSchema {
  collectionName: 'components_company_ecosystems';
  info: {
    description: 'Company ecosystem section';
    displayName: 'Ecosystem';
  };
  attributes: {
    alt: Schema.Attribute.String;
    columns: Schema.Attribute.Component<'company.ecosystem-column', true>;
    heading: Schema.Attribute.String;
    map_image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    subtitle: Schema.Attribute.Text;
  };
}

export interface CompanyEcosystemColumn extends Struct.ComponentSchema {
  collectionName: 'components_company_ecosystem_columns';
  info: {
    description: 'Company ecosystem column';
    displayName: 'Ecosystem Column';
  };
  attributes: {
    alt: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CompanyEngagement extends Struct.ComponentSchema {
  collectionName: 'components_company_engagements';
  info: {
    description: 'Company engagement section';
    displayName: 'Engagement';
  };
  attributes: {
    alt: Schema.Attribute.String;
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    cards: Schema.Attribute.Component<'company.engagement-card', true>;
    join_team: Schema.Attribute.Component<'company.join-team', false>;
  };
}

export interface CompanyEngagementCard extends Struct.ComponentSchema {
  collectionName: 'components_company_engagement_cards';
  info: {
    description: 'Company engagement card';
    displayName: 'Engagement Card';
  };
  attributes: {
    alt: Schema.Attribute.String;
    cta_href: Schema.Attribute.String;
    cta_label: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CompanyFeaturedArticle extends Struct.ComponentSchema {
  collectionName: 'components_company_featured_articles';
  info: {
    description: 'Company featured article';
    displayName: 'Featured Article';
  };
  attributes: {
    alt: Schema.Attribute.String;
    category: Schema.Attribute.String;
    date: Schema.Attribute.String;
    excerpt: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    metadata: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CompanyHero extends Struct.ComponentSchema {
  collectionName: 'components_company_heroes';
  info: {
    description: 'Company hero section';
    displayName: 'Hero';
  };
  attributes: {
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    background_image_alt: Schema.Attribute.String;
    body: Schema.Attribute.Text;
    mobile_background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    mobile_background_image_alt: Schema.Attribute.String;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface CompanyJoinTeam extends Struct.ComponentSchema {
  collectionName: 'components_company_join_teams';
  info: {
    description: 'Company join team section';
    displayName: 'Join Team';
  };
  attributes: {
    alt: Schema.Attribute.String;
    cta_href: Schema.Attribute.String;
    cta_label: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CompanyLeadership extends Struct.ComponentSchema {
  collectionName: 'components_company_leaderships';
  info: {
    description: 'Company leadership section';
    displayName: 'Leadership';
  };
  attributes: {
    advisory_board: Schema.Attribute.Component<'shared.leader', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
    team: Schema.Attribute.Component<'shared.leader', true>;
  };
}

export interface CompanyMission extends Struct.ComponentSchema {
  collectionName: 'components_company_missions';
  info: {
    description: 'Company mission section';
    displayName: 'Mission';
  };
  attributes: {
    body_paragraph_1: Schema.Attribute.Text;
    body_paragraph_2: Schema.Attribute.Text;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    stats: Schema.Attribute.Component<'shared.stat', true>;
  };
}

export interface CompanyPartner extends Struct.ComponentSchema {
  collectionName: 'components_company_partners';
  info: {
    description: 'Technology partner';
    displayName: 'Partner';
  };
  attributes: {
    alt: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
  };
}

export interface CompanyTechPartners extends Struct.ComponentSchema {
  collectionName: 'components_company_tech_partners';
  info: {
    description: 'Company technology partners section';
    displayName: 'Tech Partners';
  };
  attributes: {
    partners: Schema.Attribute.Component<'company.partner', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'TECHNOLOGY PARTNERS'>;
  };
}

export interface ContactForm extends Struct.ComponentSchema {
  collectionName: 'components_contact_forms';
  info: {
    description: 'Contact form section';
    displayName: 'Form';
  };
  attributes: {
    checkbox_label: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    message_heading: Schema.Attribute.String;
    submit_href: Schema.Attribute.String;
    submit_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Send Message'>;
    subtitle: Schema.Attribute.Text;
    tracks: Schema.Attribute.Component<'contact.form-track', true>;
  };
}

export interface ContactFormField extends Struct.ComponentSchema {
  collectionName: 'components_contact_form_fields';
  info: {
    description: 'Contact form field';
    displayName: 'Form Field';
  };
  attributes: {
    field_type: Schema.Attribute.Enumeration<
      ['text', 'email', 'phone', 'textarea']
    > &
      Schema.Attribute.DefaultTo<'text'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    placeholder: Schema.Attribute.String;
  };
}

export interface ContactFormTrack extends Struct.ComponentSchema {
  collectionName: 'components_contact_form_tracks';
  info: {
    description: 'Contact form track option';
    displayName: 'Form Track';
  };
  attributes: {
    alt: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    form: Schema.Attribute.Component<'contact.form-field', true>;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContactHero extends Struct.ComponentSchema {
  collectionName: 'components_contact_heroes';
  info: {
    description: 'Contact hero section';
    displayName: 'Hero';
  };
  attributes: {
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    background_image_alt: Schema.Attribute.String;
    mobile_background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    mobile_background_image_alt: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContactMap extends Struct.ComponentSchema {
  collectionName: 'components_contact_maps';
  info: {
    description: 'Contact map section';
    displayName: 'Map';
  };
  attributes: {
    globe_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    globe_image_alt: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    locations: Schema.Attribute.Component<'shared.location', true>;
    map_base: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    map_base_alt: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
  };
}

export interface ContactResources extends Struct.ComponentSchema {
  collectionName: 'components_contact_resources';
  info: {
    description: 'Contact resources section';
    displayName: 'Resources';
  };
  attributes: {
    ctas: Schema.Attribute.Component<'shared.button', true>;
    heading: Schema.Attribute.String;
  };
}

export interface ContactSchedule extends Struct.ComponentSchema {
  collectionName: 'components_contact_schedules';
  info: {
    description: 'Contact schedule section';
    displayName: 'Schedule';
  };
  attributes: {
    alt: Schema.Attribute.String;
    cards: Schema.Attribute.Component<'contact.schedule-card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    subtitle: Schema.Attribute.Text;
  };
}

export interface ContactScheduleCard extends Struct.ComponentSchema {
  collectionName: 'components_contact_schedule_cards';
  info: {
    description: 'Schedule consultation card';
    displayName: 'Schedule Card';
  };
  attributes: {
    alt: Schema.Attribute.String;
    cta_href: Schema.Attribute.String;
    cta_label: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DeveloperCode extends Struct.ComponentSchema {
  collectionName: 'components_developer_codes';
  info: {
    description: 'Developer code section';
    displayName: 'Code Section';
  };
  attributes: {
    articles: Schema.Attribute.Component<'developer.code-article', true>;
    code_snippet: Schema.Attribute.Text;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface DeveloperCodeArticle extends Struct.ComponentSchema {
  collectionName: 'components_developer_code_articles';
  info: {
    description: 'Developer code section article card';
    displayName: 'Code Article';
  };
  attributes: {
    alt: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DeveloperComingSoon extends Struct.ComponentSchema {
  collectionName: 'components_developer_coming_soons';
  info: {
    description: 'Developer coming soon section';
    displayName: 'Coming Soon';
  };
  attributes: {
    card_description: Schema.Attribute.Text;
    card_title: Schema.Attribute.String;
    cta_href: Schema.Attribute.String;
    cta_label: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image_alt: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
  };
}

export interface DeveloperCopilot extends Struct.ComponentSchema {
  collectionName: 'components_developer_copilots';
  info: {
    description: 'Developer copilot item';
    displayName: 'Copilot';
  };
  attributes: {
    alt: Schema.Attribute.String;
    cta_href: Schema.Attribute.String;
    cta_label: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DeveloperCopilots extends Struct.ComponentSchema {
  collectionName: 'components_developer_copilots_groups';
  info: {
    description: 'Developer copilots section';
    displayName: 'Copilots';
  };
  attributes: {
    copilots: Schema.Attribute.Component<'developer.copilot', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface DeveloperHero extends Struct.ComponentSchema {
  collectionName: 'components_developer_heroes';
  info: {
    description: 'Developer hero section';
    displayName: 'Hero';
  };
  attributes: {
    alt: Schema.Attribute.String;
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    primary_button: Schema.Attribute.Component<'shared.button', false>;
    secondary_button: Schema.Attribute.Component<'shared.button', false>;
    subtitle: Schema.Attribute.Text;
  };
}

export interface DeveloperModelZoo extends Struct.ComponentSchema {
  collectionName: 'components_developer_model_zoos';
  info: {
    description: 'Developer model zoo section';
    displayName: 'Model Zoo';
  };
  attributes: {
    cta_href: Schema.Attribute.String;
    cta_label: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    stats: Schema.Attribute.Component<'developer.model-zoo-stat', true>;
    subtitle: Schema.Attribute.Text;
  };
}

export interface DeveloperModelZooStat extends Struct.ComponentSchema {
  collectionName: 'components_developer_model_zoo_stats';
  info: {
    description: 'Developer model zoo stat item';
    displayName: 'Model Zoo Stat';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface DeveloperModule extends Struct.ComponentSchema {
  collectionName: 'components_developer_modules';
  info: {
    description: 'Developer module item';
    displayName: 'Module';
  };
  attributes: {
    alt: Schema.Attribute.String;
    cta_href: Schema.Attribute.String;
    cta_label: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DeveloperModules extends Struct.ComponentSchema {
  collectionName: 'components_developer_modules_groups';
  info: {
    description: 'Developer modules section';
    displayName: 'Modules';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    modules: Schema.Attribute.Component<'developer.module', true>;
    subtitle: Schema.Attribute.Text;
  };
}

export interface DeveloperPipeline extends Struct.ComponentSchema {
  collectionName: 'components_developer_pipelines';
  info: {
    description: 'Developer pipeline section';
    displayName: 'Pipeline';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    tabs: Schema.Attribute.Component<'developer.pipeline-tab', true>;
    tag: Schema.Attribute.Component<'shared.tag', false>;
  };
}

export interface DeveloperPipelineBullet extends Struct.ComponentSchema {
  collectionName: 'components_developer_pipeline_bullets';
  info: {
    description: 'Developer pipeline expanded-card feature bullet';
    displayName: 'Pipeline Bullet';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DeveloperPipelineTab extends Struct.ComponentSchema {
  collectionName: 'components_developer_pipeline_tabs';
  info: {
    description: 'Developer pipeline tab item';
    displayName: 'Pipeline Tab';
  };
  attributes: {
    bullets: Schema.Attribute.Component<'developer.pipeline-bullet', true>;
    flow_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    flow_image_alt: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    logo_alt: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
  };
}

export interface DvkAppForge extends Struct.ComponentSchema {
  collectionName: 'components_dvk_app_forges';
  info: {
    description: 'ApplicationForge phone-control section \u2014 heading and subheading only; steps, toggle, videos and cards stay hardcoded in the frontend';
    displayName: 'App Forge';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subheading: Schema.Attribute.Text;
  };
}

export interface DvkDemoCard extends Struct.ComponentSchema {
  collectionName: 'components_dvk_demo_cards';
  info: {
    description: 'DVK demo card';
    displayName: 'Demo Card';
  };
  attributes: {
    alt: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title_line_1: Schema.Attribute.String;
    title_line_2: Schema.Attribute.String;
  };
}

export interface DvkDemos extends Struct.ComponentSchema {
  collectionName: 'components_dvk_demos';
  info: {
    description: 'DVK demos section';
    displayName: 'Demos';
  };
  attributes: {
    cta_href: Schema.Attribute.String;
    cta_label: Schema.Attribute.String;
    demo_cards: Schema.Attribute.Component<'dvk.demo-card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    phone_card: Schema.Attribute.Component<'dvk.phone-card', false>;
    subtitle: Schema.Attribute.Text;
  };
}

export interface DvkHardwareStack extends Struct.ComponentSchema {
  collectionName: 'components_dvk_hardware_stacks';
  info: {
    description: 'DVK hardware stack section';
    displayName: 'Hardware Stack';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String;
    spec_cards: Schema.Attribute.Component<'dvk.spec-card', true>;
    subtitle: Schema.Attribute.Text;
  };
}

export interface DvkHero extends Struct.ComponentSchema {
  collectionName: 'components_dvk_heroes';
  info: {
    description: 'DVK hero section';
    displayName: 'Hero';
  };
  attributes: {
    alt: Schema.Attribute.String;
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    cta_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Request Evaluation Kit'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DvkIntegratedModules extends Struct.ComponentSchema {
  collectionName: 'components_dvk_integrated_modules';
  info: {
    description: 'DVK integrated modules section';
    displayName: 'Integrated Modules';
  };
  attributes: {
    cards: Schema.Attribute.Component<'dvk.module-card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    primary_button: Schema.Attribute.Component<'shared.button', false>;
    secondary_button: Schema.Attribute.Component<'shared.button', false>;
    subtitle: Schema.Attribute.Text;
  };
}

export interface DvkModelforge extends Struct.ComponentSchema {
  collectionName: 'components_dvk_modelforges';
  info: {
    description: 'DVK ModelForge section';
    displayName: 'ModelForge';
  };
  attributes: {
    center_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    dvk_board_description: Schema.Attribute.Text;
    dvk_board_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    dvk_board_title: Schema.Attribute.String;
    floating_tags: Schema.Attribute.Component<'shared.tag', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
    toolchain_labels: Schema.Attribute.Component<'shared.tag', true>;
    toolchain_subtitle: Schema.Attribute.String;
    toolchain_title: Schema.Attribute.String;
    your_model_description: Schema.Attribute.Text;
    your_model_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    your_model_title: Schema.Attribute.String;
  };
}

export interface DvkModuleCard extends Struct.ComponentSchema {
  collectionName: 'components_dvk_module_cards';
  info: {
    description: 'DVK integrated module card';
    displayName: 'Module Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DvkPhoneCard extends Struct.ComponentSchema {
  collectionName: 'components_dvk_phone_cards';
  info: {
    description: 'DVK demos phone/CTA card (Figma 5212:6941)';
    displayName: 'Phone Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    primary_cta_href: Schema.Attribute.String;
    primary_cta_label: Schema.Attribute.String;
    secondary_cta_href: Schema.Attribute.String;
    secondary_cta_label: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DvkSpecCard extends Struct.ComponentSchema {
  collectionName: 'components_dvk_spec_cards';
  info: {
    description: 'Hardware stack spec card';
    displayName: 'Spec Card';
  };
  attributes: {
    is_accent: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    items: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FormField extends Struct.ComponentSchema {
  collectionName: 'components_form_fields';
  info: {
    description: '';
    displayName: 'Field';
    icon: 'align-justify';
  };
  attributes: {
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    placeholder: Schema.Attribute.String;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    type: Schema.Attribute.Enumeration<
      ['text', 'email', 'number', 'password', 'tel']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'text'>;
  };
}

export interface HomeAppFeatureCard extends Struct.ComponentSchema {
  collectionName: 'components_home_app_feature_cards';
  info: {
    description: 'Application feature card';
    displayName: 'App Feature Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeAppTab extends Struct.ComponentSchema {
  collectionName: 'components_home_app_tabs';
  info: {
    description: 'Application tab';
    displayName: 'App Tab';
  };
  attributes: {
    feature_cards: Schema.Attribute.Component<'home.app-feature-card', true>;
    hero_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    hero_image_alt: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    mobile_hero_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    mobile_hero_image_alt: Schema.Attribute.String;
    watermark_text: Schema.Attribute.String;
  };
}

export interface HomeApplications extends Struct.ComponentSchema {
  collectionName: 'components_home_applications';
  info: {
    description: 'Homepage applications section';
    displayName: 'Applications';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.cta', false>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
    tabs: Schema.Attribute.Component<'home.app-tab', true>;
  };
}

export interface HomeClients extends Struct.ComponentSchema {
  collectionName: 'components_home_clients';
  info: {
    description: 'Homepage clients section';
    displayName: 'Clients';
  };
  attributes: {
    clients: Schema.Attribute.Component<'home.partner', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subheading: Schema.Attribute.Text;
    tag: Schema.Attribute.Component<'shared.tag', false>;
  };
}

export interface HomeDevCard extends Struct.ComponentSchema {
  collectionName: 'components_home_dev_cards';
  info: {
    description: 'Developer platform bento card';
    displayName: 'Dev Card';
  };
  attributes: {
    alt: Schema.Attribute.String;
    body: Schema.Attribute.Text;
    cta: Schema.Attribute.Component<'shared.cta', false>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeDeveloperPlatform extends Struct.ComponentSchema {
  collectionName: 'components_home_developer_platforms';
  info: {
    description: 'Homepage developer platform section';
    displayName: 'Developer Platform';
  };
  attributes: {
    cards: Schema.Attribute.Component<'home.dev-card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface HomeEcosystem extends Struct.ComponentSchema {
  collectionName: 'components_home_ecosystems';
  info: {
    description: 'Homepage ecosystem section';
    displayName: 'Ecosystem';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.cta', false>;
    development_partners: Schema.Attribute.Component<'home.partner', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    silicon_partners: Schema.Attribute.Component<'home.partner', true>;
    subtitle: Schema.Attribute.Text;
  };
}

export interface HomeGpxProduct extends Struct.ComponentSchema {
  collectionName: 'components_home_gpx_products';
  info: {
    description: 'Platform scale product';
    displayName: 'GPX Product';
  };
  attributes: {
    alt: Schema.Attribute.String;
    chip_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    product_id: Schema.Attribute.String;
  };
}

export interface HomeHero extends Struct.ComponentSchema {
  collectionName: 'components_home_heroes';
  info: {
    description: 'Homepage hero section';
    displayName: 'Hero';
  };
  attributes: {
    announcements: Schema.Attribute.Component<'home.hero-announcement', true>;
    metrics: Schema.Attribute.Component<'home.hero-metric', true>;
    mobile_video: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    mobile_video_alt: Schema.Attribute.String;
    scroll_text: Schema.Attribute.String & Schema.Attribute.DefaultTo<'SCROLL'>;
    subtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    video: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    video_alt: Schema.Attribute.String;
  };
}

export interface HomeHeroAnnouncement extends Struct.ComponentSchema {
  collectionName: 'components_home_hero_announcements';
  info: {
    description: 'Homepage hero carousel announcement slide (tag, title, subtitle, image, CTAs)';
    displayName: 'Hero Announcement';
  };
  attributes: {
    ctas: Schema.Attribute.Component<'shared.button', true>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image_alt: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    tag: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeHeroMetric extends Struct.ComponentSchema {
  collectionName: 'components_home_hero_metrics';
  info: {
    description: 'Homepage hero stat';
    displayName: 'Hero Metric';
  };
  attributes: {
    description: Schema.Attribute.Text;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeLatestNews extends Struct.ComponentSchema {
  collectionName: 'components_home_latest_news';
  info: {
    description: 'Homepage latest news section';
    displayName: 'Latest News';
  };
  attributes: {
    cards: Schema.Attribute.Component<'apps.article-card', true>;
    cta_href: Schema.Attribute.String;
    cta_label: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface HomeMeasuredProof extends Struct.ComponentSchema {
  collectionName: 'components_home_measured_proofs';
  info: {
    description: 'Measured proof in silicon section';
    displayName: 'Measured Proof';
  };
  attributes: {
    ctas: Schema.Attribute.Component<'shared.button', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    stat_cards: Schema.Attribute.Component<'shared.stat-card', true>;
    tag: Schema.Attribute.Component<'shared.tag', false>;
  };
}

export interface HomeModelZooKitCard extends Struct.ComponentSchema {
  collectionName: 'components_home_model_zoo_kit_cards';
  info: {
    description: 'Card for the Start with a model that already works section';
    displayName: 'Model Zoo Kit Card';
  };
  attributes: {
    alt: Schema.Attribute.String;
    cta: Schema.Attribute.String & Schema.Attribute.Required;
    desc: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeModelZooKits extends Struct.ComponentSchema {
  collectionName: 'components_home_model_zoo_kits';
  info: {
    description: 'Start with a model that already works section';
    displayName: 'Model Zoo Kits';
  };
  attributes: {
    cards: Schema.Attribute.Component<'home.model-zoo-kit-card', true>;
    heading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Start with a model that already works.'>;
  };
}

export interface HomePartner extends Struct.ComponentSchema {
  collectionName: 'components_home_partners';
  info: {
    description: 'Ecosystem partner';
    displayName: 'Partner';
  };
  attributes: {
    alt: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
  };
}

export interface HomePlatformScale extends Struct.ComponentSchema {
  collectionName: 'components_home_platform_scales';
  info: {
    description: 'One platform infinite scale section';
    displayName: 'Platform Scale';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.button', false>;
    default_index: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<2>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    products: Schema.Attribute.Component<'home.gpx-product', true>;
    subtitle: Schema.Attribute.Text;
  };
}

export interface HomeTechFeature extends Struct.ComponentSchema {
  collectionName: 'components_home_tech_features';
  info: {
    description: 'Technology feature item';
    displayName: 'Tech Feature';
  };
  attributes: {
    alt: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeTechnology extends Struct.ComponentSchema {
  collectionName: 'components_home_technologies';
  info: {
    description: 'Homepage technology section';
    displayName: 'Technology';
  };
  attributes: {
    features: Schema.Attribute.Component<'home.tech-feature', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image_alt: Schema.Attribute.String;
    tag: Schema.Attribute.Component<'shared.tag', false>;
  };
}

export interface ModelZooAppForge extends Struct.ComponentSchema {
  collectionName: 'components_model_zoo_app_forges';
  info: {
    description: 'ApplicationForge phone-control section';
    displayName: 'App Forge';
  };
  attributes: {
    app_store_badge: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    card_badge: Schema.Attribute.String;
    card_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    card_image_alt: Schema.Attribute.String;
    card_title: Schema.Attribute.String;
    cta: Schema.Attribute.Component<'shared.cta', false>;
    forge_title: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    play_store_badge: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    steps: Schema.Attribute.Component<'model-zoo.forge-step', true>;
    subtitle: Schema.Attribute.Text;
    toggle_text: Schema.Attribute.String;
  };
}

export interface ModelZooBuildCard extends Struct.ComponentSchema {
  collectionName: 'components_model_zoo_build_cards';
  info: {
    description: 'Build It feature card with icon tile';
    displayName: 'Build Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ModelZooBuildIt extends Struct.ComponentSchema {
  collectionName: 'components_model_zoo_build_its';
  info: {
    description: "Don't see it? Build it. section";
    displayName: 'Build It';
  };
  attributes: {
    cards: Schema.Attribute.Component<'model-zoo.build-card', true>;
    cta_primary: Schema.Attribute.Component<'shared.cta', false>;
    cta_secondary: Schema.Attribute.Component<'shared.cta', false>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface ModelZooCollageCard extends Struct.ComponentSchema {
  collectionName: 'components_model_zoo_collage_cards';
  info: {
    description: 'Hero decorative model-preview card';
    displayName: 'Collage Card';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ModelZooFeaturePanel extends Struct.ComponentSchema {
  collectionName: 'components_model_zoo_feature_panels';
  info: {
    description: 'Small gradient feature panel with icon';
    displayName: 'Feature Panel';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ModelZooForgeStep extends Struct.ComponentSchema {
  collectionName: 'components_model_zoo_forge_steps';
  info: {
    description: 'ApplicationForge preview list item';
    displayName: 'Forge Step';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ModelZooHero extends Struct.ComponentSchema {
  collectionName: 'components_model_zoo_heroes';
  info: {
    description: 'Model Zoo hero section';
    displayName: 'Hero';
  };
  attributes: {
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    > &
      Schema.Attribute.Required;
    background_image_2: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    collage_row_1: Schema.Attribute.Component<'model-zoo.collage-card', true>;
    collage_row_2: Schema.Attribute.Component<'model-zoo.collage-card', true>;
    cta_primary: Schema.Attribute.Component<'shared.cta', false>;
    cta_secondary: Schema.Attribute.Component<'shared.cta', false>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ModelZooKitCard extends Struct.ComponentSchema {
  collectionName: 'components_model_zoo_kit_cards';
  info: {
    description: 'Closing card with image, copy and CTA';
    displayName: 'Kit Card';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.cta', false>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image_alt: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ModelZooKits extends Struct.ComponentSchema {
  collectionName: 'components_model_zoo_kits';
  info: {
    description: 'Closing eval-kit / app / GitHub cards section';
    displayName: 'Kits';
  };
  attributes: {
    cards: Schema.Attribute.Component<'model-zoo.kit-card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ModelZooLibrary extends Struct.ComponentSchema {
  collectionName: 'components_model_zoo_libraries';
  info: {
    description: 'Model Zoo library section with filterable model cards';
    displayName: 'Library';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.cta', false>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    models: Schema.Attribute.Component<'model-zoo.model-card', true>;
    strip_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    strip_image_alt: Schema.Attribute.String;
    strip_title: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
  };
}

export interface ModelZooModelCard extends Struct.ComponentSchema {
  collectionName: 'components_model_zoo_model_cards';
  info: {
    description: 'Model Zoo library model card';
    displayName: 'Model Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    doc_cta: Schema.Attribute.Component<'shared.cta', false>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image_alt: Schema.Attribute.String;
    modality: Schema.Attribute.Enumeration<['audio', 'vision', 'motion']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'audio'>;
    model_type: Schema.Attribute.Enumeration<['open-source', 'ambient-built']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'open-source'>;
    specs: Schema.Attribute.Component<'model-zoo.model-spec', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    watch_cta: Schema.Attribute.Component<'shared.cta', false>;
  };
}

export interface ModelZooModelSpec extends Struct.ComponentSchema {
  collectionName: 'components_model_zoo_model_specs';
  info: {
    description: 'Model card spec cell (label + value)';
    displayName: 'Model Spec';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ModelZooStepCard extends Struct.ComponentSchema {
  collectionName: 'components_model_zoo_step_cards';
  info: {
    description: 'Numbered Pick / Compile / Run card';
    displayName: 'Step Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    number: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ModelZooSteps extends Struct.ComponentSchema {
  collectionName: 'components_model_zoo_steps';
  info: {
    description: 'Pick / Compile / Run section';
    displayName: 'Steps';
  };
  attributes: {
    cta_primary: Schema.Attribute.Component<'shared.cta', false>;
    cta_secondary: Schema.Attribute.Component<'shared.cta', false>;
    feature_panels: Schema.Attribute.Component<'model-zoo.feature-panel', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    step_cards: Schema.Attribute.Component<'model-zoo.step-card', true>;
    subtitle: Schema.Attribute.Text;
  };
}

export interface ModelZooWatchCard extends Struct.ComponentSchema {
  collectionName: 'components_model_zoo_watch_cards';
  info: {
    description: 'Watch It Run proof card';
    displayName: 'Watch Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image_alt: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ModelZooWatchItRun extends Struct.ComponentSchema {
  collectionName: 'components_model_zoo_watch_it_runs';
  info: {
    description: 'Model Zoo proof-cards section';
    displayName: 'Watch It Run';
  };
  attributes: {
    caption: Schema.Attribute.String;
    cards: Schema.Attribute.Component<'model-zoo.watch-card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface NewsCard extends Struct.ComponentSchema {
  collectionName: 'components_news_cards';
  info: {
    description: 'News article card';
    displayName: 'News Card';
  };
  attributes: {
    alt: Schema.Attribute.String;
    category: Schema.Attribute.String & Schema.Attribute.Required;
    excerpt: Schema.Attribute.Text;
    image_overlay: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    title_font_size: Schema.Attribute.Integer;
  };
}

export interface NewsFilterPill extends Struct.ComponentSchema {
  collectionName: 'components_news_filter_pills';
  info: {
    description: 'News grid filter pill';
    displayName: 'Filter Pill';
  };
  attributes: {
    cards: Schema.Attribute.Component<'news.card', true>;
    category_id: Schema.Attribute.String;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NewsGrid extends Struct.ComponentSchema {
  collectionName: 'components_news_grids';
  info: {
    description: 'News grid section';
    displayName: 'Grid';
  };
  attributes: {
    alt: Schema.Attribute.String;
    backdrop_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    filter_pills: Schema.Attribute.Component<'news.filter-pill', true>;
    load_more_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Load More Resources'>;
  };
}

export interface NewsHero extends Struct.ComponentSchema {
  collectionName: 'components_news_heroes';
  info: {
    description: 'News listing hero section';
    displayName: 'Hero';
  };
  attributes: {
    alt: Schema.Attribute.String;
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    cta_label: Schema.Attribute.String;
    pagination_text: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    tag: Schema.Attribute.Component<'shared.tag', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NewsPressKit extends Struct.ComponentSchema {
  collectionName: 'components_news_press_kits';
  info: {
    description: 'News press kit section';
    displayName: 'Press Kit';
  };
  attributes: {
    cta_file: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    cta_file_alt: Schema.Attribute.String;
    cta_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Download Press Kit (.ZIP)'>;
    file_info: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    menus: Schema.Attribute.Component<'news.press-menu', true>;
    subtitle: Schema.Attribute.Text;
  };
}

export interface NewsPressMenu extends Struct.ComponentSchema {
  collectionName: 'components_news_press_menus';
  info: {
    description: 'Press kit menu item';
    displayName: 'Press Menu';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PartnersBecome extends Struct.ComponentSchema {
  collectionName: 'components_partners_becomes';
  info: {
    description: 'Partners \u201CBecome a Partner\u201D section';
    displayName: 'Become';
  };
  attributes: {
    benefits: Schema.Attribute.Component<'partners.become-benefit', true>;
    form_capabilities_label: Schema.Attribute.String;
    form_company_label: Schema.Attribute.String;
    form_confirmation: Schema.Attribute.String;
    form_email_label: Schema.Attribute.String;
    form_experience_label: Schema.Attribute.String;
    form_name_label: Schema.Attribute.String;
    form_region_label: Schema.Attribute.String;
    form_submit_label: Schema.Attribute.String;
    form_title: Schema.Attribute.String;
    form_website_label: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    looking_for_chips: Schema.Attribute.Component<'shared.tag', true>;
    looking_for_description: Schema.Attribute.Text;
    looking_for_title: Schema.Attribute.String;
    secondary_cta: Schema.Attribute.Component<'shared.button', false>;
    subheading: Schema.Attribute.Text;
    tag: Schema.Attribute.Component<'shared.tag', false>;
  };
}

export interface PartnersBecomeBenefit extends Struct.ComponentSchema {
  collectionName: 'components_partners_become_benefits';
  info: {
    description: 'Partners \u201CBecome a Partner\u201D benefit \u2014 icon stays hardcoded in the frontend';
    displayName: 'Become Benefit';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PartnersBenefitCard extends Struct.ComponentSchema {
  collectionName: 'components_partners_benefit_cards';
  info: {
    description: 'Partners benefit card \u2014 icon stays hardcoded in the frontend';
    displayName: 'Benefit Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PartnersBenefits extends Struct.ComponentSchema {
  collectionName: 'components_partners_benefits';
  info: {
    description: 'Partners \u201CThe Payoff\u201D section';
    displayName: 'Benefits';
  };
  attributes: {
    bridge: Schema.Attribute.String;
    cards: Schema.Attribute.Component<'partners.benefit-card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subheading: Schema.Attribute.Text;
    tag: Schema.Attribute.Component<'shared.tag', false>;
  };
}

export interface PartnersCapabilities extends Struct.ComponentSchema {
  collectionName: 'components_partners_capabilities';
  info: {
    description: 'Partners \u201CThe Ecosystem\u201D section';
    displayName: 'Capabilities';
  };
  attributes: {
    bridge: Schema.Attribute.String;
    cards: Schema.Attribute.Component<'partners.capability', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subheading: Schema.Attribute.Text;
    tag: Schema.Attribute.Component<'shared.tag', false>;
  };
}

export interface PartnersCapability extends Struct.ComponentSchema {
  collectionName: 'components_partners_capability_cards';
  info: {
    description: 'Partner capability category \u2014 short is the join key used by directory partners, filters and forms';
    displayName: 'Capability';
  };
  attributes: {
    description: Schema.Attribute.Text;
    short: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PartnersDirectory extends Struct.ComponentSchema {
  collectionName: 'components_partners_directories';
  info: {
    description: 'Partners directory section';
    displayName: 'Directory';
  };
  attributes: {
    bridge: Schema.Attribute.String;
    connect_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Connect'>;
    expanding_description: Schema.Attribute.Text;
    expanding_title: Schema.Attribute.String;
    filter_all_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'All'>;
    filter_capability_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Filter by Capability'>;
    filter_region_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Filter by Region'>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    no_match_cta: Schema.Attribute.Component<'shared.button', false>;
    no_match_message: Schema.Attribute.Text;
    partners: Schema.Attribute.Component<'partners.partner', true>;
    subheading: Schema.Attribute.Text;
    tag: Schema.Attribute.Component<'shared.tag', false>;
  };
}

export interface PartnersFooterCtas extends Struct.ComponentSchema {
  collectionName: 'components_partners_footer_ctas';
  info: {
    description: 'Partners footer call-to-action banner';
    displayName: 'Footer CTAs';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    primary_cta: Schema.Attribute.Component<'shared.button', false>;
    secondary_cta: Schema.Attribute.Component<'shared.button', false>;
  };
}

export interface PartnersHero extends Struct.ComponentSchema {
  collectionName: 'components_partners_heroes';
  info: {
    description: 'Partners hero section';
    displayName: 'Hero';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    primary_cta: Schema.Attribute.Component<'shared.button', false>;
    secondary_cta: Schema.Attribute.Component<'shared.button', false>;
    subtitle: Schema.Attribute.Text;
    tag: Schema.Attribute.Component<'shared.tag', false>;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface PartnersJourneyStep extends Struct.ComponentSchema {
  collectionName: 'components_partners_journey_steps';
  info: {
    description: 'Partners journey step \u2014 icon stays hardcoded in the frontend';
    displayName: 'Journey Step';
  };
  attributes: {
    description: Schema.Attribute.Text;
    number: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PartnersMatchForm extends Struct.ComponentSchema {
  collectionName: 'components_partners_match_forms';
  info: {
    description: 'Partners \u201CGet Matched\u201D section';
    displayName: 'Match Form';
  };
  attributes: {
    company_label: Schema.Attribute.String;
    confirmation: Schema.Attribute.String;
    email_hint: Schema.Attribute.Text;
    email_label: Schema.Attribute.String;
    first_name_label: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    help_areas_label: Schema.Attribute.String;
    last_name_label: Schema.Attribute.String;
    message_label: Schema.Attribute.String;
    region_label: Schema.Attribute.String;
    subheading: Schema.Attribute.Text;
    submit_label: Schema.Attribute.String & Schema.Attribute.Required;
    tag: Schema.Attribute.Component<'shared.tag', false>;
  };
}

export interface PartnersPartner extends Struct.ComponentSchema {
  collectionName: 'components_partners_partners';
  info: {
    description: 'Directory partner entry \u2014 logo/icon stays hardcoded in the frontend';
    displayName: 'Partner';
  };
  attributes: {
    badges: Schema.Attribute.Component<'shared.tag', true>;
    capability: Schema.Attribute.String & Schema.Attribute.Required;
    monogram: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 4;
      }>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    one_liner: Schema.Attribute.Text;
    region: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PartnersProof extends Struct.ComponentSchema {
  collectionName: 'components_partners_proofs';
  info: {
    description: 'Partners \u201CGPX-Native Proof\u201D section';
    displayName: 'Proof';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    links: Schema.Attribute.Component<'shared.link', true>;
    points: Schema.Attribute.Component<'partners.proof-point', true>;
    subheading: Schema.Attribute.Text;
    tag: Schema.Attribute.Component<'shared.tag', false>;
  };
}

export interface PartnersProofPoint extends Struct.ComponentSchema {
  collectionName: 'components_partners_proof_points';
  info: {
    description: 'Partners proof point \u2014 icon stays hardcoded in the frontend';
    displayName: 'Proof Point';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface PartnersWhy extends Struct.ComponentSchema {
  collectionName: 'components_partners_whies';
  info: {
    description: 'Partners \u201CThe Why\u201D section';
    displayName: 'Why';
  };
  attributes: {
    body: Schema.Attribute.Text;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    journey: Schema.Attribute.Component<'partners.journey-step', true>;
    legend_gap: Schema.Attribute.String;
    legend_strong: Schema.Attribute.String;
    subheading: Schema.Attribute.Text;
    tag: Schema.Attribute.Component<'shared.tag', false>;
  };
}

export interface ProductsAlwaysOn extends Struct.ComponentSchema {
  collectionName: 'components_products_always_ons';
  info: {
    description: 'Products always-on section';
    displayName: 'Always On';
  };
  attributes: {
    ai_core_icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    alt: Schema.Attribute.String;
    bg_subconscious_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    bg_surge_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    host_cpu_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    stats: Schema.Attribute.Component<'products.alwayson-stat', true>;
    subtitle: Schema.Attribute.Text;
  };
}

export interface ProductsAlwaysonStat extends Struct.ComponentSchema {
  collectionName: 'components_products_alwayson_stats';
  info: {
    description: 'Always-on mode statistic';
    displayName: 'Always On Stat';
  };
  attributes: {
    alt: Schema.Attribute.String;
    badge: Schema.Attribute.String;
    stat_icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title_lines: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ProductsArchitecture extends Struct.ComponentSchema {
  collectionName: 'components_products_architectures';
  info: {
    description: 'Products architecture section \u2014 Figma 3713:1965';
    displayName: 'Architecture';
  };
  attributes: {
    alt: Schema.Attribute.String;
    caption: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'The Hardware Blueprint'>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Architecture'>;
    stats: Schema.Attribute.Component<'shared.stat', true>;
    subtitle: Schema.Attribute.Text;
  };
}

export interface ProductsBenchCard extends Struct.ComponentSchema {
  collectionName: 'components_products_bench_cards';
  info: {
    description: 'Bench to volume card';
    displayName: 'Bench Card';
  };
  attributes: {
    chip_label: Schema.Attribute.String;
    cta_href: Schema.Attribute.String;
    cta_label: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductsBenchToVolume extends Struct.ComponentSchema {
  collectionName: 'components_products_bench_to_volumes';
  info: {
    description: 'Products bench to volume section';
    displayName: 'Bench To Volume';
  };
  attributes: {
    cards: Schema.Attribute.Component<'products.bench-card', true>;
    chip_label: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface ProductsCaseStudies extends Struct.ComponentSchema {
  collectionName: 'components_products_case_studies';
  info: {
    description: '';
    displayName: 'Case Studies';
    icon: 'layer';
  };
  attributes: {
    cards: Schema.Attribute.Component<'products.case-study-card', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ProductsCaseStudyCard extends Struct.ComponentSchema {
  collectionName: 'components_products_case_study_cards';
  info: {
    description: 'A single case study card to display on the Products page';
    displayName: 'Case Study Card';
    icon: 'layer';
  };
  attributes: {
    context: Schema.Attribute.Text & Schema.Attribute.Required;
    cta_href: Schema.Attribute.String;
    cta_label: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    oversizedResult: Schema.Attribute.String & Schema.Attribute.Required;
    tag: Schema.Attribute.String;
  };
}

export interface ProductsFeatureCard extends Struct.ComponentSchema {
  collectionName: 'components_products_feature_cards';
  info: {
    description: 'Products feature card';
    displayName: 'Feature Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductsFeatures extends Struct.ComponentSchema {
  collectionName: 'components_products_features';
  info: {
    description: 'Products features section';
    displayName: 'Features';
  };
  attributes: {
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    feature_cards: Schema.Attribute.Component<'products.feature-card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface ProductsFullPicture extends Struct.ComponentSchema {
  collectionName: 'components_products_full_pictures';
  info: {
    description: 'Products full picture section';
    displayName: 'Full Picture';
  };
  attributes: {
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    callouts: Schema.Attribute.Component<'products.spec-callout', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface ProductsHero extends Struct.ComponentSchema {
  collectionName: 'components_products_heroes';
  info: {
    description: 'Products hero section';
    displayName: 'Hero';
  };
  attributes: {
    chipset_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    chipset_image_alt: Schema.Attribute.String;
    chipset_image_mobile: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    primary_button: Schema.Attribute.Component<'shared.button', false>;
    secondary_button: Schema.Attribute.Component<'shared.button', false>;
    subtitle: Schema.Attribute.Text;
    tags: Schema.Attribute.Component<'shared.tag', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductsMeasured extends Struct.ComponentSchema {
  collectionName: 'components_products_measureds';
  info: {
    description: 'Products measured section \u2014 three spec cards + CTAs';
    displayName: 'Measured';
  };
  attributes: {
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    cards: Schema.Attribute.Component<'products.measured-card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    primary_button: Schema.Attribute.Component<'shared.button', false>;
    secondary_button: Schema.Attribute.Component<'shared.button', false>;
    subtitle: Schema.Attribute.Text;
    tag: Schema.Attribute.Component<'shared.tag', false>;
  };
}

export interface ProductsMeasuredCard extends Struct.ComponentSchema {
  collectionName: 'components_products_measured_cards';
  info: {
    description: 'Measured section spec card (chip image + stat rows)';
    displayName: 'Measured Card';
  };
  attributes: {
    chip_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    stats: Schema.Attribute.Component<'products.measured-stat', true>;
    variant: Schema.Attribute.Enumeration<['gpx10', 'risc_mcu', 'mcu_npu']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'gpx10'>;
  };
}

export interface ProductsMeasuredStat extends Struct.ComponentSchema {
  collectionName: 'components_products_measured_stats';
  info: {
    description: 'Icon + label + value row inside a measured card';
    displayName: 'Measured Stat';
  };
  attributes: {
    icon: Schema.Attribute.Enumeration<['speed', 'energy', 'eco']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'speed'>;
    is_green: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    is_medium: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductsModelforge extends Struct.ComponentSchema {
  collectionName: 'components_products_modelforges';
  info: {
    description: 'Products ModelForge section';
    displayName: 'ModelForge';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    primary_button: Schema.Attribute.Component<'shared.button', false>;
    secondary_button: Schema.Attribute.Component<'shared.button', false>;
    steps: Schema.Attribute.Component<'products.modelforge-step', true>;
    subfeatures: Schema.Attribute.Component<
      'products.modelforge-subfeature',
      true
    >;
    subtitle: Schema.Attribute.Text;
  };
}

export interface ProductsModelforgeStep extends Struct.ComponentSchema {
  collectionName: 'components_products_modelforge_steps';
  info: {
    description: 'ModelForge pipeline step';
    displayName: 'ModelForge Step';
  };
  attributes: {
    cta_href: Schema.Attribute.String;
    cta_label: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    step: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductsModelforgeSubfeature extends Struct.ComponentSchema {
  collectionName: 'components_products_modelforge_subfeatures';
  info: {
    description: 'Subfeature for the ModelForge section';
    displayName: 'ModelForge Subfeature';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ProductsSpecCallout extends Struct.ComponentSchema {
  collectionName: 'components_products_spec_callouts';
  info: {
    description: 'A card containing a list of spec bullet points for the Full Picture section';
    displayName: 'Full Picture Spec Card';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    items: Schema.Attribute.Text;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductsStartBuilding extends Struct.ComponentSchema {
  collectionName: 'components_products_start_buildings';
  info: {
    description: 'Products start building section';
    displayName: 'Start Building';
  };
  attributes: {
    alt: Schema.Attribute.String;
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    cards: Schema.Attribute.Component<'products.start-card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface ProductsStartCard extends Struct.ComponentSchema {
  collectionName: 'components_products_start_cards';
  info: {
    description: 'Start building CTA card';
    displayName: 'Start Card';
  };
  attributes: {
    cta_href: Schema.Attribute.String;
    cta_label: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    title_lines: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ProductsStickyNavItem extends Struct.ComponentSchema {
  collectionName: 'components_products_sticky_nav_items';
  info: {
    description: 'Item of the white bottom toggle on the products page. Section target is assigned automatically by page order.';
    displayName: 'Sticky Nav Item';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductsUseCases extends Struct.ComponentSchema {
  collectionName: 'components_products_use_cases';
  info: {
    description: 'Products use cases section';
    displayName: 'Use Cases';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    primary_button: Schema.Attribute.Component<'shared.button', false>;
    secondary_button: Schema.Attribute.Component<'shared.button', false>;
    subtitle: Schema.Attribute.Text;
    tabs: Schema.Attribute.Component<'products.usecase-tab', true>;
  };
}

export interface ProductsUsecaseCard extends Struct.ComponentSchema {
  collectionName: 'components_products_usecase_cards';
  info: {
    description: 'Products use case card';
    displayName: 'Use Case Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductsUsecaseTab extends Struct.ComponentSchema {
  collectionName: 'components_products_usecase_tabs';
  info: {
    description: 'Products use case tab';
    displayName: 'Use Case Tab';
  };
  attributes: {
    alt: Schema.Attribute.String;
    feature_cards: Schema.Attribute.Component<'products.usecase-card', true>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    watermark_text: Schema.Attribute.String;
  };
}

export interface ResourcesBuilding extends Struct.ComponentSchema {
  collectionName: 'components_resources_buildings';
  info: {
    description: 'Resources building section';
    displayName: 'Building';
  };
  attributes: {
    cta_href: Schema.Attribute.String;
    cta_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Go to Developer Hub'>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface ResourcesCategory extends Struct.ComponentSchema {
  collectionName: 'components_resources_categories';
  info: {
    description: 'Resource category filter';
    displayName: 'Category';
  };
  attributes: {
    category_id: Schema.Attribute.String & Schema.Attribute.Required;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ResourcesContent extends Struct.ComponentSchema {
  collectionName: 'components_resources_contents';
  info: {
    description: 'Resources content section';
    displayName: 'Content';
  };
  attributes: {
    categories: Schema.Attribute.Component<'resources.category', true>;
    initial_visible: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<6>;
    load_more_count: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<3>;
    load_more_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Load More Resources'>;
  };
}

export interface ResourcesFeatured extends Struct.ComponentSchema {
  collectionName: 'components_resources_featureds';
  info: {
    description: 'Resources featured section';
    displayName: 'Featured';
  };
  attributes: {
    cards: Schema.Attribute.Component<'resources.featured-card', true>;
    heading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Featured Resources'>;
  };
}

export interface ResourcesFeaturedCard extends Struct.ComponentSchema {
  collectionName: 'components_resources_featured_cards';
  info: {
    description: 'Featured resource card';
    displayName: 'Featured Card';
  };
  attributes: {
    badge_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'WHITEPAPER'>;
    badge_variant: Schema.Attribute.Enumeration<['white', 'stacked']> &
      Schema.Attribute.DefaultTo<'white'>;
    cta_href: Schema.Attribute.String;
    cta_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Download PDF'>;
    description: Schema.Attribute.Text;
    enable_download_popup: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image_alt: Schema.Attribute.String;
    pdf_file: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    pdf_file_alt: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ResourcesHero extends Struct.ComponentSchema {
  collectionName: 'components_resources_heroes';
  info: {
    description: 'Resources hero section';
    displayName: 'Hero';
  };
  attributes: {
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    background_image_alt: Schema.Attribute.String;
    contact_link_href: Schema.Attribute.String;
    contact_link_text: Schema.Attribute.String;
    mobile_background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    mobile_background_image_alt: Schema.Attribute.String;
    search_button_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Search'>;
    search_placeholder: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ResourcesNewsCta extends Struct.ComponentSchema {
  collectionName: 'components_resources_news_ctas';
  info: {
    description: 'Resources news CTA section';
    displayName: 'News CTA';
  };
  attributes: {
    cta_href: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/news-listing'>;
    cta_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Visit News Page'>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedBrand extends Struct.ComponentSchema {
  collectionName: 'components_shared_brands';
  info: {
    description: 'Site brand identity';
    displayName: 'Brand';
  };
  attributes: {
    favicon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    favicon_alt: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    logo_alt: Schema.Attribute.String;
    logo_mobile: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    logo_mobile_alt: Schema.Attribute.String;
    site_name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }> &
      Schema.Attribute.DefaultTo<'Ambient Scientific'>;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    description: 'Action button';
    displayName: 'Button';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<['primary', 'secondary', 'ghost']> &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedContactDetails extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_details';
  info: {
    description: 'Global contact information';
    displayName: 'Contact Details';
  };
  attributes: {
    email: Schema.Attribute.Email &
      Schema.Attribute.DefaultTo<'contact@ambientscientific.com'>;
    locations: Schema.Attribute.Component<'shared.location', true>;
    phone: Schema.Attribute.String;
  };
}

export interface SharedCta extends Struct.ComponentSchema {
  collectionName: 'components_shared_ctas';
  info: {
    description: 'Call-to-action with optional icon';
    displayName: 'CTA';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFooter extends Struct.ComponentSchema {
  collectionName: 'components_shared_footers';
  info: {
    description: 'Site-wide footer';
    displayName: 'Footer';
  };
  attributes: {
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    background_image_alt: Schema.Attribute.String;
    copyright_text: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'\u00A9 2026 Ambient AI. All rights reserved.'>;
    crafted_by_logo: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    crafted_by_logo_alt: Schema.Attribute.String;
    crafted_by_text: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Carefully crafted by'>;
    legal_links: Schema.Attribute.Component<'shared.link', true>;
    nav_sections: Schema.Attribute.Component<'shared.footer-section', true>;
    social_links: Schema.Attribute.Component<'shared.social-link', true>;
  };
}

export interface SharedFooterSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_footer_sections';
  info: {
    description: 'One footer column with links';
    displayName: 'Footer Section';
  };
  attributes: {
    links: Schema.Attribute.Component<'shared.link', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedHeader extends Struct.ComponentSchema {
  collectionName: 'components_shared_headers';
  info: {
    description: 'Main navigation bar';
    displayName: 'Header';
  };
  attributes: {
    alt: Schema.Attribute.String;
    cta_dot_icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    cta_href: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'/contact'>;
    cta_label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'GET IN TOUCH'>;
    nav_items: Schema.Attribute.Component<'shared.nav-item', true> &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
  };
}

export interface SharedLeader extends Struct.ComponentSchema {
  collectionName: 'components_shared_leaders';
  info: {
    description: 'Team member or advisor';
    displayName: 'Leader';
  };
  attributes: {
    alt: Schema.Attribute.String;
    bio_paragraphs: Schema.Attribute.Text;
    linkedin_url: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    photo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    description: 'Simple link';
    displayName: 'Link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLocation extends Struct.ComponentSchema {
  collectionName: 'components_shared_locations';
  info: {
    description: 'Office location';
    displayName: 'Location';
  };
  attributes: {
    address: Schema.Attribute.Text & Schema.Attribute.Required;
    alt: Schema.Attribute.String;
    indicator_icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMegaColumn extends Struct.ComponentSchema {
  collectionName: 'components_shared_mega_columns';
  info: {
    description: 'Products mega-menu dropdown column (title, description, links, CTA)';
    displayName: 'Mega Menu Column';
  };
  attributes: {
    cta_href: Schema.Attribute.String;
    cta_label: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    links: Schema.Attribute.Component<'shared.nav-sub-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedNavItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_items';
  info: {
    description: 'Navigation link';
    displayName: 'Nav Item';
  };
  attributes: {
    children: Schema.Attribute.Component<'shared.nav-sub-item', true>;
    has_dropdown: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    highlight: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    mega_columns: Schema.Attribute.Component<'shared.mega-column', true>;
  };
}

export interface SharedNavSubItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_sub_items';
  info: {
    description: 'Navigation submenu link';
    displayName: 'Nav Sub Item';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedNewsletter extends Struct.ComponentSchema {
  collectionName: 'components_shared_newsletters';
  info: {
    description: 'Newsletter signup block';
    displayName: 'Newsletter';
  };
  attributes: {
    alt: Schema.Attribute.String;
    button_label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'SUBSCRIBE'>;
    heading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Want to stay in the forefront of AI tech.'>;
    input_placeholder: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Your Email ID'>;
    show_on_paths: Schema.Attribute.JSON;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Sign up to receive regular updates.'>;
    texture_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seo';
  info: {
    description: 'Per-page SEO metadata. Leave empty to use Global defaults.';
    displayName: 'SEO';
  };
  attributes: {
    canonical_url: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    meta_description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    meta_title: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    noindex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: 'Social media platform link';
    displayName: 'Social Link';
  };
  attributes: {
    alt: Schema.Attribute.String;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    platform: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_stats';
  info: {
    description: 'Single statistic';
    displayName: 'Stat';
  };
  attributes: {
    alt: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    stat_icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    value: Schema.Attribute.String;
  };
}

export interface SharedStatCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_stat_cards';
  info: {
    description: 'Metric card with image';
    displayName: 'Stat Card';
  };
  attributes: {
    alt: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    metric: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTag extends Struct.ComponentSchema {
  collectionName: 'components_shared_tags';
  info: {
    description: 'Eyebrow label above headings';
    displayName: 'Tag';
  };
  attributes: {
    text: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
      }>;
  };
}

export interface SomDeployPath extends Struct.ComponentSchema {
  collectionName: 'components_som_deploy_paths';
  info: {
    description: 'Validate on NuraSense, deploy on SOM section';
    displayName: 'Deploy Path';
  };
  attributes: {
    cards: Schema.Attribute.Component<'som.deploy-path-card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    primary_button: Schema.Attribute.Component<'shared.button', false>;
    secondary_button_label: Schema.Attribute.String;
    secondary_button_link: Schema.Attribute.String;
    subheading: Schema.Attribute.Text;
  };
}

export interface SomDeployPathCard extends Struct.ComponentSchema {
  collectionName: 'components_som_deploy_path_cards';
  info: {
    description: 'Card for the deploy path section';
    displayName: 'Deploy Path Card';
  };
  attributes: {
    badge_label: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Available'>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image_overlay_label: Schema.Attribute.String;
    is_available: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SomEcosystem extends Struct.ComponentSchema {
  collectionName: 'components_som_ecosystems';
  info: {
    description: 'SOM ecosystem section';
    displayName: 'Ecosystem';
  };
  attributes: {
    cards: Schema.Attribute.Component<'som.ecosystem-card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface SomEcosystemCard extends Struct.ComponentSchema {
  collectionName: 'components_som_ecosystem_cards';
  info: {
    description: 'SOM ecosystem product card';
    displayName: 'Ecosystem Card';
  };
  attributes: {
    cta_label: Schema.Attribute.String;
    status: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SomFamily extends Struct.ComponentSchema {
  collectionName: 'components_som_families';
  info: {
    description: 'GPX10 PRO SOM FAMILY section (One core. Two ways to connect.)';
    displayName: 'SOM Family Section';
  };
  attributes: {
    cards: Schema.Attribute.Component<'som.family-card', true>;
    subtitle: Schema.Attribute.Text;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SomFamilyCard extends Struct.ComponentSchema {
  collectionName: 'components_som_family_cards';
  info: {
    description: 'Individual SOM product card (e.g. SOM BLE)';
    displayName: 'SOM Family Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    features: Schema.Attribute.Component<'som.family-feature', true>;
    footerText: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SomFamilyFeature extends Struct.ComponentSchema {
  collectionName: 'components_som_family_features';
  info: {
    description: "Small feature item for the 'What's inside' section";
    displayName: 'SOM Family Feature';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SomFeatureCard extends Struct.ComponentSchema {
  collectionName: 'components_som_feature_cards';
  info: {
    description: 'SOM feature card';
    displayName: 'Feature Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SomFeatures extends Struct.ComponentSchema {
  collectionName: 'components_som_features';
  info: {
    description: 'SOM features section';
    displayName: 'Features';
  };
  attributes: {
    cards: Schema.Attribute.Component<'som.feature-card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface SomFooterMerge extends Struct.ComponentSchema {
  collectionName: 'components_som_footer_merges';
  info: {
    description: 'SOM footer merge section';
    displayName: 'Footer Merge';
  };
  attributes: {
    cta_label: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface SomHero extends Struct.ComponentSchema {
  collectionName: 'components_som_heroes';
  info: {
    description: 'SOM hero section';
    displayName: 'Hero';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    primary_button: Schema.Attribute.Component<'shared.button', false>;
    secondary_button: Schema.Attribute.Component<'shared.button', false>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SomInsideModule extends Struct.ComponentSchema {
  collectionName: 'components_som_inside_modules';
  info: {
    description: 'SOM inside module section';
    displayName: 'Inside Module';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String;
    specs: Schema.Attribute.Component<'som.spec', true>;
    subtitle: Schema.Attribute.Text;
  };
}

export interface SomIntelligence extends Struct.ComponentSchema {
  collectionName: 'components_som_intelligences';
  info: {
    description: 'SOM intelligence section';
    displayName: 'Intelligence';
  };
  attributes: {
    cards: Schema.Attribute.Component<'som.intelligence-card', true>;
    cta_href: Schema.Attribute.String;
    cta_label: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface SomIntelligenceCard extends Struct.ComponentSchema {
  collectionName: 'components_som_intelligence_cards';
  info: {
    description: 'SOM intelligence card';
    displayName: 'Intelligence Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SomPrototypeCard extends Struct.ComponentSchema {
  collectionName: 'components_som_prototype_cards';
  info: {
    description: 'SOM prototype card';
    displayName: 'Prototype Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SomPrototypes extends Struct.ComponentSchema {
  collectionName: 'components_som_prototypes';
  info: {
    description: 'SOM prototype section';
    displayName: 'Prototype';
  };
  attributes: {
    cards: Schema.Attribute.Component<'som.prototype-card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subheading: Schema.Attribute.Text;
  };
}

export interface SomReadyToDeploy extends Struct.ComponentSchema {
  collectionName: 'components_som_ready_to_deploys';
  info: {
    description: 'SOM ready to deploy section';
    displayName: 'Ready To Deploy';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    primary_cta_label: Schema.Attribute.String;
    primary_cta_link: Schema.Attribute.String;
    primary_title: Schema.Attribute.String;
    secondary_cta_label: Schema.Attribute.String;
    secondary_cta_link: Schema.Attribute.String;
    secondary_text: Schema.Attribute.Text;
    subtitle: Schema.Attribute.Text;
  };
}

export interface SomSpec extends Struct.ComponentSchema {
  collectionName: 'components_som_specs';
  info: {
    description: 'SOM module spec';
    displayName: 'Spec';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String;
  };
}

export interface TechArchitecture extends Struct.ComponentSchema {
  collectionName: 'components_tech_architectures';
  info: {
    description: 'Technology architecture section';
    displayName: 'Architecture';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface TechBottomCta extends Struct.ComponentSchema {
  collectionName: 'components_tech_bottom_ctas';
  info: {
    description: 'Technology bottom CTA section';
    displayName: 'Bottom CTA';
  };
  attributes: {
    cards: Schema.Attribute.Component<'products.start-card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface TechEfficiency extends Struct.ComponentSchema {
  collectionName: 'components_tech_efficiencies';
  info: {
    description: 'Technology efficiency section';
    displayName: 'Efficiency';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface TechGraph extends Struct.ComponentSchema {
  collectionName: 'components_tech_graphs';
  info: {
    description: 'Technology scale graph section';
    displayName: 'Graph';
  };
  attributes: {
    axis_label_left: Schema.Attribute.String;
    axis_label_right: Schema.Attribute.String;
    center_text: Schema.Attribute.Text;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    labels: Schema.Attribute.Component<'tech.graph-label', true>;
    primary_button: Schema.Attribute.Component<'shared.button', false>;
    secondary_button: Schema.Attribute.Component<'shared.button', false>;
    subtitle: Schema.Attribute.Text;
  };
}

export interface TechGraphLabel extends Struct.ComponentSchema {
  collectionName: 'components_tech_graph_labels';
  info: {
    description: 'Scale graph label';
    displayName: 'Graph Label';
  };
  attributes: {
    bottom_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    sub_label: Schema.Attribute.String;
    top_image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface TechHero extends Struct.ComponentSchema {
  collectionName: 'components_tech_heroes';
  info: {
    description: 'Technology hero section';
    displayName: 'Hero';
  };
  attributes: {
    hero_object: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    primary_button: Schema.Attribute.Component<'shared.button', false>;
    secondary_button: Schema.Attribute.Component<'shared.button', false>;
    subtitle: Schema.Attribute.Text;
    tag: Schema.Attribute.Component<'shared.tag', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TechModeCard extends Struct.ComponentSchema {
  collectionName: 'components_tech_mode_cards';
  info: {
    description: 'AI mode description card';
    displayName: 'Mode Card';
  };
  attributes: {
    bullets: Schema.Attribute.Text;
    caption: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TechModeLabel extends Struct.ComponentSchema {
  collectionName: 'components_tech_mode_labels';
  info: {
    description: 'AI mode toggle label';
    displayName: 'Mode Label';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    sublabel: Schema.Attribute.String;
  };
}

export interface TechModes extends Struct.ComponentSchema {
  collectionName: 'components_tech_modes';
  info: {
    description: 'Technology modes section';
    displayName: 'Modes';
  };
  attributes: {
    bottom_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    mode_cards: Schema.Attribute.Component<'tech.mode-card', true>;
    mode_labels: Schema.Attribute.Component<'tech.mode-label', true>;
    subtitle: Schema.Attribute.Text;
    tag: Schema.Attribute.Component<'shared.tag', false>;
    top_image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface TechPillar extends Struct.ComponentSchema {
  collectionName: 'components_tech_pillars';
  info: {
    description: 'A-Cube pillar (CubicCore, SenseMesh, ModelForge)';
    displayName: 'Pillar';
  };
  attributes: {
    bullets: Schema.Attribute.Text;
    cta: Schema.Attribute.Component<'shared.button', false>;
    description: Schema.Attribute.Text;
    subtitle: Schema.Attribute.String;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TechPillars extends Struct.ComponentSchema {
  collectionName: 'components_tech_pillars_groups';
  info: {
    description: 'Technology pillars section';
    displayName: 'Pillars';
  };
  attributes: {
    pillars: Schema.Attribute.Component<'tech.pillar', true>;
  };
}

export interface TechProblem extends Struct.ComponentSchema {
  collectionName: 'components_tech_problems';
  info: {
    description: 'Technology problem section';
    displayName: 'Problem';
  };
  attributes: {
    acube_stats: Schema.Attribute.Component<'tech.stat-row', true>;
    comparison_cards: Schema.Attribute.Component<'tech.problem-card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    legacy_stats: Schema.Attribute.Component<'tech.stat-row', true>;
    stat_description: Schema.Attribute.Text;
    stat_value: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    tag: Schema.Attribute.Component<'shared.tag', false>;
  };
}

export interface TechProblemCard extends Struct.ComponentSchema {
  collectionName: 'components_tech_problem_cards';
  info: {
    description: 'Legacy vs A-Cube comparison card';
    displayName: 'Problem Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TechSilicon extends Struct.ComponentSchema {
  collectionName: 'components_tech_silicons';
  info: {
    description: 'Technology silicon section';
    displayName: 'Silicon';
  };
  attributes: {
    chip_background: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    cta: Schema.Attribute.Component<'shared.button', false>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    stat_cards: Schema.Attribute.Component<'tech.silicon-stat', true>;
    subtitle: Schema.Attribute.Text;
    tag: Schema.Attribute.Component<'shared.tag', false>;
  };
}

export interface TechSiliconStat extends Struct.ComponentSchema {
  collectionName: 'components_tech_silicon_stats';
  info: {
    description: 'Silicon proven stat';
    displayName: 'Silicon Stat';
  };
  attributes: {
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String;
    unit: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TechStatRow extends Struct.ComponentSchema {
  collectionName: 'components_tech_stat_rows';
  info: {
    description: 'A single statistic row';
    displayName: 'Stat Row';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
    valueColor: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#ffffff'>;
  };
}

export interface WearablesCarousel extends Struct.ComponentSchema {
  collectionName: 'components_wearables_carousels';
  info: {
    description: 'Wearables marquee carousel';
    displayName: 'Carousel';
  };
  attributes: {
    alt: Schema.Attribute.String;
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface WearablesEcgCard extends Struct.ComponentSchema {
  collectionName: 'components_wearables_ecg_cards';
  info: {
    description: 'ECG stat card';
    displayName: 'ECG Card';
  };
  attributes: {
    badge: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label: Schema.Attribute.String;
    stat: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface WearablesEmpiricalProof extends Struct.ComponentSchema {
  collectionName: 'components_wearables_empirical_proofs';
  info: {
    description: 'Wearables empirical proof section';
    displayName: 'Empirical Proof';
  };
  attributes: {
    ecg_cards: Schema.Attribute.Component<'wearables.ecg-card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    health_card: Schema.Attribute.Component<'wearables.health-card', false>;
    power_card: Schema.Attribute.Component<'wearables.power-card', false>;
    subtitle: Schema.Attribute.Text;
    workload_card: Schema.Attribute.Component<'wearables.workload-card', false>;
  };
}

export interface WearablesFooterAccent extends Struct.ComponentSchema {
  collectionName: 'components_wearables_footer_accents';
  info: {
    description: 'Wearables footer accent section';
    displayName: 'Footer Accent';
  };
  attributes: {
    alt: Schema.Attribute.String;
    divider_shape: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    panels: Schema.Attribute.Component<'wearables.footer-panel', true>;
  };
}

export interface WearablesFooterPanel extends Struct.ComponentSchema {
  collectionName: 'components_wearables_footer_panels';
  info: {
    description: 'Wearables footer accent panel';
    displayName: 'Footer Panel';
  };
  attributes: {
    body: Schema.Attribute.Text;
    cta_label: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface WearablesHealthCard extends Struct.ComponentSchema {
  collectionName: 'components_wearables_health_cards';
  info: {
    description: 'Health monitoring card';
    displayName: 'Health Card';
  };
  attributes: {
    badge: Schema.Attribute.String;
    body: Schema.Attribute.Text;
    cta_label: Schema.Attribute.String;
    footer: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface WearablesHero extends Struct.ComponentSchema {
  collectionName: 'components_wearables_heroes';
  info: {
    description: 'Wearables hero section';
    displayName: 'Hero';
  };
  attributes: {
    background_image_1: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    background_image_1_alt: Schema.Attribute.String;
    background_image_2: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    background_image_2_alt: Schema.Attribute.String;
    primary_button: Schema.Attribute.Component<'shared.button', false>;
    secondary_button: Schema.Attribute.Component<'shared.button', false>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    watermark: Schema.Attribute.String;
  };
}

export interface WearablesLabCard extends Struct.ComponentSchema {
  collectionName: 'components_wearables_lab_cards';
  info: {
    description: 'Lab to product step card';
    displayName: 'Lab Card';
  };
  attributes: {
    cta_href: Schema.Attribute.String;
    cta_label: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    step: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface WearablesLabToProduct extends Struct.ComponentSchema {
  collectionName: 'components_wearables_lab_to_products';
  info: {
    description: 'Wearables lab to product section';
    displayName: 'Lab To Product';
  };
  attributes: {
    cards: Schema.Attribute.Component<'wearables.lab-card', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface WearablesParadigm extends Struct.ComponentSchema {
  collectionName: 'components_wearables_paradigms';
  info: {
    description: 'Wearables paradigm shift section';
    displayName: 'Paradigm';
  };
  attributes: {
    cards: Schema.Attribute.Component<'wearables.paradigm-card', true>;
    chip_label: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text;
  };
}

export interface WearablesParadigmCard extends Struct.ComponentSchema {
  collectionName: 'components_wearables_paradigm_cards';
  info: {
    description: 'Legacy vs Ambient paradigm card';
    displayName: 'Paradigm Card';
  };
  attributes: {
    background_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    body: Schema.Attribute.Text;
    stat_desc: Schema.Attribute.Text;
    stat_value: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface WearablesPowerCard extends Struct.ComponentSchema {
  collectionName: 'components_wearables_power_cards';
  info: {
    description: 'Power consumption card';
    displayName: 'Power Card';
  };
  attributes: {
    badge: Schema.Attribute.String;
    panels: Schema.Attribute.Component<'wearables.power-panel', true>;
  };
}

export interface WearablesPowerPanel extends Struct.ComponentSchema {
  collectionName: 'components_wearables_power_panels';
  info: {
    description: 'Power consumption panel';
    displayName: 'Power Panel';
  };
  attributes: {
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String;
  };
}

export interface WearablesSubconscious extends Struct.ComponentSchema {
  collectionName: 'components_wearables_subconsciouss';
  info: {
    description: 'Wearables subconscious section';
    displayName: 'Subconscious';
  };
  attributes: {
    alt: Schema.Attribute.String;
    card_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    card_title: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    overlay_text: Schema.Attribute.String;
    right_cards: Schema.Attribute.Component<
      'wearables.subconscious-card',
      true
    >;
    subtitle: Schema.Attribute.Text;
  };
}

export interface WearablesSubconsciousCard extends Struct.ComponentSchema {
  collectionName: 'components_wearables_subconscious_cards';
  info: {
    description: 'Subconscious mode card';
    displayName: 'Subconscious Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface WearablesWorkloadCard extends Struct.ComponentSchema {
  collectionName: 'components_wearables_workload_cards';
  info: {
    description: 'Workload stat card';
    displayName: 'Workload Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String;
    stat: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'apps.article-card': AppsArticleCard;
      'apps.articles': AppsArticles;
      'apps.continuum': AppsContinuum;
      'apps.continuum-card': AppsContinuumCard;
      'apps.death-of-hardware-tradeoffs': AppsDeathOfHardwareTradeoffs;
      'apps.feature': AppsFeature;
      'apps.hero': AppsHero;
      'apps.som': AppsSom;
      'apps.som-card': AppsSomCard;
      'apps.som-data-label': AppsSomDataLabel;
      'apps.win-card': AppsWinCard;
      'apps.wins': AppsWins;
      'careers.benefit-card': CareersBenefitCard;
      'careers.benefits': CareersBenefits;
      'careers.best-work': CareersBestWork;
      'careers.bottom-cta': CareersBottomCta;
      'careers.dna': CareersDna;
      'careers.dna-panel': CareersDnaPanel;
      'careers.hero': CareersHero;
      'careers.open-roles': CareersOpenRoles;
      'careers.work-card': CareersWorkCard;
      'company.articles': CompanyArticles;
      'company.compact-article': CompanyCompactArticle;
      'company.dna': CompanyDna;
      'company.dna-value': CompanyDnaValue;
      'company.ecosystem': CompanyEcosystem;
      'company.ecosystem-column': CompanyEcosystemColumn;
      'company.engagement': CompanyEngagement;
      'company.engagement-card': CompanyEngagementCard;
      'company.featured-article': CompanyFeaturedArticle;
      'company.hero': CompanyHero;
      'company.join-team': CompanyJoinTeam;
      'company.leadership': CompanyLeadership;
      'company.mission': CompanyMission;
      'company.partner': CompanyPartner;
      'company.tech-partners': CompanyTechPartners;
      'contact.form': ContactForm;
      'contact.form-field': ContactFormField;
      'contact.form-track': ContactFormTrack;
      'contact.hero': ContactHero;
      'contact.map': ContactMap;
      'contact.resources': ContactResources;
      'contact.schedule': ContactSchedule;
      'contact.schedule-card': ContactScheduleCard;
      'developer.code': DeveloperCode;
      'developer.code-article': DeveloperCodeArticle;
      'developer.coming-soon': DeveloperComingSoon;
      'developer.copilot': DeveloperCopilot;
      'developer.copilots': DeveloperCopilots;
      'developer.hero': DeveloperHero;
      'developer.model-zoo': DeveloperModelZoo;
      'developer.model-zoo-stat': DeveloperModelZooStat;
      'developer.module': DeveloperModule;
      'developer.modules': DeveloperModules;
      'developer.pipeline': DeveloperPipeline;
      'developer.pipeline-bullet': DeveloperPipelineBullet;
      'developer.pipeline-tab': DeveloperPipelineTab;
      'dvk.app-forge': DvkAppForge;
      'dvk.demo-card': DvkDemoCard;
      'dvk.demos': DvkDemos;
      'dvk.hardware-stack': DvkHardwareStack;
      'dvk.hero': DvkHero;
      'dvk.integrated-modules': DvkIntegratedModules;
      'dvk.modelforge': DvkModelforge;
      'dvk.module-card': DvkModuleCard;
      'dvk.phone-card': DvkPhoneCard;
      'dvk.spec-card': DvkSpecCard;
      'form.field': FormField;
      'home.app-feature-card': HomeAppFeatureCard;
      'home.app-tab': HomeAppTab;
      'home.applications': HomeApplications;
      'home.clients': HomeClients;
      'home.dev-card': HomeDevCard;
      'home.developer-platform': HomeDeveloperPlatform;
      'home.ecosystem': HomeEcosystem;
      'home.gpx-product': HomeGpxProduct;
      'home.hero': HomeHero;
      'home.hero-announcement': HomeHeroAnnouncement;
      'home.hero-metric': HomeHeroMetric;
      'home.latest-news': HomeLatestNews;
      'home.measured-proof': HomeMeasuredProof;
      'home.model-zoo-kit-card': HomeModelZooKitCard;
      'home.model-zoo-kits': HomeModelZooKits;
      'home.partner': HomePartner;
      'home.platform-scale': HomePlatformScale;
      'home.tech-feature': HomeTechFeature;
      'home.technology': HomeTechnology;
      'model-zoo.app-forge': ModelZooAppForge;
      'model-zoo.build-card': ModelZooBuildCard;
      'model-zoo.build-it': ModelZooBuildIt;
      'model-zoo.collage-card': ModelZooCollageCard;
      'model-zoo.feature-panel': ModelZooFeaturePanel;
      'model-zoo.forge-step': ModelZooForgeStep;
      'model-zoo.hero': ModelZooHero;
      'model-zoo.kit-card': ModelZooKitCard;
      'model-zoo.kits': ModelZooKits;
      'model-zoo.library': ModelZooLibrary;
      'model-zoo.model-card': ModelZooModelCard;
      'model-zoo.model-spec': ModelZooModelSpec;
      'model-zoo.step-card': ModelZooStepCard;
      'model-zoo.steps': ModelZooSteps;
      'model-zoo.watch-card': ModelZooWatchCard;
      'model-zoo.watch-it-run': ModelZooWatchItRun;
      'news.card': NewsCard;
      'news.filter-pill': NewsFilterPill;
      'news.grid': NewsGrid;
      'news.hero': NewsHero;
      'news.press-kit': NewsPressKit;
      'news.press-menu': NewsPressMenu;
      'partners.become': PartnersBecome;
      'partners.become-benefit': PartnersBecomeBenefit;
      'partners.benefit-card': PartnersBenefitCard;
      'partners.benefits': PartnersBenefits;
      'partners.capabilities': PartnersCapabilities;
      'partners.capability': PartnersCapability;
      'partners.directory': PartnersDirectory;
      'partners.footer-ctas': PartnersFooterCtas;
      'partners.hero': PartnersHero;
      'partners.journey-step': PartnersJourneyStep;
      'partners.match-form': PartnersMatchForm;
      'partners.partner': PartnersPartner;
      'partners.proof': PartnersProof;
      'partners.proof-point': PartnersProofPoint;
      'partners.why': PartnersWhy;
      'products.always-on': ProductsAlwaysOn;
      'products.alwayson-stat': ProductsAlwaysonStat;
      'products.architecture': ProductsArchitecture;
      'products.bench-card': ProductsBenchCard;
      'products.bench-to-volume': ProductsBenchToVolume;
      'products.case-studies': ProductsCaseStudies;
      'products.case-study-card': ProductsCaseStudyCard;
      'products.feature-card': ProductsFeatureCard;
      'products.features': ProductsFeatures;
      'products.full-picture': ProductsFullPicture;
      'products.hero': ProductsHero;
      'products.measured': ProductsMeasured;
      'products.measured-card': ProductsMeasuredCard;
      'products.measured-stat': ProductsMeasuredStat;
      'products.modelforge': ProductsModelforge;
      'products.modelforge-step': ProductsModelforgeStep;
      'products.modelforge-subfeature': ProductsModelforgeSubfeature;
      'products.spec-callout': ProductsSpecCallout;
      'products.start-building': ProductsStartBuilding;
      'products.start-card': ProductsStartCard;
      'products.sticky-nav-item': ProductsStickyNavItem;
      'products.use-cases': ProductsUseCases;
      'products.usecase-card': ProductsUsecaseCard;
      'products.usecase-tab': ProductsUsecaseTab;
      'resources.building': ResourcesBuilding;
      'resources.category': ResourcesCategory;
      'resources.content': ResourcesContent;
      'resources.featured': ResourcesFeatured;
      'resources.featured-card': ResourcesFeaturedCard;
      'resources.hero': ResourcesHero;
      'resources.news-cta': ResourcesNewsCta;
      'shared.brand': SharedBrand;
      'shared.button': SharedButton;
      'shared.contact-details': SharedContactDetails;
      'shared.cta': SharedCta;
      'shared.footer': SharedFooter;
      'shared.footer-section': SharedFooterSection;
      'shared.header': SharedHeader;
      'shared.leader': SharedLeader;
      'shared.link': SharedLink;
      'shared.location': SharedLocation;
      'shared.mega-column': SharedMegaColumn;
      'shared.nav-item': SharedNavItem;
      'shared.nav-sub-item': SharedNavSubItem;
      'shared.newsletter': SharedNewsletter;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
      'shared.stat': SharedStat;
      'shared.stat-card': SharedStatCard;
      'shared.tag': SharedTag;
      'som.deploy-path': SomDeployPath;
      'som.deploy-path-card': SomDeployPathCard;
      'som.ecosystem': SomEcosystem;
      'som.ecosystem-card': SomEcosystemCard;
      'som.family': SomFamily;
      'som.family-card': SomFamilyCard;
      'som.family-feature': SomFamilyFeature;
      'som.feature-card': SomFeatureCard;
      'som.features': SomFeatures;
      'som.footer-merge': SomFooterMerge;
      'som.hero': SomHero;
      'som.inside-module': SomInsideModule;
      'som.intelligence': SomIntelligence;
      'som.intelligence-card': SomIntelligenceCard;
      'som.prototype-card': SomPrototypeCard;
      'som.prototypes': SomPrototypes;
      'som.ready-to-deploy': SomReadyToDeploy;
      'som.spec': SomSpec;
      'tech.architecture': TechArchitecture;
      'tech.bottom-cta': TechBottomCta;
      'tech.efficiency': TechEfficiency;
      'tech.graph': TechGraph;
      'tech.graph-label': TechGraphLabel;
      'tech.hero': TechHero;
      'tech.mode-card': TechModeCard;
      'tech.mode-label': TechModeLabel;
      'tech.modes': TechModes;
      'tech.pillar': TechPillar;
      'tech.pillars': TechPillars;
      'tech.problem': TechProblem;
      'tech.problem-card': TechProblemCard;
      'tech.silicon': TechSilicon;
      'tech.silicon-stat': TechSiliconStat;
      'tech.stat-row': TechStatRow;
      'wearables.carousel': WearablesCarousel;
      'wearables.ecg-card': WearablesEcgCard;
      'wearables.empirical-proof': WearablesEmpiricalProof;
      'wearables.footer-accent': WearablesFooterAccent;
      'wearables.footer-panel': WearablesFooterPanel;
      'wearables.health-card': WearablesHealthCard;
      'wearables.hero': WearablesHero;
      'wearables.lab-card': WearablesLabCard;
      'wearables.lab-to-product': WearablesLabToProduct;
      'wearables.paradigm': WearablesParadigm;
      'wearables.paradigm-card': WearablesParadigmCard;
      'wearables.power-card': WearablesPowerCard;
      'wearables.power-panel': WearablesPowerPanel;
      'wearables.subconscious': WearablesSubconscious;
      'wearables.subconscious-card': WearablesSubconsciousCard;
      'wearables.workload-card': WearablesWorkloadCard;
    }
  }
}
