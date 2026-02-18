import type { NavItem } from '@/types'
import {
  IconDatabase,
  IconReport,
  IconFileWord,
} from '@tabler/icons-react'

/**
 * Documents navigation items.
 * Includes Data Library, Reports, and Word Assistant.
 */
export const documentsItems: NavItem[] = [
  {
    title: 'Data Library',
    url: '#',
    icon: IconDatabase,
  },
  {
    title: 'Reports',
    url: '#',
    icon: IconReport,
  },
  {
    title: 'Word Assistant',
    url: '#',
    icon: IconFileWord,
  },
]
