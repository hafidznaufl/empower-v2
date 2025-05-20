-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'CLIENT');

-- CreateEnum
CREATE TYPE "StudyProgramKind" AS ENUM ('INFORMATION_SYSTEMS', 'INFORMATICS_ENGINEERING', 'DIGITAL_BUSINESS');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'IN_PROCESS', 'PROVEN_LIGHTLY_SACTIONED', 'PROVEN_MODERATElYY_SACTIONED', 'PROVEN_SEVERELY_SACTIONED');

-- CreateEnum
CREATE TYPE "GenderKind" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "BlogStatus" AS ENUM ('PENDING', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "BLogCategory" AS ENUM ('BLOG', 'NEWS', 'PRESS_RELEASE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'CLIENT',
    "avatarURL" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReportIncident" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dayOfBirth" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gender" "GenderKind" NOT NULL,
    "studyProgram" "StudyProgramKind" NOT NULL,
    "semester" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "willingToBeContacted" BOOLEAN NOT NULL,
    "incidentDescription" TEXT NOT NULL,
    "fileURL" TEXT[],
    "reportStatus" "ReportStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ReportIncident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "timeStart" TIMESTAMP(3) NOT NULL,
    "timeEnd" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "capacity" TEXT NOT NULL,
    "thumbnailURL" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "category" "BLogCategory" NOT NULL DEFAULT 'NEWS',
    "thumbnailURL" TEXT,
    "authorId" TEXT NOT NULL,
    "blogStatus" "BlogStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
