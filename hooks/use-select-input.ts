import { useRef, useState } from "react"
import { useClickOutside } from "./use-click-outside"

interface SelectInputOptions {
  defaultValue?: string
  onChange?: (value: string) => void
}

interface AdviceItem {
  key: string
  value: string
  label: string
}

export const useSelectInput = (options: SelectInputOptions = {}) => {
  const { defaultValue = "", onChange } = options

  const [value, setValue] = useState<string>(defaultValue)
  const [open, setOpen] = useState(false)

  const dialogContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClickOutside = () => {
    setOpen(false)
  }

  useClickOutside(dialogContainerRef, handleClickOutside)

  const handleInputChange = (newValue: string) => {
    setValue(newValue)
    onChange?.(newValue)
  }

  const handleSelectItem = (item: AdviceItem) => {
    setOpen(false)
    setValue(item.value)
    onChange?.(item.value)
  }

  const toggleOpen = () => {
    setOpen(!open)
  }

  const closeDropdown = () => {
    setOpen(false)
  }

  const openDropdown = () => {
    setOpen(true)
  }

  return {
    // State
    value,
    open,

    // Refs
    dialogContainerRef,
    inputRef,

    // Actions
    setValue,
    setOpen,
    handleInputChange,
    handleSelectItem,
    toggleOpen,
    closeDropdown,
    openDropdown,
  }
}
