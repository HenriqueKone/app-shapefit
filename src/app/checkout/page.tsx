"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CreditCard, Lock, CheckCircle2, ArrowLeft, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { authService } from "@/lib/auth"
import { toast } from "sonner"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const planId = searchParams.get("plan") || "basic"
  const billingCycle = searchParams.get("billing") || "monthly"
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    cpf: ""
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    // Verificar se usuário está logado
    const currentUser = authService.getCurrentUser()
    if (!currentUser) {
      toast.error("Faça login para continuar")
      router.push("/login")
      return
    }

    // Preencher dados do usuário
    setFormData(prev => ({
      ...prev,
      name: currentUser.name,
      email: currentUser.email
    }))
  }, [router])

  const plans = {
    basic: {
      name: "Básico",
      priceMonthly: "19,99",
      priceAnnual: "15,99",
      features: ["Dieta Personalizada", "Baseada em seus objetivos", "Atualização mensal"]
    },
    intermediate: {
      name: "Intermediário",
      priceMonthly: "39,99",
      priceAnnual: "31,99",
      features: ["Dieta Personalizada", "Treinos Personalizados", "Vídeos demonstrativos", "Suporte prioritário"]
    },
    complete: {
      name: "Completo",
      priceMonthly: "59,99",
      priceAnnual: "47,99",
      features: ["Tudo do Intermediário", "Diário Fit", "Integração Smartwatch", "Acompanhamento detalhado", "Relatórios semanais"]
    }
  }

  const selectedPlan = plans[planId as keyof typeof plans]
  const price = billingCycle === "monthly" ? selectedPlan.priceMonthly : selectedPlan.priceAnnual
  const totalAnnual = billingCycle === "annual" ? (parseFloat(price.replace(",", ".")) * 12).toFixed(2).replace(".", ",") : null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simular processamento de pagamento
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Atualizar usuário com o plano
    const updatedUser = authService.updateCurrentUser({
      plan: planId as any,
      billingCycle: billingCycle as any,
      subscriptionStatus: "active",
      subscriptionEndDate: null
    })

    if (updatedUser) {
      setIsProcessing(false)
      setIsSuccess(true)
      toast.success("Pagamento confirmado! Bem-vindo ao ShapeFit!")
      
      // Redirecionar após 3 segundos
      setTimeout(() => {
        router.push("/")
      }, 3000)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-slate-900/50 border-slate-800">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Pagamento Confirmado!</h2>
            <p className="text-slate-400 mb-6">
              Bem-vindo ao ShapeFit! Seu plano {selectedPlan.name} foi ativado com sucesso.
            </p>
            <div className="space-y-2 text-sm text-slate-300">
              <p>✓ Acesso liberado imediatamente</p>
              <p>✓ Confirmação enviada por email</p>
              <p>✓ Redirecionando para o app...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-6 text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário de Pagamento */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Finalizar Assinatura</h1>
              <p className="text-slate-400">Complete seus dados para ativar o plano</p>
            </div>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-green-500" />
                  Pagamento Seguro
                </CardTitle>
                <CardDescription>Seus dados estão protegidos com criptografia SSL</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Dados Pessoais */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Dados Pessoais</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-300">Nome Completo</Label>
                      <Input
                        id="name"
                        placeholder="João Silva"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-300">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="joao@exemplo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cpf" className="text-slate-300">CPF</Label>
                      <Input
                        id="cpf"
                        placeholder="000.000.000-00"
                        value={formData.cpf}
                        onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                        required
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                  </div>

                  <Separator className="bg-slate-800" />

                  {/* Dados do Cartão */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Dados do Cartão
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber" className="text-slate-300">Número do Cartão</Label>
                      <Input
                        id="cardNumber"
                        placeholder="0000 0000 0000 0000"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                        required
                        maxLength={19}
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardName" className="text-slate-300">Nome no Cartão</Label>
                      <Input
                        id="cardName"
                        placeholder="JOÃO SILVA"
                        value={formData.cardName}
                        onChange={(e) => setFormData({...formData, cardName: e.target.value})}
                        required
                        className="bg-slate-800 border-slate-700 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry" className="text-slate-300">Validade</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/AA"
                          value={formData.expiry}
                          onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                          required
                          maxLength={5}
                          className="bg-slate-800 border-slate-700 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvv" className="text-slate-300">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                          required
                          maxLength={4}
                          type="password"
                          className="bg-slate-800 border-slate-700 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90 h-12 text-lg"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5 mr-2" />
                        Confirmar Pagamento
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-slate-500 text-center">
                    Ao confirmar, você concorda com nossos Termos de Serviço e Política de Privacidade
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Selos de Segurança */}
            <div className="flex items-center justify-center gap-4 text-slate-500 text-sm">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>SSL Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>PCI Compliant</span>
              </div>
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-800 sticky top-8">
              <CardHeader>
                <CardTitle className="text-white">Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Plano Selecionado */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">Plano {selectedPlan.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-purple-500/20 text-purple-400 border-0">
                          {billingCycle === "monthly" ? "Mensal" : "Anual"}
                        </Badge>
                        {billingCycle === "annual" && (
                          <Badge className="bg-green-500/20 text-green-400 border-0">
                            -20% Desconto
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-slate-800" />

                  {/* Recursos Inclusos */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-slate-400">Recursos inclusos:</p>
                    <ul className="space-y-2">
                      {selectedPlan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Separator className="bg-slate-800" />

                {/* Valores */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Valor {billingCycle === "monthly" ? "mensal" : "mensal (anual)"}</span>
                    <span className="font-semibold">R$ {price}</span>
                  </div>

                  {billingCycle === "annual" && (
                    <>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Total anual</span>
                        <span className="font-semibold">R$ {totalAnnual}</span>
                      </div>
                      <div className="flex items-center justify-between text-green-500">
                        <span>Economia no ano</span>
                        <span className="font-semibold">
                          R$ {((parseFloat(selectedPlan.priceMonthly.replace(",", ".")) * 12) - parseFloat(totalAnnual!.replace(",", "."))).toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                    </>
                  )}

                  <Separator className="bg-slate-800" />

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white">Total a pagar hoje</span>
                    <span className="text-2xl font-bold text-white">
                      R$ {billingCycle === "monthly" ? price : totalAnnual}
                    </span>
                  </div>
                </div>

                {/* Informações Adicionais */}
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-600/10 border border-purple-500/20 rounded-lg p-4 space-y-2">
                  <div className="flex items-start gap-2 text-sm text-slate-300">
                    <Calendar className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                    <p>
                      {billingCycle === "monthly" 
                        ? "Renovação automática mensal. Cancele quando quiser."
                        : "Cobrança única anual. Renovação automática após 12 meses."
                      }
                    </p>
                  </div>
                  <div className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <p>Acesso imediato após confirmação do pagamento</p>
                  </div>
                </div>

                {/* Garantia */}
                <Card className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 border-green-500/20">
                  <CardContent className="p-4 text-center">
                    <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-white mb-1">Garantia de 7 dias</p>
                    <p className="text-xs text-slate-400">
                      Não gostou? Devolvemos 100% do seu dinheiro
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
