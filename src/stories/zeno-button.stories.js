import React from 'react'
import { Button } from '../zeno'

export default {
  title: 'Zeno Button',
  component: Button
}

export const WithText = () => <Button>Test</Button>
export const WithNoText = () => <Button />
export const Disabled = () => <Button disabled>Disabled Button</Button>
