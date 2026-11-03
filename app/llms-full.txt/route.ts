import { profile } from "@/data/profile";
import { experience, education } from "@/data/experience";
import { skillGroups } from "@/data/skills";
import { caseStudies } from "@/data/caseStudies";
import { servicePages } from "@/data/services";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { getAllPosts, getPostBody } from "@/lib/posts";

// Full-text Markdown dump of the site for LLMs, generated from data/ and content/
// at build time so it can't go stale. Output: out/llms-full.txt.
export const dynamic = "force-static";

export async function GET() {
  const out: string[] = [];
  const push = (...lines: string[]) => out.push(...lines, "");

  push(`# ${profile.name}`, `> ${site.description}`);
  push(`Site: ${site.url} · Summary index: ${site.url}/llms.txt`);

  push("## Profile", `${profile.jobTitle} at ${profile.company}. Location: ${profile.location} (${profile.timezone}).`);
  push(profile.headline, profile.intro);
  push(...profile.bio.flatMap((p) => [p, ""]).slice(0, -1));
  push(`Contact: ${profile.email} · GitHub: https://github.com/njmsaikat · LinkedIn: https://www.linkedin.com/in/njmsaikat/`);

  push("## Experience");
  for (const e of experience) {
    push(`### ${e.role}, ${e.company} (${e.start} – ${e.end})`, e.description);
  }
  push(`### Education: ${education.degree}`, `${education.institution} (${education.start} – ${education.end}). ${education.note}`);

  push("## Skills");
  push(...skillGroups.map((g) => `- ${g.category}: ${g.skills.join(", ")}`));

  push("## Case studies");
  for (const c of caseStudies) {
    push(
      `### ${c.title}`,
      `URL: ${site.url}/work/${c.slug}`,
      `${c.company} · ${c.role} · ${c.period}`,
      ...c.intro,
    );
    if (c.metrics.length) push(...c.metrics.map((m) => `- ${m.value} ${m.label}`));
    push(`#### ${c.builtTitle}`, ...c.built.map((b) => `- ${b.name}${b.status ? ` (${b.status})` : ""}: ${b.description}`));
    push(`#### ${c.architectureTitle ?? "How it's built"}`, c.architecture);
    push("#### My role", c.roleDetail);
    push(`Stack: ${c.stack.join(", ")}`);
    if (c.closing) push(`#### ${c.closing.title}`, c.closing.text);
  }

  push("## Services");
  for (const s of servicePages) {
    const p = s.page;
    push(`### ${p.headline}`, `URL: ${site.url}/services/${p.slug}`, ...p.intro);
    push("What you get:", ...p.deliverables.map((d) => `- ${d.title}: ${d.description}`));
    push(`Stack: ${p.stack.join(", ")}`);
    push("FAQ:", ...p.faqs.flatMap((f) => [`**${f.question}**`, f.answer, ""]).slice(0, -1));
  }

  push("## Products built");
  for (const p of projects) {
    if (p.type !== "product") continue;
    push(`- ${p.name} (${p.liveUrl}): ${p.description} Stack: ${p.stack.join(", ")}.`);
  }

  push("## Blog posts");
  for (const lang of ["en", "bn"] as const) {
    for (const post of await getAllPosts(lang)) {
      const url = `${site.url}${lang === "bn" ? "/bn" : ""}/blog/${post.slug}`;
      push(
        `### ${post.title}`,
        `URL: ${url} · Language: ${lang === "bn" ? "Bangla" : "English"} · Published: ${post.date} · Tags: ${post.tags.join(", ")}`,
        `> ${post.description}`,
        getPostBody(post.slug, lang),
      );
    }
  }

  return new Response(out.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
