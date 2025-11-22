"use client"

import { useState } from "react"
import { Apple, ChefHat, Clock, Flame, Plus, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface DietSectionProps {
  selectedPlan: string | null
}

export default function DietSection({ selectedPlan }: DietSectionProps) {
  const [userProfile, setUserProfile] = useState({
    weight: "",
    height: "",
    age: "",
    goal: "",
    healthIssues: ""
  })
  const [dietGenerated, setDietGenerated] = useState(false)

  const handleGenerateDiet = () => {
    setDietGenerated(true)
  }

  const sampleMeals = [
    {
      time: "Café da Manhã",
      hour: "07:00",
      calories: 450,
      items: [
        "2 ovos mexidos",
        "2 fatias de pão integral",
        "1 banana",
        "Café com leite desnatado"
      ]
    },
    {
      time: "Lanche da Manhã",
      hour: "10:00",
      calories: 150,
      items: [
        "1 iogurte grego natural",
        "1 colher de granola"
      ]
    },
    {
      time: "Almoço",
      hour: "12:30",
      calories: 650,
      items: [
        "150g de frango grelhado",
        "1 xícara de arroz integral",
        "Salada verde à vontade",
        "1 colher de azeite"
      ]
    },
    {
      time: "Lanche da Tarde",
      hour: "15:30",
      calories: 200,
      items: [
        "1 fatia de queijo branco",
        "6 castanhas",
        "1 maçã"
      ]
    },
    {
      time: "Jantar",
      hour: "19:00",
      calories: 550,
      items: [
        "150g de peixe assado",
        "Batata doce média",
        "Legumes no vapor",
        "Salada verde"
      ]
    }
  ]

  if (!dietGenerated) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white">Configure sua Dieta Personalizada</h2>
          <p className="text-slate-400">Preencha seus dados para gerar um plano alimentar ideal para você</p>
        </div>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-emerald-500" />
              Dados Pessoais
            </CardTitle>
            <CardDescription>Informe seus dados para personalização</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-slate-300">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Ex: 75"
                  value={userProfile.weight}
                  onChange={(e) => setUserProfile({...userProfile, weight: e.target.value})}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height" className="text-slate-300">Altura (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Ex: 175"
                  value={userProfile.height}
                  onChange={(e) => setUserProfile({...userProfile, height: e.target.value})}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="age" className="text-slate-300">Idade</Label>
              <Input
                id="age"
                type="number"
                placeholder="Ex: 28"
                value={userProfile.age}
                onChange={(e) => setUserProfile({...userProfile, age: e.target.value})}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal" className="text-slate-300">Objetivo</Label>
              <Select value={userProfile.goal} onValueChange={(value) => setUserProfile({...userProfile, goal: value})}>
                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                  <SelectValue placeholder="Selecione seu objetivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Emagrecer</SelectItem>
                  <SelectItem value="gain">Ganhar Peso</SelectItem>
                  <SelectItem value="muscle">Ganhar Músculo</SelectItem>
                  <SelectItem value="definition">Definição Muscular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="health" className="text-slate-300">Problemas de Saúde (opcional)</Label>
              <Input
                id="health"
                placeholder="Ex: Diabetes, hipertensão..."
                value={userProfile.healthIssues}
                onChange={(e) => setUserProfile({...userProfile, healthIssues: e.target.value})}
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <Button 
              onClick={handleGenerateDiet}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Gerar Dieta Personalizada
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Sua Dieta Personalizada</h2>
          <p className="text-slate-400">Plano alimentar baseado no seu objetivo: Ganhar Músculo</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setDietGenerated(false)}
          className="border-slate-700 text-slate-300 hover:bg-slate-800"
        >
          Editar Dados
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border-emerald-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Flame className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Calorias/dia</p>
                <p className="text-2xl font-bold text-white">2000</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Apple className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Proteínas</p>
                <p className="text-2xl font-bold text-white">150g</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Carboidratos</p>
                <p className="text-2xl font-bold text-white">200g</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-red-600/10 border-orange-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Refeições</p>
                <p className="text-2xl font-bold text-white">5x/dia</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meal Plan */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Plano de Refeições</h3>
        {sampleMeals.map((meal, idx) => (
          <Card key={idx} className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-lg">{meal.time}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4" />
                    {meal.hour}
                  </CardDescription>
                </div>
                <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0">
                  <Flame className="w-3 h-3 mr-1" />
                  {meal.calories} kcal
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {meal.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center gap-2 text-slate-300">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tips */}
      <Card className="bg-gradient-to-r from-emerald-500/10 to-teal-600/10 border-emerald-500/20">
        <CardHeader>
          <CardTitle className="text-white">Dicas Importantes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-slate-300">
          <p>• Beba pelo menos 2 litros de água por dia</p>
          <p>• Evite alimentos processados e frituras</p>
          <p>• Faça as refeições nos horários indicados</p>
          <p>• Ajuste as porções conforme sua fome e saciedade</p>
        </CardContent>
      </Card>
    </div>
  )
}
