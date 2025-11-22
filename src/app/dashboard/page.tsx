"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Activity, User as UserIcon, CreditCard, Settings, LogOut, Crown, Calendar, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authService, User } from "@/lib/auth"
import { toast } from "sonner"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Form states
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    const currentUser = authService.getCurrentUser()
    
    if (!currentUser) {
      router.push("/login")
      return
    }

    setUser(currentUser)
    setName(currentUser.name)
    setEmail(currentUser.email)
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    authService.logout()
    toast.success("Logout realizado com sucesso")
    router.push("/login")
  }

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault()
    
    const updatedUser = authService.updateCurrentUser({ name, email })
    if (updatedUser) {
      setUser(updatedUser)
      toast.success("Perfil atualizado com sucesso!")
    }
  }

  const handleCancelSubscription = () => {
    const updatedUser = authService.updateCurrentUser({ 
      subscriptionStatus: "cancelled",
      subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 dias
    })
    
    if (updatedUser) {
      setUser(updatedUser)
      toast.success("Assinatura cancelada. Você terá acesso até o fim do período pago.")
    }
  }

  const handleReactivateSubscription = () => {
    const updatedUser = authService.updateCurrentUser({ 
      subscriptionStatus: "active",
      subscriptionEndDate: null
    })
    
    if (updatedUser) {
      setUser(updatedUser)
      toast.success("Assinatura reativada com sucesso!")
    }
  }

  const getPlanDetails = () => {
    if (!user?.plan) return null

    const plans = {
      basic: {
        name: "Básico",
        color: "from-emerald-500 to-teal-600",
        features: ["Dieta Personalizada", "Atualização mensal"]
      },
      intermediate: {
        name: "Intermediário",
        color: "from-blue-500 to-indigo-600",
        features: ["Dieta Personalizada", "Treinos com Vídeos", "Suporte prioritário"]
      },
      complete: {
        name: "Completo",
        color: "from-purple-500 to-pink-600",
        features: ["Tudo do Intermediário", "Diário Fit", "Integração Smartwatch", "Relatórios semanais"]
      }
    }

    return plans[user.plan]
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    )
  }

  if (!user) return null

  const planDetails = getPlanDetails()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-xl">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">ShapeFit</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => router.push("/")}
                variant="ghost"
                className="text-slate-300 hover:text-white"
              >
                Ir para App
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
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Welcome Card */}
          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-600/10 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Olá, {user.name}! 👋</h2>
                  <p className="text-slate-300">Bem-vindo ao seu painel pessoal</p>
                </div>
                {user.role === "admin" && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white border-0">
                    <Crown className="w-4 h-4 mr-1" />
                    Admin
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="subscription" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-900/50 border border-slate-800">
              <TabsTrigger value="subscription">
                <CreditCard className="w-4 h-4 mr-2" />
                Assinatura
              </TabsTrigger>
              <TabsTrigger value="settings">
                <Settings className="w-4 h-4 mr-2" />
                Configurações
              </TabsTrigger>
            </TabsList>

            {/* Subscription Tab */}
            <TabsContent value="subscription" className="space-y-6">
              {user.plan ? (
                <>
                  {/* Current Plan */}
                  <Card className="bg-slate-900/50 border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-white">Plano Atual</CardTitle>
                      <CardDescription>Detalhes da sua assinatura</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${planDetails?.color} flex items-center justify-center`}>
                            <Crown className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white">{planDetails?.name}</h3>
                            <p className="text-sm text-slate-400">
                              Cobrança {user.billingCycle === "monthly" ? "Mensal" : "Anual"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {user.subscriptionStatus === "active" ? (
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Ativa
                            </Badge>
                          ) : user.subscriptionStatus === "cancelled" ? (
                            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                              <XCircle className="w-3 h-3 mr-1" />
                              Cancelada
                            </Badge>
                          ) : (
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                              <XCircle className="w-3 h-3 mr-1" />
                              Expirada
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-slate-300">Recursos incluídos:</h4>
                        <ul className="space-y-2">
                          {planDetails?.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-slate-400">
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Subscription Actions */}
                      <div className="pt-4 border-t border-slate-800 space-y-3">
                        {user.subscriptionStatus === "active" ? (
                          <>
                            <Button
                              onClick={() => router.push("/")}
                              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90"
                            >
                              Acessar App
                            </Button>
                            <Button
                              onClick={handleCancelSubscription}
                              variant="outline"
                              className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
                            >
                              Cancelar Assinatura
                            </Button>
                          </>
                        ) : user.subscriptionStatus === "cancelled" ? (
                          <>
                            <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                              <p className="text-sm text-orange-400">
                                Sua assinatura foi cancelada. Você terá acesso até{" "}
                                {user.subscriptionEndDate ? new Date(user.subscriptionEndDate).toLocaleDateString("pt-BR") : "o fim do período"}
                              </p>
                            </div>
                            <Button
                              onClick={handleReactivateSubscription}
                              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-90"
                            >
                              Reativar Assinatura
                            </Button>
                          </>
                        ) : (
                          <Button
                            onClick={() => router.push("/")}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90"
                          >
                            Renovar Assinatura
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Upgrade Options */}
                  {user.plan !== "complete" && (
                    <Card className="bg-gradient-to-r from-purple-500/10 to-pink-600/10 border-purple-500/20">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-white mb-2">
                              Upgrade para o Plano Completo
                            </h3>
                            <p className="text-sm text-slate-300">
                              Desbloqueie todos os recursos e maximize seus resultados
                            </p>
                          </div>
                          <Button
                            onClick={() => router.push("/")}
                            className="bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90"
                          >
                            Ver Planos
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              ) : (
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto">
                      <CreditCard className="w-8 h-8 text-slate-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Nenhum plano ativo</h3>
                      <p className="text-slate-400">Escolha um plano para começar sua jornada fitness</p>
                    </div>
                    <Button
                      onClick={() => router.push("/")}
                      className="bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90"
                    >
                      Ver Planos Disponíveis
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Informações Pessoais</CardTitle>
                  <CardDescription>Atualize seus dados pessoais</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-300">Nome Completo</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-slate-800/50 border-slate-700 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-300">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-slate-800/50 border-slate-700 text-white"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90"
                    >
                      Salvar Alterações
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {user.role === "admin" && (
                <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-600/10 border-yellow-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                          <Crown className="w-5 h-5 text-yellow-400" />
                          Painel Administrativo
                        </h3>
                        <p className="text-sm text-slate-300">
                          Acesse o painel de administração para gerenciar usuários e planos
                        </p>
                      </div>
                      <Button
                        onClick={() => router.push("/admin")}
                        className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:opacity-90"
                      >
                        Acessar Admin
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
