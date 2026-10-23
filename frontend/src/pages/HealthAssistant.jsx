import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  HeartPulse,
  MessageCircle,
  PhoneCall,
  Send,
  ShieldAlert,
  UserRound,
} from 'lucide-react';

const initialPatient = {
  name: 'Ravi Kumar',
  age: '35',
  symptoms: 'Mild dizziness in the evening',
  bloodPressure: '128/82',
  bloodSugar: '110',
  pregnancy: false,
};

const quickQuestions = [
  'What should I check for dizziness?',
  'Explain the warning signs in this case',
  'What information should I send to the supervisor?',
];

function getRedFlags(patient) {
  const flags = [];
  const systolic = Number(patient.bloodPressure.split('/')[0]);
  const diastolic = Number(patient.bloodPressure.split('/')[1]);
  const glucose = Number(patient.bloodSugar);
  const symptoms = patient.symptoms.toLowerCase();

  if (systolic >= 180 || diastolic >= 120) flags.push('Very high blood pressure');
  if (glucose >= 300 || glucose > 0 && glucose < 70) flags.push('Critical blood sugar reading');
  if (/chest pain|severe breath|difficulty breathing|unconscious|fainting|severe bleeding|seizure/.test(symptoms)) {
    flags.push('Potential emergency symptom');
  }
  if (patient.pregnancy && /bleeding|severe headache|blurred vision|convulsion|severe pain/.test(symptoms)) {
    flags.push('High-risk pregnancy symptom');
  }

  return flags;
}

function buildAdvice(patient, flags) {
  if (flags.length > 0) {
    return `Potential warning signs detected: ${flags.join(', ')}. Keep the patient supervised, repeat the measurement if safe, and contact a qualified supervisor or clinician now. Do not delay emergency referral for this chat.`;
  }

  if (/dizz|weak|tired/.test(patient.symptoms.toLowerCase())) {
    return 'For mild dizziness, check hydration, recent food intake, temperature, blood pressure, blood sugar, medication history, and whether the patient has fainted or developed new weakness. Escalate if symptoms worsen or new red flags appear.';
  }

  return 'No rule-based red flags were detected from the entered information. Record the context, monitor the patient, follow your local care protocol, and consult a supervisor when the situation is uncertain.';
}

