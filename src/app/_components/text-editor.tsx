'use client'

import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import Heading from '@tiptap/extension-heading'
import { Separator } from '~/components/ui/separator'
import { BoldToolbar } from '~/components/toolbars/bold'
import { BulletListToolbar } from '~/components/toolbars/bullet-list'
import { ItalicToolbar } from '~/components/toolbars/italic'
import { OrderedListToolbar } from '~/components/toolbars/ordered-list'
import { RedoToolbar } from '~/components/toolbars/redo'
import { ToolbarProvider } from '~/components/toolbars/toolbar-provider'
import { UndoToolbar } from '~/components/toolbars/undo'
import {
  EditorContent,
  type Extension,
  mergeAttributes,
  useEditor,
} from '@tiptap/react'
import { Color } from '@tiptap/extension-color'
import { AlignmentTooolbar } from './toolbars/alignment'
import { LinkToolbar } from './toolbars/link'
import { ColorToolbar } from './toolbars/color'
import { UnderlineToolbar } from './toolbars/underline'
import { ImagePlaceholderToolbar } from './toolbars/image-placeholder-toolbar'
import { ImagePlaceholder } from './extensions/image-placeholder'
import { ImageExtension } from './extensions/image'
import { HighlightToolbar } from './toolbars/higlight'
import { HeadingToolbar } from './toolbars/heading'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import { SubscriptToolbar } from './toolbars/subscript'
import { SuperscriptToolbar } from './toolbars/superscript'
import { HardBreakToolbar } from './toolbars/hard-break'

const extensions = [
  StarterKit.configure({
    heading: false,
    orderedList: false,
    bulletList: false,
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  Heading.extend({
    levels: [1, 2, 3, 4, 5, 6],
    renderHTML({ node, HTMLAttributes }) {
      const level = this.options.levels.includes(node.attrs.level)
        ? node.attrs.level
        : this.options.levels[0]
      const classes: { [index: number]: string } = {
        1: 'text-4xl font-extrabold',
        2: 'text-3xl font-bold',
        3: 'text-2xl font-semibold',
        4: 'text-xl font-medium',
        5: 'text-sm font-normal',
        6: 'text-xs font-light',
      }
      return [
        `h${level}`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          class: `${classes[level]}`,
        }),
        0,
      ]
    },
  }).configure({ levels: [1, 2, 3, 4, 5, 6] }),
  Highlight.configure({
    multicolor: true,
  }),
  OrderedList.configure({
    HTMLAttributes: {
      class: 'list-decimal ml-8',
    },
  }),
  BulletList.configure({
    HTMLAttributes: {
      class: 'list-disc ml-8',
    },
  }),
  ImageExtension,
  ImagePlaceholder,
  TextStyle,
  Subscript,
  Superscript,
  Underline,
  Link.configure({
    HTMLAttributes: {
      class: 'underline text-blue-500',
    },
  }),
  Color,
]

export default function TextEditor({
  content,
  onChange,
}: {
  content: string
  onChange: (richText: string) => void
}) {
  const editor = useEditor({
    extensions: extensions as Extension[],
    content: content,
    editorProps: {
      attributes: {
        class: 'min-h-[24.5rem] rounded-md outline-none px-4 py-3',
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      console.log(editor.getHTML())
      onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }
  return (
    <div className="relative overflow-hidden rounded-md border pb-3">
      <div className="sticky left-0 top-0 z-20 w-full border-b bg-background px-2 py-2">
        <ToolbarProvider editor={editor}>
          <div className="flex flex-wrap items-center gap-2">
            <UndoToolbar />
            <RedoToolbar />
            <Separator orientation="vertical" className="block h-6" />
            <HeadingToolbar />
            <AlignmentTooolbar />
            <BoldToolbar />
            <ItalicToolbar />
            <UnderlineToolbar />
            <BulletListToolbar />
            <OrderedListToolbar />
            <SubscriptToolbar />
            <SuperscriptToolbar />
            <HardBreakToolbar />
            <Separator orientation="vertical" className="block h-6" />
            <ColorToolbar />
            <HighlightToolbar />
            <LinkToolbar />
            <ImagePlaceholderToolbar />
          </div>
        </ToolbarProvider>
      </div>

      <div
        onClick={(e) => {
          editor?.chain().focus().run()
          e.stopPropagation()
        }}
        className="min-h-[18rem] cursor-text bg-background"
      >
        <EditorContent className="focus:outline-none" editor={editor} />
      </div>
    </div>
  )
}
