"use client";
import ExperienceCard, { ExperienceCardProps } from '@/components/experience-card';
import { NavigationMenuDemo } from '@/components/navigation-bar';
import { sections } from '@/lib/fake_data'; // TODO: replace it w/ real data. (from db or local storage)


export default function Home() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <header>
        <NavigationMenuDemo />
      </header>
      <main>
        {sections.map((section) => (
          <section id={section.id} key={section.id}>
            <h1>{section.title}</h1>
            {section.experiences.map((experience, index) => (
              <ExperienceCard key={index} {...experience} />
            ))}
          </section>
        ))}
      </main>
    </div>
  );
}
