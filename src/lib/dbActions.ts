'use server';

// eslint-disable-next-line import/prefer-default-export
import { Hobby, Level, Major, Instructor } from '@prisma/client';
import { ICreateStudentForm } from '@/lib/validationSchemas';
import { prisma } from '@/lib/prisma';

// eslint-disable-next-line import/prefer-default-export
export const upsertStudent = async (studentFormData: ICreateStudentForm) => {
  const studentData = {
    bio: studentFormData.bio,
    email: studentFormData.email,
    level: studentFormData.level as Level,
    gpa: studentFormData.gpa,
    hobbies: studentFormData.hobbies as Hobby[],
    name: studentFormData.name,
    major: studentFormData.major as Major,
    instructor: studentFormData.instructor as Instructor, // Explicitly cast to Instructor
  };
  const enrollmentData = {
    email: studentFormData.email,
    enrolled: studentFormData.enrolled!,
  };
  const student = await prisma.studentData.upsert({
    where: { email: studentFormData.email },
    update: studentData,
    create: studentData,
  });
  const enrollment = await prisma.enrollmentData.upsert({
    where: { email: enrollmentData.email },
    update: enrollmentData,
    create: enrollmentData,
  });
  return { student, enrollment };
};
