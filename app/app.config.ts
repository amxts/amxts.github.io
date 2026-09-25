export default defineAppConfig({
  ui: {
    colors: {
      primary: 'amber',
      neutral: 'zinc',
    },
    pageHero: {
      slots: {
        description: 'text-muted text-pretty text-[15px] sm:text-base lg:text-lg max-w-154 mt-2 sm:mt-4',
        links: 'gap-3',
      },
      variants: {
        title: {
          true: {
            description: 'mt-2 sm:mt-4',
          },
        },
      },
    },
    pageFeature: {
      variants: {
        to: {
          true: {
            root: 'rounded-lg p-4 ring ring-default hover:bg-elevated/50 hover:ring-accented',
          },
        },
      },
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted',
      },
    },
  },
  seo: {
    siteName: 'Xen',
  },
})
