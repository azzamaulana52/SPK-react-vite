import { describe, expect, it } from 'vitest';
import { calculateSaw } from './saw';

describe('calculateSaw', () => {
  it('matches a manual benefit/cost calculation', () => {
    const criteria = [
      { id: 'C-01', name: 'Grammar', type: 'Benefit', weight: 0.6 },
      { id: 'C-02', name: 'Test time', type: 'Cost', weight: 0.4 }
    ];
    const alternatives = [
      { id: 'S-01', student: 'Alya', 'C-01': 80, 'C-02': 20 },
      { id: 'S-02', student: 'Budi', 'C-01': 100, 'C-02': 40 }
    ];

    const result = calculateSaw(alternatives, criteria);

    expect(result.valid).toBe(true);
    expect(result.matrix[0].details.map((detail) => detail.normalized)).toEqual([0.8, 1]);
    expect(result.matrix[1].details.map((detail) => detail.normalized)).toEqual([1, 0.5]);
    expect(result.matrix[0].details.map((detail) => detail.weighted)).toEqual([0.48, 0.4]);
    expect(result.matrix[1].details.map((detail) => detail.weighted)).toEqual([0.6, 0.2]);
    expect(result.ranked.map((item) => item.score)).toEqual([0.88, 0.8]);
    expect(result.ranked.map((item) => item.student)).toEqual(['Alya', 'Budi']);
  });

  it('accepts percentage weights when their total is exactly 100', () => {
    const result = calculateSaw(
      [
        { id: 'S-01', student: 'Alya', Grammar: 80 },
        { id: 'S-02', student: 'Budi', Grammar: 100 }
      ],
      [{ name: 'Grammar', type: 'Benefit', weight: 100 }]
    );

    expect(result.valid).toBe(true);
    expect(result.totalWeight).toBe(100);
    expect(result.ranked[0].student).toBe('Budi');
    expect(result.ranked[0].score).toBe(1);
  });

  it('treats zero denominators as zero contribution and orders ties deterministically', () => {
    const result = calculateSaw(
      [
        { id: 'S-2', student: 'Alya', Benefit: 0, Cost: 0 },
        { id: 'S-1', student: 'Alya', Benefit: 0, Cost: 5 },
        { id: 'S-3', student: 'Budi', Benefit: 0, Cost: 0 }
      ],
      [
        { name: 'Benefit', type: 'Benefit', weight: 0.5 },
        { name: 'Cost', type: 'Cost', weight: 0.5 }
      ]
    );

    expect(result.valid).toBe(true);
    expect(result.matrix.every((row) => row.score === 0)).toBe(true);
    expect(result.ranked.map((item) => item.id)).toEqual(['S-1', 'S-2', 'S-3']);
    expect(result.ranked.map((item) => item.rank)).toEqual([1, 2, 3]);
  });

  it.each([
    { alternatives: [], criteria: [{ name: 'Grammar', type: 'Benefit', weight: 1 }], message: 'siswa' },
    { alternatives: [{ student: 'Alya', Grammar: 90 }], criteria: [], message: 'kriteria' },
    {
      alternatives: [{ student: 'Alya', Grammar: 90 }, { student: 'Budi', Grammar: 80 }],
      criteria: [{ name: 'Grammar', type: 'Benefit', weight: 0.5 }],
      message: 'Total bobot'
    },
    {
      alternatives: [{ student: 'Alya', Grammar: '' }],
      criteria: [{ name: 'Grammar', type: 'Benefit', weight: 1 }],
      message: 'kosong'
    },
    {
      alternatives: [{ student: 'Alya', Grammar: -1 }],
      criteria: [{ name: 'Grammar', type: 'Benefit', weight: 1 }],
      message: 'negatif'
    },
    {
      alternatives: [{ student: 'Alya', Grammar: 90 }],
      criteria: [{ name: 'Grammar', type: 'Unknown', weight: 1 }],
      message: 'Benefit atau Cost'
    }
  ])('rejects invalid input and reports $message', ({ alternatives, criteria, message }) => {
    const result = calculateSaw(alternatives, criteria);

    expect(result.valid).toBe(false);
    expect(result.matrix).toEqual([]);
    expect(result.ranked).toEqual([]);
    expect(result.message).toContain(message);
  });
});
