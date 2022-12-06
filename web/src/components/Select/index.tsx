import * as BaseSelect from '@radix-ui/react-select'
import { CaretDown, CaretUp } from 'phosphor-react'

import { theme } from '../../../stitches.config';
import { SelectRoot, SelectTrigger, SelectPortal, Separator, SelectItem } from './styles'

interface SelectProps {
  content: {
    value: string;
    content: string;
  }[];
}

export function Select({ content }: SelectProps) {
  return (
    <SelectRoot>
      <SelectTrigger aria-label="Eixos de conhecimento">
        <BaseSelect.Value placeholder="Filtrar por eixo de conhecimento" />

        <BaseSelect.Icon>
          <CaretDown size={16} color={theme.colors.gray900.value} weight="light" />
        </BaseSelect.Icon>
      </SelectTrigger>

      <SelectPortal>
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
                  <BaseSelect.ItemText>{item.content}</BaseSelect.ItemText>
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
