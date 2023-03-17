import { ComponentProps, useState } from 'react'
import { CaretDown, CaretUp } from 'phosphor-react'
import * as BaseSelect from '@radix-ui/react-select'

import { Separator } from '../Separator'

import { theme } from 'stitches.config'
import { SelectRoot, SelectTrigger, SelectPortal, SelectItem } from './styles'

interface SelectProps extends ComponentProps<typeof SelectRoot> {
  size?: 'sm' | 'lg'
  emptyValue: string
  content: {
    value: string
    text: string
  }[]
}

function Select({ size, emptyValue, content, ...rest }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [dataState, setDataState] = useState<'closed' | 'open'>('closed')

  function handleOpenAndCloseSelect() {
    if (!isOpen) {
      setIsOpen(true)
    } else {
      setTimeout(() => setIsOpen(false), 200)
    }
    setDataState(() => (dataState === 'open' ? 'closed' : 'open'))
  }

  return (
    <SelectRoot open={isOpen} onOpenChange={handleOpenAndCloseSelect} {...rest}>
      <SelectTrigger size={size} aria-label={emptyValue}>
        <BaseSelect.Value placeholder={emptyValue} />

        <BaseSelect.Icon>
          <CaretDown
            size={16}
            color={theme.colors.gray900.value}
            weight="light"
          />
        </BaseSelect.Icon>
      </SelectTrigger>

      <SelectPortal data-state={dataState}>
        <BaseSelect.Content>
          <BaseSelect.ScrollUpButton>
            <CaretUp />
          </BaseSelect.ScrollUpButton>

          <BaseSelect.Viewport>
            <SelectItem value="">
              <BaseSelect.ItemText>{emptyValue}</BaseSelect.ItemText>
            </SelectItem>

            {content.map((item) => (
              <div key={item.value}>
                <Separator
                  css={{ $$baseColor: '$colors$gray500', margin: '8px 0' }}
                />
                <SelectItem value={item.value}>
                  <BaseSelect.ItemText>{item.text}</BaseSelect.ItemText>
                </SelectItem>
              </div>
            ))}
          </BaseSelect.Viewport>

          <BaseSelect.ScrollDownButton>
            <CaretDown />
          </BaseSelect.ScrollDownButton>
        </BaseSelect.Content>
      </SelectPortal>
    </SelectRoot>
  )
}

Select.displayName = 'Select'

export { Select }
