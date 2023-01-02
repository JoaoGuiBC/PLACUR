import Image from 'next/image'
import { ComponentProps } from 'react'

import { Tag } from '../Tag'
import { Container, Content, InfoBar, Title } from './styles'

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
        <Title>{title}</Title>

        <InfoBar>
          {!finished ? (
            <>
              <div>
                <p>Data:</p>
                <span>
                  {firstDate === lastDate
                    ? firstDate
                    : `${firstDate} a ${lastDate}`}
                </span>
              </div>

              <div>
                <p>Vagas disponíveis:</p>
                <span>{availability ?? 'Sem limite de vagas'}</span>
              </div>
            </>
          ) : (
            <div>
              <p>Concluído em:</p>
              <span>{lastDate}</span>
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
