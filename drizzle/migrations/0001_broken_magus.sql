ALTER TABLE "leads" RENAME COLUMN "last_contact" TO "created_at";--> statement-breakpoint
ALTER TABLE "leads" DROP CONSTRAINT "leads_campaign_id_campaigns_id_fk";
--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "company" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "leads" ALTER COLUMN "campaign_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "leads" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;