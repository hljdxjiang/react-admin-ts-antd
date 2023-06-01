export interface Permission {
  code: string
  name: string
  description?: string
}

export interface Menu {
  menu_id?: String
  path?: String
  desc?: String
  type?: String
  key?: String
  children?: Menu[]
}

export interface UserInfo {
  username: string
  displayName?: string
  password?: string
  token: string
  permission: Permission[]
  menus: Menu[]
}
