-- CreateTable
CREATE TABLE "Dragon" (
    "id" TEXT NOT NULL,
    "index" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "terrain" TEXT NOT NULL,
    "fireBreather" BOOLEAN NOT NULL,
    "waterBreather" BOOLEAN NOT NULL,
    "eyeColor" TEXT NOT NULL,
    "armored" BOOLEAN NOT NULL,
    "horns" INTEGER NOT NULL,
    "fins" BOOLEAN NOT NULL,
    "feathers" BOOLEAN NOT NULL,
    "wings" BOOLEAN NOT NULL,
    "legs" INTEGER NOT NULL,
    "imageKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Dragon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dragon_index_key" ON "Dragon"("index");

-- CreateIndex
CREATE INDEX "Dragon_slug_idx" ON "Dragon"("slug");
