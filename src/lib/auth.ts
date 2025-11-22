// Sistema de autenticação simplificado
// Em produção, use Supabase Auth ou NextAuth.js

export interface User {
  id: string
  email: string
  name: string
  plan: "basic" | "intermediate" | "complete" | null
  billingCycle: "monthly" | "annual"
  role: "user" | "admin"
  createdAt: string
  subscriptionStatus: "active" | "cancelled" | "expired"
  subscriptionEndDate: string | null
}

// Simulação de banco de dados (em produção, use Supabase)
const USERS_KEY = "shapefit_users"
const CURRENT_USER_KEY = "shapefit_current_user"

export const authService = {
  // Registrar novo usuário
  register: (email: string, password: string, name: string): User => {
    const users = authService.getAllUsers()
    
    // Verificar se email já existe
    if (users.find(u => u.email === email)) {
      throw new Error("Email já cadastrado")
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      plan: null,
      billingCycle: "monthly",
      role: "user",
      createdAt: new Date().toISOString(),
      subscriptionStatus: "expired",
      subscriptionEndDate: null
    }

    users.push(newUser)
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    
    return newUser
  },

  // Login
  login: (email: string, password: string): User => {
    const users = authService.getAllUsers()
    const user = users.find(u => u.email === email)

    if (!user) {
      throw new Error("Usuário não encontrado")
    }

    // Em produção, verificar senha hash
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    return user
  },

  // Logout
  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY)
  },

  // Obter usuário atual
  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null
    const userStr = localStorage.getItem(CURRENT_USER_KEY)
    return userStr ? JSON.parse(userStr) : null
  },

  // Atualizar usuário atual
  updateCurrentUser: (updates: Partial<User>) => {
    const currentUser = authService.getCurrentUser()
    if (!currentUser) return null

    const updatedUser = { ...currentUser, ...updates }
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser))

    // Atualizar também na lista de usuários
    const users = authService.getAllUsers()
    const index = users.findIndex(u => u.id === currentUser.id)
    if (index !== -1) {
      users[index] = updatedUser
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
    }

    return updatedUser
  },

  // Obter todos os usuários (admin)
  getAllUsers: (): User[] => {
    if (typeof window === "undefined") return []
    const usersStr = localStorage.getItem(USERS_KEY)
    return usersStr ? JSON.parse(usersStr) : []
  },

  // Criar usuário admin padrão
  createDefaultAdmin: () => {
    const users = authService.getAllUsers()
    if (users.find(u => u.email === "admin@shapefit.com")) {
      return
    }

    const admin: User = {
      id: "admin-001",
      email: "admin@shapefit.com",
      name: "Administrador",
      plan: "complete",
      billingCycle: "annual",
      role: "admin",
      createdAt: new Date().toISOString(),
      subscriptionStatus: "active",
      subscriptionEndDate: null
    }

    users.push(admin)
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  },

  // Verificar se é admin
  isAdmin: (): boolean => {
    const user = authService.getCurrentUser()
    return user?.role === "admin"
  },

  // Atualizar usuário (admin)
  updateUser: (userId: string, updates: Partial<User>) => {
    const users = authService.getAllUsers()
    const index = users.findIndex(u => u.id === userId)
    
    if (index === -1) return null

    users[index] = { ...users[index], ...updates }
    localStorage.setItem(USERS_KEY, JSON.stringify(users))

    // Se for o usuário atual, atualizar também
    const currentUser = authService.getCurrentUser()
    if (currentUser?.id === userId) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[index]))
    }

    return users[index]
  },

  // Deletar usuário (admin)
  deleteUser: (userId: string) => {
    const users = authService.getAllUsers()
    const filtered = users.filter(u => u.id !== userId)
    localStorage.setItem(USERS_KEY, JSON.stringify(filtered))
  }
}
