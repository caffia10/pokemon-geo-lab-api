CREATE TYPE "public"."types" AS ENUM('center', 'laboratory', 'gym', 'police', 'house', 'unknown');--> statement-breakpoint
CREATE TABLE "town" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(150) NOT NULL,
	"region_id" uuid NOT NULL,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "region" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(150) NOT NULL,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "building" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(150) NOT NULL,
	"town_id" uuid NOT NULL,
	"type" "types" DEFAULT 'unknown',
	"created_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "town" ADD CONSTRAINT "town_region_id_region_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."region"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "building" ADD CONSTRAINT "building_town_id_town_id_fk" FOREIGN KEY ("town_id") REFERENCES "public"."town"("id") ON DELETE no action ON UPDATE no action;