import type { Icon } from '@tabler/icons-react'

export interface NavItem {
  title: string
  url: string
  icon?: Icon
  isActive?: boolean
  items?: NavSubItem[]
}

export interface NavSubItem {
  title: string
  url: string
}

export interface NavGroup {
  title: string
  icon?: Icon
  isActive?: boolean
  url?: string
  items?: NavSubItem[]
}
