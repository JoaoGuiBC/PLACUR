import dayjs from "dayjs";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { AxiosError } from "axios";
import { useSetAtom } from "jotai";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { FileArrowDown } from "phosphor-react";
import type { GetServerSideProps } from "next";

import { api } from "@lib/axios";
import { prisma } from "@lib/prisma";
import { toastState } from "@atoms/toastAtom";
import { authOptions } from "@api/auth/[...nextauth].api";
import { capitalizeSentence } from "@utils/capitalize-sentence";
import { convertMinutesToString } from "@utils/convert-minutes-to-string";

import {
  Section,
  DateInfo,
  Encounter,
  ImageInfo,
  Container,
  InfoContainer,
  RegisterContainer,
  EncounterContainer,
} from "./styles";
import { Button, Heading, Text, EnrollInClassDialog } from "@components/index";

interface CourseData {
  id: string;
  title: string;
  target_audience: string;
  objective: string;
  observations: string;
  content: string;
}

interface MinisterData {
  id: string;
  name: string;
  qualification: string;
}

interface Class {
  id: string;
  name: string;
  date: string;
  startTime: string;
  endTime: string;
  wasUserPresent: boolean;
  isUserEnrolled: boolean;
}

interface Meeting {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  wasUserPresent: boolean;
}

interface CourseProps {
  course: CourseData;
  ministers: MinisterData[];
  classes: Class[];
  meetings: Meeting[];
  isUserEnrolled: boolean;
}

