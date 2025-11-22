"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dumbbell, Apple, TrendingUp, Crown, Activity, Calendar, User as UserIcon, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import DietSection from "./components/DietSection"
import WorkoutSection from "./components/WorkoutSection"
import TrackingSection from "./components/TrackingSection"
import { authService, User } from "@/lib/auth"
import { toast } from "sonner"

export default function ShapeFit() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("home")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  useEffect(() => {
    // Criar admin padrão
    authService.createDefaultAdmin()

    // Verificar se há usuário logado
    const user = authService.getCurrentUser()
    if (user) {
      setCurrentUser(user)
      setSelectedPlan(user.plan)
    }
  }, [])

  const plans = [
    {
      id: "basic",
      name: "Básico",
      priceMonthly: "19,99",
      priceAnnual: "15,99",
      features: ["Dieta Personalizada", "Baseada em seus objetivos", "Atualização mensal"],
      icon: Apple,
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "intermediate",
      name: "Intermediário",
      priceMonthly: "39,99",
      priceAnnual: "31,99",
      features: ["Dieta Personalizada", "Treinos Personalizados", "Vídeos demonstrativos", "Suporte prioritário"],
      icon: Dumbbell,
      color: "from-blue-500 to-indigo-600",
      popular: true
    },
    {
      id: "complete",
      name: "Completo",
      priceMonthly: "59,99",
      priceAnnual: "47,99",
      features: ["Tudo do Intermediário", "Diário Fit", "Integração Smartwatch", "Acompanhamento detalhado", "Relatórios semanais"],
      icon: Crown,
      color: "from-purple-500 to-pink-600"
    }
  ]

  const getPrice = (plan: typeof plans[0]) => {
    return billingCycle === "monthly" ? plan.priceMonthly : plan.priceAnnual
  }

  const getAnnualTotal = (plan: typeof plans[0]) => {
    const monthly = parseFloat(plan.priceMonthly.replace(",", "."))
    const annual = parseFloat(plan.priceAnnual.replace(",", "."))
    return {
      monthly: (monthly * 12).toFixed(2).replace(".", ","),
      annual: (annual * 12).toFixed(2).replace(".", ","),
      savings: ((monthly * 12) - (annual * 12)).toFixed(2).replace(".", ",")
    }
  }

  const handleSelectPlan = (planId: string) => {
    if (!currentUser) {
      toast.error("Faça login para assinar um plano")
      router.push("/login")
      return
    }
    router.push(`/checkout?plan=${planId}&billing=${billingCycle}`)
  }

  const handleLogout = () => {
    authService.logout()
    setCurrentUser(null)
    setSelectedPlan(null)
    toast.success("Logout realizado com sucesso")
    router.push("/")
  }

  if (activeTab !== "home" && !selectedPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Selecione um Plano</CardTitle>
            <CardDescription>Escolha um plano para acessar esta funcionalidade</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setActiveTab("home")} className="w-full">
              Ver Planos
            </Button>
          </CardContent>
        </Card>
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
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-xl">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">ShapeFit</h1>
            </div>
            <div className="flex items-center gap-4">
              {selectedPlan && (
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
                  Plano: {plans.find(p => p.id === selectedPlan)?.name}
                </Badge>
              )}
              {currentUser ? (
                <>
                  <Button
                    onClick={() => router.push("/dashboard")}
                    variant="ghost"
                    className="text-slate-300 hover:text-white"
                  >
                    <UserIcon className="w-4 h-4 mr-2" />
                    {currentUser.name}
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="text-slate-300 hover:text-white"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => router.push("/login")}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90"
                >
                  <UserIcon className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="container mx-auto px-4 py-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-900/50 border border-slate-800 mb-8">
          <TabsTrigger value="home" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600">
            Planos
          </TabsTrigger>
          <TabsTrigger value="diet" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-600">
            Dieta
          </TabsTrigger>
          <TabsTrigger value="workout" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600">
            Treino
          </TabsTrigger>
          <TabsTrigger value="tracking" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600">
            Acompanhamento
          </TabsTrigger>
        </TabsList>

        {/* Home - Plans */}
        <TabsContent value="home" className="space-y-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Transforme seu corpo com o <span className="bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent">ShapeFit</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Dietas personalizadas, treinos com vídeos e acompanhamento completo para alcançar seus objetivos
            </p>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-1 inline-flex gap-1">
              <Button
                onClick={() => setBillingCycle("monthly")}
                variant={billingCycle === "monthly" ? "default" : "ghost"}
                className={billingCycle === "monthly" 
                  ? "bg-gradient-to-r from-purple-500 to-pink-600" 
                  : "text-slate-400 hover:text-white"
                }
              >
                <Calendar className="w-4 h-4 mr-2" />
                Mensal
              </Button>
              <Button
                onClick={() => setBillingCycle("annual")}
                variant={billingCycle === "annual" ? "default" : "ghost"}
                className={billingCycle === "annual" 
                  ? "bg-gradient-to-r from-purple-500 to-pink-600" 
                  : "text-slate-400 hover:text-white"
                }
              >
                <Calendar className="w-4 h-4 mr-2" />
                Anual
                <Badge className="ml-2 bg-emerald-500 text-white border-0">-20%</Badge>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const Icon = plan.icon
              const pricing = getAnnualTotal(plan)
              return (
                <Card 
                  key={plan.id}
                  className={`relative bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all duration-300 hover:scale-105 ${
                    selectedPlan === plan.id ? 'ring-2 ring-purple-500' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0">
                        Mais Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white">{plan.name}</CardTitle>
                    <CardDescription>
                      <div className="space-y-1">
                        <div>
                          <span className="text-3xl font-bold text-white">R$ {getPrice(plan)}</span>
                          <span className="text-slate-400">/mês</span>
                        </div>
                        {billingCycle === "annual" && (
                          <div className="space-y-1">
                            <p className="text-xs text-emerald-400 font-semibold">
                              Economize R$ {pricing.savings}/ano
                            </p>
                            <p className="text-xs text-slate-500">
                              Total anual: R$ {pricing.annual} (vs R$ {pricing.monthly} no mensal)
                            </p>
                          </div>
                        )}
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="space-y-2">
                      <Button 
                        onClick={() => handleSelectPlan(plan.id)}
                        className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 transition-opacity`}
                      >
                        Assinar Agora
                      </Button>
                      {!selectedPlan && currentUser && (
                        <Button 
                          onClick={() => setSelectedPlan(plan.id)}
                          variant="outline"
                          className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
                        >
                          Testar Gratuitamente
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card className="bg-gradient-to-r from-purple-500/10 to-pink-600/10 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {billingCycle === "monthly" ? "Economize 20% no Plano Anual" : "Você está economizando 20%!"}
                  </h3>
                  <p className="text-slate-300">
                    {billingCycle === "monthly" 
                      ? "Assine por 12 meses e ganhe desconto especial em todos os planos" 
                      : "Parabéns! Você escolheu o plano anual e está economizando"
                    }
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-1">20%</div>
                  <div className="text-sm text-slate-400">de desconto</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {billingCycle === "annual" && (
            <Card className="bg-gradient-to-r from-emerald-500/10 to-teal-600/10 border-emerald-500/20">
              <CardContent className="p-6">
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-white">Benefícios do Plano Anual</h3>
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-emerald-400">💰</div>
                      <p className="text-sm text-slate-300">Economia garantida de 20%</p>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-emerald-400">🔒</div>
                      <p className="text-sm text-slate-300">Preço fixo por 12 meses</p>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-emerald-400">🎯</div>
                      <p className="text-sm text-slate-300">Compromisso com seus objetivos</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Diet Section */}
        <TabsContent value="diet">
          <DietSection selectedPlan={selectedPlan} />
        </TabsContent>

        {/* Workout Section */}
        <TabsContent value="workout">
          <WorkoutSection selectedPlan={selectedPlan} />
        </TabsContent>

        {/* Tracking Section */}
        <TabsContent value="tracking">
          <TrackingSection selectedPlan={selectedPlan} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
