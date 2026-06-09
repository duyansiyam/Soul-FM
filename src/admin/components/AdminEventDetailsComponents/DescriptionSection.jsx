import SectionHeader from './SectionHeader'
import ToolbarButton from './ToolbarButton'

export default function DescriptionSection({ descriptionRef, runCommand, updateForm }) {
  return (
    <section id="description" className="card">
      <SectionHeader
        title="Description"
        subtitle="Share your story and highlights so attendees can learn more."
      />

      <div className="rounded-xl border border-gray-300 overflow-hidden bg-white">
        <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 px-4 py-3 text-gray-600">
          <ToolbarButton onClick={() => runCommand('bold')}>B</ToolbarButton>
          <ToolbarButton onClick={() => runCommand('italic')}>i</ToolbarButton>
          <ToolbarButton onClick={() => runCommand('underline')}>U</ToolbarButton>
          <ToolbarButton onClick={() => runCommand('strikeThrough')}>S</ToolbarButton>
          <ToolbarButton onClick={() => runCommand('formatBlock', 'h2')}>Aa</ToolbarButton>
          <ToolbarButton onClick={() => runCommand('insertUnorderedList')}>•</ToolbarButton>
          <ToolbarButton onClick={() => runCommand('insertOrderedList')}>1.</ToolbarButton>
          <ToolbarButton onClick={() => runCommand('justifyLeft')}>⇤</ToolbarButton>
          <ToolbarButton onClick={() => runCommand('justifyRight')}>⇥</ToolbarButton>
          <ToolbarButton onClick={() => runCommand('formatBlock', 'blockquote')}>❝</ToolbarButton>
          <ToolbarButton
            onClick={() => {
              const url = prompt('Enter URL')
              if (url) runCommand('createLink', url)
            }}
          >
            🔗
          </ToolbarButton>
          <ToolbarButton onClick={() => runCommand('undo')}>↶</ToolbarButton>
          <ToolbarButton onClick={() => runCommand('redo')}>↷</ToolbarButton>
        </div>

        <div
          ref={descriptionRef}
          contentEditable
          onInput={(e) => updateForm('description', e.currentTarget.innerHTML)}
          className="min-h-55 w-full p-4 outline-none text-gray-700 font-normal"
          data-placeholder="Write event description..."
        />
      </div>
    </section>
  )
}
