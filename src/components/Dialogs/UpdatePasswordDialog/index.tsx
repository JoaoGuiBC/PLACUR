import { LockKey, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'

import { Button } from '../../Button'
import { TextInput } from '../../TextInput'

import { theme } from 'stitches.config'
import {
  CloseButton,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  Form,
} from './styles'

function UpdatePasswordDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="secondary" size="min">
          Alterar senha
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <DialogOverlay />

        <DialogContent>
          <DialogTitle>Alteração de senha</DialogTitle>

          <DialogDescription>
            Para atualizar a sua senha primeiramente informe a senha atual, após
            isso digite a senha nova e confirme ela em seguida.
          </DialogDescription>

          <Form>
            <TextInput
              Icon={LockKey}
              placeholder="Informe a senha atual"
              type="password"
            />
            <TextInput
              Icon={LockKey}
              placeholder="Digite a senha nova"
              type="password"
            />
            <TextInput
              Icon={LockKey}
              placeholder="Confirme a senha nova"
              type="password"
            />

            <Dialog.Close asChild>
              <Button type="submit">Alterar</Button>
            </Dialog.Close>
          </Form>

          <Dialog.Close asChild>
            <CloseButton aria-label="Close">
              <X size={24} color={theme.colors.gray900.value} weight="light" />
            </CloseButton>
          </Dialog.Close>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

UpdatePasswordDialog.displayName = 'UpdatePasswordDialog'

export { UpdatePasswordDialog }
