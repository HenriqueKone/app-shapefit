"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Activity, Users, Crown, Search, Edit, Trash2, CheckCircle, XCircle, LogOut, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { authService, User } from "@/lib/auth"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AdminPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  useEffect(() => {
    const user = authService.getCurrentUser()
    
    if (!user) {
      router.push("/login")
      return
    }

    if (user.role !== "admin") {
      toast.error("Acesso negado. Apenas administradores podem acessar esta página.")
      router.push("/dashboard")
      return
    }

    setCurrentUser(user)
    loadUsers()
    setIsLoading(false)
  }, [router])

  const loadUsers = () => {
    const allUsers = authService.getAllUsers()
    setUsers(allUsers)
  }

  const handleLogout = () => {
    authService.logout()
    toast.success("Logout realizado com sucesso")
    router.push("/login")
  }

  const handleDeleteUser = (userId: string) => {
    if (userId === currentUser?.id) {
      toast.error("Você não pode deletar sua própria conta")
      return
    }

    if (confirm("Tem certeza que deseja deletar este usuário?")) {
      authService.deleteUser(userId)
      loadUsers()
      toast.success("Usuário deletado com sucesso")
    }
  }

  const handleUpdateUser = (userId: string, updates: Partial<User>) => {
    authService.updateUser(userId, updates)
    loadUsers()
    setEditingUser(null)
    toast.success("Usuário atualizado com sucesso")
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const stats = {
    total: users.length,
    active: users.filter(u => u.subscriptionStatus === "active").length,
    cancelled: users.filter(u => u.subscriptionStatus === "cancelled").length,
    expired: users.filter(u => u.subscriptionStatus === "expired").length,
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-2 rounded-xl">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Painel Admin</h1>
                <p className="text-sm text-slate-400">ShapeFit</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => router.push("/dashboard")}
                variant="ghost"
                className="text-slate-300 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-slate-300 hover:text-white"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Total de Usuários</p>
                    <p className="text-3xl font-bold text-white">{stats.total}</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Assinaturas Ativas</p>
                    <p className="text-3xl font-bold text-emerald-400">{stats.active}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-emerald-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Canceladas</p>
                    <p className="text-3xl font-bold text-orange-400">{stats.cancelled}</p>
                  </div>
                  <XCircle className="w-8 h-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Expiradas</p>
                    <p className="text-3xl font-bold text-red-400">{stats.expired}</p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Users Table */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Gerenciar Usuários</CardTitle>
                  <CardDescription>Visualize e gerencie todos os usuários do sistema</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Buscar usuários..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-800/50 border-slate-700 text-white"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-white">{user.name}</p>
                          {user.role === "admin" && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                              <Crown className="w-3 h-3 mr-1" />
                              Admin
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-slate-400">{user.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {user.plan ? (
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                          {user.plan === "basic" ? "Básico" : user.plan === "intermediate" ? "Intermediário" : "Completo"}
                        </Badge>
                      ) : (
                        <Badge className="bg-slate-700/50 text-slate-400 border-slate-600">
                          Sem plano
                        </Badge>
                      )}

                      {user.subscriptionStatus === "active" ? (
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Ativa
                        </Badge>
                      ) : user.subscriptionStatus === "cancelled" ? (
                        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                          Cancelada
                        </Badge>
                      ) : (
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                          Expirada
                        </Badge>
                      )}

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingUser(user)}
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-slate-900 border-slate-800">
                          <DialogHeader>
                            <DialogTitle className="text-white">Editar Usuário</DialogTitle>
                            <DialogDescription>
                              Atualize as informações do usuário
                            </DialogDescription>
                          </DialogHeader>
                          {editingUser && (
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label className="text-slate-300">Nome</Label>
                                <Input
                                  value={editingUser.name}
                                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                  className="bg-slate-800/50 border-slate-700 text-white"
                                />
                              </div>

                              <div className="space-y-2">
                                <Label className="text-slate-300">Plano</Label>
                                <Select
                                  value={editingUser.plan || "none"}
                                  onValueChange={(value) => setEditingUser({ 
                                    ...editingUser, 
                                    plan: value === "none" ? null : value as any 
                                  })}
                                >
                                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-slate-900 border-slate-800">
                                    <SelectItem value="none">Sem plano</SelectItem>
                                    <SelectItem value="basic">Básico</SelectItem>
                                    <SelectItem value="intermediate">Intermediário</SelectItem>
                                    <SelectItem value="complete">Completo</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label className="text-slate-300">Status da Assinatura</Label>
                                <Select
                                  value={editingUser.subscriptionStatus}
                                  onValueChange={(value) => setEditingUser({ 
                                    ...editingUser, 
                                    subscriptionStatus: value as any 
                                  })}
                                >
                                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-slate-900 border-slate-800">
                                    <SelectItem value="active">Ativa</SelectItem>
                                    <SelectItem value="cancelled">Cancelada</SelectItem>
                                    <SelectItem value="expired">Expirada</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label className="text-slate-300">Ciclo de Cobrança</Label>
                                <Select
                                  value={editingUser.billingCycle}
                                  onValueChange={(value) => setEditingUser({ 
                                    ...editingUser, 
                                    billingCycle: value as any 
                                  })}
                                >
                                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-slate-900 border-slate-800">
                                    <SelectItem value="monthly">Mensal</SelectItem>
                                    <SelectItem value="annual">Anual</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <Button
                                onClick={() => handleUpdateUser(editingUser.id, editingUser)}
                                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90"
                              >
                                Salvar Alterações
                              </Button>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      {user.id !== currentUser?.id && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}

                {filteredUsers.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-slate-400">Nenhum usuário encontrado</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
