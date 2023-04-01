import { Fragment } from "react";
import { NextSeo } from "next-seo";
import { getServerSession } from "next-auth";
import type { GetServerSideProps } from "next";
import { UserMinus, UserPlus } from "phosphor-react";

import { prisma } from "@lib/prisma";
import { maskDocument } from "@utils/inputMasks";
import { authOptions } from "@api/auth/[...nextauth].api";
import { capitalizeSentence } from "@utils/capitalize-sentence";

import {
  FunctionsContainer,
  ListContainer,
  UserData,
  UserInfo,
  UserName,
  UserRow,
} from "./styles";
import { Button, Searchbar, Separator } from "@components/index";

interface User {
  name: string;
  document: string;
  haveDisability: boolean;
}

interface Course {
  id: string;
  title: string;
}

interface SubscriberListProps {
  course: Course;
  users: User[];
}

export default function SubscriberList({ course, users }: SubscriberListProps) {
  return (
    <>
      <NextSeo
        title={`${capitalizeSentence(course.title)} - Inscritos | PLACUR`}
        description="Administre os inscritos deste curso."
      />

      <FunctionsContainer>
        <Searchbar
          placeholder="Pesquisar nome"
          onSearch={async () => console.log("aa")}
        />
        <Searchbar
          placeholder="Pesquisar CPF"
          onSearch={async () => console.log("aa")}
        />
        <Button
          size="min"
          variant="withIcon"
          css={{ $$baseColor: "$colors$green500" }}
        >
          <UserPlus size={32} />
        </Button>
        <Button size="min">Salvar alterações</Button>
      </FunctionsContainer>

      <ListContainer>
        {users.map((user, index) => (
          <Fragment key={user.document}>
            {index !== 0 && (
              <Separator css={{ $$baseColor: "$colors$gray800" }} />
            )}

            <UserRow>
              <UserData>
                <UserName size="lg">{capitalizeSentence(user.name)}</UserName>
                <UserInfo>{maskDocument(user.document)}</UserInfo>
                {user.haveDisability && (
                  <UserInfo>Possui alguma deficiência</UserInfo>
                )}
              </UserData>

              <Button size="min">Marcar presença</Button>

              <Button
                size="min"
                variant="withIcon"
                css={{ $$baseColor: "$colors$red500" }}
              >
                <UserMinus size={32} />
              </Button>
            </UserRow>
          </Fragment>
        ))}
      </ListContainer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  SubscriberListProps
> = async ({ req, res, params }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      notFound: true,
    };
  }

  if (!session.user.is_admin) {
    return {
      notFound: true,
    };
  }

  const courseId = String(params?.course_id);

  const course = await prisma.course.findFirst({
    where: { id: courseId },
    select: {
      id: true,
      title: true,
      enrollments: { select: { user: true } },
    },
  });

  if (!course) {
    return {
      notFound: true,
    };
  }

  const { enrollments, ...parsedCourse } = course;

  const users = enrollments.map(({ user }) => {
    const haveDisability =
      user!.have_hearing_disability ||
      user!.have_visual_disability ||
      user!.have_physical_disability ||
      user!.have_psychosocial_disability ||
      user!.have_visual_disability;

    return {
      name: String(user!.name),
      document: String(user!.document),
      haveDisability,
    };
  });

  return {
    props: {
      course: parsedCourse,
      users,
    },
  };
};
