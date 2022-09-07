/**
 * API call to get all the pharmacists
 * @returns API response for the list of pharmacists
 */
export async function loadPharmacists() {
  let res;
  res = await fetch('http://localhost:8080/api/pharmacists');

  const data = await res.json();

  return data;
}

/**
 * API call to get all the tasks
 * @returns API response for the list of tasks
 */
export async function loadTasks() {
  let res;
  res = await fetch('http://localhost:8080/api/tasks');

  const data = await res.json();

  return data;
}
