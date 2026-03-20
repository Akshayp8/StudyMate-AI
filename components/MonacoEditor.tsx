'use client'

import Editor from '@monaco-editor/react'
import { useState } from 'react'

interface CodeEditorProps {
  initialCode?: string
  language?: string
  onChange?: (value: string | undefined) => void
}

export default function MonacoEditor({ initialCode = '// Write your code here', language = 'javascript', onChange }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '')
    if(onChange) onChange(value)
  }

  return (
    <div className="h-[400px] w-full border border-gray-700 rounded-lg overflow-hidden">
      <Editor
        height="100%"
        defaultLanguage={language}
        defaultValue={code}
        theme="vs-dark"
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on'
        }}
      />
    </div>
  )
}
