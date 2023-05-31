export interface Permission {
  code: string
  name: string
  description?: string
}

export interface Menu {
  menu_id: String
  menu_path: String
  menus_title: String
  menu_type?: String
  children: Menu[]
}

export interface UserInfo {
  username: string
  displayName?: string
  password?: string
  token: string
  permission: Permission[]
  menus: Menu[]
}
