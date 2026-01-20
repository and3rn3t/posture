import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Toaster } from '@/components/ui/sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dashboard } from '@/components/Dashboard'
import { History } from '@/components/History'
import { GaitFormDialog } from '@/components/GaitFormDialog'
import { PostureFormDialog } from '@/components/PostureFormDialog'
import { GaitAssessment, PostureCheck } from '@/lib/types'
import { ChartLine, Pulse } from '@phosphor-icons/react'
import { toast } from 'sonner'

function App() {
  const [gaitAssessments, setGaitAssessments] = useKV<GaitAssessment[]>('gait-assessments', [])
  const [postureChecks, setPostureChecks] = useKV<PostureCheck[]>('posture-checks', [])
  const [gaitDialogOpen, setGaitDialogOpen] = useState(false)
  const [postureDialogOpen, setPostureDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  const handleSaveGait = (assessment: GaitAssessment) => {
    setGaitAssessments((current) => [assessment, ...(current || [])])
  }

  const handleSavePosture = (check: PostureCheck) => {
    setPostureChecks((current) => [check, ...(current || [])])
  }

  const handleDeleteGait = (id: string) => {
    setGaitAssessments((current) => (current || []).filter((a) => a.id !== id))
    toast.success('Gait assessment deleted')
  }

  const handleDeletePosture = (id: string) => {
    setPostureChecks((current) => (current || []).filter((c) => c.id !== id))
    toast.success('Posture check deleted')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="dashboard" className="gap-2">
              <Pulse weight="fill" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <ChartLine weight="fill" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-0">
            <Dashboard
              gaitAssessments={gaitAssessments || []}
              postureChecks={postureChecks || []}
              onNewGait={() => setGaitDialogOpen(true)}
              onNewPosture={() => setPostureDialogOpen(true)}
            />
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <History
              gaitAssessments={gaitAssessments || []}
              postureChecks={postureChecks || []}
              onDeleteGait={handleDeleteGait}
              onDeletePosture={handleDeletePosture}
            />
          </TabsContent>
        </Tabs>
      </div>

      <GaitFormDialog
        open={gaitDialogOpen}
        onOpenChange={setGaitDialogOpen}
        onSave={handleSaveGait}
      />

      <PostureFormDialog
        open={postureDialogOpen}
        onOpenChange={setPostureDialogOpen}
        onSave={handleSavePosture}
      />

      <Toaster />
    </div>
  )
}

export default App