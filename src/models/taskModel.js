const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
   name: {
      type: String,
      trim: true,
      required: [true, 'Please provide a name'],
      maxlength: [30, 'Name cannot be more than 15 characters']
   },
   completed: {
      type: Boolean,
      default: false
   }
}, { timestamps: true });

const TaskSchema = mongoose.model('task', taskSchema);
module.exports = TaskSchema;