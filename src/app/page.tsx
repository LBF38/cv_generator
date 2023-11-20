"use client";
import ExperienceCard from '@/components/experience-card';
import { SectionsEntity, fake_sections as fakeSections } from '@/lib/fake_data'; // TODO: replace it w/ real data. (from db or local storage)
import { useEffect, useState } from 'react';


export default function Home() {
  const [sections, setSections] = useState<SectionsEntity[]>([]);
  useEffect(() => setSections(fakeSections), []);

  return (
    <>
      <h1 className='text-4xl font-bold text-center my-5'>Personal Portfolio</h1>
      {sections.map((section) => (
        <section id={section.id} key={section.id}>
          <h1 className='text-2xl font-semibold leading-none tracking-tight'>{section.title}</h1>
          {section.experiences.map((experience, index) => (
            <ExperienceCard key={index} {...experience} />
          ))}
        </section>
      ))}
    </>
  );
}
