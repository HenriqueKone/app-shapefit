"use client"

import { useState } from "react"
import { Dumbbell, Play, Clock, Flame, ChevronRight, CheckCircle2, Lock, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface WorkoutSectionProps {
  selectedPlan: string | null
}

export default function WorkoutSection({ selectedPlan }: WorkoutSectionProps) {
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null)
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)

  // Verificar se tem acesso
  const hasAccess = selectedPlan === "intermediate" || selectedPlan === "complete"

  const workoutPlans = [
    {
      id: "chest",
      name: "Treino de Peito",
      day: "Segunda-feira",
      duration: "60 min",
      calories: 450,
      exercises: [
        { 
          name: "Supino Reto", 
          sets: "4x12", 
          video: "https://www.youtube.com/embed/rT7DgCr-3pg",
          description: "Deite-se no banco reto, pegue a barra com as mãos afastadas na largura dos ombros. Desça a barra até o peito controladamente e empurre para cima. Mantenha os pés firmes no chão e as escápulas retraídas. Expire ao subir, inspire ao descer.",
          muscles: "Peitoral maior, tríceps, deltoides anterior",
          tips: "Não arqueie demais as costas. Mantenha os cotovelos em 45° do corpo."
        },
        { 
          name: "Supino Inclinado", 
          sets: "4x10", 
          video: "https://www.youtube.com/embed/SrqOu55lrYU",
          description: "No banco inclinado a 30-45°, execute o movimento similar ao supino reto. Foque na contração da parte superior do peitoral. Desça a barra até a parte superior do peito. Mantenha o controle total do movimento.",
          muscles: "Peitoral superior, deltoides anterior, tríceps",
          tips: "Inclinação ideal: 30-45°. Não use peso excessivo."
        },
        { 
          name: "Crucifixo", 
          sets: "3x12", 
          video: "https://www.youtube.com/embed/eozdVDA78K0",
          description: "Deitado no banco, segure os halteres acima do peito com os braços levemente flexionados. Abra os braços em movimento de arco até sentir alongamento no peito. Retorne à posição inicial contraindo o peitoral. Mantenha a mesma angulação dos cotovelos.",
          muscles: "Peitoral maior (porção média e externa)",
          tips: "Não estenda completamente os cotovelos. Controle a descida."
        },
        { 
          name: "Flexão de Braço", 
          sets: "3x15", 
          video: "https://www.youtube.com/embed/IODxDxX7oi4",
          description: "Em posição de prancha, mãos na largura dos ombros, corpo alinhado. Desça o corpo flexionando os cotovelos até o peito quase tocar o chão. Empurre para cima mantendo o core ativado. Mantenha o corpo reto durante todo movimento.",
          muscles: "Peitoral, tríceps, core, deltoides",
          tips: "Mantenha o abdômen contraído. Não deixe o quadril cair."
        },
        { 
          name: "Pullover", 
          sets: "3x12", 
          video: "https://www.youtube.com/embed/FK1vCxKNs2c",
          description: "Deitado perpendicular no banco (apenas as escápulas apoiadas), segure um halter com ambas as mãos acima do peito. Desça o peso em arco atrás da cabeça, alongando o peitoral e dorsal. Retorne à posição inicial contraindo o peitoral.",
          muscles: "Peitoral, grande dorsal, serrátil anterior",
          tips: "Mantenha os cotovelos levemente flexionados. Respire profundamente."
        }
      ]
    },
    {
      id: "back",
      name: "Treino de Costas",
      day: "Terça-feira",
      duration: "65 min",
      calories: 480,
      exercises: [
        { 
          name: "Barra Fixa", 
          sets: "4x10", 
          video: "https://www.youtube.com/embed/eGo4IYlbE5g",
          description: "Segure a barra com pegada pronada (palmas para frente), mãos afastadas além da largura dos ombros. Puxe o corpo para cima até o queixo passar a barra. Desça controladamente. Mantenha o core ativado e evite balançar o corpo.",
          muscles: "Grande dorsal, bíceps, trapézio, romboides",
          tips: "Se necessário, use elástico para assistência. Foque em puxar com as costas."
        },
        { 
          name: "Remada Curvada", 
          sets: "4x12", 
          video: "https://www.youtube.com/embed/FWJR5Ve8bnQ",
          description: "Em pé, joelhos levemente flexionados, tronco inclinado 45°. Segure a barra com pegada pronada. Puxe a barra em direção ao abdômen, contraindo as escápulas. Mantenha as costas retas e o core ativado durante todo movimento.",
          muscles: "Grande dorsal, trapézio médio, romboides, eretores da espinha",
          tips: "Não arredonde as costas. Puxe com os cotovelos, não com as mãos."
        },
        { 
          name: "Puxada Frontal", 
          sets: "4x12", 
          video: "https://www.youtube.com/embed/CAwf7n6Luuc",
          description: "Sentado na máquina, segure a barra larga com pegada pronada. Puxe a barra até a altura do peito superior, contraindo as escápulas. Retorne controladamente. Mantenha o tronco levemente inclinado para trás (15-20°).",
          muscles: "Grande dorsal, trapézio inferior, bíceps",
          tips: "Não use impulso do corpo. Foque na contração das costas."
        },
        { 
          name: "Remada Unilateral", 
          sets: "3x12", 
          video: "https://www.youtube.com/embed/roCP6wCXPqo",
          description: "Apoie um joelho e uma mão no banco. Com a outra mão, segure o halter. Puxe o peso em direção ao quadril, mantendo o cotovelo próximo ao corpo. Contraia a escápula no topo do movimento. Alterne os lados.",
          muscles: "Grande dorsal, trapézio, romboides, bíceps",
          tips: "Mantenha as costas paralelas ao chão. Não rotacione o tronco."
        },
        { 
          name: "Levantamento Terra", 
          sets: "3x10", 
          video: "https://www.youtube.com/embed/op9kVnSso6Q",
          description: "Em pé, pés na largura dos ombros, barra próxima às canelas. Agache e segure a barra. Levante o peso estendendo quadris e joelhos simultaneamente, mantendo as costas retas. Desça controladamente. Mantenha a barra próxima ao corpo.",
          muscles: "Eretores da espinha, glúteos, posteriores de coxa, trapézio",
          tips: "Mantenha o peito para cima. Não arredonde as costas."
        }
      ]
    },
    {
      id: "legs",
      name: "Treino de Pernas",
      day: "Quarta-feira",
      duration: "70 min",
      calories: 550,
      exercises: [
        { 
          name: "Agachamento Livre", 
          sets: "4x12", 
          video: "https://www.youtube.com/embed/ultWZbUMPL8",
          description: "Barra apoiada nos trapézios, pés na largura dos ombros, pontas levemente para fora. Desça flexionando quadris e joelhos até coxas paralelas ao chão. Suba empurrando pelos calcanhares. Mantenha o peito para cima e joelhos alinhados com os pés.",
          muscles: "Quadríceps, glúteos, posteriores de coxa, core",
          tips: "Joelhos não devem ultrapassar muito os pés. Mantenha o core contraído."
        },
        { 
          name: "Leg Press", 
          sets: "4x15", 
          video: "https://www.youtube.com/embed/IZxyjW7MPJQ",
          description: "Sentado na máquina, pés na plataforma na largura dos ombros. Empurre a plataforma estendendo as pernas, sem travar completamente os joelhos. Desça controladamente até 90° de flexão. Mantenha as costas apoiadas no encosto.",
          muscles: "Quadríceps, glúteos, posteriores de coxa",
          tips: "Não tire o quadril do banco. Desça até 90° de flexão."
        },
        { 
          name: "Cadeira Extensora", 
          sets: "3x12", 
          video: "https://www.youtube.com/embed/YyvSfVjQeL0",
          description: "Sentado na máquina, ajuste o apoio para os tornozelos. Estenda as pernas completamente, contraindo o quadríceps no topo. Desça controladamente. Mantenha as costas apoiadas e segure nas alças laterais.",
          muscles: "Quadríceps (isolamento)",
          tips: "Não use impulso. Contraia o quadríceps no topo por 1 segundo."
        },
        { 
          name: "Cadeira Flexora", 
          sets: "3x12", 
          video: "https://www.youtube.com/embed/ELOCsoDSmrg",
          description: "Deitado de bruços na máquina, calcanhares sob o apoio. Flexione as pernas trazendo os calcanhares em direção aos glúteos. Contraia os posteriores no topo. Desça controladamente. Mantenha o quadril apoiado no banco.",
          muscles: "Posteriores de coxa (isquiotibiais)",
          tips: "Não levante o quadril do banco. Movimento controlado."
        },
        { 
          name: "Panturrilha em Pé", 
          sets: "4x20", 
          video: "https://www.youtube.com/embed/gwLzBJYoWlI",
          description: "Em pé na máquina, ombros sob as almofadas, pontas dos pés na plataforma. Suba na ponta dos pés o máximo possível, contraindo as panturrilhas. Desça alongando completamente. Mantenha os joelhos levemente flexionados.",
          muscles: "Gastrocnêmio, sóleo (panturrilhas)",
          tips: "Amplitude completa é essencial. Pause no topo por 1 segundo."
        }
      ]
    },
    {
      id: "shoulders",
      name: "Treino de Ombros",
      day: "Quinta-feira",
      duration: "55 min",
      calories: 420,
      exercises: [
        { 
          name: "Desenvolvimento com Barra", 
          sets: "4x12", 
          video: "https://www.youtube.com/embed/2yjwXTZQDDI",
          description: "Sentado ou em pé, barra na altura do peito. Empurre a barra para cima até extensão completa dos braços. Desça controladamente até a barra tocar a parte superior do peito. Mantenha o core ativado e evite arquear demais as costas.",
          muscles: "Deltoides (anterior, médio, posterior), tríceps",
          tips: "Não trave os cotovelos no topo. Mantenha o abdômen contraído."
        },
        { 
          name: "Elevação Lateral", 
          sets: "4x12", 
          video: "https://www.youtube.com/embed/3VcKaXpzqRo",
          description: "Em pé, halteres nas mãos ao lado do corpo. Eleve os braços lateralmente até a altura dos ombros, cotovelos levemente flexionados. Desça controladamente. Mantenha o tronco estável, sem balançar.",
          muscles: "Deltoide médio (lateral)",
          tips: "Não use impulso. Cotovelos levemente acima das mãos no topo."
        },
        { 
          name: "Elevação Frontal", 
          sets: "3x12", 
          video: "https://www.youtube.com/embed/qEwKCR5JCog",
          description: "Em pé, halteres à frente das coxas. Eleve os braços à frente até a altura dos ombros, mantendo os cotovelos levemente flexionados. Desça controladamente. Alterne os braços ou execute simultaneamente.",
          muscles: "Deltoide anterior",
          tips: "Não balance o corpo. Mantenha o core ativado."
        },
        { 
          name: "Remada Alta", 
          sets: "3x12", 
          video: "https://www.youtube.com/embed/XP6JThFTXo4",
          description: "Em pé, segure a barra com pegada fechada (mãos próximas). Puxe a barra verticalmente até a altura do queixo, mantendo os cotovelos acima das mãos. Desça controladamente. Mantenha o tronco ereto.",
          muscles: "Trapézio superior, deltoides médio e anterior",
          tips: "Não puxe acima da linha dos ombros se sentir desconforto."
        },
        { 
          name: "Encolhimento", 
          sets: "3x15", 
          video: "https://www.youtube.com/embed/cJRVVxmytaM",
          description: "Em pé, halteres ou barra nas mãos, braços estendidos. Eleve os ombros em direção às orelhas, contraindo o trapézio. Mantenha por 1 segundo e desça controladamente. Não rotacione os ombros.",
          muscles: "Trapézio superior",
          tips: "Movimento vertical puro. Não flexione os cotovelos."
        }
      ]
    },
    {
      id: "arms",
      name: "Treino de Braços",
      day: "Sexta-feira",
      duration: "50 min",
      calories: 380,
      exercises: [
        { 
          name: "Rosca Direta", 
          sets: "4x12", 
          video: "https://www.youtube.com/embed/LY1V6UbRHFM",
          description: "Em pé, barra com pegada supinada (palmas para cima), braços estendidos. Flexione os cotovelos trazendo a barra até os ombros, mantendo os cotovelos fixos. Desça controladamente. Não balance o corpo.",
          muscles: "Bíceps braquial, braquial anterior",
          tips: "Cotovelos fixos ao lado do corpo. Não use impulso."
        },
        { 
          name: "Rosca Alternada", 
          sets: "3x12", 
          video: "https://www.youtube.com/embed/sAq_ocpRh_I",
          description: "Em pé, halteres nas mãos com pegada neutra. Flexione um braço de cada vez, rotacionando o pulso (supinação) durante o movimento. Contraia o bíceps no topo. Alterne os braços de forma controlada.",
          muscles: "Bíceps braquial, braquiorradial",
          tips: "Rotação completa do pulso. Movimento controlado sem balanço."
        },
        { 
          name: "Tríceps Testa", 
          sets: "4x12", 
          video: "https://www.youtube.com/embed/d_KZxkY_0cM",
          description: "Deitado no banco, barra acima da testa com braços estendidos. Flexione apenas os cotovelos, descendo a barra em direção à testa. Estenda os braços contraindo o tríceps. Mantenha os cotovelos fixos apontando para cima.",
          muscles: "Tríceps braquial (todas as cabeças)",
          tips: "Apenas os antebraços se movem. Cotovelos fixos."
        },
        { 
          name: "Tríceps Corda", 
          sets: "3x12", 
          video: "https://www.youtube.com/embed/2-LAMcpzODU",
          description: "Na polia alta, segure a corda com ambas as mãos. Empurre para baixo estendendo completamente os cotovelos, separando as pontas da corda no final. Retorne controladamente. Mantenha os cotovelos próximos ao corpo.",
          muscles: "Tríceps braquial (ênfase na cabeça lateral)",
          tips: "Separe a corda no final do movimento. Cotovelos fixos."
        },
        { 
          name: "Rosca Martelo", 
          sets: "3x12", 
          video: "https://www.youtube.com/embed/zC3nLlEvin4",
          description: "Em pé, halteres com pegada neutra (palmas voltadas uma para outra). Flexione os cotovelos mantendo a pegada neutra durante todo movimento. Contraia no topo e desça controladamente. Não rotacione os pulsos.",
          muscles: "Braquial, braquiorradial, bíceps",
          tips: "Pegada neutra durante todo movimento. Cotovelos fixos."
        }
      ]
    }
  ]

  if (!hasAccess) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full bg-slate-900/50 border-slate-800">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-600/20 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Treinos Bloqueados</h3>
            <p className="text-slate-400 mb-6">
              Os treinos personalizados estão disponíveis nos planos Intermediário e Completo
            </p>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90">
              Fazer Upgrade do Plano
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (selectedWorkout) {
    const workout = workoutPlans.find(w => w.id === selectedWorkout)
    if (!workout) return null

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">{workout.name}</h2>
            <p className="text-slate-400">{workout.day}</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setSelectedWorkout(null)}
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            Voltar aos Treinos
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-500/10 to-indigo-600/10 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Duração</p>
                  <p className="text-xl font-bold text-white">{workout.duration}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-red-600/10 border-orange-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Calorias</p>
                  <p className="text-xl font-bold text-white">{workout.calories} kcal</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Exercícios</p>
                  <p className="text-xl font-bold text-white">{workout.exercises.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white">Exercícios</h3>
          {workout.exercises.map((exercise, idx) => (
            <Card key={idx} className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white mb-1">{exercise.name}</h4>
                        <p className="text-blue-400 font-medium mb-2">{exercise.sets} repetições</p>
                        <p className="text-sm text-slate-300 mb-2">{exercise.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="outline" className="border-purple-500/30 text-purple-400 bg-purple-500/10">
                            <Info className="w-3 h-3 mr-1" />
                            {exercise.muscles}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button 
                      onClick={() => setPlayingVideo(playingVideo === exercise.video ? null : exercise.video)}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 flex-shrink-0"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {playingVideo === exercise.video ? 'Fechar' : 'Ver Vídeo'}
                    </Button>
                  </div>
                  
                  {playingVideo === exercise.video && (
                    <div className="space-y-3">
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-slate-950">
                        <iframe
                          src={exercise.video}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          title={`Vídeo explicativo: ${exercise.name}`}
                        />
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-indigo-600 px-3 py-1 rounded-full text-xs text-white font-semibold flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Vídeo Educativo
                        </div>
                      </div>
                      <Card className="bg-blue-500/10 border-blue-500/20">
                        <CardContent className="p-4">
                          <h5 className="text-sm font-semibold text-blue-400 mb-2">💡 Dicas Importantes:</h5>
                          <p className="text-sm text-slate-300">{exercise.tips}</p>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-blue-500/10 to-indigo-600/10 border-blue-500/20">
          <CardHeader>
            <CardTitle className="text-white">Orientações Gerais do Treino</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-slate-300">
            <p>• <strong>Aquecimento:</strong> 5-10 minutos de cardio leve + mobilidade articular</p>
            <p>• <strong>Execução:</strong> Mantenha a forma correta em todos os exercícios</p>
            <p>• <strong>Descanso:</strong> 60-90 segundos entre as séries</p>
            <p>• <strong>Hidratação:</strong> Beba água durante todo o treino</p>
            <p>• <strong>Alongamento:</strong> 5-10 minutos de alongamento após finalizar</p>
            <p>• <strong>Progressão:</strong> Aumente a carga gradualmente quando conseguir completar todas as séries com boa forma</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-white">Seus Treinos Personalizados</h2>
        <p className="text-slate-400">Plano semanal com vídeos explicativos profissionais em português</p>
      </div>

      <Card className="bg-gradient-to-r from-blue-500/10 to-indigo-600/10 border-blue-500/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">🎥 Vídeos Educativos Profissionais</h3>
              <ul className="text-slate-300 space-y-1">
                <li>• Demonstração realista e detalhada do movimento correto</li>
                <li>• Explicações completas em português brasileiro</li>
                <li>• Dicas de segurança e músculos trabalhados</li>
                <li>• Orientações sobre execução e progressão</li>
              </ul>
            </div>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Play className="w-10 h-10 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workoutPlans.map((workout) => (
          <Card 
            key={workout.id}
            className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-all duration-300 hover:scale-105 cursor-pointer"
            onClick={() => setSelectedWorkout(workout.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0">
                  {workout.day}
                </Badge>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
              <CardTitle className="text-white">{workout.name}</CardTitle>
              <CardDescription className="flex items-center gap-4 mt-2">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {workout.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Flame className="w-4 h-4" />
                  {workout.calories} kcal
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-slate-400 font-semibold">Exercícios:</p>
                <ul className="space-y-1">
                  {workout.exercises.slice(0, 3).map((exercise, idx) => (
                    <li key={idx} className="text-sm text-slate-300 flex items-center gap-2">
                      <CheckCircle2 className="w-3 h-3 text-blue-500 flex-shrink-0" />
                      {exercise.name}
                    </li>
                  ))}
                  {workout.exercises.length > 3 && (
                    <li className="text-sm text-slate-400">
                      +{workout.exercises.length - 3} exercícios
                    </li>
                  )}
                </ul>
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90">
                Ver Treino Completo
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
