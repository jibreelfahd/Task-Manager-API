const TaskSchema = require('../models/taskModel');
const { asyncWrapper } = require('../middlewares/asyncWrapper');

// @route GET ALL TASK
// @desc getting all tasks from the database
exports.getAllTasks = asyncWrapper(async (req, res) => {
   const tasks = await TaskSchema.find();
   res.status(200).json({ sucess: true, tasks });
})

// @route saving tasks
// @desc getting the inputed tasks from the client
exports.createTasks = asyncWrapper(async (req, res) => {
      const { name, completed } = req.body;  
      const task = await TaskSchema.create({name, completed});
      res.status(201).json({ success: true, task });
})

// @route get single task
// @desc getting a single task by id
exports.getTask = asyncWrapper(async (req, res) => {
      const { id: taskId } = req.params;
      const task = await TaskSchema.findOne({ _id: taskId });

      if(!task){
      return res.status(404).json({ message: `No id with task ${id}` });
      }
      res.status(200).json({ success: true, task });
})

// @route update a task
// @desc partially updating a task
exports.updateTask = asyncWrapper(async (req, res) => {
      const { id: taskId } = req.params;
      const { name, completed } = req.body;
      const task = await TaskSchema.findOneAndUpdate({_id:taskId }, { name, completed }, {
         new: true,
         runValidators: true,
      }); 
      
      if(!task){
        return res.status(404).json({ message: `No id with task ${taskId}` });
      }
      res.status(200).json({ success: true, task })
})

// @route delete a task
// @desc deleting a task based on the id provided
exports.deleteTask = asyncWrapper(async (req, res) => {
   const { id: taskId } = req.params;
   const task = await TaskSchema.findOneAndDelete({ _id: taskId});
   
   if(!task){
     return res.status(404).json({ message: `No id with task ${taskId}` });
   }
   res.status(500).json({ success: true });
})