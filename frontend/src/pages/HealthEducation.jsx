import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function HealthEducation() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [activeGuide, setActiveGuide] = useState(null);

  const articles = [
    {
      id: 1,
      title: 'Essential Nutritional Guidelines for First-Trimester Mothers',
      category: 'Maternal Health',
      summary: 'Guidance on iron, folic acid, dietary sources, and identification of severe morning sickness symptoms.',
      readTime: '4 min read',
      sections: [
        ['Everyday nutrition', 'Encourage regular meals with a variety of locally available foods, including pulses, vegetables, fruit, whole grains, and a suitable protein source. Safe drinking water and food hygiene are important throughout pregnancy.'],
        ['Antenatal care and supplements', 'Follow the local antenatal care schedule. Iron, folic acid, calcium, and other supplements should be taken only as directed by a qualified provider or current national protocol. Help the mother keep appointments and bring her health record.'],
        ['Common symptoms', 'Small frequent meals and fluids may help with mild nausea. Ask about food and fluid intake, urination, weakness, and whether symptoms are getting worse. Do not recommend stopping prescribed medicines without clinician advice.'],
        ['Urgent warning signs', 'Arrange urgent clinical assessment for vaginal bleeding, severe abdominal pain, severe headache or vision changes, seizures, fainting, fever, breathing difficulty, or inability to keep fluids down. Follow local emergency referral procedures.'],
      ],
    },
    {
      id: 2,
      title: 'Routine Immunization Schedule from Birth to 12 Months',
      category: 'Child Health',
      summary: 'Recommended vaccination calendar including BCG, Pentavalent, Rotavirus, and MR dose timings.',
      readTime: '6 min read',
      sections: [
        ['Use the child health card', "Check the child's age, previous doses, and current national immunization schedule. Schedules and catch-up rules vary by location; confirm due vaccines with the local clinic rather than guessing or restarting a series."],
        ['Before and after vaccination', "Bring the immunization card and tell the provider about serious prior reactions or current health concerns. Explain common mild effects using clinic-approved guidance, and tell the caregiver where to seek help if concerned."],
        ['Missed doses and follow-up', 'A missed appointment is a reason to contact the health facility for catch-up advice. Record each administered dose on the official card and register, and agree on the next appointment before the family leaves.'],
        ['Urgent reaction', 'Get urgent medical help for difficulty breathing, collapse, seizures, facial or throat swelling, or another severe reaction after vaccination. Follow local emergency guidance.'],
      ],
    },
    {
      id: 3,
      title: 'Community Screening for Early Hypertension',
      category: 'Hypertension',
      summary: 'Protocol for accurate digital and manual sphygmomanometer readings and referral thresholds for PHCs.',
      readTime: '5 min read',
      sections: [
        ['Prepare for a reliable reading', 'Use a validated device and the correct cuff size. When feasible, have the person rest quietly for several minutes, avoid talking during measurement, support the arm at heart level, and follow device instructions.'],
        ['Measure and record', 'Take readings using local clinical protocol; repeat an unexpected reading after rest when safe. Record values, date, time, symptoms, and relevant medicines. Do not diagnose from a single community screening measurement.'],
        ['Follow-up and referral', 'Arrange clinical review for elevated readings according to local thresholds. Encourage prescribed treatment follow-through and planned monitoring; do not advise changing or stopping medication.'],
        ['Emergency symptoms', 'Chest pain, sudden weakness or confusion, severe breathlessness, fainting, or sudden vision or speech changes require urgent assessment regardless of a screening result.'],
      ],
    },
    {
      id: 4,
      title: 'Water Purification & Rural Sanitation Hygiene Standards',
      category: 'Hygiene',
      summary: 'Practical disinfection techniques for village borewells and preventing monsoon-borne diarrheal outbreaks.',
      readTime: '3 min read',
      sections: [
        ['Safe water', 'Use a protected water source when available. If contamination is suspected, follow local public-health instructions for boiling, filtration, or approved disinfection. Store treated water in a clean, covered container and pour rather than dipping hands or cups.'],
        ['Hand and food hygiene', 'Wash hands with soap at key times, including after using the toilet and before preparing or eating food. Keep raw and cooked foods separate, cook thoroughly, and use clean utensils.'],
        ['Diarrhea and dehydration', 'Contact a health worker for persistent diarrhea, blood in stool, repeated vomiting, reduced urination, unusual sleepiness, or inability to drink. Follow local oral rehydration guidance and do not delay referral for danger signs.'],
        ['Community prevention', 'Report suspected clusters to the appropriate health authority. Keep sanitation areas away from water sources and follow local waste and outbreak-control instructions.'],
      ],
    },
  ];

  const categories = ['All', 'Maternal Health', 'Child Health', 'Hypertension', 'Hygiene'];

  const filtered = articles.filter((a) => {
    const matchCategory = selectedCategory === 'All' || a.category === selectedCategory;
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Health Education & Knowledge Base</h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
            Field Guidelines
          </span>
        </div>
        <p className="text-sm text-slate-600 mt-1">
          Informational modules and counseling reference guides to assist workers during household visits.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="w-full sm:w-80 bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search educational guides..."
            className="w-full text-xs sm:text-sm bg-transparent focus:outline-none text-slate-800"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-colors">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {item.category}
                </span>
                <span className="text-xs text-slate-400 font-medium">{item.readTime}</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 leading-snug">{item.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{item.summary}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400">National Health Portal Guidelines</span>
              <button onClick={() => setActiveGuide(item)} className="font-semibold text-emerald-600 hover:text-emerald-800">
                Read Full Guide &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveGuide(null); }}>
          <section role="dialog" aria-modal="true" aria-labelledby="guide-title" className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-xl">
            <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-slate-200 bg-white p-5 sm:p-6">
              <div>
                <span className="text-xs font-semibold uppercase text-emerald-700">{activeGuide.category}</span>
                <h2 id="guide-title" className="mt-1 text-xl font-bold text-slate-900">{activeGuide.title}</h2>
              </div>
              <button type="button" onClick={() => setActiveGuide(null)} aria-label="Close guide" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-5 p-5 sm:p-6">
              {activeGuide.sections.map(([heading, body]) => (
                <section key={heading}>
                  <h3 className="font-semibold text-slate-900">{heading}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{body}</p>
                </section>
              ))}
              <p className="border-t border-slate-200 pt-4 text-xs text-slate-500">Use current local and national clinical guidance. This guide supports counseling and does not replace assessment by a qualified health professional.</p>
            </div>
          </section>
        </div>
      )}

      {/* Medical Disclaimer */}
      <div className="p-4 bg-slate-100/70 border border-slate-200 rounded-xl text-xs text-slate-500">
        <p>
          <span className="font-semibold text-slate-700">Notice:</span> Educational materials provided are for informational counseling purposes for community health workers and do not represent automated medical diagnoses.
        </p>
      </div>
    </div>
  );
}