function answerHealthQuestion(question, patient, flags, advice) {
  const text = question.toLowerCase();

  if (/chest pain|cannot breathe|can't breathe|severe breath|unconscious|not waking|seizure|heavy bleeding|stroke|suicid/.test(text)) {
    return 'This may be an emergency. Contact local emergency services or arrange urgent clinical referral now. Stay with the person, follow your local first-aid protocol, and do not delay care while using this chat.';
  }
  if (/pregnan|antenatal|maternal|postpartum|after birth|newborn/.test(text)) {
    return 'For pregnancy or the postnatal period, support scheduled antenatal/postnatal checks and follow the current local care protocol. Urgently refer bleeding, severe headache or vision changes, seizures, severe abdominal pain, fever, breathing difficulty, or a very unwell newborn. Share age or pregnancy stage, symptoms, onset, and any readings with a qualified provider.';
  }
  if (/vaccin|immuni|vaccine|child|infant|baby/.test(text)) {
    return 'Check the child health card and current national immunization schedule with the local clinic; timing and catch-up rules vary by location. Record doses and arrange the next visit. Seek urgent help for breathing difficulty, collapse, seizures, or facial/throat swelling after vaccination.';
  }
  if (/blood pressure|hypertension| bp\b/.test(text)) {
    return 'For screening, use the correct cuff and device, allow quiet rest when feasible, and record repeat readings according to local protocol. A single community reading is not a diagnosis; arrange clinical follow-up for elevated values. Chest pain, weakness, confusion, severe breathlessness, or sudden vision/speech changes need urgent assessment.';
  }
  if (/blood sugar|glucose|diabet/.test(text)) {
    return 'Record the glucose value, units, time, symptoms, and whether the person had eaten, then follow the local screening and referral protocol. Do not change medication based on this chat. Confusion, collapse, inability to swallow, or severe illness needs urgent clinical help.';
  }
  if (/fever|temperature|malaria|dengue/.test(text)) {
    return 'Record the temperature, duration, age, fluid intake, other symptoms, and any medicines already taken. Encourage appropriate fluids if the person can drink and arrange clinical review based on local protocol. Urgent referral is needed for breathing difficulty, confusion, seizure, stiff neck, severe dehydration, bleeding, or a very young infant with fever.';
  }
  if (/diarrh|loose stool|vomit|dehydrat/.test(text)) {
    return 'Assess ability to drink, urination, alertness, vomiting, and blood in stool. Follow local oral rehydration guidance and arrange clinical assessment for persistent symptoms. Urgently refer inability to drink, repeated vomiting, unusual sleepiness, very little urine, blood in stool, or severe weakness.';
  }
  if (/cough|breath|respirat|tuberculosis|\btb\b/.test(text)) {
    return 'Ask about duration, fever, breathing difficulty, chest pain, exposure, and current treatment. Follow local respiratory infection/TB testing and infection-control guidance; do not diagnose from symptoms alone. Severe breathing difficulty, blue lips, confusion, or chest pain needs urgent care.';
  }
  if (/medicine|medication|tablet|dose|drug|side effect/.test(text)) {
    return 'Use medicines only as prescribed and follow the label or qualified clinician’s instructions. Do not start, stop, or change a dose based on this chat. For a possible severe allergic reaction, collapse, or serious side effect, arrange emergency care; otherwise contact the prescribing clinician or pharmacist.';
  }
  if (/anemia|anaemia|nutrition|diet|food|iron|folic/.test(text)) {
    return 'Ask about food access, appetite, pregnancy status, fatigue, and any prescribed supplements. Encourage a varied diet using locally available foods and follow local nutrition and antenatal guidance. Do not diagnose anemia from symptoms alone; arrange assessment for persistent weakness, breathlessness, fainting, or concerning symptoms.';
  }
  if (/supervisor|handoff|send|report/.test(text)) {
    return `Supervisor handoff: ${patient.name || 'Unnamed patient'}, age ${patient.age || 'unknown'}, symptoms: ${patient.symptoms || 'not entered'}, BP ${patient.bloodPressure || 'not entered'}, glucose ${patient.bloodSugar || 'not entered'}. Include onset, duration, medicines, relevant history, and actions already taken. ${flags.length ? `Possible warning signs: ${flags.join(', ')}. Escalate promptly.` : ''}`;
  }
  if (/warning|red flag|danger sign|emergency/.test(text)) {
    return flags.length ? `Possible warning signs from the current case: ${flags.join(', ')}. Contact a qualified supervisor or clinician promptly; use emergency referral procedures for severe symptoms.` : 'No rule-based warning signs were detected from the current fields. This does not rule out illness. Ask about worsening symptoms and follow local assessment and referral protocols.';
  }
  if (/dizz|weak|tired|faint/.test(text)) {
    return 'Check hydration, recent food intake, temperature, blood pressure, blood sugar, medication history, fainting, new weakness, speech changes, severe headache, chest pain, and breathing symptoms. Escalate urgently for severe or sudden symptoms.';
  }
  if (/\b(help|what should i do|what do i check|assess|symptom)\b/.test(text)) return advice;

  return 'I can provide offline guidance for common maternal and child health, vaccination, blood pressure, diabetes, fever, diarrhea, respiratory/TB, nutrition, and medicine questions. I cannot reliably answer every medical question or diagnose. Please share the person’s age, symptoms, duration, and relevant readings, and confirm care decisions with a qualified clinician or local protocol. For severe symptoms, seek urgent care now.';
}

