CREATE DATABASE webapp;

CREATE TABLE "users" (
	"userID" serial NOT NULL,
	"username" varchar NOT NULL UNIQUE,
	"password" varchar NOT NULL,
	"accessRights" varchar NOT NULL,
	"admin" BOOLEAN NOT NULL,
	"approved" BOOLEAN NOT NULL,
	"loggedIn" BOOLEAN NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "satellite" (
	"satID" serial NOT NULL,
	"name" varchar NOT NULL UNIQUE,
	CONSTRAINT "satellite_pk" PRIMARY KEY ("satID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "satRequest" (
	"satRequestID" serial NOT NULL,
	"userID" integer NOT NULL,
	"satID" integer NOT NULL,
	"lastAltitude" integer,
	"lastLocation" varchar,
	"lastOrbitalSpeed" integer,
	"lastOrbitalPeriod" integer,
	"lastPositionVector" varchar,
	"dateRecorded" varchar NOT NULL,
	CONSTRAINT "satRequest_pk" PRIMARY KEY ("satRequestID")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "locationRequest" (
	"locationRequestID" serial NOT NULL,
	"userID" integer NOT NULL,
	"location" varchar NOT NULL UNIQUE,
	"lastTemp" integer,
	"lastPrecipitationAmount" integer,
	"lastHumidity" integer,
	"lastPressure" integer,
	"lastSNR" integer,
	"lastBER" integer,
	"lastScheme" varchar,
	"dateRecorded" varchar NOT NULL,
	CONSTRAINT "locationRequest_pk" PRIMARY KEY ("locationRequestID")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "satRequest" ADD CONSTRAINT "satRequest_fk0" FOREIGN KEY ("userID") REFERENCES "users"("userID");
ALTER TABLE "satRequest" ADD CONSTRAINT "satRequest_fk1" FOREIGN KEY ("satID") REFERENCES "satellite"("satID");

ALTER TABLE "locationRequest" ADD CONSTRAINT "locationRequest_fk0" FOREIGN KEY ("userID") REFERENCES "users"("userID");




