export interface UserData {
  name: string
  email: string
  avatar: string
}

export interface UserMenuItem {
  label: string
  icon?: React.ComponentType
  onClick?: () => void
}
