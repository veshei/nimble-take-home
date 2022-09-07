var express    = require('express')
var app        = express()
var bodyParser = require('body-parser')
var shortid = require('shortid')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var port = process.env.PORT || 8080

var router = express.Router()

// Unsafely enable cors
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// logging middleware
router.use(function(req, res, next) {
    console.log('\nReceived:',{url: req.originalUrl, body: req.body, query: req.query})
    next()
})

// Simple in memory database
const pharmacistsDatabase = [
  {
    id: 0,
    name: {
      first: 'Michael',
      last: 'Bolton',
    },
  },
  {
    id: 1,
    name: {
      first: 'Eddard',
      last: 'Stark',
    },
  },
  {
    id: 2,
    name: {
      first: 'John',
      last: 'Doe',
    },
  }
]

const tasksDatabase = [
    {
      id: 0,
      pharmacist: {
        id: 0,
        name: {
          first: 'Michael',
          last: 'Bolton',
        },
      },
      patient: {
        id: 0,
        name: {
          first: 'James',
          last: 'Franco',
        }
      },
      taskTs: '2021-04-25T07:45:13.763Z',
      type: 'Prescription Order'
    },
    {
      id: 1,
      pharmacist: {
        id: 0,
        name: {
          first: 'Michael',
          last: 'Bolton',
        },
      },
      patient: {
        id: 1,
        name: {
          first: 'James',
          last: 'Corden',
        }
      },
      taskTs: '2021-04-25T08:45:13.763Z',
      type: 'Prescription Order'
    },
    {
      id: 2,
      pharmacist: {
        id: 1,
        name: {
          first: 'Eddard',
          last: 'Stark',
        },
      },
      patient: {
        id: 3,
        name: {
          first: 'Kenan',
          last: 'Thompson',
        }
      },
      taskTs: '2021-04-25T10:45:13.763Z',
      type: 'Refill Order'
    },
    {
      id: 3,
      pharmacist: {
        id: 1,
        name: {
          first: 'Eddard',
          last: 'Stark',
        },
      },
      patient: {
        id: 4,
        name: {
          first: 'Kate',
          last: 'McKinnon',
        }
      },
      taskTs: '2021-04-25T12:45:13.763Z',
      type: 'Prescription Order'
    },
    {
      id: 4,
      pharmacist: {
        id: 2,
        name: {
          first: 'John',
          last: 'Doe',
        },
      },
      patient: {
        id: 5,
        name: {
          first: 'Jimmy',
          last: 'Fallon',
        }
      },
      taskTs: '2021-04-25T12:45:13.763Z',
      type: 'Refill Order'
    },
    {
      id: 5,
      pharmacist: {
        id: 0,
        name: {
          first: 'Michael',
          last: 'Bolton',
        },
      },
      patient: {
        id: 6,
        name: {
          first: 'Pete',
          last: 'Davidson',
        }
      },
      taskTs: '2021-04-25T10:45:13.763Z',
      type: 'Insurance Follow Up'
    },
]



// Utility functions
const getStartOfDay = (date) => {
  let start = date;
  start.setUTCHours(0,0,0,0);

  return start;

}

const getEndOfDay = (date) => {
  let end = date;
  end.setUTCHours(23,59,59,999);

  return end;
}

const searchTasks = (pharmacistId, from, to) => {

  // to ensure we have data from from date starting from 12:00am
  const startOfDay = from ? getStartOfDay(from).valueOf() : null;

  // to ensure we have data from to date ending at 11:59pm
  const endOfDay = to ? getEndOfDay(to).valueOf() : null;

  let tasks = tasksDatabase.filter((task) => {
    return task.pharmacist.id === parseInt(pharmacistId);
  })

  if (tasks === undefined){
    return {error: `a pharmacist with id ${pharmacistId} does not exist`}
  }

  if (from) {
    tasks = tasks.filter((task) => {
      return new Date(task.taskTs).valueOf() > startOfDay;
    })
  }

  if (to) {
    tasks = tasks.filter((task) => {
      return new Date(task.taskTs).valueOf() < endOfDay;
    })
  }

  return tasks;
}

// API Routes
router.get('/pharmacists', function(req, res) {
    const pharmacists = pharmacistsDatabase.map((pharmacist) => {
      return {id: pharmacist.id, name: pharmacist.name}
    })
    console.log('Response:', pharmacists)
    res.json(pharmacists)
})

// /tasks?pharmacist={id}&from={fromDateISOString}&to={toDateISOString}
router.get('/tasks', function(req, res) {
  const pharmacist = req.query.pharmacist;
  const fromDate = req.query.from ? new Date(req.query.from) : null;
  const toDate = req.query.to ? new Date(req.query.to) : null;
  let tasks = [];

  if (pharmacist || fromDate || toDate) {
    tasks = searchTasks(pharmacist, fromDate, toDate);
  } else {
    tasks = tasksDatabase;
  }
  if (tasks.error) {
    console.log('Response:',tasks)
    res.json(tasks)
  } else {
    console.log('Response:',tasks)
    res.json(tasks)
  }
})

app.use('/api', router)
app.listen(port)
console.log(`API running at localhost:${port}/api`)
