-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "axis_of_knowledge_id" TEXT,
ADD COLUMN     "category_id" TEXT;

-- CreateTable
CREATE TABLE "course_categories" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "course_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "axes_of_knowledge" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "axes_of_knowledge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "course_categories_title_key" ON "course_categories"("title");

-- CreateIndex
CREATE UNIQUE INDEX "axes_of_knowledge_title_key" ON "axes_of_knowledge"("title");

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "course_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_axis_of_knowledge_id_fkey" FOREIGN KEY ("axis_of_knowledge_id") REFERENCES "axes_of_knowledge"("id") ON DELETE SET NULL ON UPDATE CASCADE;
