const WEIGHT_TOLERANCE = 0.0001;

const invalidResult = (message, totalWeight = 0) => ({
  matrix: [],
  ranked: [],
  totalWeight: Number.isFinite(totalWeight) ? Number(totalWeight.toFixed(6)) : 0,
  valid: false,
  message
});

const toFiniteNumber = (value) => {
  if (value === null || value === undefined || String(value).trim() === '') return null;
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
};

const compareText = (left, right) => {
  const normalizedLeft = String(left).toLowerCase();
  const normalizedRight = String(right).toLowerCase();
  if (normalizedLeft < normalizedRight) return -1;
  if (normalizedLeft > normalizedRight) return 1;
  return 0;
};

export function calculateSaw(alternatives, criteria) {
  if (!Array.isArray(criteria) || criteria.length === 0) {
    return invalidResult('Belum ada kriteria untuk perhitungan SAW.');
  }

  if (!Array.isArray(alternatives) || alternatives.length === 0) {
    return invalidResult('Belum ada siswa untuk perhitungan SAW.');
  }

  const criterionKeys = new Set();
  const preparedCriteria = [];

  for (const criterion of criteria) {
    if (!criterion || typeof criterion !== 'object') {
      return invalidResult('Definisi kriteria tidak valid.');
    }

    const key = criterion.id ?? criterion.name;
    const name = String(criterion.name ?? '').trim();
    const weight = toFiniteNumber(criterion.weight);

    if (key === undefined || key === null || !name) {
      return invalidResult('Setiap kriteria harus memiliki ID dan nama.');
    }

    if (criterionKeys.has(String(key))) {
      return invalidResult('ID kriteria tidak boleh duplikat.');
    }
    criterionKeys.add(String(key));

    if (criterion.type !== 'Benefit' && criterion.type !== 'Cost') {
      return invalidResult(`Atribut kriteria "${name}" harus Benefit atau Cost.`);
    }

    if (weight === null || weight <= 0) {
      return invalidResult(`Bobot kriteria "${name}" harus berupa angka lebih dari 0.`);
    }

    preparedCriteria.push({ ...criterion, key, name, weight });
  }

  const totalWeight = preparedCriteria.reduce((sum, criterion) => sum + criterion.weight, 0);
  const isFractionTotal = Math.abs(totalWeight - 1) <= WEIGHT_TOLERANCE;
  const isPercentageTotal = Math.abs(totalWeight - 100) <= WEIGHT_TOLERANCE;

  if (!isFractionTotal && !isPercentageTotal) {
    return invalidResult('Total bobot harus 1 atau 100%. Bobot tidak dinormalisasi otomatis.', totalWeight);
  }

  const weightDivisor = isPercentageTotal ? 100 : 1;
  const alternativesById = new Set();
  const preparedAlternatives = [];

  for (const alternative of alternatives) {
    if (!alternative || typeof alternative !== 'object') {
      return invalidResult('Data siswa tidak valid.', totalWeight);
    }

    const student = String(alternative.student ?? alternative.name ?? alternative.id ?? '').trim();
    const id = String(alternative.id ?? student).trim();

    if (!student || !id) {
      return invalidResult('Setiap siswa harus memiliki nama dan ID yang valid.', totalWeight);
    }

    if (alternativesById.has(id)) {
      return invalidResult(`ID siswa "${id}" tidak boleh duplikat.`, totalWeight);
    }
    alternativesById.add(id);

    const values = [];
    for (const criterion of preparedCriteria) {
      const rawValue = alternative[criterion.key];
      const value = toFiniteNumber(rawValue);
      if (value === null || value < 0) {
        return invalidResult(
          `Nilai "${criterion.name}" untuk ${student} kosong, tidak valid, atau negatif.`,
          totalWeight
        );
      }
      values.push(value);
    }

    preparedAlternatives.push({ id, student, values });
  }

  const criterionBounds = preparedCriteria.map((criterion, index) => {
    const values = preparedAlternatives.map((alternative) => alternative.values[index]);
    return {
      minimum: Math.min(...values),
      maximum: Math.max(...values)
    };
  });

  const matrix = preparedAlternatives.map((alternative) => {
    let unroundedScore = 0;
    const details = preparedCriteria.map((criterion, index) => {
      const rawValue = alternative.values[index];
      const { minimum, maximum } = criterionBounds[index];
      let normalizedValue = 0;

      if (criterion.type === 'Benefit' && maximum > 0) {
        normalizedValue = rawValue / maximum;
      } else if (criterion.type === 'Cost' && minimum > 0) {
        normalizedValue = minimum / rawValue;
      }

      const weightedValue = normalizedValue * (criterion.weight / weightDivisor);
      unroundedScore += weightedValue;

      return {
        criterion: criterion.name,
        raw: rawValue,
        type: criterion.type,
        normalized: Number(normalizedValue.toFixed(6)),
        weighted: Number(weightedValue.toFixed(6))
      };
    });

    return {
      id: alternative.id,
      student: alternative.student,
      details,
      score: Number(unroundedScore.toFixed(6)),
      unroundedScore
    };
  });

  const ranked = [...matrix]
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      return compareText(left.student, right.student) || compareText(left.id, right.id);
    })
    .map(({ unroundedScore, ...entry }, index) => ({
      ...entry,
      rank: index + 1
    }));

  return {
    matrix: matrix.map(({ unroundedScore, ...entry }) => entry),
    ranked,
    totalWeight: Number(totalWeight.toFixed(6)),
    valid: true,
    message: 'SAW berhasil dihitung menggunakan data demo.'
  };
}
