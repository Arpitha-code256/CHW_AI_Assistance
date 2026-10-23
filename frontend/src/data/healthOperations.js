export const MEMBER_STORAGE_KEY = 'chwMembers';
export const HEALTH_RECORD_STORAGE_KEY = 'chwHealthRecords';

const sampleHealthRecords = [
  {
    id: 1,
    memberName: 'Ravi Kumar',
    date: '2025-02-10',
    bp: '128/82 mmHg',
    sugar: '110 mg/dL',
    weight: '68 kg',
    symptoms: 'Mild dizziness in evening',
    medication: 'Amlodipine 5mg',
    worker: 'Anita Devi (CHW)',
  },
  {
    id: 2,
    memberName: 'Pooja Sharma',
    date: '2025-02-14',
    bp: '118/76 mmHg',
    sugar: '94 mg/dL',
    weight: '54 kg',
    symptoms: 'ANC 2 routine checkup',
    medication: 'Iron & Folic Acid tablets',
    worker: 'Anita Devi (CHW)',
  },
];

export const appointments = [
  {
    id: 1,
    memberName: 'Meera Bai',
    date: '2025-03-01',
    time: '09:30 AM',
    provider: 'Dr. R. Sharma (Medical Officer)',
    location: 'Primary Health Centre - Sector 4',
    purpose: 'High-risk Antenatal Ultrasound Review',
    status: 'Upcoming',
  },
  {
    id: 2,
    memberName: 'Ravi Kumar',
    date: '2025-02-12',
    time: '11:00 AM',
    provider: 'Dr. Preeti Das (General Physician)',
    location: 'Sub-Centre Clinic Room 2',
    purpose: 'Cardiovascular Risk Evaluation',
    status: 'Completed',
  },
];

export const visits = [
  {
    id: 1,
    memberName: 'Sita Devi',
    date: '2025-02-25',
    time: '10:30 AM',
    visitType: 'Maternal ANC Checkup',
    worker: 'Anita Devi',
    status: 'Scheduled',
  },
  {
    id: 2,
    memberName: 'Ravi Kumar',
    date: '2025-02-20',
    time: '02:00 PM',
    visitType: 'Hypertension Monitoring',
    worker: 'Anita Devi',
    status: 'Completed',
  },
  {
    id: 3,
    memberName: 'Anil Verma',
    date: '2025-02-18',
    time: '11:00 AM',
    visitType: 'Routine Nutrition Survey',
    worker: 'Kavita Singh',
    status: 'Cancelled',
  },
];

export const followUps = [
  {
    id: 1,
    memberName: 'Kamla Devi',
    reason: 'Check postpartum recovery & neonatal temperature',
    dueDate: '2025-02-28',
    worker: 'Anita Devi (CHW)',
    status: 'Pending',
  },
  {
    id: 2,
    memberName: 'Sanjay Rawat',
    reason: 'Verify adherence to TB medication regimen',
    dueDate: '2025-02-20',
    worker: 'Anita Devi (CHW)',
    status: 'Overdue',
  },
  {
    id: 3,
    memberName: 'Ravi Kumar',
    reason: 'Follow-up blood pressure measurement after diet change',
    dueDate: '2025-02-15',
    worker: 'Anita Devi (CHW)',
    status: 'Completed',
  },
];

export function readMembers() {
  try {
    const storedMembers = JSON.parse(window.localStorage.getItem(MEMBER_STORAGE_KEY) || '[]');
    return Array.isArray(storedMembers) ? storedMembers : [];
  } catch {
    return [];
  }
}

export function saveMembers(members) {
  window.localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify(members));
  window.dispatchEvent(new Event('chw:members-updated'));
}

export function readHealthRecords() {
  try {
    const storedRecords = window.localStorage.getItem(HEALTH_RECORD_STORAGE_KEY);
    if (storedRecords === null) return sampleHealthRecords;

    const records = JSON.parse(storedRecords);
    return Array.isArray(records) ? records : sampleHealthRecords;
  } catch {
    return sampleHealthRecords;
  }
}

export function saveHealthRecords(records) {
  window.localStorage.setItem(HEALTH_RECORD_STORAGE_KEY, JSON.stringify(records));
}