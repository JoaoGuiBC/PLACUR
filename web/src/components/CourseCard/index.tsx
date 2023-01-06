import Image from 'next/image'
import { ComponentProps } from 'react'

import { Tag } from '../Tag'
import { Text } from '../Text'

import { Container, Content, InfoBar } from './styles'

interface CourseCardProps extends ComponentProps<typeof Container> {
  image: string
  title: string
  firstDate: string
  lastDate: string
  availability?: number
  finished?: boolean
  category:
    | 'Workshop'
    | 'Palestra'
    | 'EAD'
    | 'Capacitação'
    | 'Seminário'
    | 'Outros'
}

function CourseCard({
  image,
  title,
  firstDate,
  lastDate,
  availability,
  finished = false,
  category,
  ...rest
}: CourseCardProps) {
  return (
    <Container {...rest}>
      <Image
        src={image}
        alt={`imagem do curso ${title}`}
        width={88}
        height={88}
      />
      <Content>
        <Text>{title}</Text>

        <InfoBar>
          {!finished ? (
            <>
              <div>
                <Text as="p">Data:</Text>
                <Text size="sm">
                  {firstDate === lastDate
                    ? firstDate
                    : `${firstDate} a ${lastDate}`}
                </Text>
              </div>

              <div>
                <Text as="p">Vagas disponíveis:</Text>
                <Text size="sm">{availability ?? 'Sem limite de vagas'}</Text>
              </div>
            </>
          ) : (
            <div>
              <Text as="p">Concluído em:</Text>
              <Text size="sm">{lastDate}</Text>
            </div>
          )}
        </InfoBar>
      </Content>

      <Tag category={category}>{category}</Tag>
    </Container>
  )
}

CourseCard.displayName = 'CourseCard'

export { CourseCard }
