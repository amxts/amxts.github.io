export default defineAppConfig({
  ui: {
    colors: {
      primary: 'amber',
      neutral: 'stone',
    },
    prose: {
      code: {
        // inline, not inline-block: a line of several chips wraps like text and keeps the line spacing
        base: 'inline box-decoration-clone',
      },
    },
    pageHero: {
      slots: {
        description: 'text-muted text-pretty text-[15px] sm:text-base lg:text-lg max-w-154 mt-2 sm:mt-4',
        links: 'gap-3',
      },
      variants: {
        orientation: {
          vertical: {
            description: 'mx-auto',
          },
        },
        title: {
          true: {
            description: 'mt-2 sm:mt-4',
          },
        },
      },
    },
    pageSection: {
      slots: {
        description: 'text-muted text-pretty text-[15px] sm:text-base lg:text-lg max-w-154',
      },
      variants: {
        orientation: {
          vertical: {
            description: 'mx-auto',
          },
        },
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
            root: 'rounded-lg p-4 ring ring-default duration-300 ease-out hover:bg-elevated/50 hover:ring-accented',
          },
        },
      },
    },
    // a solid button darkens on hover rather than fading: the faded amber
    // left the light theme's white label hard to read
    button: {
      compoundVariants: [{
        color: 'primary',
        variant: 'solid',
        class: 'hover:bg-(--ui-color-primary-600) active:bg-(--ui-color-primary-600) dark:hover:bg-(--ui-color-primary-300) dark:active:bg-(--ui-color-primary-300)',
      }],
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted',
      },
    },
  },
  seo: {
    siteName: 'amxts',
  },
})