export default function Course({
  course,
  ministers,
  classes,
  meetings,
  isUserEnrolled,
}: CourseProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [enrollment, setEnrollment] = useState(isUserEnrolled);

  const router = useRouter();
  const setToast = useSetAtom(toastState);
  const { data: session, status } = useSession();

  async function handleEnroll() {
    setIsLoading(true);

    try {
      await api.post("/courses/enrollments", {
        courseId: course.id,
        userId: session!.user.id,
        meetings: meetings.map((meeting) => meeting.id),
      });

      setToast({
        title: "Uhuu!",
        description: "A sua inscrição foi realizada!",
        type: "success",
        isOpen: true,
      });

      setEnrollment(true);
    } catch (error: any) {
      const { response } = error as AxiosError<{ message: string }>;

      setToast({
        title: "Ops, temos um problema",
        description: response?.data.message ?? "",
        type: "error",
        isOpen: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUnenroll() {
    setIsLoading(true);

    try {
      await api.delete("/courses/enrollments/unenroll", {
        params: {
          courseId: course.id,
          userId: session!.user.id,
        },
      });

      setToast({
        title: "Esperamos te ver outra vez",
        description: "A sua inscrição foi removida",
        type: "success",
        isOpen: true,
      });

      setEnrollment(false);
    } catch (error: any) {
      const { response } = error as AxiosError<{ message: string }>;

      setToast({
        title: "Ops, temos um problema",
        description: response?.data.message ?? "",
        type: "error",
        isOpen: true,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <NextSeo
        title={`${course.title} | PLACUR`}
        description={`Curso dedicado a ${course.target_audience}`}
      />

      <Container>
        <InfoContainer>
          <Heading size="lg">{capitalizeSentence(course.title)}</Heading>

          <ImageInfo>
            <Image
              src="/course_image_placeholder.png"
              alt={course.title}
              width={160}
              height={160}
            />

            <div>
              <Section>
                <Heading size="md">Público Alvo</Heading>
                <Text size="lg">{course.target_audience}</Text>
              </Section>

              <Section>
                <Heading size="md">Objetivo</Heading>
                <Text size="lg">{course.objective}</Text>
              </Section>
            </div>
          </ImageInfo>

          <Section>
            <Heading size="md">Observação</Heading>
            <Text size="lg">{course.observations}</Text>
          </Section>

          <Section>
            <Heading size="md">Conteúdo programático</Heading>
            <Text size="lg">{course.content}</Text>
          </Section>

          <Section>
            <Heading size="md">Ministrantes</Heading>

            {ministers.map((minister) => {
              return (
                <Text size="lg" as="p" key={minister.id}>
                  <strong>{capitalizeSentence(minister.name)}</strong> -{" "}
                  {minister.qualification}
                </Text>
              );
            })}
          </Section>
        </InfoContainer>

        <RegisterContainer>
          {meetings.length > 0 && (
            <>
              {meetings.length === 1 ? (
                <EncounterContainer>
                  <Encounter>
                    <Heading size="sm">Encontro</Heading>
                    <DateInfo>
                      {`${dayjs(meetings[0].date).format("DD/MM/YYYY")}
                    das ${meetings[0].startTime} ás ${meetings[0].endTime}`}
                    </DateInfo>
                  </Encounter>

                  {dayjs(meetings[0].date).isAfter(
                    dayjs(new Date()).add(3, "day")
                  ) ? (
                    <p>
                      {`Disponível a partir de ${dayjs(meetings[0].date)
                        .add(3, "day")
                        .format("DD/MM/YYYY")}`}
                    </p>
                  ) : (
                    <span>
                      <FileArrowDown size={16} />
                      Emitir certificado
                    </span>
                  )}
                </EncounterContainer>
              ) : (
                <Fragment>
                  {meetings.map((meeting, index) => (
                    <EncounterContainer key={meeting.id}>
                      <Encounter>
                        <Heading size="sm">{`${index + 1}º encontro`}</Heading>
                        <DateInfo>
                          {`${dayjs(meeting.date).format("DD/MM/YYYY")}
                          das ${meeting.startTime} ás ${meeting.endTime}`}
                        </DateInfo>
                      </Encounter>

                      {enrollment &&
                        (dayjs(meeting.date).isAfter(
                          dayjs(new Date()).add(3, "day")
                        ) ? (
                          <p>
                            {`Disponível a partir de ${dayjs(meeting.date)
                              .add(3, "day")
                              .format("DD/MM/YYYY")}`}
                          </p>
                        ) : meeting.wasUserPresent ? (
                          <span>
                            <FileArrowDown size={16} />
                            Emitir certificado
                          </span>
                        ) : (
                          <p>Disponível se você tiver presença</p>
                        ))}
                    </EncounterContainer>
                  ))}
                </Fragment>
              )}
            </>
          )}

          {classes.length > 0 && (
            <Fragment>
              {classes.map((item) => (
                <EncounterContainer key={item.id}>
                  <Encounter>
                    <Heading size="sm">{capitalizeSentence(item.name)}</Heading>
                    <DateInfo>
                      {`${dayjs(item.date).format("DD/MM/YYYY")}
                    das ${item.startTime} ás ${item.endTime}`}
                    </DateInfo>
                  </Encounter>

                  {item.isUserEnrolled &&
                    enrollment &&
                    (dayjs(item.date).isAfter(
                      dayjs(new Date()).add(3, "day")
                    ) ? (
                      <p>
                        {`Disponível a partir de ${dayjs(item.date)
                          .add(3, "day")
                          .format("DD/MM/YYYY")}`}
                      </p>
                    ) : (
                      <span>
                        <FileArrowDown size={16} />
                        Emitir certificado
                      </span>
                    ))}
                </EncounterContainer>
              ))}
            </Fragment>
          )}

          {status !== "authenticated" ? (
            <Button variant="secondary" onClick={() => router.push("/login")}>
              Faça login para se inscrever
            </Button>
          ) : session?.user.is_admin ? (
            <>
              <Button onClick={() => router.push(`/admin/curso/${course.id}`)}>
                Administrar curso
              </Button>

              <Button
                onClick={() =>
                  router.push(`/admin/curso/${course.id}/lista-de-inscritos`)
                }
              >
                Lista de inscritos
              </Button>
            </>
          ) : enrollment ? (
            <Button onClick={handleUnenroll} disabled={isLoading}>
              Me desinscreva
            </Button>
          ) : classes.length > 0 ? (
            <EnrollInClassDialog
              options={classes.map((item) => ({
                value: item.id,
                text: item.name,
              }))}
              courseId={course.id}
              userId={session!.user.id}
              onEnroll={setEnrollment}
            />
          ) : (
            <Button onClick={handleEnroll} disabled={isLoading}>
              Me inscreva
            </Button>
          )}
        </RegisterContainer>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const courseId = String(params?.course_id);

  const course = await prisma.course.findFirst({
    where: { id: courseId },
    select: {
      id: true,
      title: true,
      content: true,
      objective: true,
      observations: true,
      target_audience: true,
      courses_ministers: true,
      classes: { orderBy: { date: "asc" } },
      meetings: { orderBy: { date: "asc" } },
    },
  });

  if (!course) {
    return {
      notFound: true,
    };
  }

  const session = await getServerSession(req, res, authOptions);

  const {
    courses_ministers: coursesMinisters,
    classes,
    meetings,
    ...parsedCourse
  } = course;

  const ministersList = await prisma.minister.findMany({
    where: {
      id: {
        in: coursesMinisters.map((courseMinister) =>
          String(courseMinister.minister_id)
        ),
      },
    },
  });

  const ministers = ministersList.filter((minister) => minister !== null);

  const userEnrollment = await prisma.courseEnrollment.findFirst({
    where: { user_id: session?.user.id ?? "", course_id: course.id },
  });

  const classesEnrollments = await prisma.meetingClassEnrollment.findMany({
    where: {
      user_id: session?.user.id ?? "",
      class_id: { in: course.classes.map((item) => item.id) },
    },
  });

  const meetingsEnrollments = await prisma.meetingClassEnrollment.findMany({
    where: {
      user_id: session?.user.id ?? "",
      meeting_id: { in: course.meetings.map((item) => item.id) },
    },
  });

  const parsedClasses = classes.map((item) => {
    const [filterClass] = classesEnrollments.filter(
      (enrollment) => enrollment.class_id === item.id
    );

    return {
      id: item.id,
      name: item.name,
      date: dayjs(item.date).format("YYYY-MM-DD"),
      startTime: convertMinutesToString(item.start_time_in_minutes),
      endTime: convertMinutesToString(item.end_time_in_minutes),
      wasUserPresent: filterClass ? filterClass.user_was_present : false,
      isUserEnrolled: !!filterClass,
    };
  });

  const parsedMeetings = meetings.map((item) => {
    const [filterMeeting] = meetingsEnrollments.filter(
      (enrollment) => enrollment.meeting_id === item.id
    );

    return {
      id: item.id,
      date: dayjs(item.date).endOf("day").format("YYYY-MM-DD"),
      startTime: convertMinutesToString(item.start_time_in_minutes),
      endTime: convertMinutesToString(item.end_time_in_minutes),
      wasUserPresent: filterMeeting ? filterMeeting.user_was_present : false,
    };
  });

  return {
    props: {
      course: parsedCourse,
      ministers,
      classes: parsedClasses,
      meetings: parsedMeetings,
      isUserEnrolled: !!userEnrollment,
    },
  };
};
