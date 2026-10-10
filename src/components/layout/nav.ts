export interface NavItem {
  label: string
  to: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Download', to: '/download' },
  { label: "What's New", to: '/whats-new' },
  { label: 'How to use', to: '/how-to-use' },
]