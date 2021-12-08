const db = require('../../data/db-config')

async function find() { // EXERCISE A
  const rows = await db('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .groupBy('sc.scheme_id')
    .select("sc.*")
    .count('st.step_id as number_of_steps')
    .orderBy('sc.scheme_id')

  return rows;
}

async function findById(scheme_id) { // EXERCISE B
  const rows = await db('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .select('sc.scheme_name', "st.*")
    .where('sc.scheme_id', scheme_id)
    .orderBy('st.step_number')

  const result = { steps: [] }
  result.scheme_id = scheme_id
  result.scheme_name = rows[0].scheme_name

  if (rows[0].step_id === null){
    return result
  }

  rows.forEach(row => {
    result.steps.push({
      step_id: row.step_id,
      step_number: row.step_number,
      instructions: row.instructions
    })
  })

  return result;
}

async function checkID(scheme_id) {
  const rows = await db('schemes')
    .where('scheme_id', scheme_id)
  console.log(rows)
  if (rows.length === 0){
    return false
  }
  return true
}

async function findSteps(scheme_id) { // EXERCISE C
  const rows = await db('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .select('sc.scheme_name', "st.step_id", "st.step_number", "st.instructions")
    .where('sc.scheme_id', scheme_id)
    .orderBy('st.step_number')

    if (rows[0].step_id === null){
      return [];
    }

  return rows;
}

async function add(scheme) { // EXERCISE D
  const [thing] = await db('schemes').insert(scheme)
  return findById(thing);
}

async function addStep(scheme_id, step) { // EXERCISE E
  step.scheme_id = scheme_id
  await db('steps').insert(step)
  return findSteps(scheme_id)
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
  checkID
}
