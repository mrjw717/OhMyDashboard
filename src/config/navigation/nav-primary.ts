import type { NavItem, NavGroup } from '@/types'
import {
  IconDashboard,
  IconListDetails,
  IconChartBar,
  IconFolder,
  IconUsers,
  IconInputSearch,
} from '@tabler/icons-react'

/**
 * Primary navigation items for the main sidebar.
 * Includes Dashboard, Input Showcase, Lifecycle, Analytics, Projects, and Team sections.
 */
export const navPrimaryItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/',
    icon: IconDashboard,
    items: [
      {
        title: 'Overview',
        url: '/',
      },
      {
        title: 'Backgrounds',
        url: '/design/backgrounds',
      },
      {
        title: 'Performance',
        url: '/performance',
      },
      {
        title: 'Notifications',
        url: '/notifications',
      },
    ],
  },
  {
    title: 'Input Showcase',
    url: '/inputs',
    icon: IconInputSearch,
  },
  {
    title: 'Lifecycle',
    url: '#',
    icon: IconListDetails,
  },
  {
    title: 'Analytics',
    url: '#',
    icon: IconChartBar,
    items: [
      {
        title: 'Reports',
        url: '/reports',
      },
      {
        title: 'Real-time',
        url: '/real-time',
      },
    ],
  },
  {
    title: 'Projects',
    url: '#',
    icon: IconFolder,
    items: [
      {
        title: 'All Projects',
        url: '/projects',
      },
      {
        title: 'Archived',
        url: '/projects/archived',
      },
    ],
  },
  {
    title: 'Team',
    url: '#',
    icon: IconUsers,
  },
]

/**
 * Cloud navigation groups for secondary navigation.
 * Includes Capture, Proposal, and Prompts sections.
 */
export const navCloudsItems: NavGroup[] = [
  {
    title: 'Capture',
    icon: IconCamera,
    isActive: true,
    url: '#',
    items: [
      { title: 'Active Proposals', url: '#' },
      { title: 'Archived', url: '#' },
    ],
  },
  {
    title: 'Proposal',
    icon: IconFileDescription,
    url: '#',
    items: [
      { title: 'Active Proposals', url: '#' },
      { title: 'Archived', url: '#' },
    ],
  },
  {
    title: 'Prompts',
    icon: IconFileAi,
    url: '#',
    items: [
      { title: 'Active Proposals', url: '#' },
      { title: 'Archived', url: '#' },
    ],
  },
]

import {
  IconSettings,
  IconHelp,
  IconSearch,
  IconCamera,
  IconFileDescription,
  IconFileAi,
} from '@tabler/icons-react'

/**
 * Secondary navigation items for the bottom navigation bar.
 * Includes Settings, Get Help, and Search.
 */
export const navSecondaryItems: NavItem[] = [
  {
    title: 'Settings',
    url: '#',
    icon: IconSettings,
  },
  {
    title: 'Get Help',
    url: '#',
    icon: IconHelp,
  },
  {
    title: 'Search',
    url: '#',
    icon: IconSearch,
  },
]
