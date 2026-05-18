import Client from "@/lib/db/models/client";
import Contact from "@/lib/db/models/contact";
import Contract from "@/lib/db/models/contract";
import Department from "@/lib/db/models/department";
import KnowledgeArticle from "@/lib/db/models/knowledge-article";
import NpsCampaign from "@/lib/db/models/nps-campaign";
import NpsTemplate from "@/lib/db/models/nps-template";
import Task from "@/lib/db/models/task";
import TaskTemplate from "@/lib/db/models/task-template";
import TeamMember from "@/lib/db/models/team-member";
import { TEST_DATA_IDS } from "@/lib/crm/test-data-ids";
import { connectDb } from "@/lib/db/mongoose";

const TEST = { isTest: true };

/** Slet eksisterende test-rækker (børn først). */
export async function clearTestData() {
  await connectDb();
  await Task.deleteMany({ isTest: true });
  await NpsCampaign.deleteMany({ isTest: true });
  await Contact.deleteMany({ isTest: true });
  await Contract.deleteMany({ isTest: true });
  await TeamMember.deleteMany({ isTest: true });
  await TaskTemplate.deleteMany({ isTest: true });
  await KnowledgeArticle.deleteMany({ isTest: true });
  await NpsTemplate.deleteMany({ isTest: true });
  await Client.deleteMany({ isTest: true });
  await Department.deleteMany({ isTest: true });
}

/**
 * Opret ét relateret test-sæt (afdeling → kunde → team → …).
 * @param {{ replace?: boolean }} [opts]
 */
export async function seedTestData(opts = {}) {
  const { replace = true } = opts;
  await connectDb();

  if (replace) {
    await clearTestData();
  }

  const department = await Department.create({
    ...TEST,
    key: TEST_DATA_IDS.departmentKey,
    name: "Test Afdeling",
    shortLabel: "Test",
    capacityHours: 120,
    colorToken: "agency-dep-seo",
  });

  const client = await Client.create({
    ...TEST,
    slug: TEST_DATA_IDS.clientSlug,
    name: "Test Kunde ApS",
    industry: "Test / placeholder",
    logoInitials: "TK",
    hue: 220,
    currency: "DKK",
    retainerAmount: 25000,
    status: "active",
    health: "ok",
    npsInterval: "quarterly",
    servicesActive: ["seo", "ppc"],
    tags: ["test", "placeholder"],
  });

  const teamMember = await TeamMember.create({
    ...TEST,
    key: TEST_DATA_IDS.teamMemberKey,
    name: "Test Teammedlem",
    roleTitle: "Test konsulent",
    departmentId: department._id,
    departmentKey: department.key,
    avatarInitials: "TT",
    hue: 220,
    weeklyHours: 37,
    active: true,
  });

  await Client.findByIdAndUpdate(client._id, {
    ownerMemberKey: teamMember.key,
    ownerId: teamMember._id,
  });

  const contact = await Contact.create({
    ...TEST,
    clientId: client._id,
    name: "Test Kontakt",
    title: "Test kontaktperson",
    email: TEST_DATA_IDS.contactEmail,
    phone: "+45 12 34 56 78",
    isPrimary: true,
  });

  await Client.findByIdAndUpdate(client._id, {
    primaryContact: {
      name: contact.name,
      title: contact.title,
      email: contact.email,
      phone: contact.phone,
    },
  });

  const contract = await Contract.create({
    ...TEST,
    key: TEST_DATA_IDS.contractKey,
    clientId: client._id,
    clientSlug: client.slug,
    type: "retainer",
    label: "Test retainer",
    value: 25000,
    currency: "DKK",
    status: "active",
    startDate: new Date(),
    termsSummary: "Testkontrakt — placeholder.",
  });

  const taskTemplate = await TaskTemplate.create({
    ...TEST,
    key: TEST_DATA_IDS.taskTemplateKey,
    title: "Test opgaveskabelon",
    description: "Skabelon til testopgaver.",
    departmentId: department._id,
    departmentKey: department.key,
    defaultPriority: "medium",
    suggestedHours: 4,
    checklist: ["Test trin 1", "Test trin 2"],
    active: true,
  });

  const task = await Task.create({
    ...TEST,
    key: TEST_DATA_IDS.taskKey,
    clientId: client._id,
    clientSlug: client.slug,
    title: "Test opgave",
    hint: "Placeholder-opgave knyttet til test-kunde og -afdeling.",
    departmentId: department._id,
    departmentKey: department.key,
    assigneeMemberKey: teamMember.key,
    assigneeId: teamMember._id,
    templateId: taskTemplate._id,
    status: "todo",
    priority: "medium",
    estimateHours: 4,
  });

  const kbArticle = await KnowledgeArticle.create({
    ...TEST,
    slug: TEST_DATA_IDS.kbSlug,
    title: "Test artikel",
    summary: "Placeholder-artikel i knowledge base.",
    bodyMd: "## Test\n\nDette er **test**-indhold.",
    tags: ["test", "onboarding"],
    audience: "internal",
    authorMemberKey: teamMember.key,
    readingMinutes: 3,
    featured: false,
    published: true,
  });

  const npsTemplate = await NpsTemplate.create({
    ...TEST,
    key: TEST_DATA_IDS.npsTemplateKey,
    name: "Test NPS-skabelon",
    subject: "Test — hvordan går det?",
    bodyMd: "Hej {{name}},\n\nDette er en **test**-NPS-udsendelse.\n\nMvh Test",
    locale: "da",
    active: true,
  });

  const npsCampaign = await NpsCampaign.create({
    ...TEST,
    name: "Test NPS-kampagne",
    templateId: npsTemplate._id,
    status: "draft",
    scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    clientIds: [client._id],
  });

  return {
    ok: true,
    created: {
      department: department._id.toString(),
      client: client._id.toString(),
      teamMember: teamMember._id.toString(),
      contact: contact._id.toString(),
      contract: contract._id.toString(),
      taskTemplate: taskTemplate._id.toString(),
      task: task._id.toString(),
      knowledgeArticle: kbArticle._id.toString(),
      npsTemplate: npsTemplate._id.toString(),
      npsCampaign: npsCampaign._id.toString(),
    },
  };
}
