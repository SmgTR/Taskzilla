export default function formatDate(date: Date) {
  const newDate = new Date(date);
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  return `${newDate.toLocaleDateString()} ${hours < 10 ? '0' + hours : hours}:${
    minutes < 10 ? '0' + minutes : minutes
  }`;
}
