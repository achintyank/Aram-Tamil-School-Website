import { navLinks, school, siteCredits, socials } from "../_data/school";
import Roll from "./Roll";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-paper px-2 pt-40 pb-2 sm:px-3">
      <div className="overflow-hidden rounded-[2rem] bg-moss px-4 pt-10 pb-4 text-paper sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr_1.4fr]">
          <div>
            <p className="eyebrow mb-4 text-paper/50">Pages</p>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="group text-xl font-bold uppercase hover:text-blue">
                    <Roll text={l.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4 text-paper/50">Follow on</p>
            <ul className="space-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="group text-xl font-bold uppercase hover:text-blue">
                    <Roll text={s.label} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-between gap-8">
            <p className="text-[clamp(2rem,4vw,3.4rem)] leading-[0.95] font-black uppercase">
              Always learning.
              <br />
              <span className="text-blue">Always Tamil.</span>
            </p>
            <div className="text-sm text-paper/70">
              <p>{school.location}</p>
              <p>{school.region}</p>
              <a href={`mailto:${school.email}`} className="mt-2 inline-block text-paper underline decoration-blue underline-offset-4">
                {school.email}
              </a>
            </div>
          </div>
        </div>

        <p
          lang="ta"
          aria-hidden
          className="mt-16 text-center font-tamil text-[clamp(6rem,30vw,28rem)] leading-[0.8] font-extrabold tracking-tight text-blue"
        >
          அறம்
        </p>

        <div className="mt-6 flex flex-wrap justify-between gap-2 border-t border-paper/15 pt-4 text-xs text-paper/50">
          <p>© {new Date().getFullYear()} {school.nameEn} · a branch of the {school.parent}</p>
          <p>
            {"Website made by "}
            {siteCredits.map((c, i) => (
              <span key={c.name}>
                {i > 0 && " & "}
                <a href={c.href} target="_blank" rel="noreferrer" className="text-paper underline decoration-blue decoration-2 underline-offset-4 transition-colors hover:text-blue">
                  {c.name}
                </a>
              </span>
            ))}
          </p>
          <p lang="ta" className="font-tamil">{school.nameTa}</p>
        </div>
      </div>
    </footer>
  );
}
