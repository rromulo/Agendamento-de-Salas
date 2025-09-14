import { Switch } from '@headlessui/react'
import { useEffect, useState } from 'react'

interface Iswitch {
  setActiveStatus: boolean
  onSave: () => void
}

export default function SwitchStatus({setActiveStatus, onSave}: Iswitch) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(setActiveStatus)
  }, [setActiveStatus, onSave])

  return (
    <Switch
      checked={enabled}
      onChange={onSave}
      className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-black/10 p-1 ease-in-out focus:not-data-focus:outline-none data-checked:bg-black data-focus:outline data-focus:outline-white"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7"
      />
    </Switch>
  )
}