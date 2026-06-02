export function formatCep(value) {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 5) return digits;
  return digits.slice(0, 5) + '-' + digits.slice(5);
}

export function formatCpf(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return digits.slice(0, 3) + '.' + digits.slice(3);
  if (digits.length <= 9) return digits.slice(0, 3) + '.' + digits.slice(3, 6) + '.' + digits.slice(6);
  return digits.slice(0, 3) + '.' + digits.slice(3, 6) + '.' + digits.slice(6, 9) + '-' + digits.slice(9);
}

export function extractApiError(error) {
  if (error?.response?.data) {
    const data = error.response.data;
    if (data.errors) {
      return Object.values(data.errors).join(', ');
    }
    return data.detail || data.title || 'Unknown error';
  }
  return error?.message || 'Unknown error';
}
