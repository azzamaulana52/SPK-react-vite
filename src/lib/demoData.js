export const initialDemoStudents = [
  { id: 'S-001', name: 'Alya Putri', status: 'Aktif', contact: '0812-1111-0001' },
  { id: 'S-002', name: 'Budi Setiawan', status: 'Baru', contact: '0812-1111-0002' },
  { id: 'S-003', name: 'Citra Lestari', status: 'Aktif', contact: '0812-1111-0003' },
  { id: 'S-004', name: 'Dimas Ardi', status: 'Review', contact: '0812-1111-0004' },
];

export const initialDemoCriteria = [
  { id: 'C-01', name: 'Grammar', type: 'Benefit', weight: 0.25 },
  { id: 'C-02', name: 'Vocabulary', type: 'Benefit', weight: 0.2 },
  { id: 'C-03', name: 'Reading', type: 'Benefit', weight: 0.2 },
  { id: 'C-04', name: 'Listening', type: 'Cost', weight: 0.15 },
  { id: 'C-05', name: 'Speaking', type: 'Benefit', weight: 0.2 },
];

export const initialDemoScores = {
  'S-001': { 'C-01': 88, 'C-02': 90, 'C-03': 85, 'C-04': 78, 'C-05': 86 },
  'S-002': { 'C-01': 72, 'C-02': 74, 'C-03': 80, 'C-04': 70, 'C-05': 73 },
  'S-003': { 'C-01': 83, 'C-02': 88, 'C-03': 82, 'C-04': 81, 'C-05': 84 },
};
