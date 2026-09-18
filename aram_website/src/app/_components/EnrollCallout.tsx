import Image from "next/image";
import { photos, school } from "../_data/school";
import SectionTitle from "./SectionTitle";

/** Lando's store callout → enrollment. */
export default function EnrollCallout() {
  return (
    <section id="enroll" className="relative z-10 bg-paper px-4 py-24 sm:px-6">
      <div className="grid overflow-hidden rounded-[2rem] bg-blue text-paper md:grid-cols-2">
        <div className="flex flex-col justify-between gap-12 p-6 sm:p-10">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Enrollment</p>
            <p className="eyebrow">2026 – 27</p>
          </div>
          <div>
            <SectionTitle ta={["சேர்க்கை", "திறந்துள்ளது"]} en="Enrollment is open · join the family" wipe="var(--color-ink)" />
            <p className="mt-6 max-w-sm text-lg">
              Classes meet at {school.location}. New families are welcome at every grade level.
            </p>
          </div>
          <a
            href={school.enrollUrl}
            className="self-start rounded-full bg-ink px-7 py-4 text-sm font-bold text-blue uppercase transition-transform hover:scale-105"
          >
            Start enrollment
          </a>
        </div>
        <div className="relative min-h-80">
          <Image src={photos[3].src} alt={photos[3].caption} fill sizes="50vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
