```
$> npm install

$> node index.js
```
*Min node v10*

# Get list of tasks
`curl -X GET http://localhost:3000/api/tasks`

# Create a new task
`curl -X POST -H 'Content-Type: application/json' http://localhost:3000/api/tasks -d '{"task": {"description": "a task", "complete": false}}'`

# Update a task
`curl -X PUT -H 'Content-Type: application/json' http://localhost:3000/api/tasks/0 -d '{"task": {"complete": true}}'`

# Delete a task
`curl -X DELETE http://localhost:3000/api/tasks/0`