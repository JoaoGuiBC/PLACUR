import * as BaseSelect from '@radix-ui/react-select'
import { CaretDown, CaretUp } from 'phosphor-react'
import { ComponentProps, useState } from 'react';

import { theme } from '../../../stitches.config';
import { SelectRoot, SelectTrigger, SelectPortal, Separator, SelectItem } from './styles'

interface SelectProps extends ComponentProps<typeof SelectRoot> {
  content: {
    value: string;
    text: string;
  }[];
}

export function Select({ content }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [dataState, setDataState] = useState<'closed' | 'open'>('closed')

  function handleOpenAndCloseSelect() {
    if (!isOpen) {
      setIsOpen(true)
    } else {
      setTimeout(() => setIsOpen(false), 200)
    }
    setDataState(() => dataState === 'open' ? 'closed' : 'open')
  }

  return (
    <SelectRoot open={isOpen} onOpenChange={handleOpenAndCloseSelect}>
      <SelectTrigger aria-label="Eixos de conhecimento">
        <BaseSelect.Value placeholder="Filtrar por eixo de conhecimento" />

        <BaseSelect.Icon>
          <CaretDown size={16} color={theme.colors.gray900.value} weight="light" />
        </BaseSelect.Icon>
      </SelectTrigger>

        <SelectPortal data-state={dataState}>
          <BaseSelect.Content>
              <BaseSelect.ScrollUpButton>
                <CaretUp />
              </BaseSelect.ScrollUpButton>

              <BaseSelect.Viewport>
                <SelectItem value="">
                  <BaseSelect.ItemText>Filtrar por eixo de conhecimento</BaseSelect.ItemText>
                </SelectItem>

                {content.map(item => (
                  <>
                    <Separator />
                    <SelectItem value={item.value}>
                      <BaseSelect.ItemText>{item.text}</BaseSelect.ItemText>
                    </SelectItem>
                  </>
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
