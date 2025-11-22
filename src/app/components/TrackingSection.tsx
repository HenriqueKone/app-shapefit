"use client"

import { useState } from "react"
import { Camera, TrendingUp, Calendar, Activity, Heart, Footprints, Flame, Plus, Image as ImageIcon, Lock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface TrackingSectionProps {
  selectedPlan: string | null
}

export default function TrackingSection({ selectedPlan }: TrackingSectionProps) {
  const [measurements, setMeasurements] = useState({
    weight: "",
    chest: "",
    waist: "",
    hips: "",
    arms: "",
    legs: ""
  })

  // Verificar se tem acesso
  const hasAccess = selectedPlan === "complete"

  const progressData = [
    { date: "01/01", weight: 85, chest: 100, waist: 90, hips: 100, arms: 35, legs: 60 },
    { date: "08/01", weight: 84, chest: 101, waist: 88, hips: 99, arms: 36, legs: 61 },
    { date: "15/01", weight: 83, chest: 102, waist: 86, hips: 98, arms: 37, legs: 62 },
    { date: "22/01", weight: 82, chest: 103, waist: 84, hips: 97, arms: 38, legs: 63 }
  ]

  const smartwatchData = {
    steps: 8547,
    calories: 2340,
    heartRate: 72,
    activeMinutes: 45
  }

  const photos = [
    { date: "01/01/2024", type: "Frente" },
    { date: "01/01/2024", type: "Lado" },
    { date: "01/01/2024", type: "Costas" }
  ]

  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full bg-slate-900/50 border-slate-800">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500/20 to-red-600/20 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Acompanhamento Bloqueado</h3>
            <p className="text-slate-400 mb-6">
              O Diário Fit e integração com smartwatch estão disponíveis apenas no Plano Completo
            </p>
            <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90">
              Fazer Upgrade para Completo
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Diário Fit - Acompanhamento</h2>
        <p className="text-slate-400">Registre suas medidas, fotos e acompanhe sua evolução</p>
      </div>

      <Tabs defaultValue="measurements" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-900/50 border border-slate-800">
          <TabsTrigger value="measurements">Medidas</TabsTrigger>
          <TabsTrigger value="photos">Fotos</TabsTrigger>
          <TabsTrigger value="smartwatch">Smartwatch</TabsTrigger>
        </TabsList>

        {/* Measurements Tab */}
        <TabsContent value="measurements" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Form */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  Registrar Medidas
                </CardTitle>
                <CardDescription>Adicione suas medidas de hoje</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-slate-300">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Ex: 75.5"
                    value={measurements.weight}
                    onChange={(e) => setMeasurements({...measurements, weight: e.target.value})}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="chest" className="text-slate-300">Peito (cm)</Label>
                    <Input
                      id="chest"
                      type="number"
                      placeholder="Ex: 100"
                      value={measurements.chest}
                      onChange={(e) => setMeasurements({...measurements, chest: e.target.value})}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waist" className="text-slate-300">Cintura (cm)</Label>
                    <Input
                      id="waist"
                      type="number"
                      placeholder="Ex: 85"
                      value={measurements.waist}
                      onChange={(e) => setMeasurements({...measurements, waist: e.target.value})}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hips" className="text-slate-300">Quadril (cm)</Label>
                    <Input
                      id="hips"
                      type="number"
                      placeholder="Ex: 95"
                      value={measurements.hips}
                      onChange={(e) => setMeasurements({...measurements, hips: e.target.value})}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="arms" className="text-slate-300">Braços (cm)</Label>
                    <Input
                      id="arms"
                      type="number"
                      placeholder="Ex: 35"
                      value={measurements.arms}
                      onChange={(e) => setMeasurements({...measurements, arms: e.target.value})}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="legs" className="text-slate-300">Pernas (cm)</Label>
                  <Input
                    id="legs"
                    type="number"
                    placeholder="Ex: 60"
                    value={measurements.legs}
                    onChange={(e) => setMeasurements({...measurements, legs: e.target.value})}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:opacity-90">
                  <Plus className="w-4 h-4 mr-2" />
                  Salvar Medidas
                </Button>
              </CardContent>
            </Card>

            {/* Progress Chart */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Evolução de Peso</CardTitle>
                <CardDescription>Últimas 4 semanas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {progressData.map((data, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <span className="text-slate-300">{data.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-white">{data.weight} kg</span>
                        {idx > 0 && (
                          <Badge className="bg-green-500/20 text-green-500 border-0">
                            -{progressData[idx - 1].weight - data.weight} kg
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-orange-500/10 to-red-600/10 border border-orange-500/20 rounded-lg">
                  <p className="text-sm text-slate-300">
                    <span className="font-bold text-white">Progresso Total:</span> -3 kg em 4 semanas
                  </p>
                  <p className="text-sm text-green-500 mt-1">
                    ✓ Você está no caminho certo!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* All Measurements History */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Histórico Completo de Medidas</CardTitle>
              <CardDescription>Acompanhe todas as suas medidas ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th className="text-left p-3 text-slate-400 font-semibold">Data</th>
                      <th className="text-left p-3 text-slate-400 font-semibold">Peso</th>
                      <th className="text-left p-3 text-slate-400 font-semibold">Peito</th>
                      <th className="text-left p-3 text-slate-400 font-semibold">Cintura</th>
                      <th className="text-left p-3 text-slate-400 font-semibold">Quadril</th>
                      <th className="text-left p-3 text-slate-400 font-semibold">Braços</th>
                      <th className="text-left p-3 text-slate-400 font-semibold">Pernas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {progressData.map((data, idx) => (
                      <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                        <td className="p-3 text-slate-300">{data.date}</td>
                        <td className="p-3 text-white font-semibold">{data.weight} kg</td>
                        <td className="p-3 text-slate-300">{data.chest} cm</td>
                        <td className="p-3 text-slate-300">{data.waist} cm</td>
                        <td className="p-3 text-slate-300">{data.hips} cm</td>
                        <td className="p-3 text-slate-300">{data.arms} cm</td>
                        <td className="p-3 text-slate-300">{data.legs} cm</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Photos Tab */}
        <TabsContent value="photos" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-purple-500" />
                Adicionar Fotos de Progresso
              </CardTitle>
              <CardDescription>Registre fotos para acompanhar sua evolução visual</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-40 border-dashed border-2 border-slate-700 hover:border-purple-500 hover:bg-slate-800">
                  <div className="flex flex-col items-center gap-2">
                    <Camera className="w-8 h-8 text-slate-400" />
                    <span className="text-slate-400">Foto Frontal</span>
                  </div>
                </Button>
                <Button variant="outline" className="h-40 border-dashed border-2 border-slate-700 hover:border-purple-500 hover:bg-slate-800">
                  <div className="flex flex-col items-center gap-2">
                    <Camera className="w-8 h-8 text-slate-400" />
                    <span className="text-slate-400">Foto Lateral</span>
                  </div>
                </Button>
                <Button variant="outline" className="h-40 border-dashed border-2 border-slate-700 hover:border-purple-500 hover:bg-slate-800">
                  <div className="flex flex-col items-center gap-2">
                    <Camera className="w-8 h-8 text-slate-400" />
                    <span className="text-slate-400">Foto de Costas</span>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Galeria de Progresso</CardTitle>
              <CardDescription>Suas fotos ao longo do tempo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {photos.map((photo, idx) => (
                  <div key={idx} className="relative group">
                    <div className="aspect-[3/4] bg-slate-800 rounded-lg flex items-center justify-center border border-slate-700 group-hover:border-purple-500 transition-colors">
                      <ImageIcon className="w-12 h-12 text-slate-600" />
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-white font-semibold">{photo.type}</p>
                      <p className="text-xs text-slate-400">{photo.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Smartwatch Tab */}
        <TabsContent value="smartwatch" className="space-y-6">
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Footprints className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Passos Hoje</p>
                    <p className="text-2xl font-bold text-white">{smartwatchData.steps.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/10 to-red-600/10 border-orange-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <Flame className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Calorias</p>
                    <p className="text-2xl font-bold text-white">{smartwatchData.calories}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-500/10 to-pink-600/10 border-red-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Batimentos</p>
                    <p className="text-2xl font-bold text-white">{smartwatchData.heartRate} bpm</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-600/10 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Min. Ativos</p>
                    <p className="text-2xl font-bold text-white">{smartwatchData.activeMinutes}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Dispositivos Conectados</CardTitle>
              <CardDescription>Gerencie suas integrações</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Apple Watch</p>
                    <p className="text-sm text-slate-400">Conectado</p>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-500 border-0">Ativo</Badge>
              </div>

              <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Dispositivo
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500/10 to-indigo-600/10 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-white">Sincronização Automática</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300">
              <p>Seus dados são sincronizados automaticamente a cada hora. Última sincronização: há 15 minutos.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
