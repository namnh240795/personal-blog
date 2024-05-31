// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Nam Nguyen",
  tagline: "Software Engineer",
  favicon: "https://avatars.githubusercontent.com/u/20696416?v=4",

  // Set the production url of your site here
  url: "https://nullo.dev",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        // docs: {
        //   sidebarPath: "./sidebars.js",
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   // editUrl:
        //   //   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        // },
        docs: false,
        blog: {
          routeBasePath: "/",
          blogSidebarCount: "ALL",
          showReadingTime: true,
          readingTime: ({ content, frontMatter, defaultReadingTime }) =>
            defaultReadingTime({ content, options: { wordsPerMinute: 300 } }),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "https://avatars.githubusercontent.com/u/20696416?v=4",
      navbar: {
        title: "Nam Nguyen",
        logo: {
          alt: "Nam Nguyen Logo",
          src: "https://avatars.githubusercontent.com/u/20696416?v=4",
        },
        items: [
          // {
          //   type: "docSidebar",
          //   sidebarId: "tutorialSidebar",
          //   position: "left",
          //   label: "Tutorial",
          // },
          // { to: "/blog", label: "Blog", position: "left", routeBasePath: "/" },
          // {
          //   to: "/json-viewer",
          //   label: "Json Viewer",
          //   position: "left",
          // },
          {
            href: "https://github.com/namnh240795",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            // items: [
            //   {
            //     label: "Tutorial",
            //     to: "/docs/intro",
            //   },
            // ],
          },
          {
            title: "Community",
            items: [
              //     {
              //       label: "Stack Overflow",
              //       href: "https://stackoverflow.com/questions/tagged/docusaurus",
              //     },
              //     {
              //       label: "Discord",
              //       href: "https://discordapp.com/invite/docusaurus",
              //     },
              //     {
              //       label: "Twitter",
              //       href: "https://twitter.com/docusaurus",
              //     },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "About Me",
                to: "/about",
              },
              {
                label: "GitHub",
                href: "https://github.com/namnh240795",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Nam Nguyen, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
