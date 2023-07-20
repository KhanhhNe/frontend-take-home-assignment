import * as Tabs from '@radix-ui/react-tabs'
import { useState } from 'react'
import { z } from 'zod'

import { CreateTodoForm } from '@/client/components/CreateTodoForm'
import { TodoList } from '@/client/components/TodoList'

/**
 * QUESTION 6:
 * -----------
 * Implement quick filter/tab feature so that we can quickly find todos with
 * different statuses ("pending", "completed", or both). The UI should look like
 * the design on Figma.
 *
 * NOTE:
 *  - For this question, you must use RadixUI Tabs component. Its Documentation
 *  is linked below.
 *
 * Documentation references:
 *  - https://www.radix-ui.com/docs/primitives/components/tabs
 */

const Index = () => {
  const TabName = z.enum(['all', 'pending', 'completed'])
  type TabName = z.infer<typeof TabName>
  const [activeTab, setActiveTab] = useState<TabName>(TabName.Values.all)

  return (
    <main className="mx-auto w-[480px] pt-12">
      <div className="rounded-12 bg-white p-8 shadow-sm">
        <h1 className="text-center text-4xl font-extrabold text-gray-900">
          Todo App
        </h1>

        <div className="pt-10">
          <Tabs.Root
            defaultValue={activeTab}
            onValueChange={(value) => setActiveTab(value as TabName)}
            orientation="horizontal"
          >
            <Tabs.List className="flex gap-2">
              {Object.keys(TabName.Values).map((tabName) => (
                <TabTrigger
                  key={tabName}
                  value={tabName}
                  isActive={tabName === activeTab}
                >
                  {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
                </TabTrigger>
              ))}
            </Tabs.List>
            {/* {Object.keys(TabName.Values).map((tabName) => (
              <Tabs.Content
                key={tabName}
                value={tabName}
                className="data-[state=inactive]:hidden"
              >
                <div className="pt-10">
                  <TodoList status={tabName as TabName} />
                </div>
              </Tabs.Content>
            ))} */}
            <div>
              <div className="pt-10">
                <TodoList status={activeTab} />
              </div>
            </div>
          </Tabs.Root>
        </div>

        <div className="pt-10">
          <CreateTodoForm />
        </div>
      </div>
    </main>
  )
}

const TabTrigger = ({
  children,
  value,
  isActive = false,
}: {
  children: React.ReactNode
  value: string
  isActive?: boolean
}) => (
  <Tabs.Trigger value={value} asChild>
    <button
      className={`rounded-full border border-gray-200 px-6 py-3 font-bold ${
        isActive ? 'bg-gray-700 text-white' : 'text-gray-700'
      }`}
    >
      {children}
    </button>
  </Tabs.Trigger>
)

export default Index
