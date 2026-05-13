/**
 * Register all Mongoose models for CRM / Agency OS.
 * Import side effects ensure schemas are compiled once.
 */
import Client from "./client";
import Contact from "./contact";
import Contract from "./contract";
import Department from "./department";
import KnowledgeArticle from "./knowledge-article";
import Note from "./note";
import NpsResponse from "./nps-response";
import Task from "./task";
import TeamMember from "./team-member";
import TimeEntry from "./time-entry";
import User from "./user";

export {
  Client,
  Contact,
  Contract,
  Department,
  KnowledgeArticle,
  Note,
  NpsResponse,
  Task,
  TeamMember,
  TimeEntry,
  User,
};
