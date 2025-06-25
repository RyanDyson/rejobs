CREATE TYPE "public"."application_status" AS ENUM('submitted', 'in-review', 'interviewing', 'offer-made', 'rejected', 'third-party');--> statement-breakpoint
ALTER TABLE "applications" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "applications" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "room" ADD COLUMN "original_json" json NOT NULL;