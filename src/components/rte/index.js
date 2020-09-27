import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const Editor = styled.div`
  background-color: beige;
  border: solid blue 1px;
  border-radius: 5px;
  height: calc((1.5em * 6) + 4px);
  line-height: 1.5em;
  overflow-wrap: break-word;
  padding: 4px;
  width: calc(80ch + 4px);
`

const Block = styled.span``

export function Rte() {
  const editorRef = useRef()
  const blocks = [
    'This is a block',
    'This is another block',
    'This is a third block'
  ]

  useEffect(() => {
    editorRef && console.log(editorRef.current)
  }, [])

  const handleKeyDown = () => {
    console.log('key pressed')
  }

  return (
    <Editor ref={editorRef} contentEditable="true" onKeyDown={handleKeyDown}>
      {blocks.map((block) => (
        <Block>{block}</Block>
      ))}
    </Editor>
  )
}
