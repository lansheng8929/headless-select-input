import React, { forwardRef } from "react"
import { ChevronDown } from "lucide-react"

import { useSelectInput } from "./hooks/use-select-input"
import { cn } from "./lib/utils"

const SelectInput = forwardRef<
  HTMLInputElement,
  {
    className?: string
    defaultValue?: string
    advices?: {
      key: string
      value: string
      label: string
    }[]
    onChange?: (value: string) => void
  } & React.InputHTMLAttributes<HTMLInputElement>
>(({ className, defaultValue, advices, onChange, ...props }, ref) => {
  const {
    value,
    open,
    dialogContainerRef,
    inputRef,
    handleInputChange,
    handleSelectItem,
    toggleOpen,
  } = useSelectInput({ defaultValue, onChange })

  return (
    <div className={cn("relative w-full", className)}>
      <div
        className={cn(
          "flex items-center w-full h-9 rounded-md border px-3 py-1 focus-within:border-blue-500"
        )}
      >
        <input
          type="text"
          className={cn("text-sm w-full border-0 outline-none bg-white")}
          autoComplete="off"
          value={value}
          onChange={(e) => handleInputChange(e.currentTarget.value)}
          {...props}
          ref={inputRef}
        />
        <button
          type="button"
          className="ml-1 p-1 rounded-sm hover:bg-gray-100"
          onClick={toggleOpen}
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {open ? (
        <div
          className="absolute left-0 top-full w-full z-50 overflow-hidden min-w-32 rounded-md border bg-white shadow-md mt-1"
          ref={dialogContainerRef}
        >
          <ul className="max-h-96 overflow-y-auto p-1">
            {advices && advices.length > 0 ? (
              advices.map((item) => (
                <li
                  key={item.key}
                  aria-hidden="true"
                  className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-gray-100"
                  onClick={() => handleSelectItem(item)}
                >
                  {item.label}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-gray-500">
                No suggestions available
              </li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  )
})

SelectInput.displayName = "SelectInput"

export default SelectInput
