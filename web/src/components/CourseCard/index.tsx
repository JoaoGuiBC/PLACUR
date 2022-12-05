import Image from "next/image"

import { Tag } from "../Tag";
import { Container, Content, InfoBar, Title } from "./styles"

interface CourseCardProps {
	image: string;
	title: string;
	firstDate: string;
	lastDate: string;
	availability: number;
	finished: boolean;
	category: 'Workshop' | 'Palestra' | 'EAD' | 'Capacitação' | 'Seminário' | 'Outros';
}

export function CourseCard({ image, title, firstDate, lastDate, availability, finished, category }: CourseCardProps) {
	return (
		<Container>
			<Image src={image} alt={`imagem do curso ${title}`} width={88} height={88} />
			<Content>
				<Title>{title}</Title>

				<InfoBar>
					{!finished ? (
						<>
							<div>
								<p>Data:</p>
								<span>{firstDate === lastDate ? firstDate : `${firstDate} a ${lastDate}`}</span>
							</div>

							<div>
								<p>Vagas disponíveis:</p>
								<span>{availability}</span>
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