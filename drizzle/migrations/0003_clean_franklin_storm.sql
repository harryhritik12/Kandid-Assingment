ALTER TABLE "campaigns" DROP CONSTRAINT "campaigns_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "leads" DROP CONSTRAINT "leads_campaign_id_campaigns_id_fk";
--> statement-breakpoint
ALTER TABLE "campaigns" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "campaigns" DROP COLUMN "user_id";