export default function HealthAssistant() {
  const [patient, setPatient] = useState(initialPatient);
  const [messages, setMessages] = useState([
    {
      from: 'assistant',
      text: 'I can help organize health information, identify possible warning signs, and prepare a supervisor handoff. I do not replace a clinician or emergency services.',
    },
  ]);
  const [question, setQuestion] = useState('');
  const [escalated, setEscalated] = useState(false);
  const redFlags = useMemo(() => getRedFlags(patient), [patient]);
  const advice = useMemo(() => buildAdvice(patient, redFlags), [patient, redFlags]);

  const updatePatient = (event) => {
    const { name, value, type, checked } = event.target;
    setPatient((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const analyzeCase = () => {
    setMessages((current) => [...current, { from: 'assistant', text: advice }]);
  };

  const askQuestion = (event) => {
    event.preventDefault();
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    const response = answerHealthQuestion(trimmedQuestion, patient, redFlags, advice);

    setMessages((current) => [
      ...current,
      { from: 'worker', text: trimmedQuestion },
      { from: 'assistant', text: response },
    ]);
    setQuestion('');
  };

  const escalate = () => {
    setEscalated(true);
    setMessages((current) => [
      ...current,
      { from: 'assistant', text: 'Escalation marked. Contact the assigned supervisor or clinician using your approved local channel and share the structured handoff below.' },
    ]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Health Assistant</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200">Decision support</span>
          </div>
          <p className="text-sm text-slate-600 mt-1">Organize patient information, review possible warning signs, and prepare a safe supervisor handoff.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldAlert className="w-4 h-4 text-amber-500" />
          Not a diagnosis or emergency service
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-6 items-start">
        <section className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-5">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <h2 className="font-bold text-slate-900">Patient information</h2>
              <p className="text-xs text-slate-500">Enter only information you are authorized to use.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="text-xs font-semibold text-slate-700">Patient name
              <input name="name" value={patient.name} onChange={updatePatient} className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-xl font-normal text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
            </label>
            <label className="text-xs font-semibold text-slate-700">Age
              <input name="age" type="number" value={patient.age} onChange={updatePatient} className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-xl font-normal text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
            </label>
          </div>
          <label className="block text-xs font-semibold text-slate-700">Symptoms or observations
            <textarea name="symptoms" value={patient.symptoms} onChange={updatePatient} rows="3" className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-xl font-normal text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="text-xs font-semibold text-slate-700">Blood pressure
              <input name="bloodPressure" value={patient.bloodPressure} onChange={updatePatient} placeholder="e.g. 128/82" className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-xl font-normal text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
            </label>
            <label className="text-xs font-semibold text-slate-700">Blood sugar mg/dL
              <input name="bloodSugar" type="number" value={patient.bloodSugar} onChange={updatePatient} className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-xl font-normal text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
            </label>
          </div>
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <input name="pregnancy" type="checkbox" checked={patient.pregnancy} onChange={updatePatient} className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
            Patient is pregnant or recently postpartum
          </label>

          <div className={`rounded-xl border p-4 ${redFlags.length ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50 border-emerald-200'}`}>
            <div className="flex items-center gap-2">
              {redFlags.length ? <AlertTriangle className="w-5 h-5 text-rose-600" /> : <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
              <h3 className={`font-bold text-sm ${redFlags.length ? 'text-rose-800' : 'text-emerald-800'}`}>{redFlags.length ? 'Potential red flags' : 'No rule-based red flags detected'}</h3>
            </div>
            {redFlags.length > 0 && <ul className="mt-2 list-disc list-inside text-xs text-rose-700 space-y-1">{redFlags.map((flag) => <li key={flag}>{flag}</li>)}</ul>}
            <p className="mt-2 text-xs text-slate-600">{advice}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={analyzeCase} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700"><HeartPulse className="w-4 h-4" /> Review case</button>
            <button type="button" onClick={escalate} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200"><PhoneCall className="w-4 h-4" /> {escalated ? 'Escalation marked' : 'Escalate case'}</button>
          </div>
        </section>

        <section className="bg-slate-900 rounded-2xl shadow-xs overflow-hidden flex flex-col min-h-[620px]">
          <div className="p-5 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-400/15 text-cyan-300 flex items-center justify-center"><Bot className="w-5 h-5" /></div>
              <div><h2 className="font-bold text-white">CHW Support Chat</h2><p className="text-xs text-slate-400">Offline topic guidance; not a diagnostic AI</p></div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-300"><span className="w-2 h-2 rounded-full bg-emerald-400" />Offline</span>
          </div>
          <div className="flex-1 p-5 space-y-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={`${message.from}-${index}`} className={`flex gap-2 ${message.from === 'worker' ? 'justify-end' : ''}`}>
                {message.from !== 'worker' && <Bot className="w-4 h-4 text-cyan-300 mt-1 shrink-0" />}
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${message.from === 'worker' ? 'bg-emerald-600 text-white rounded-br-sm' : 'bg-slate-800 text-slate-200 rounded-bl-sm'}`}>{message.text}</div>
                {message.from === 'worker' && <UserRound className="w-4 h-4 text-emerald-300 mt-1 shrink-0" />}
              </div>
            ))}
            <div className="pt-2 flex flex-wrap gap-2">
              {quickQuestions.map((prompt) => <button key={prompt} type="button" onClick={() => setQuestion(prompt)} className="inline-flex items-center gap-1 text-left px-3 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 text-[11px]">{prompt}<ChevronRight className="w-3 h-3" /></button>)}
            </div>
          </div>
          <form onSubmit={askQuestion} className="p-4 border-t border-slate-700 flex gap-2">
            <MessageCircle className="w-4 h-4 text-slate-500 mt-2.5 shrink-0" />
            <input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask about the entered case..." className="flex-1 min-w-0 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400" />
            <button type="submit" title="Send question" className="p-2.5 rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400"><Send className="w-4 h-4" /></button>
          </form>
        </section>
      </div>
    </div>
  );
}
