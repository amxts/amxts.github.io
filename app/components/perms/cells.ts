// The look of a grid cell, which a group's or a player's list of grants shares.

/** each place sets the size: the grid's cells are larger than a list's */
export const cellBase = 'relative grid place-items-center rounded-md transition-[background-color,box-shadow,color,scale] duration-150 ease-out active:scale-90 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-solid'

export const cellClass = {
  granted: 'bg-success/15 text-success ring ring-success/35 hover:bg-success/25',
  negated: 'bg-error/12 text-error ring ring-error/35 hover:bg-error/20',
  // inherited is quieter than a grant of the group's own, which stays the one filled cell
  inheritedYes: 'text-success/45 hover:bg-elevated hover:text-success',
  inheritedNo: 'text-dimmed hover:bg-elevated hover:text-muted',
  inheritedNegated: 'text-error/50 hover:bg-elevated hover:text-error',
}
