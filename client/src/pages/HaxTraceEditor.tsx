import { HaxTraceProvider, useHaxTrace } from '@/contexts/HaxTraceContext';
import { HaxTraceCanvas } from '@/components/HaxTraceCanvas';
import { HaxTraceLeftSidebar } from '@/components/HaxTraceLeftSidebar';
import { HaxTraceCurveEditor } from '@/components/HaxTraceCurveEditor';
import { HaxTraceSidePanel } from '@/components/HaxTraceSidePanel';
import { useEffect } from 'react';

function EditorContent() {
  const { 
    undo, 
    redo,
    selectedVertices,
    selectedSegments,
    deleteSelectedVertices,
    deleteSelectedSegments
  } = useHaxTrace();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInputField = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        if (!isInputField) {
          e.preventDefault();
          undo();
        }
      } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        if (!isInputField) {
          e.preventDefault();
          redo();
        }
      } else if ((e.key === 'Delete' || e.key === 'Backspace') && !isInputField) {
        e.preventDefault();
        if (selectedVertices.length > 0) {
          deleteSelectedVertices();
        } else if (selectedSegments.length > 0) {
          deleteSelectedSegments();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, selectedVertices, selectedSegments, deleteSelectedVertices, deleteSelectedSegments]);

  return (
    <div className="flex h-screen bg-background">
      <HaxTraceLeftSidebar />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative flex items-center justify-center p-8">
          <div className="w-full h-full border border-border/50 rounded-lg overflow-hidden bg-card/20">
            <HaxTraceCanvas />
            <HaxTraceCurveEditor />
          </div>
        </div>
        <HaxTraceSidePanel />
      </div>
    </div>
  );
}

export default function HaxTraceEditor() {
  return (
    <HaxTraceProvider>
      <EditorContent />
    </HaxTraceProvider>
  );
}
